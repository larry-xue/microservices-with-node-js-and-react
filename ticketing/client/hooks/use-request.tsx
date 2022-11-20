import axios from 'axios';
import { useState } from 'react';

type Method = 'post' | 'get' | 'delete' | 'put';
type CustomError = { message: string; field?: string };

function useRequest<T>(url: string, method: Method, body: any) {
  const [errors, setErrors] = useState<CustomError[]>([]);
  const doReuest = async () => {
    try {
      const response = await axios[method]<T>(url, body);
      setErrors([]);
      return response.data;
    } catch (err: any) {
      setErrors(err.response.data.errors);
    }
  };

  return { doReuest, errors };
}

export default useRequest;
