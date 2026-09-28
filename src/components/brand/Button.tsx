import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary:
    "lead-gradient text-white shadow-md hover:shadow-lg hover:brightness-110",
  secondary:
    "border border-navy bg-white text-navy shadow-sm hover:bg-gray-light",
};

/** Shared classes so links can look like buttons: <Link className={buttonClasses()} />. */
export function buttonClasses(
  variant: ButtonVariant = "primary",
  className = "",
) {
  return `${base} ${variants[variant]} ${className}`.trim();
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses(variant, className)}
      {...props}
    />
  );
}
