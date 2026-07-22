import { Sparkles, FileText, PieChart, Activity } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Feature = {
  label: string;
  icon: LucideIcon;
};

const FEATURES: Feature[] = [
  { label: "AI Portfolio Analysis", icon: Sparkles },
  { label: "Smart Reports", icon: FileText },
  { label: "Asset Allocation", icon: PieChart },
  { label: "Transaction Intelligence", icon: Activity },
];

export function FeatureList() {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-2">
      {FEATURES.map((feature) => {
        const Icon = feature.icon;
        return (
          <li
            key={feature.label}
            className="flex items-center gap-2.5 text-sm text-[#A0A0B8]"
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#1C1C26]">
              <Icon size={12} className="text-[#4A7BFF]" strokeWidth={2} />
            </span>
            <span className="font-medium">{feature.label}</span>
          </li>
        );
      })}
    </ul>
  );
}
