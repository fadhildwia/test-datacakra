import { z } from 'zod';

export const commentSchema = z.object({
  content: z.string().min(3, { message: "Title must be at least 3 characters long." }).max(100, { message: "Title cannot exceed 100 characters." }),
});

export type CommentFormData = z.infer<typeof commentSchema>;