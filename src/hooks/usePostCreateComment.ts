import { useMutation, type UseMutationOptions } from "@tanstack/react-query"
import { axiosInstance } from "../config/axios.config"
import { AxiosError } from "axios"
import type { BodyCommentInterface, ResponseCommentInterface } from "../types/CommentInterface"

interface ErrorData {
  message: string
  name: string
}

export const postCreateComment = async (
  body: BodyCommentInterface
): Promise<ResponseCommentInterface> =>
  await axiosInstance.post("/api/comments", body).then(({ data }) => data)

function usePostCreateComment(
  options?: UseMutationOptions<
    ResponseCommentInterface,
    AxiosError<ErrorInterface<ErrorData>>,
    BodyCommentInterface
  >
) {
  return useMutation<
    ResponseCommentInterface,
    AxiosError<ErrorInterface<ErrorData>>,
    BodyCommentInterface
  >({ mutationFn: postCreateComment, ...options })
}

export default usePostCreateComment
