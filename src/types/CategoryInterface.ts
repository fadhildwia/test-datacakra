export interface CategoryInterface {
  id: number
  documentId: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
}

export interface BodyCreateCategoryInterface {
  data: {
    name: string
  }
}
