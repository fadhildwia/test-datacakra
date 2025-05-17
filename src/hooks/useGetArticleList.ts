import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import { axiosInstance } from "../config/axios.config"
import type { ResponseArticleInterface } from "../types/ArticleInterface"

export const getArticleList = async (): Promise<APIResponse<Array<ResponseArticleInterface>>> =>
  await axiosInstance.get('/api/articles').then(({ data }) => data)

const useGetArticleList = ({ options }: { options?: UseQueryOptions<APIResponse<Array<ResponseArticleInterface>>> }) => {
  return useQuery<APIResponse<Array<ResponseArticleInterface>>>({
    queryKey: ['useGetArticleList'],
    queryFn: () => getArticleList(),
    ...options,
  })
}

export default useGetArticleList
