import { Pool } from "pg";
import { ENV } from "./env";

// Create a connection pool
export const pool = new Pool({
    connectionString: ENV.DB.URL,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
