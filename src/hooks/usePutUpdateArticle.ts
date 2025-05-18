import { useMutation, type UseMutationOptions } from "@tanstack/react-query"
import { axiosInstance } from "../config/axios.config"
import { AxiosError } from "axios"
import type { ResponseArticleInterface } from "../types/ArticleInterface"
import type { ArticleFormData } from "../lib/validators/articleSchema"

interface ErrorData {
  message: string
  name: string
}

interface UpdateArticleParams {
  id: string;
  data: ArticleFormData;
}

export const putUpdateArticle = async (
  { id, data }: UpdateArticleParams
): Promise<ResponseArticleInterface> =>
  await axiosInstance.put(`/api/articles/${id}`, { data }).then(({ data }) => data)

function usePutUpdateArticle(
  options?: UseMutationOptions<
    ResponseArticleInterface,
    AxiosError<ErrorInterface<ErrorData>>,
    UpdateArticleParams
  >
) {
  return useMutation<
    ResponseArticleInterface,
    AxiosError<ErrorInterface<ErrorData>>,
    UpdateArticleParams
  >({ mutationFn: putUpdateArticle, ...options })
}

export default usePutUpdateArticle
