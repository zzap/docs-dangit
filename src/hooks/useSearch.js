import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const url = "https://heigl.docs-dang.it/api/docs";
export const useSearch = (query) => {
  const fullUrl = query ? `${url}?search=${query}` : url;
  const { data, error } = useSWR(fullUrl, fetcher);
  return {
    data,
    error,
    loading: !data && !error,
  };
};
