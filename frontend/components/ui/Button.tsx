import Link from "next/link";

type ButtonVariant = "primary" | "outline";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

const BASE_CLASSES = "rounded-lg text-sm font-medium transition-colors";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-[#4A7BFF] text-white hover:bg-[#5A8BFF]",
  outline:
    "border border-[#38384A] bg-transparent text-white hover:bg-[#1C1C26]",
};

/**
 * Shared CTA button. Base classes hold color/typography/transition;
 * pass padding, alignment, width, and focus-ring utilities via
 * `className` per usage so each instance stays pixel-identical to
 * its original markup.
 */
export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`.trim()}
    >
      {children}
    </Link>
  );
}
