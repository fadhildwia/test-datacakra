export interface ResponseArticleInterface {
  cover_image_url: string
  createdAt: string
  description: string
  documentId: string
  id: number
  locale: string
  publishedAt: string
  title: string
  updatedAt: string
}

export interface BodyCreateArticleInterface {
  data: {
    title: string
    description: string
    cover_image_url: string
    category: string
  }
}