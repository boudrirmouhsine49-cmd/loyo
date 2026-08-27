import { config } from "dotenv";

// Les tests parlent à un vrai projet Supabase (voir CLAUDE.md) : les
// identifiants viennent de .env.local, non versionné.
config({ path: ".env.local" });
