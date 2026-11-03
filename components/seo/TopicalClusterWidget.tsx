import Link from 'next/link';
import { ArrowRight, Layers } from 'lucide-react';

export interface ClusterLink {
  title: string;
  href: string;
  description: string;
  badge?: string;
}

export interface TopicalClusterWidgetProps {
  currentSiloTitle: string;
  pillarHref: string;
  pillarAnchor: string;
  relatedLinks: ClusterLink[];
}

export function TopicalClusterWidget({
  currentSiloTitle,
  pillarHref,
  pillarAnchor,
  relatedLinks
}: TopicalClusterWidgetProps) {
  if (!relatedLinks || relatedLinks.length === 0) return null;

  return (
    <section className="my-16 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-600/10 text-blue-600 dark:text-blue-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Topical Knowledge Hub
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {currentSiloTitle}
            </h3>
          </div>
        </div>
        <Link
          href={pillarHref}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          {pillarAnchor} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {relatedLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950 hover:border-blue-500/50 hover:shadow-md transition-all"
          >
            {link.badge && (
              <span className="inline-block text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                {link.badge}
              </span>
            )}
            <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 mb-1">
              {link.title}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
              {link.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

