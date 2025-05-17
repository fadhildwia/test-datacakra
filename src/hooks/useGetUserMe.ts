import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import { axiosInstance } from "../config/axios.config"
import type { UserInterface } from "../types/UserInterface"

export const getUserMe = async (): Promise<UserInterface> =>
  await axiosInstance.get('/api/users/me').then(({ data }) => data)

const useGetUserMe = ({ options }: { options?: UseQueryOptions<UserInterface> }) => {
  return useQuery<UserInterface>({
    queryKey: ['useGetUserMe'],
    queryFn: () => getUserMe(),
    ...options,
  })
}

export default useGetUserMe
