import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(3, { message: "Title must be at least 3 characters long." }).max(100, { message: "Title cannot exceed 100 characters." }),
});

export type CategoryFormData = z.infer<typeof categorySchema>;