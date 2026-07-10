import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address.").trim(),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z.email("Please enter a valid email address.").trim(),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const validateForm = async <T extends z.ZodTypeAny>(schema: T, formData: any) => {
  const result = schema.safeParse(formData);
  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    const errors = Object.fromEntries(
      Object.entries(fieldErrors).map(([key, val]) => [key, (val as any)?.[0] || ""])
    );
    return { success: false as const, errors };
  }
  return { success: true as const, data: result.data };
};
