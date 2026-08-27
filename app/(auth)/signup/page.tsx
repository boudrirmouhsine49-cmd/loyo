import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function Page() {
  return (
    <Card>
      <div className="mb-5 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-btn text-btn-text text-[15px] font-bold">L</div>
        <span className="text-[15px] font-semibold">Loyo</span>
      </div>
      <h1 className="text-[18px] font-semibold">Créer un compte</h1>
      <div className="mt-4 space-y-3">
        <input placeholder="Adresse e-mail" className="w-full rounded-[10px] border border-line bg-faint px-3 py-2 text-[13.5px] outline-none" />
        <input type="password" placeholder="Mot de passe" className="w-full rounded-[10px] border border-line bg-faint px-3 py-2 text-[13.5px] outline-none" />
        <Button className="w-full">Créer mon compte</Button>
      </div>
      <p className="mt-4 text-center text-[12.5px] text-text-3">
        <Link href="/login" className="underline">J&apos;ai déjà un compte</Link>
      </p>
    </Card>
  );
}
