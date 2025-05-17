import type { Config } from 'drizzle-kit';

export default {
    schema: './drizzle/schema.ts',
    out: './drizzle/migrations',
    driver: 'pg',
    dbCredentials: {
        connectionString: 'postgresql://neondb_owner:npg_5SulJPRDWL9g@ep-lingering-wave-a46ymoo4-pooler.us-east-1.aws.neon.tech/Next.js?sslmode=require',
    },
} satisfies Config; 