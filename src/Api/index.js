
import { apiUrl } from "../Config";
import useSWR from 'swr';
export const fetcher = (...args) => fetch(...args).then(res => res.json())

export const useApi = () => {
    const { data, error } = useSWR(apiUrl, fetcher, { dedupingInterval: 3000 });
    return {
        apiData: data,
        isLoading: !error && !data,
        isError: error
    }
}