import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import { axiosInstance } from "../config/axios.config"
import type { userInterface } from "../types/userInterface"

export const getUserMe = async (): Promise<userInterface> =>
  await axiosInstance.get('/api/users/me').then(({ data }) => data);

const useGetUserMe = ({ options }: { options?: UseQueryOptions<userInterface> }) => {
  return useQuery<userInterface>({
    queryKey: ['useGetUserMe'],
    queryFn: () => getUserMe(),
    ...options,
  });
};

export default useGetUserMe;
