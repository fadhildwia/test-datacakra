import { useMutation, type UseMutationOptions } from "@tanstack/react-query"
import { axiosInstance } from "../config/axios.config"
import { AxiosError } from "axios"
import type { ResponseCommentInterface } from "../types/CommentInterface"
import type { CommentFormData } from "../lib/validators/commentSchema"

interface ErrorData {
  message: string
  name: string
}

interface UpdateArticleParams {
  id: string;
  data: CommentFormData;
}

export const putUpdateComment = async (
  { id, data }: UpdateArticleParams
): Promise<ResponseCommentInterface> =>
  await axiosInstance.put(`/api/comments/${id}`, { data }).then(({ data }) => data)

function usePutUpdateComment(
  options?: UseMutationOptions<
    ResponseCommentInterface,
    AxiosError<ErrorInterface<ErrorData>>,
    UpdateArticleParams
  >
) {
  return useMutation<
    ResponseCommentInterface,
    AxiosError<ErrorInterface<ErrorData>>,
    UpdateArticleParams
  >({ mutationFn: putUpdateComment, ...options })
}

export default usePutUpdateComment
