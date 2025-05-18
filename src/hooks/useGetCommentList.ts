import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import { axiosInstance } from "../config/axios.config"
import type { ResponseCommentInterface } from "../types/CommentInterface"

interface ParamsGetCommentListInterface {
  'sort[0]': string
  'populate[article]': string
  'populate[user]': string
  'pagination[pageSize]': string
}

export const getCommentList = async ({
  params
}: {
  params: ParamsGetCommentListInterface
}): Promise<APIResponse<Array<ResponseCommentInterface>>> =>{
  const filteredObject = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== '')
  )

  const data = await axiosInstance.get('/api/comments', {
    params: filteredObject
  }).then(({ data }) => data)
  return data
}

const useGetCommentList = ({ params, options }: { params: ParamsGetCommentListInterface, options?: UseQueryOptions<APIResponse<Array<ResponseCommentInterface>>> }) => {
  return useQuery<APIResponse<Array<ResponseCommentInterface>>>({
    queryKey: ['useGetCommentList', params],
    queryFn: () => getCommentList({ params }),
    ...options,
  })
}

export default useGetCommentList
