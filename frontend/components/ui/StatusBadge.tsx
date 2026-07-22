type StatusBadgeProps = {
  label: string;
};

export function StatusBadge({ label }: StatusBadgeProps) {
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-[#1A2A22] px-2.5 py-1 text-xs font-medium text-[#3DBD7A]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#3DBD7A]" />
      {label}
    </span>
  );
}
