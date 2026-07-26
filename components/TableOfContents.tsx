"use client";

import React, { useEffect, useState } from 'react';

interface ToCItem {
  id: string;
  text: string;
  level: number;
}

export const TableOfContents = ({ content }: { content: string }) => {
  const [headings, setHeadings] = useState<ToCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from markdown content
    const extractedHeadings: ToCItem[] = [];
    const lines = content.split('\n');
    
    lines.forEach((line) => {
      const match = line.match(/^(#{2,3})\s+(.*)/);
      if (match) {
        const level = match[1].length;
        const text = match[2];
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        extractedHeadings.push({ id, text, level });
      }
    });
    
    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    // Add IDs to the actual DOM elements rendered by markdown
    // The markdown parser (parseMarkdownToHtml) needs to output IDs for this to work perfectly,
    // but since we are modifying the DOM after render here, we can attach them.
    const addIdsToHeadings = () => {
      const article = document.querySelector('article .prose');
      if (!article) return;
      
      const domHeadings = article.querySelectorAll('h2, h3');
      domHeadings.forEach((h) => {
        if (!h.id) {
          const text = h.textContent || '';
          h.id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        }
      });
    };
    
    // Small timeout to ensure DOM is ready
    setTimeout(addIdsToHeadings, 100);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    setTimeout(() => {
      document.querySelectorAll('article .prose h2, article .prose h3').forEach((h) => {
        observer.observe(h);
      });
    }, 200);

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-4">
        Table of Contents
      </h3>
      <nav className="flex flex-col gap-2 border-l-2 border-slate-200 dark:border-slate-800">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
              setActiveId(heading.id);
            }}
            className={`block py-1 pr-4 transition-all hover:text-blue-600 dark:hover:text-blue-400 ${
              heading.level === 3 ? 'pl-8 text-sm' : 'pl-4 text-sm font-medium'
            } ${
              activeId === heading.id 
                ? 'text-blue-600 dark:text-blue-400 border-l-2 -ml-[2px] border-blue-600 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-900/20' 
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
};
