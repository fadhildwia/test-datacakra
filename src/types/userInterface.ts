export interface BodyLoginInterface {
  identifier: string
  password: string
}

export interface BodyRegisterInterface {
  email: string
  username: string
  password: string
}

export interface ErrorInterface<D> {
  data: string
  error: D
}

export interface userInterface {
  id: number
  documentId: string
  username: string
  email: string
  provider: string
  confirmed: string
  blocked: boolean
}

export interface ResponseLoginInterface {
  jwt: string
  user: userInterface
}

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
