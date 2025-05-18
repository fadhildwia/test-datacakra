import { useMutation, type UseMutationOptions } from "@tanstack/react-query"
import { axiosInstance } from "../config/axios.config"
import { AxiosError } from "axios"
import type { BodyCreateCategoryInterface, CategoryInterface } from "../types/CategoryInterface"

interface ErrorData {
  message: string
  name: string
}

export const postCreateCategory = async (
  body: BodyCreateCategoryInterface
): Promise<CategoryInterface> =>
  await axiosInstance.post("/api/categories", body).then(({ data }) => data)

function usePostCreateCategory(
  options?: UseMutationOptions<
    CategoryInterface,
    AxiosError<ErrorInterface<ErrorData>>,
    BodyCreateCategoryInterface
  >
) {
  return useMutation<
    CategoryInterface,
    AxiosError<ErrorInterface<ErrorData>>,
    BodyCreateCategoryInterface
  >({ mutationFn: postCreateCategory, ...options })
}

export default usePostCreateCategory
