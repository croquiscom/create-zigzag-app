import { useState, useEffect } from 'react';

interface RequestOptions {
  headers?: any;
  method?: string;
  url: string;
  data?: any;
  res?: any;
}

const LOCAL_ENDPOINTS: string = 'http://localhost:9113/api/2';

const API_ENDPOINTS: any = {
  alpha: 'https://api.alpha.zigzag.kr/api/2',
  production: 'https://api.zigzag.kr/api/2',
  development: LOCAL_ENDPOINTS,
};

export const api_url = STAGE ? API_ENDPOINTS[STAGE] : LOCAL_ENDPOINTS;

export const useRequest = (initData: any, params: RequestOptions, show_alert: boolean = true) => {
  
  const [data, setData] = useState(initData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error_code, setErrorCode] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await request(params, show_alert);
        setData(result.data);
      } catch (error) {
        setIsError(true);
        setErrorCode(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return [{ data, isLoading, isError, error_code }];
};

export async function request(params: RequestOptions, show_alert: boolean = true) {
  const url = `${api_url}/${params.url.replace(/^\//, '')}`;
  const request_init: RequestInit = {
    method: params.method || 'GET',
    headers: {
      ...params.headers,
    },
    credentials: 'include',
  };
  if (params.data) {
    request_init.body = params.data;
  }
  const response = await fetch(url, request_init);
  if (response.status === 200) {
    const result = await response.json();
    if (params.res && response.headers.get('set-cookie')) {
      params.res.setHeader('set-cookie', response.headers.get('set-cookie'));
    }
    if (result.errors && result.errors.length > 0) {
      throw result.errors[0];
    }
    return result;
  } else {
    const error = await response.json();
    throw error;
  }
}
