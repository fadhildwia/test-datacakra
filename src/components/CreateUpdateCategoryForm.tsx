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
import { Edit2, Plus } from 'lucide-react'
import { categorySchema, type CategoryFormData } from '../lib/validators/categorySchema'
import usePostCreateCategory from '../hooks/usePostCreateCategory'
import usePutUpdateCategory from '../hooks/usePutUpdateCategory'
import Loader from './Loader'

interface CreateUpdateCategoryFormProps {
  onCategoryCreated: () => void
  categoryToEdit?: { id: string; name: string } | null
}

const CreateUpdateCategoryForm: React.FC<CreateUpdateCategoryFormProps> = ({ onCategoryCreated, categoryToEdit }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
    },
  })

  useEffect(() => {
    if (categoryToEdit) {
      form.reset({
        name: categoryToEdit.name,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryToEdit]);

  const { mutateAsync: createCategoryMutation } = usePostCreateCategory({
    onSuccess: () => {
      onCategoryCreated()
      form.reset()
      setIsOpen(false)
    },
    onSettled: () => setIsLoading(false)
  })

  const { mutateAsync: updateCategoryMutation } = usePutUpdateCategory({
    onSuccess: () => {
      onCategoryCreated()
      form.reset()
      setIsOpen(false)
    },
    onSettled: () => setIsLoading(false)
  })

  const onSubmit = async (data: CategoryFormData) => {
    const payloadCategoryData = {
      name: data.name || '',
    }

    setIsLoading(true)
    if (categoryToEdit) {
      await updateCategoryMutation({
        id: categoryToEdit.id,
        data: payloadCategoryData,
      });
    } else {
      await createCategoryMutation({ data: payloadCategoryData })
    }

  }

  return (
    <>
      {isLoading && <Loader />}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {categoryToEdit ? (
              <Button size="sm">
                <Edit2 className="mr-2 h-4 w-4" /> Edit
              </Button>
            ) : (
              <Button 
                className="w-full sm:w-auto bg-primary hover:bg-primary/80"
              >
                <Plus className="mr-2 h-4 w-4" /> Create New Category
              </Button>
            )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px] bg-accent-foreground"> 
          <DialogHeader>
            <DialogTitle className="">{categoryToEdit ? 'Edit Category' : 'Create New Category'}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Name</FormLabel>
                      <FormControl>
                      <Input placeholder="e.g., Travel, Food, Technology" {...field} className="border-input" />
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
                <Button type="submit" className="bg-primary hover:bg-primary/80 text-white">{categoryToEdit ? 'Update' : 'Create'} Category</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateUpdateCategoryForm