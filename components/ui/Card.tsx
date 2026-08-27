import { ReactNode } from "react";

type Props = { children: ReactNode; className?: string };

export default function Card({ children, className = "" }: Props) {
  return (
    <div
      className={`rounded-[15px] border border-line bg-card p-5 ${className}`}
    >
      {children}
    </div>
  );
}
