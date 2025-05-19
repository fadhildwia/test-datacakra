import { useEffect, useState } from "react"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Search } from "lucide-react"
import ArticleCard from "../components/ArticleCard"
import useGetArticleList from "../hooks/useGetArticleList"
import CreateUpdateArticleForm from "../components/CreateUpdateArticleForm"
import Loader from "../components/Loader"

export const ArticlePage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm])

  const {
    data: articleList,
    refetch,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetArticleList({
    params: {
      "pagination[page]": 1,
      "pagination[pageSize]": 10,
      "filters[title][$containsi]": debouncedSearch
    },
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 1 }
    )

    const el = document.getElementById("load-more-trigger")
    if (el) observer.observe(el)

    return () => {
      if (el) observer.unobserve(el)
    }
  }, [hasNextPage, fetchNextPage])

  return (
    <>
      {isLoading && <Loader />}
      <div className="container py-8 md:py-12">
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl md:text-4xl text-primary-foreground font-bold">
            Travel Articles
          </h1>
          <p className="text-lg mt-2">Inspiration for your next journey.</p>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex w-full sm:w-auto sm:max-w-lg items-center space-x-2 flex-grow">
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button type="button" onClick={() => {}}>
              <Search className="h-4 w-4 md:mr-2 text-foreground" />
              <span className="hidden md:inline text-foreground">Search</span>
            </Button>
          </div>
          <CreateUpdateArticleForm onArticleCreated={() => refetch()} />
        </div>

        {articleList?.pages.flatMap((item) => item.data)?.length ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {articleList?.pages
              .flatMap((item) => item.data)
              .map((item) => (
                <ArticleCard key={item.id} article={item} />
              ))}
          </div>
        ) : (
          !isLoading && (
            <p className="text-center text-muted-foreground py-10">
              {searchTerm
                ? "No articles found matching your search."
                : "No articles yet. Be the first to create one!"}
            </p>
          )
        )}
        <div id="load-more-trigger" style={{ height: 1 }} />
      </div>
    </>
  )
}
