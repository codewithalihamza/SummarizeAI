import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

// Initialize pool
const pool = new Pool({
    connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
    ssl: true,
});

// Initialize drizzle
export const db = drizzle(pool);

// Export pool for use in other files
export { pool };
