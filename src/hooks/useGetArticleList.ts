import { useInfiniteQuery } from "@tanstack/react-query"
import { axiosInstance } from "../config/axios.config"

interface ParamsGetArticleListInterface {
  "pagination[page]": number
  "pagination[pageSize]": number
}

export const getArticleList = async ({
  params,
}: {
  params: ParamsGetArticleListInterface
}) => {
  const filteredObject = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== "")
  )

  const { data } = await axiosInstance.get("/api/articles", {
    params: filteredObject,
  })

  return data
}

const useGetArticleList = ({
  params,
}: {
  params: ParamsGetArticleListInterface
}) => {
  return useInfiniteQuery({
    queryKey: ["useInfiniteArticleList", params],
    queryFn: async ({ pageParam = 1 }) => {
      return getArticleList({
        params: {
          ...params,
          "pagination[page]": Number(pageParam),
        },
      })
    },
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.meta?.pagination?.page ?? 1
      const totalPages = lastPage.meta?.pagination?.pageCount ?? 1
      return currentPage < totalPages ? currentPage + 1 : undefined
    },
    initialPageParam: 1,
  })
}

export default useGetArticleList
