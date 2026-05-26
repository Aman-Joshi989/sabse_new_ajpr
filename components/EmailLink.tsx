"use client";

import { useEffect, useState } from "react";

interface EmailLinkProps {
  className?: string;
  emailPrefix?: string;
  emailDomain?: string;
}

export default function EmailLink({
  className = "text-blue-600 hover:underline",
  emailPrefix = "sales",
  emailDomain = "ajprworld.com"
}: EmailLinkProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Before mount, render a safe layout placeholder so there is no layout shift (CLS)
  if (!mounted) {
    return <span className="inline-block min-w-[120px] h-4 bg-slate-200/50 dark:bg-slate-800/50 animate-pulse rounded" />;
  }

  const email = `${emailPrefix}@${emailDomain}`;

  return (
    <a href={`mailto:${email}`} className={className}>
      {email}
    </a>
  );
}
