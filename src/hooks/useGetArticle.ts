import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import { axiosInstance } from "../config/axios.config"
import type { ResponseArticleInterface } from "../types/userInterface";

export const getArticle = async (): Promise<APIResponse<Array<ResponseArticleInterface>>> =>
  await axiosInstance.get('/api/articles').then(({ data }) => data);

const useGetArticle = ({ options }: { options?: UseQueryOptions<APIResponse<Array<ResponseArticleInterface>>> }) => {
  return useQuery<APIResponse<Array<ResponseArticleInterface>>>({
    queryKey: ['useGetArticle'],
    queryFn: () => getArticle(),
    ...options,
  });
};

export default useGetArticle;
