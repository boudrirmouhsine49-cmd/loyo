import { redirect } from "next/navigation";

// La racine "/" n'est pas un écran en soi : on renvoie directement
// vers le tableau de bord.
export default function Home() {
  redirect("/dashboard");
}
