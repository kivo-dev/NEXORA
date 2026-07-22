import Link from "next/link";

export default function Logo() {
  return (
    <Link 
      href="/"
      className="flex items-center gap-2 font-bold text-xl"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white">
        N
      </div>

      <span>
        NEXORA
      </span>
    </Link>
  );
}
