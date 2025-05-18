import { useMutation, type UseMutationOptions } from "@tanstack/react-query"
import { axiosInstance } from "../config/axios.config"
import { AxiosError } from "axios"
import type { BodyCreateArticleInterface, ResponseArticleInterface } from "../types/ArticleInterface"

interface ErrorData {
  message: string
  name: string
}

export const postCreateArticle = async (
  body: BodyCreateArticleInterface
): Promise<ResponseArticleInterface> =>
  await axiosInstance.post("/api/articles", body).then(({ data }) => data)

function usePostCreateArticle(
  options?: UseMutationOptions<
    ResponseArticleInterface,
    AxiosError<ErrorInterface<ErrorData>>,
    BodyCreateArticleInterface
  >
) {
  return useMutation<
    ResponseArticleInterface,
    AxiosError<ErrorInterface<ErrorData>>,
    BodyCreateArticleInterface
  >({ mutationFn: postCreateArticle, ...options })
}

export default usePostCreateArticle
