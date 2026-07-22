type SectionHeadingProps = {
  title: string;
  description: string;
};

/**
 * Repeats identically across Features, How it works, and Trust
 * sections in the original markup — extracted so the three
 * sections don't hand-duplicate the same heading structure.
 */
export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-lg leading-relaxed text-[#A0A0B8]">
        {description}
      </p>
    </div>
  );
}
