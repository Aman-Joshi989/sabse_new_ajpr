"use client";

import { useEffect, useState } from "react";
import { getSiteSettingsAction } from "@/app/actions";

interface EmailLinkProps {
  className?: string;
  email?: string;
  emailPrefix?: string;
  emailDomain?: string;
}

export default function EmailLink({
  className = "text-blue-600 hover:underline",
  email: emailProp,
  emailPrefix = "sales",
  emailDomain = "ajprworld.com"
}: EmailLinkProps) {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function loadEmail() {
      if (emailProp) {
        setEmail(emailProp);
      } else {
        try {
          const res = await getSiteSettingsAction();
          if (res.success && res.settings?.contact_email) {
            setEmail(res.settings.contact_email);
          } else {
            setEmail(`${emailPrefix}@${emailDomain}`);
          }
        } catch (e) {
          setEmail(`${emailPrefix}@${emailDomain}`);
        }
      }
      setMounted(true);
    }
    loadEmail();
  }, [emailProp, emailPrefix, emailDomain]);

  // Before mount, render a safe layout placeholder so there is no layout shift (CLS)
  if (!mounted) {
    return <span className="inline-block min-w-[120px] h-4 bg-slate-200/50 dark:bg-slate-800/50 animate-pulse rounded" />;
  }

  return (
    <a href={`mailto:${email}`} className={className}>
      {email}
    </a>
  );
}
