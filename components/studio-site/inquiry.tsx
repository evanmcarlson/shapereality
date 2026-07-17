"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

/**
 * The inquiry panel — the site's one conversion surface. Every "start a
 * project" CTA opens this slide-over instead of a bare mailto:. The brief
 * posts to /api/inquiry (Resend notification + optional DynamoDB copy);
 * until that's configured, the error state hands the visitor the direct
 * email address, so there's never a dead end.
 *
 * Voice: the heading asks the brand's question instead of saying "contact".
 * Inputs are the underline style (same family as the newsletter form).
 */

const EMAIL = "evan@shapereality.com";
const MAILTO = `mailto:${EMAIL}?subject=Project%20brief`;

const BUDGET_BANDS = [
  "Not sure yet",
  "Under $5k",
  "$5–15k",
  "$15–25k",
  "$25k+",
] as const;

const InquiryContext = createContext<{ open: (context?: string) => void }>({
  // graceful fallback if a trigger ever renders outside the provider
  open: () => {
    window.location.href = MAILTO;
  },
});

/** A CTA that opens the inquiry panel. Unstyled — pass the classes. */
export function InquiryButton({
  children,
  className,
  context,
}: {
  children: React.ReactNode;
  className?: string;
  /** Where the ask came from, e.g. "Try-on feasibility sprint". */
  context?: string;
}) {
  const { open } = useContext(InquiryContext);
  return (
    <button type="button" className={className} onClick={() => open(context)}>
      {children}
    </button>
  );
}

const inputCls =
  "w-full border-b border-[var(--hairline)] bg-transparent py-2 text-[14px] text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--muted)] placeholder:opacity-60 focus:border-[var(--ink)] disabled:opacity-40";
const labelCls =
  "bk font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]";

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [context, setContext] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLTextAreaElement>(null);
  const lastFocused = useRef<Element | null>(null);

  const open = useCallback((ctx?: string) => {
    lastFocused.current = document.activeElement;
    setContext(ctx);
    setStatus("idle");
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    const el = lastFocused.current;
    if (el instanceof HTMLElement) el.focus();
  }, []);

  // scroll lock + ESC while open; focus moves into the panel after the slide
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const focusTimer = setTimeout(() => firstFieldRef.current?.focus(), 300);
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      clearTimeout(focusTimer);
    };
  }, [isOpen, close]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, context: context ?? "" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <InquiryContext.Provider value={{ open }}>
      {children}

      <div
        aria-hidden={!isOpen}
        className="pointer-events-none fixed inset-0 z-[100]"
        style={{
          visibility: isOpen ? "visible" : "hidden",
          transitionProperty: "visibility",
          transitionDuration: "0s",
          transitionDelay: isOpen ? "0s" : "480ms",
        }}
      >
        {/* overlay */}
        <div
          onClick={close}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 motion-reduce:transition-none ${
            isOpen ? "pointer-events-auto opacity-100" : "opacity-0"
          }`}
        />

        {/* the panel — slides in from the right */}
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="inquiry-heading"
          className={`absolute right-0 top-0 flex h-full w-full flex-col overflow-y-auto border-l border-[var(--hairline)] bg-[var(--paper)] text-[var(--ink)] transition-transform duration-[480ms] ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none sm:max-w-[480px] ${
            isOpen ? "pointer-events-auto translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-baseline justify-between px-6 pb-4 pt-6">
            <span className={labelCls}>Start a project</span>
            <button
              type="button"
              onClick={close}
              className="bk font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
            >
              Close
            </button>
          </div>

          {status === "success" ? (
            <div className="flex flex-1 flex-col justify-center px-6 pb-10">
              <span className={labelCls}>Received</span>
              <p className="mt-4 max-w-[16ch] text-[clamp(28px,4vw,40px)] font-bold uppercase leading-[0.9] tracking-tight">
                The brief is in.
              </p>
              <p className="mt-5 max-w-[38ch] text-[14px] leading-relaxed text-[var(--muted)]">
                Evan reads every brief himself. You&apos;ll get an engineering
                read, not a sales call — usually within a day.
              </p>
              <button
                type="button"
                onClick={close}
                className="mt-8 w-fit rounded-full border border-[var(--hairline)] px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] transition-colors hover:border-[var(--ink)]"
              >
                Back to the site
              </button>
            </div>
          ) : (
            <div className="px-6 pb-10">
              <h2
                id="inquiry-heading"
                className="max-w-[13ch] text-[clamp(30px,4.6vw,46px)] font-bold uppercase leading-[0.88] tracking-tight"
              >
                How do you want to{" "}
                <span className="film-text">reshape reality</span>?
              </h2>
              <p className="mt-4 max-w-[40ch] text-[13.5px] leading-relaxed text-[var(--muted)]">
                Tell us what should exist. You&apos;ll get an engineering read,
                not a sales call.
              </p>
              {context ? (
                <p className="bk mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
                  Re: {context}
                </p>
              ) : null}

              <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
                {/* honeypot — humans never see it, bots fill it */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />

                <div>
                  <label htmlFor="inq-idea" className={labelCls}>
                    The idea
                  </label>
                  <textarea
                    id="inq-idea"
                    name="idea"
                    ref={firstFieldRef}
                    required
                    rows={4}
                    maxLength={5000}
                    disabled={status === "sending"}
                    placeholder="What should exist that doesn't yet?"
                    className={`${inputCls} resize-none leading-relaxed`}
                  />
                </div>

                <div>
                  <label htmlFor="inq-name" className={labelCls}>
                    Name
                  </label>
                  <input
                    id="inq-name"
                    name="name"
                    type="text"
                    required
                    maxLength={200}
                    autoComplete="name"
                    disabled={status === "sending"}
                    placeholder="Your name"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label htmlFor="inq-email" className={labelCls}>
                    Email
                  </label>
                  <input
                    id="inq-email"
                    name="email"
                    type="email"
                    required
                    maxLength={320}
                    autoComplete="email"
                    disabled={status === "sending"}
                    placeholder="you@company.com"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label htmlFor="inq-company" className={labelCls}>
                    Company / brand — optional
                  </label>
                  <input
                    id="inq-company"
                    name="company"
                    type="text"
                    maxLength={200}
                    autoComplete="organization"
                    disabled={status === "sending"}
                    placeholder="Who it's for"
                    className={inputCls}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="inq-budget" className={labelCls}>
                      Budget band
                    </label>
                    <select
                      id="inq-budget"
                      name="budget"
                      disabled={status === "sending"}
                      className={`${inputCls} appearance-none rounded-none`}
                    >
                      {BUDGET_BANDS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="inq-timeline" className={labelCls}>
                      Timeline — optional
                    </label>
                    <input
                      id="inq-timeline"
                      name="timeline"
                      type="text"
                      maxLength={200}
                      disabled={status === "sending"}
                      placeholder="e.g. live by October"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-5">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="rounded-full border border-[var(--ink)] px-7 py-3.5 font-mono text-[12px] font-bold uppercase tracking-[0.14em] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)] disabled:opacity-40"
                  >
                    {status === "sending" ? "Transmitting…" : "Send the brief"}
                  </button>
                  <a
                    href={MAILTO}
                    className="film-ul font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
                  >
                    Prefer email? {EMAIL}
                  </a>
                </div>

                {status === "error" ? (
                  <p
                    role="alert"
                    className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-[var(--muted)]"
                  >
                    [ Transmission failed ] — send it straight to{" "}
                    <a href={MAILTO} className="film-ul text-[var(--ink)]">
                      {EMAIL}
                    </a>
                  </p>
                ) : null}
              </form>
            </div>
          )}
        </div>
      </div>
    </InquiryContext.Provider>
  );
}
