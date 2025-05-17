import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import { axiosInstance } from "../config/axios.config"
import type { ResponseArticleInterface } from "../types/ArticleInterface"

export const getCategoryList = async (): Promise<APIResponse<Array<ResponseArticleInterface>>> =>
  await axiosInstance.get('/api/categories').then(({ data }) => data)

const useGetCategoryList = ({ options }: { options?: UseQueryOptions<APIResponse<Array<ResponseArticleInterface>>> }) => {
  return useQuery<APIResponse<Array<ResponseArticleInterface>>>({
    queryKey: ['useGetCategoryList'],
    queryFn: () => getCategoryList(),
    ...options,
  })
}

export default useGetCategoryList
