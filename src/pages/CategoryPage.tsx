import { Card, CardHeader, CardTitle } from '../components/ui/card'
import { Edit2, Tag, Trash2 } from 'lucide-react'
import useGetCategoryList from '../hooks/useGetCategoryList';
import CreateCategoryForm from '../components/CreateCategoryForm';
import { Button } from '../components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDeleteCategory from '../hooks/useDeleteCategory';
import Loader from '../components/loader';

const CategoryPage = () => {
  const navigate = useNavigate()

  const [isDeleteCategoryOpen, setIsDeleteCategoryOpen] = useState({
    isOpen: false,
    id: "",
  })
  
  const { data: categoryList, refetch, isLoading: isLoadingCategoryList } = useGetCategoryList({});

  const { mutate: deleteCategory } = useDeleteCategory({
    onSuccess: async () => {
      setIsDeleteCategoryOpen({ isOpen: false, id: '' })
      navigate("/categories")
    },
  })

  const handleDeleteCategory = async (documentId: string) => {
    await deleteCategory(documentId)
  }

  return (
    <>
      {isLoadingCategoryList && <Loader />}
      <div className="container py-8 md:py-12">
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">Article Categories</h1>
        </div>
        
        <div className="mb-8 flex flex-col sm:flex-row justify-end items-center gap-4">
          <CreateCategoryForm onCategoryCreated={() => refetch()} />
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {categoryList?.data?.map((item) => (
            <Card key={item.id} className="h-full hover:shadow-lg transition-shadow duration-300 group">
              <div className="flex justify-end items-center gap-2 p-2">
                <div className="space-x-2">
                  <Button
                    size="sm"
                    onClick={() => {}}
                  >
                    <Edit2 className="mr-2 h-4 w-4" /> Edit
                  </Button>
                </div>
                <div className="space-x-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setIsDeleteCategoryOpen({ isOpen: true, id: item.documentId })}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center text-xl group-hover:text-primary transition-colors">
                  <Tag className="h-5 w-5 mr-3 text-primary/80 group-hover:text-primary transition-colors" />
                  {item.name}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
        <AlertDialog
          open={isDeleteCategoryOpen.isOpen}
          onOpenChange={(data) =>
            setIsDeleteCategoryOpen({ isOpen: data, id: "" })
          }
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the category
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => setIsDeleteCategoryOpen({ isOpen: false, id: "" })}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteCategory(isDeleteCategoryOpen.id)}
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              >
                Yes, delete category
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  )
}

export default CategoryPage