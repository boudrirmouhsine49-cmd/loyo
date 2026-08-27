import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  children: ReactNode;
};

export default function Button({ variant = "primary", children, className = "", ...rest }: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[10px] px-3.5 py-2 text-[13px] font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-btn text-btn-text hover:opacity-90"
      : "border border-line bg-transparent text-text-2 hover:bg-subtle";
  return (
    <button className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </button>
  );
}
