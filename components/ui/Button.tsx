import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
};

// Bouton réutilisable. "primary" = fond plein (--btn), "secondary" = contour.
export function Button({ variant = "primary", size = "md", className, ...props }: Props) {
  const variantStyles =
    variant === "primary"
      ? "bg-btn text-btn-text hover:bg-btn-hover"
      : "border border-border bg-card text-text hover:bg-hover";

  return (
    <button
      className={`rounded-btn font-medium transition-colors ${sizeStyles[size]} ${variantStyles} ${className ?? ""}`}
      {...props}
    />
  );
}
