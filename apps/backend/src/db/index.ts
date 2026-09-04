import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres(process.env.DATABASE_URL!, {
  idle_timeout: 30,
  connect_timeout: 10,
  max: 20,
});

export const db = drizzle({ client: queryClient });
