import type { UserInterface } from "./UserInterface"

export interface ResponseCommentInterface {
  id: number
  documentId: string
  content: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
  article: string
  user: UserInterface
}
