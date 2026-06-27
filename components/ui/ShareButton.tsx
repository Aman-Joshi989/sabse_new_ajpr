'use client';

import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { toast } from 'sonner';

interface ShareButtonProps {
  title: string;
}

export default function ShareButton({ title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Read this article on AJPR: ${title}`,
          url: shareUrl,
        });
        toast.success('Article shared successfully!');
      } catch (err: any) {
        // Only log if it's not a user abort
        if (err.name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        toast.success('Link copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy link:', err);
        toast.error('Could not copy link. Please copy it from the address bar.');
      }
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="text-sm font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 px-6 py-2 rounded-full transition-all text-slate-900 dark:text-slate-50 flex items-center gap-2 active:scale-95"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-emerald-500" />
          Link Copied
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          Share Article
        </>
      )}
    </button>
  );
}
