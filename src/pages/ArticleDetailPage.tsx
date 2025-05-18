import { useParams, Link, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import {
  ArrowLeft,
  CalendarDays,
  Edit2,
  MessageCircle,
  Trash2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import useGetArticleDetail from "../hooks/useGetArticleDetail"
import useGetCommentList from "../hooks/useGetCommentList"
import useAuthStore from "../store/authStore"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog"
import { useState } from "react"
import useDeleteArticle from "../hooks/useDeleteArticle"
import useDeleteComment from "../hooks/useDeleteComment"
import usePostCreateComment from "../hooks/usePostCreateComment"
import Loader from "../components/loader"
import CreateUpdateArticleForm from "../components/CreateUpdateArticleForm"

const ArticleDetailPage = () => {
  const { documentId } = useParams<{ documentId: string }>()
  const navigate = useNavigate()
  const { userAuth } = useAuthStore()

  const [isDeleteArticleOpen, setIsDeleteArticleOpen] = useState(false)
  const [isDeleteCommentOpen, setIsDeleteCommentOpen] = useState({
    isOpen: false,
    id: "",
  })

  const { data: articleDetail, isLoading: isLoadingArticleDetail, refetch: refetchArticleDetail } =
    useGetArticleDetail({ id: documentId })

  const {
    data: commentList,
    refetch,
    isLoading: isLoadingCommentList,
  } = useGetCommentList({
    params: {
      "sort[0]": "createdAt:desc",
      "populate[article]": "*",
      "populate[user]": "*",
      "pagination[pageSize]": "400",
    },
  })

  const { mutate: deleteArticle } = useDeleteArticle({
    onSuccess: async () => {
      setIsDeleteArticleOpen(false)
      navigate("/articles")
    },
  })

  const { mutate: deleteComment } = useDeleteComment({
    onSuccess: async () => {
      setIsDeleteCommentOpen({ isOpen: false, id: "" })
      refetch()
    },
  })

  const { mutateAsync: createCommentMutation } = usePostCreateComment({
    onSuccess: () => {
      refetch()
    },
  })

  const handleDeleteArticle = async (documentId: string) => {
    await deleteArticle(documentId)
  }

  const handleDeleteComment = async (documentId: string) => {
    await deleteComment(documentId)
  }

  const handleEditComment = () => {}

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    createCommentMutation({
      data: {
        content: (form.elements[0] as HTMLInputElement).value,
        article: articleDetail?.data.id as number,
      },
    }).then(() => form.reset())
  }

  if (!articleDetail?.data && !isLoadingArticleDetail) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The article you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <Link to="/articles">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Articles
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      {(isLoadingArticleDetail || isLoadingCommentList) && <Loader />}
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <Button variant="outline" asChild size="sm">
              <Link to="/articles">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Articles
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="space-x-2">
              <CreateUpdateArticleForm
                articleToEdit={{
                  id: articleDetail?.data.documentId || '',
                  title: articleDetail?.data.title || '',
                  description: articleDetail?.data.description || '',
                  category: "",
                  cover_image_url: articleDetail?.data.cover_image_url,
                }}
                onArticleCreated={() => refetchArticleDetail()}
              />
              </div>
              <div className="space-x-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setIsDeleteArticleOpen(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </div>
            </div>
          </div>

          <article>
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {articleDetail?.data.title}
              </h1>
              <div className="flex items-center text-sm text-muted-foreground space-x-4">
                <span className="flex items-center">
                  <CalendarDays className="mr-1.5 h-4 w-4" /> Published on{" "}
                  {articleDetail?.data &&
                    new Date(
                      articleDetail?.data?.createdAt
                    ).toLocaleDateString()}
                </span>
              </div>
            </header>

            <img
              src={articleDetail?.data.cover_image_url}
              alt={articleDetail?.data.title}
              className="w-full h-auto md:h-[400px] object-cover rounded-lg mb-8 shadow-lg"
            />

            <div className="text-background/90 text-left">
              <p className="text-lg mb-6">{articleDetail?.data.description}</p>
            </div>
          </article>

          <section className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <MessageCircle className="mr-3 h-6 w-6 text-primary" /> Comments (
              {
                commentList?.data.filter(
                  (filterItem) => filterItem.user.id === userAuth?.id
                )?.length
              }
              )
            </h2>

            <Card className="mb-8 bg-slate-50 text-left">
              <CardHeader>
                <CardTitle className="text-xl">Leave a Comment</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePostComment} className="space-y-4">
                  <Label htmlFor="commentText">Your Comment</Label>
                  <Textarea
                    id="commentText"
                    placeholder="Write your comment here..."
                    required
                    rows={4}
                  />
                  <Button type="submit" variant="secondary">
                    Post Comment
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {commentList?.data
                .filter((filterItem) => filterItem.user.id === userAuth?.id)
                .map((item) => (
                  <Card key={item.id} className="shadow-sm">
                    <CardContent className="p-4">
                      <div className="mb-6 flex justify-end items-center gap-2">
                        <div className="space-x-2">
                          <Button size="sm" onClick={() => handleEditComment()}>
                            <Edit2 className="mr-2 h-4 w-4" /> Edit
                          </Button>
                        </div>
                        <div className="space-x-2">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              setIsDeleteCommentOpen({
                                isOpen: true,
                                id: item.documentId,
                              })
                            }
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-semibold text-sm text-primary">
                          {item?.user?.username}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-sm text-left text-primary-foreground">
                        {item.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              {commentList?.data.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  Be the first to comment!
                </p>
              )}
            </div>
          </section>
        </div>

        <AlertDialog
          open={isDeleteArticleOpen}
          onOpenChange={setIsDeleteArticleOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the article
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsDeleteArticleOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteArticle(documentId as string)}
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              >
                Yes, delete article
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog
          open={isDeleteCommentOpen.isOpen}
          onOpenChange={(data) =>
            setIsDeleteCommentOpen({ isOpen: data, id: "" })
          }
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the comment
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() =>
                  setIsDeleteCommentOpen({ isOpen: false, id: "" })
                }
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteComment(isDeleteCommentOpen.id)}
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              >
                Yes, delete comment
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  )
}

export default ArticleDetailPage
