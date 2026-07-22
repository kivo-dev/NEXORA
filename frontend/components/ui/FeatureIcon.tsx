export function FeatureIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#4A7BFF"
      strokeWidth={1.6}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}
