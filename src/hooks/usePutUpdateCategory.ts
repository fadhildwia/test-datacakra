import { useMutation, type UseMutationOptions } from "@tanstack/react-query"
import { axiosInstance } from "../config/axios.config"
import { AxiosError } from "axios"
import type { CategoryInterface } from "../types/CategoryInterface"
import type { CategoryFormData } from "../lib/validators/categorySchema"

interface ErrorData {
  message: string
  name: string
}

interface UpdateCategoryParams {
  id: string;
  data: CategoryFormData;
}

export const putUpdateCategory = async (
  { id, data }: UpdateCategoryParams
): Promise<CategoryInterface> =>
  await axiosInstance.put(`/api/categories/${id}`, { data }).then(({ data }) => data)

function usePutUpdateCategory(
  options?: UseMutationOptions<
    CategoryInterface,
    AxiosError<ErrorInterface<ErrorData>>,
    UpdateCategoryParams
  >
) {
  return useMutation<
    CategoryInterface,
    AxiosError<ErrorInterface<ErrorData>>,
    UpdateCategoryParams
  >({ mutationFn: putUpdateCategory, ...options })
}

export default usePutUpdateCategory
