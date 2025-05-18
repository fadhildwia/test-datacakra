import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { articleSchema, type ArticleFormData } from '../lib/validators/articleSchema'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from './ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Edit2, Plus } from 'lucide-react'
import usePostCreateArticle from '../hooks/usePostCreateArticle'
import useGetCategoryList from '../hooks/useGetCategoryList'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import usePutUpdateArticle from '../hooks/usePutUpdateArticle'
import Loader from './loader'

interface CreateUpdateArticleFormProps {
  onArticleCreated: () => void
  articleToEdit?: ArticleFormData & { id: string }
}

const CreateUpdateArticleForm: React.FC<CreateUpdateArticleFormProps> = ({ onArticleCreated, articleToEdit }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const form = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      cover_image_url: '',
    },
  })

  useEffect(() => {
    if (articleToEdit) {
      form.reset({
        title: articleToEdit.title,
        description: articleToEdit.description,
        category: articleToEdit.category,
        cover_image_url: articleToEdit.cover_image_url,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleToEdit]);

  const { data: categoryList } = useGetCategoryList({})
  const { mutateAsync: createArticleMutation } = usePostCreateArticle({
    onSuccess: () => {
      onArticleCreated()
      form.reset()
      setIsOpen(false)
    },
    onSettled: () => setIsLoading(false)
  })

  const { mutateAsync: updateArticleMutation } = usePutUpdateArticle({
    onSuccess: () => {
      onArticleCreated();
      form.reset();
      setIsOpen(false);
    },
    onSettled: () => setIsLoading(false)
  });

  const onSubmit = async (data: ArticleFormData) => {
    const payloadArticleData = {
      title: data.title || '',
      description: data.description || '',
      category: data.category || '',
      cover_image_url: data.cover_image_url || '',
    }
    setIsLoading(true)
    if (articleToEdit) {
      await updateArticleMutation({
        id: articleToEdit.id,
        data: payloadArticleData,
      });
    } else {
      await createArticleMutation({ data: payloadArticleData });
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {articleToEdit ? (
            <Button size="sm">
              <Edit2 className="mr-2 h-4 w-4" /> Edit
            </Button>
          ) : (
            <Button 
              className="w-full sm:w-auto bg-primary hover:bg-primary/80"
            >
              <Plus className="mr-2 h-4 w-4" /> Create New Article
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px] bg-accent-foreground"> 
          <DialogHeader>
            <DialogTitle className="">{articleToEdit ? 'Edit Article' : 'Create New Article'}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Exploring the Hidden Gems of Bali" {...field} className="border-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., A detailed guide to Bali's best kept secrets..."
                        className="resize-none border-input"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <div className="flex items-center gap-2">
                        <FormControl className="flex-grow">
                          <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                            <SelectTrigger className="border-input">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categoryList?.data.length === 0 && (
                                  <SelectItem value="-" disabled>No categories available</SelectItem>
                              )}
                              {categoryList?.data.map((category) => (
                                <SelectItem key={category.id} value={category.documentId}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <FormField
                control={form.control}
                name="cover_image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Cover Image URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} className="border-input"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" className="bg-primary hover:bg-primary/80 text-white">{articleToEdit ? 'Update' : 'Create'} Article</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateUpdateArticleForm