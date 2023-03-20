import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const url = "https://heigl.docs-dang.it/api/docs";
export const useSearch = ({ search, type }) => {
  const query = new URLSearchParams({ search, type });
  const { data, error } = useSWR(`${url}?${query.toString()}`, fetcher);
  return {
    data,
    error,
    loading: !data && !error,
  };
};
