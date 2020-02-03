declare const STAGE: string;
declare module '*.scss' {
  const content: {[className: string]: string};
  export = content;
}