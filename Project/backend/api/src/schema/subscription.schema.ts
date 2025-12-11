import { z } from 'zod';

// Helper to convert Prisma Decimal to number or string
const decimalToNumberOrString = (val: unknown): number | string | null | undefined => {
  if (val === null || val === undefined) {
    return val;
  }
  // Handle Prisma Decimal type
  if (val && typeof val === 'object' && 'toNumber' in val && typeof (val as any).toNumber === 'function') {
    return (val as any).toNumber();
  }
  // Already a number or string
  if (typeof val === 'number' || typeof val === 'string') {
    return val;
  }
  // Try to convert to number
  const num = Number(val);
  if (!isNaN(num)) {
    return num;
  }
  return String(val);
};

export const subscriptionSchema = z.object({
  id: z.string(),
  companyId: z.string(),
  levelId: z.string(),
  discount: z.preprocess(
    decimalToNumberOrString,
    z.union([z.number(), z.string()]).optional().nullable()
  ),
  methodPaymentId: z.string().optional().nullable(),
  typeChargeId: z.string().optional().nullable(),
  cnpj: z.string().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
});

