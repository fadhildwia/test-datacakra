import { useMutation, type UseMutationOptions } from "@tanstack/react-query"
import { axiosInstance } from "../config/axios.config"
import { AxiosError } from "axios"
import type { BodyLoginInterface, ResponseLoginInterface } from "../types/UserInterface"

interface ErrorData {
  message: string
  name: string
}

export const postUserLogin = async (
  body: BodyLoginInterface
): Promise<ResponseLoginInterface> =>
  await axiosInstance.post("/api/auth/local", body).then(({ data }) => data)

function usePostUserLogin(
  options?: UseMutationOptions<
    ResponseLoginInterface,
    AxiosError<ErrorInterface<ErrorData>>,
    BodyLoginInterface
  >
) {
  return useMutation<
    ResponseLoginInterface,
    AxiosError<ErrorInterface<ErrorData>>,
    BodyLoginInterface
  >({ mutationFn: postUserLogin, ...options })
}

export default usePostUserLogin
