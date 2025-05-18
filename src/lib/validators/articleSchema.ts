import { z } from 'zod';

export const articleSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters long." }).max(100, { message: "Title cannot exceed 100 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters long." }).max(500, { message: "Description cannot exceed 500 characters." }),
  category: z.string().min(2, { message: "Category must be selected." }),
  cover_image_url: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
});

export type ArticleFormData = z.infer<typeof articleSchema>;