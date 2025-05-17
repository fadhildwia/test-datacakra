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
  data: string;
  error: D;
}

export interface userInterface {
  id: number
  documentId: string
  username: string
  email: string
  provider: string
  confirmed: string
  blocked: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
  local: string
}

export interface ResponseLoginInterface {
  jwt: string
  user: userInterface
}