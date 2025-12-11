import { z } from 'zod';

export const roleSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
});

