import { z } from "zod";

const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().min(1),
  AUTH_SECRET: z.string().min(32),
  AUTH_URL: z.string().url().optional().transform(v => v || undefined),
  AUTH_TRUST_HOST: z.coerce.boolean().default(true),
  MEDIA_STORAGE_DRIVER: z.enum(["local", "s3"]).default("local"),
  MEDIA_LOCAL_DIR: z.string().default("./public/uploads"),
  MEDIA_PUBLIC_BASE_URL: z.string().default("/uploads"),
  S3_ENDPOINT: z.string().optional().transform(v => v || undefined),
  S3_REGION: z.string().optional().transform(v => v || undefined),
  S3_BUCKET: z.string().optional().transform(v => v || undefined),
  S3_ACCESS_KEY_ID: z.string().optional().transform(v => v || undefined),
  S3_SECRET_ACCESS_KEY: z.string().optional().transform(v => v || undefined),
  S3_FORCE_PATH_STYLE: z.coerce.boolean().default(false),
  SMTP_HOST: z.string().optional().transform(v => v || undefined),
  SMTP_PORT: z.union([z.coerce.number(), z.literal("")]).optional().transform(v => v === "" ? undefined : v),
  SMTP_USER: z.string().optional().transform(v => v || undefined),
  SMTP_PASSWORD: z.string().optional().transform(v => v || undefined),
  SMTP_FROM: z.string().optional().transform(v => v || undefined),
  LEAD_NOTIFICATION_EMAIL: z.union([z.string().email(), z.literal("")]).optional().transform(v => v || undefined),
  TURNSTILE_SECRET_KEY: z.string().optional().transform(v => v || undefined),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000),
  RATE_LIMIT_MAX: z.coerce.number().default(5),
  REVALIDATE_SECRET: z.string().min(16),
  SEED_ADMIN_EMAIL: z.union([z.string().email(), z.literal("")]).optional().transform(v => v || undefined),
  SEED_ADMIN_PASSWORD: z.string().min(8).optional(),
  SEED_ADMIN_NAME: z.string().optional().transform(v => v || undefined),
});

export const serverConfig = serverSchema.parse(process.env);
export const isProduction = serverConfig.NODE_ENV === "production";