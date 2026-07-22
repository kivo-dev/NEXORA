import { FeatureIcon } from "@/components/ui/FeatureIcon";

export type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

type FeatureCardProps = {
  feature: Feature;
};

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <div className="rounded-xl border border-[#2A2A3A] bg-[#13131A] p-6 transition-colors hover:border-[#38384A] hover:bg-[#1C1C26]">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1A2B4A]">
        <FeatureIcon>{feature.icon}</FeatureIcon>
      </div>
      <h3 className="mt-4 text-base font-semibold text-white">
        {feature.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[#A0A0B8]">
        {feature.description}
      </p>
    </div>
  );
}
