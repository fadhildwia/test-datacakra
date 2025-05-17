import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import type { ResponseArticleInterface } from '../types/ArticleInterface'

interface ArticleCardProps {
  article: ResponseArticleInterface
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-0">
        <img 
          src={article.cover_image_url} 
          alt={article.title} 
          className="w-full h-48 object-cover" 
        />
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-xl font-poppins mb-2 leading-tight">
          {article.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground mb-3">{new Date(article.createdAt).toLocaleDateString()}</p>
        <p className="text-sm text-card line-clamp-3">
          {article.description}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild variant="ghost" className="text-primary hover:text-primary/90 p-0 h-auto">
          <Link to={`/articles/${article.documentId}`}>
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ArticleCard