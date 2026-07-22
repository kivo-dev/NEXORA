import { Button } from "@/components/ui/Button";

export function CtaSection() {
  return (
    <section className="border-t border-[#2A2A3A] py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Know how you&apos;re actually doing
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-[#A0A0B8]">
          Connect your Stellar wallet and get your first insight in under a
          minute. Read-only. Nothing to sign. Disconnect anytime.
        </p>
        <div className="mt-8">
          <Button
            href="/connect"
            className="inline-block px-8 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A7BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0F]"
          >
            Connect your wallet
          </Button>
        </div>
      </div>
    </section>
  );
}
