import { useMutation, type UseMutationOptions } from "@tanstack/react-query"
import { axiosInstance } from "../config/axios.config"
import { AxiosError } from "axios"

interface ErrorData {
  message: string
  name: string
}

export const deleteComment = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/api/comments/${id}`)
}

function useDeleteComment(
  options?: UseMutationOptions<void, AxiosError<ErrorInterface<ErrorData>>, string>
) {
  return useMutation<void, AxiosError<ErrorInterface<ErrorData>>, string>({
    mutationFn: deleteComment,
    ...options,
  })
}

export default useDeleteComment
