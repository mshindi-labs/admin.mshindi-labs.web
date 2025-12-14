import { z } from "zod";

// Login form schema
export const loginSchema = z.object({
	email: z.string().min(1, "Email or username is required").trim(),
	password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
