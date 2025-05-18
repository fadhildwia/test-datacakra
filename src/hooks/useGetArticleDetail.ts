import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import { axiosInstance } from "../config/axios.config"
import type { ResponseArticleInterface } from "../types/ArticleInterface"

export const getArticleDetail = async ({ id }: { id?: string }): Promise<APIResponse<ResponseArticleInterface>> =>
  await axiosInstance.get(`/api/articles/${id}`).then(({ data }) => data)

const useGetArticleDetail = ({ id, options }: { id?: string, options?: UseQueryOptions<APIResponse<ResponseArticleInterface>> }) => {
  return useQuery<APIResponse<ResponseArticleInterface>>({
    queryKey: ['useGetArticleDetail', id],
    queryFn: () => getArticleDetail({ id }),
    ...options,
  })
}

export default useGetArticleDetail
