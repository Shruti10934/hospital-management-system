import { pool } from "@/config/db";
import * as schema from "@/db/schema";
import { drizzle } from "drizzle-orm/node-postgres";

// Create Drizzle instance
export const db = drizzle(pool, { schema });
