import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg" | "xl";
  centered?: boolean;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ size = "md", centered = false, children, className, ...props }, ref) => {
    const sizeClasses = {
      sm: "py-8 sm:py-12",
      md: "py-12 sm:py-16 lg:py-20",
      lg: "py-16 sm:py-20 lg:py-28",
      xl: "py-20 sm:py-28 lg:py-36",
    };

    return (
      <section
        ref={ref}
        className={cn(
          "relative w-full",
          sizeClasses[size],
          centered && "flex flex-col items-center text-center",
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";

export default Section;
