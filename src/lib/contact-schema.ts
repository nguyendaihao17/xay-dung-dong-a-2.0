import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().min(2, "Vui lòng nhập họ tên"),
  phone: z.string().min(9, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  company: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Vui lòng nhập nội dung ít nhất 10 ký tự"),
  honeypot: z.string().max(0, "Spam detected").optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;