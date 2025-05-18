import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from './ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Plus } from 'lucide-react';
import { categorySchema, type CategoryFormData } from '../lib/validators/categorySchema';
import usePostCreateCategory from '../hooks/usePostCreateCategory';

interface CreateCategoryFormProps {
  onCategoryCreated: () => void;
}

const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({ onCategoryCreated }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
    },
  });

  const { mutateAsync: createCategoryMutation } = usePostCreateCategory({
    onSuccess: () => {
      onCategoryCreated();
      form.reset();
      setIsOpen(false);
    }
  })

  const onSubmit = async (data: CategoryFormData) => {
    const payloadCategoryData = {
      name: data.name || '',
    };

    await createCategoryMutation({ data: payloadCategoryData })
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="w-full sm:w-auto bg-primary hover:bg-primary/80"
        >
          <Plus className="mr-2 h-4 w-4" /> Create New Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] bg-accent-foreground"> 
        <DialogHeader>
          <DialogTitle className="">Create New Category</DialogTitle>
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
              <Button type="submit" className="bg-primary hover:bg-primary/80 text-white">Create Category</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryForm;