"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EnglishRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-alabaster font-mono text-xs text-slate-500">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-teal-600 animate-ping" />
        <span>Redirecting to unified global portal...</span>
      </div>
    </div>
  );
}
