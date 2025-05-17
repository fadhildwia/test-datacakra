import { useMutation, type UseMutationOptions } from "@tanstack/react-query"
import { axiosInstance } from "../config/axios.config"
import { AxiosError } from "axios"
import type { BodyRegisterInterface, ErrorInterface, ResponseLoginInterface } from "../types/userInterface"

export const postUserRegister = async (
  body: BodyRegisterInterface
): Promise<ResponseLoginInterface> =>
  await axiosInstance.post("/api/auth/local/register", body).then(({ data }) => data)

function usePostUserRegister(
  options?: UseMutationOptions<
    ResponseLoginInterface,
    AxiosError<ErrorInterface<unknown>>,
    BodyRegisterInterface
  >
) {
  return useMutation<
    ResponseLoginInterface,
    AxiosError<ErrorInterface<unknown>>,
    BodyRegisterInterface
  >({ mutationFn: postUserRegister, ...options })
}

export default usePostUserRegister
