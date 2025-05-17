import { useState } from "react";
import { Input } from "../components/ui/input";
import useGetArticle from "../hooks/useGetArticleList";
import { Button } from "../components/ui/button";
import { Search } from "lucide-react";
import ArticleCard from "../components/ArticleCard";

export const CategoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: statusList } = useGetArticle({});

  return (
    <div className="container py-8 md:py-12">
      <div className="text-center mb-10 md:mb-16">
        <h1 className="text-3xl md:text-4xl text-primary-foreground font-bold">Travel Articles</h1>
        <p className="text-lg mt-2">
          Inspiration for your next journey.
        </p>
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
      </div>

      {statusList?.data?.length ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {statusList?.data.map(item => (
            <ArticleCard key={item.id} article={item} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-10">
          {searchTerm ? "No articles found matching your search." : "No articles yet. Be the first to create one!"}
        </p>
      )}
    </div>
  )
}