import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import { axiosInstance } from "../config/axios.config"
import type { ResponseArticleInterface } from "../types/ArticleInterface"

interface ParamsGetArticleDetailInterface {
  "populate[comments][populate][user]": string
}

export const getArticleDetail = async ({
  id,
  params,
}: {
  id?: string
  params: ParamsGetArticleDetailInterface
}): Promise<APIResponse<ResponseArticleInterface>> => {
  const filteredObject = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== "")
  )
  const data = await axiosInstance
    .get(`/api/articles/${id}`, {
      params: filteredObject,
    })
    .then(({ data }) => data)

  return data
}
const useGetArticleDetail = ({
  id,
  params,
  options,
}: {
  id?: string
  params: ParamsGetArticleDetailInterface
  options?: UseQueryOptions<APIResponse<ResponseArticleInterface>>
}) => {
  return useQuery<APIResponse<ResponseArticleInterface>>({
    queryKey: ["useGetArticleDetail", id, params],
    queryFn: () => getArticleDetail({ id, params }),
    ...options,
  })
}

export default useGetArticleDetail
