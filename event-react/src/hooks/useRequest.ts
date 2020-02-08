import { useEffect, useState } from 'react';
import request from '../api/request';

interface RequestOptions {
  headers?: any;
  method?: string;
  url: string;
  data?: any;
  res?: any;
}

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
