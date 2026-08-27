import { NextResponse } from "next/server";
import { getDashboardData } from "@/model/dashboard";

// CONTROLLER — orchestration uniquement : appelle le Model, renvoie la
// réponse. Aucune règle métier ici (voir model/dashboard.ts).
//
// La page /dashboard (View) appelle le Model directement pour son rendu
// serveur — c'est le fonctionnement standard des Server Components
// Next.js et ça évite un aller-retour HTTP inutile vers soi-même. Cette
// route sert les futurs appels côté client (widget qui se rafraîchit,
// export, etc.) : GET /api/dashboard renvoie exactement les mêmes données.
export async function GET() {
  const data = getDashboardData();
  return NextResponse.json(data);
}
