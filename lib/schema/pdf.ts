import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { users } from './user';

export const pdfStatusEnum = pgEnum('pdf_status', ['completed', 'failed', 'pending']);
export const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB in bytes

export const pdfSummaries = pgTable('pdf_summaries', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id),
    originalFileUrl: text('original_file_url').notNull(),
    summaryText: text('summary_text'),
    status: pdfStatusEnum('status').notNull().default('pending'),
    title: text('title').notNull(),
    fileName: text('file_name').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});


export const FileSchema = z.object({
    file: z
        .any()
        .refine((file) => file.size <= MAX_FILE_SIZE, "File size must be less than 25MB")
        .refine(
            (file) => file.type.startsWith("application/pdf"), "Only PDF files are allowed"),
});