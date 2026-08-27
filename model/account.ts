import { currentUser } from "./mock-source";
import type { CurrentUser } from "./types";

// MODEL — données de compte (utilisateur connecté). En Phase 3, remplacé
// par la session Supabase Auth.
export function getCurrentUser(): CurrentUser {
  return currentUser;
}
