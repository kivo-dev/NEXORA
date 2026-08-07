import {
  PlusCircle,
  FileText,
  MessageCircleQuestion,
  BellPlus,
  type LucideIcon,
} from "lucide-react";

type QuickAction = {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

type QuickActionsProps = {
  actions?: QuickAction[];
};

const DEFAULT_ACTIONS: QuickAction[] = [
  {
    id: "connect-wallet",
    label: "login",
    description: "Track another address",
    icon: PlusCircle,
  },
  {
    id: "generate-report",
    label: "Generate report",
    description: "Export financial summary",
    icon: FileText,
  },
  {
    id: "ask-nexora",
    label: "Ask Nexora",
    description: "Query your portfolio in plain language",
    icon: MessageCircleQuestion,
  },
  {
    id: "set-alert",
    label: "Set alert",
    description: "Get notified on activity",
    icon: BellPlus,
  },
];

export function QuickActions({ actions = DEFAULT_ACTIONS }: QuickActionsProps) {
  return (
    <section className="rounded-2xl border border-[#2A2A3A] bg-[#13131A] p-5 sm:p-6">
      <h2 className="text-sm font-medium text-[#A0A0B8]">Quick actions</h2>

      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.id}
              type="button"
              className="group flex flex-col items-start gap-3 rounded-xl border border-[#2A2A3A] bg-[#0A0A0F] p-4 text-left transition-colors hover:border-[#4A7BFF]/40 hover:bg-[#0F0F16]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#4A7BFF]/10 text-[#4A7BFF] transition-colors group-hover:bg-[#4A7BFF] group-hover:text-white">
                <Icon size={16} />
              </div>
              <div>
                <div className="text-sm font-medium text-white">
                  {action.label}
                </div>
                <div className="mt-0.5 text-xs text-[#6B6B80]">
                  {action.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
