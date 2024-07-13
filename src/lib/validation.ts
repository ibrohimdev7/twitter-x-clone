import * as z from "zod";

export const registerStepOneSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
});

export const registerStepTwoSchema = z.object({
  password: z.string().min(6),
  username: z.string().min(3),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});