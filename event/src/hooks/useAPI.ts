import { useState, useEffect, useContext } from 'react';

interface GqlRequestOptions {
  appendFormdata?: ((form_data: FormData) => void);
  context?: any;
  show_alert?: boolean;
}

const useAPI = (initialData: any, request: any, variable?: null, options?: GqlRequestOptions) => {
  
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error_code, setErrorCode] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await request(variable, options);
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

export default useAPI;