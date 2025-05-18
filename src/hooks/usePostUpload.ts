import { useMutation, type UseMutationOptions } from "@tanstack/react-query"
import { axiosInstance } from "../config/axios.config"
import { AxiosError } from "axios"
import type { UploadedImage } from "../types/UploadInterface"

interface ErrorData {
  message: string
  name: string
}

export const postUpload = async (
  body: FormData
): Promise<UploadedImage> =>
  await axiosInstance.post("/api/upload", body).then(({ data }) => data)

function usePostUpload(
  options?: UseMutationOptions<
    UploadedImage,
    AxiosError<ErrorInterface<ErrorData>>,
    FormData
  >
) {
  return useMutation<
    UploadedImage,
    AxiosError<ErrorInterface<ErrorData>>,
    FormData
  >({ mutationFn: postUpload, ...options })
}

export default usePostUpload
