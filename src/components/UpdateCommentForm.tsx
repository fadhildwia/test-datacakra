import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { Edit2 } from 'lucide-react'
import Loader from './Loader'
import { commentSchema, type CommentFormData } from '../lib/validators/commentSchema'
import usePutUpdateComment from '../hooks/usePutUpdateComment'

interface CreateUpdateCommentFormProps {
  onCommentEdited: () => void
  commentToEdit?: CommentFormData & { id: string }
}

const CreateUpdateCommentForm: React.FC<CreateUpdateCommentFormProps> = ({ onCommentEdited, commentToEdit }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: '',
    },
  })

  useEffect(() => {
    if (commentToEdit) {
      form.reset({
        content: commentToEdit.content,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentToEdit]);

  const { mutateAsync: updateCommentMutation } = usePutUpdateComment({
    onSuccess: () => {
      onCommentEdited();
      form.reset();
      setIsOpen(false);
    },
    onSettled: () => setIsLoading(false)
  });

  const onSubmit = async (data: CommentFormData) => {
    const payloadCommentData = {
      content: data.content || '',
    }
    setIsLoading(true)
    if (commentToEdit) {
      await updateCommentMutation({
        id: commentToEdit.id,
        data: payloadCommentData,
      });
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button size="sm">
            <Edit2 className="mr-2 h-4 w-4" /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px] bg-accent-foreground"> 
          <DialogHeader>
            <DialogTitle className="">Edit Comment</DialogTitle>
            <DialogDescription className="text-muted-foreground">
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Content</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Exploring the Hidden Gems of Bali" {...field} className="border-input" />
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
                <Button type="submit" className="bg-primary hover:bg-primary/80 text-white">Update Comment</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateUpdateCommentForm