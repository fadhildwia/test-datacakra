import { Card, CardHeader, CardTitle } from '../components/ui/card'
import { Tag } from 'lucide-react'
import useGetCategoryList from '../hooks/useGetCategoryList';

const CategoryPage = () => {
  const { data: categoryList } = useGetCategoryList({});

  return (
    <div className="container py-8 md:py-12">
      <div className="text-center mb-10 md:mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">Article Categories</h1>
      </div>
      
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {categoryList?.data?.map((item) => (
          <Card key={item.id} className="h-full hover:shadow-lg transition-shadow duration-300 group">
            <CardHeader>
              <CardTitle className="flex items-center text-xl group-hover:text-primary transition-colors">
                <Tag className="h-5 w-5 mr-3 text-primary/80 group-hover:text-primary transition-colors" />
                {item.name}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CategoryPage