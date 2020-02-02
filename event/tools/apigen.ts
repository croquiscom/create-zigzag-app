import fs from 'fs';
import glob from 'glob';
import { camelCase, trim, uniq } from 'lodash';
import { resolve } from 'path';

const DECLARED_FRAGMENT_REGEXP = /(fragment) ([A-Za-z0-9-]+)/;
const USING_FRAGMENT_REGEXP = /(\.\.\.)([A-Za-z0-9-]+)/g;
const DECLARED_MUTATION_QUERY_REGEXP = /(mutation|query) ([A-Za-z0-9-]+)/;
const DECLARED_VARIABLES_IN_MUTATION_QUERY_REGEXP = /(mutation|query) ([A-Za-z0-9-]+)\(/;

const API_INDEX_FILE_PATH = resolve(process.cwd(), 'src/api/index.ts');

const file_names = glob.sync('./src/**/*.graphql');

const files = file_names.map((f) => fs.readFileSync(resolve(process.cwd(), f), 'utf-8'));
const content = files.join('\n').split('\n').map((str) => trim(str))
  .join(' ').replace(/mutation /g, '\nmutation ').replace(/query /g, '\nquery ').replace(/fragment /g, '\nfragment ');
const lines = trim(content).split('\n');
const operations = lines.map((l) => trim(l));

const reg = /(?<=((query\s)|(mutation\s)))./;
lines.forEach((line) => {
  const execed_reg = reg.exec(line);
  const first_char = execed_reg && execed_reg[0];
  if (first_char && /[a-z]/.test(first_char)) {
    console.log(`error! should be UpperCase: ${line.split('(')[0]}`);
    process.exit(1);
  }
});

const fragment_list = operations.map((op) => {
  if (DECLARED_FRAGMENT_REGEXP.test(op)) {
    const fragment_name = RegExp.$2;
    return { fragment_name, op };
  } else {
    return null;
  }
}).filter((fragment) => fragment != null) as Array<{ fragment_name: string, op: string }>;

function getFragmentOperationList(fragment_name: string): string[] {
  const fragment = fragment_list.find((tmp_fragment) => (tmp_fragment.fragment_name === fragment_name));
  if (!fragment) {
    const error_message = `query / mutation has fragment, but fragment is not defined (fragment: ${fragment_name})`;
    console.log(error_message);
    throw Error(error_message);
  }

  let fragment_operation_list: string[] = [];
  fragment_operation_list.push(fragment.op);

  const using_fragment_list = fragment.op.match(USING_FRAGMENT_REGEXP);
  if (using_fragment_list) {
    fragment_operation_list = [...fragment_operation_list, ...getFragmentOperationListWrapper(using_fragment_list)];
  }
  return fragment_operation_list;
}

function getFragmentOperationListWrapper(fragment_name_list: string[]): string[] {
  const uniq_fragment_name_list = uniq(fragment_name_list.map((tmp_fragment) => tmp_fragment.replace('...', '')));
  const fragment_operations_list = uniq(uniq_fragment_name_list.reduce((tmp_fragment_operation_list, tmp_fragment_name) => {
    return [...tmp_fragment_operation_list, ...getFragmentOperationList(tmp_fragment_name)];
  }, [] as string[]));
  return fragment_operations_list;
}

const queries = operations.map((op) => {
  let op_name: string;
  if (DECLARED_MUTATION_QUERY_REGEXP.test(op)) {
    op_name = RegExp.$2;
  } else {
    return null;
  }

  const using_fragment_list = op.match(USING_FRAGMENT_REGEXP);
  let fragment_operations: string = '';
  if (using_fragment_list) {
    fragment_operations = getFragmentOperationListWrapper(using_fragment_list).join(' ');
  }

  const query: string = `${fragment_operations} ${op}`;

  const has_variable = DECLARED_VARIABLES_IN_MUTATION_QUERY_REGEXP.test(op);
  const R = `types.${op_name}`;
  const V = has_variable ? `types.${op_name}Variables` : 'null';

  return `export async function ${camelCase(op_name)}(variable${has_variable ? '' : '?'}: ${V}, options?: GqlRequestOptions) {
  // tslint:disable-next-line:max-line-length
  const query = '${trim(query)}';
  return await gql_request<${R}, ${V}>(query, variable, options);
}
`;
}).filter((query) => query != null) as string[];

const gql_module_str = `
import request from './request';
import * as types from './types';

interface GqlRequestOptions {
  appendFormdata?: ((form_data: FormData) => void);
  context?: any;
  show_alert?: boolean;
}

export async function gql_request<R, V = {}>(query: string, variables?: V, options: GqlRequestOptions = {}) {
  const { appendFormdata, context, show_alert = true } = options;
  let data: any = { query, variables };
  const headers: any = {};

  if (appendFormdata != null) {
    const form_data = new FormData();
    form_data.append('operations', JSON.stringify(data));
    appendFormdata(form_data);
    data = form_data;
  } else {
    headers['Content-Type'] = 'application/json';
    data = JSON.stringify(data);
  }

  if (context) {
    headers.cookie = context.headers.cookie;
  }

  const result = await request({
    method: 'POST',
    headers,
    url: '/graphql',
    data,
    ...(context && context.res && { res: context.res }),
  }, show_alert);

  return result as { data: R, errors?: any[] };
}

${queries.join('\n')}`;
fs.writeFileSync(API_INDEX_FILE_PATH, gql_module_str);
