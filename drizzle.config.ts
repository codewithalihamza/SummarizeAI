import { config } from "dotenv";
import type { Config } from 'drizzle-kit';
config({ path: ".env.local" }); // or .env
export default {
    schema: './drizzle/schema.ts',
    out: './drizzle/migrations',
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.NEXT_PUBLIC_DATABASE_URL!,
    },
} satisfies Config; 