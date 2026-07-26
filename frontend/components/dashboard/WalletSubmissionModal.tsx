// components/dashboard/WalletSubmissionModal.tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { X, Wallet, Loader2 } from "lucide-react";

type WalletSubmissionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (walletAddress: string) => void;
};

export function WalletSubmissionModal({
  isOpen,
  onClose,
  onSubmit,
}: WalletSubmissionModalProps) {
  const [walletAddress, setWalletAddress] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const isEmpty = walletAddress.trim().length === 0;

  // Handle open/close animations
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Small delay to allow DOM to mount before triggering animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
      // Focus input after animation starts
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setWalletAddress("");
        setIsSubmitting(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (isEmpty || isSubmitting) return;

      setIsSubmitting(true);
      // Small artificial delay for UX feedback
      await new Promise((resolve) => setTimeout(resolve, 400));
      onSubmit(walletAddress.trim());
      setIsSubmitting(false);
    },
    [walletAddress, isEmpty, isSubmitting, onSubmit]
  );

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) {
        onClose();
      }
    },
    [onClose]
  );

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="wallet-modal-title"
      aria-describedby="wallet-modal-description"
      className={[
        "fixed inset-0 z-[100] flex items-center justify-center p-4",
        "transition-all duration-300 ease-out",
        isAnimating ? "bg-black/60 backdrop-blur-sm" : "bg-black/0 backdrop-blur-none",
      ].join(" ")}
    >
      {/* Modal Card */}
      <div
        className={[
          "relative w-full max-w-md overflow-hidden rounded-2xl",
          "border border-[#2A2A3A]/80",
          "bg-[#0F0F16]/90 backdrop-blur-xl",
          "shadow-2xl shadow-black/40",
          "transition-all duration-300 ease-out",
          isAnimating
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-4 scale-95 opacity-0",
        ].join(" ")}
      >
        {/* Top accent line */}
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4A7BFF]/40 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2A2A3A]/60 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4A7BFF]/10">
              <Wallet size={18} className="text-[#4A7BFF]" strokeWidth={1.8} />
            </div>
            <div>
              <h2
                id="wallet-modal-title"
                className="text-base font-semibold tracking-tight text-white"
              >
                Submit Wallet
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-1.5 text-[#6B6B80] transition-colors hover:bg-[#1C1C26] hover:text-white"
          >
            <X size={18} strokeWidth={1.8} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-6">
          <p
            id="wallet-modal-description"
            className="mb-6 text-sm leading-relaxed text-[#A0A0B8]"
          >
            Submit a public wallet address to analyze on-chain portfolio,
            transactions, assets and trading activity.
          </p>

          {/* Input Group */}
          <div className="mb-6">
            <label
              htmlFor="wallet-address"
              className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#6B6B80]"
            >
              Wallet Address
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                id="wallet-address"
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="Enter wallet address..."
                autoComplete="off"
                spellCheck={false}
                disabled={isSubmitting}
                className={[
                  "w-full rounded-xl border bg-[#13131A] px-4 py-3 pr-10",
                  "text-sm font-medium text-white placeholder:text-[#4A4A5A]",
                  "transition-all duration-200",
                  "focus:border-[#4A7BFF]/50 focus:outline-none focus:ring-2 focus:ring-[#4A7BFF]/10",
                  walletAddress.trim().length > 0
                    ? "border-[#4A7BFF]/30"
                    : "border-[#2A2A3A]",
                  isSubmitting && "cursor-not-allowed opacity-60",
                ].join(" ")}
              />
              {/* Input status indicator */}
              {walletAddress.trim().length > 0 && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="h-2 w-2 rounded-full bg-[#3DBD7A]" />
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className={[
                "inline-flex items-center justify-center rounded-xl",
                "border border-[#2A2A3A] bg-transparent px-5 py-2.5",
                "text-sm font-medium text-[#A0A0B8]",
                "transition-all duration-200",
                "hover:border-[#4A7BFF]/30 hover:bg-[#13131A] hover:text-white",
                "disabled:cursor-not-allowed disabled:opacity-50",
              ].join(" ")}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isEmpty || isSubmitting}
              className={[
                "inline-flex items-center justify-center gap-2 rounded-xl",
                "bg-[#4A7BFF] px-5 py-2.5",
                "text-sm font-semibold text-white",
                "shadow-lg shadow-[#4A7BFF]/20",
                "transition-all duration-200",
                "hover:bg-[#3A6AEF] hover:shadow-[#4A7BFF]/30",
                "active:scale-[0.98]",
                "disabled:cursor-not-allowed disabled:bg-[#4A7BFF]/30 disabled:shadow-none disabled:text-white/50",
              ].join(" ")}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" strokeWidth={2} />
                  <span>Analyzing...</span>
                </>
              ) : (
                "Analyze Wallet"
              )}
            </button>
          </div>
        </form>

        {/* Bottom subtle glow */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-24 w-3/4 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#4A7BFF]/5 blur-3xl" />
      </div>
    </div>
  );
}
