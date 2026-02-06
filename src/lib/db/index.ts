import { pool } from "@/config/db";
import { drizzle } from "drizzle-orm/node-postgres";

// Create Drizzle instance
// export const db = drizzle(pool, { schema });

// Check database connection
export async function checkDatabaseConnection(): Promise<boolean> {
    try {
        const client = await pool.connect();
        await client.query("SELECT NOW()");
        client.release();
        return true;
    } catch (error) {
        console.error("Database connection failed:", error);
        return false;
    }
}
