"use client";

import { useState } from "react";

export function NewsletterForm({
  tone = "auto",
}: {
  tone?: "auto" | "inverse";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  // 'auto' adapts to the page theme; 'inverse' is fixed white-on-color for
  // the cobalt closer slab, which stays cobalt in both themes.
  const text = tone === "inverse" ? "text-white" : "text-black dark:text-white";
  const border =
    tone === "inverse" ? "border-white" : "border-black dark:border-white";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setStatus(res.ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <p
        className={`font-mono text-xs uppercase tracking-widest ${text} opacity-60`}
      >
        you&apos;re in.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full items-center border-b ${border}`}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        disabled={status === "loading"}
        className={`flex-1 bg-transparent py-1 font-mono text-xs uppercase tracking-widest ${text} placeholder:opacity-30 outline-none disabled:opacity-40`}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        aria-label="Subscribe"
        className={`pl-3 py-1 ${text} opacity-60 hover:opacity-100 transition-opacity disabled:opacity-20`}
      >
        →
      </button>
      {status === "error" && (
        <span className="sr-only">Something went wrong. Please try again.</span>
      )}
    </form>
  );
}
