import { ENV } from "@/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./drizzle",
    schema: "./src/lib/db/schema/index.ts",
    dialect: "postgresql",
    dbCredentials: { url: ENV.DB.URL },
});
