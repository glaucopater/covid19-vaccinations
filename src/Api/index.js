import { apiUrl } from './config';
import useSWR from 'swr';
export const fetcher = (...args) => fetch(...args).then((res) => res.json());



export const useApi = () => {
  const { data, error } = useSWR(apiUrl, fetcher);
  return {
    apiData: data,
    isLoading: !error && !data,
    isError: error
  };
};
