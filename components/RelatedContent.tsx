import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface RelatedItem {
  title: string;
  url: string;
  excerpt: string;
}

interface RelatedContentProps {
  title: string;
  items: RelatedItem[];
}

export const RelatedContent = ({ title, items }: RelatedContentProps) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
      <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">{title}</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <Link href={item.url} key={idx} className="group block bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-blue-500/50 hover:shadow-md transition-all">
            <h4 className="font-bold text-lg mb-2 text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              {item.title}
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
              {item.excerpt}
            </p>
            <div className="flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400">
              Read More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
