import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import { axiosInstance } from "../config/axios.config"
import type { CategoryInterface } from "../types/CategoryInterface"

export const getCategoryList = async (): Promise<APIResponse<Array<CategoryInterface>>> =>
  await axiosInstance.get('/api/categories').then(({ data }) => data)

const useGetCategoryList = ({ options }: { options?: UseQueryOptions<APIResponse<Array<CategoryInterface>>> }) => {
  return useQuery<APIResponse<Array<CategoryInterface>>>({
    queryKey: ['useGetCategoryList'],
    queryFn: () => getCategoryList(),
    ...options,
  })
}

export default useGetCategoryList
