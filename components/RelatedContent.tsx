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
      <h3 className="text-2xl font-black mb-8 text-slate-900 dark:text-white flex items-center">
        <span className="w-2 h-8 bg-blue-600 rounded-r-md mr-3 inline-block animate-pulse"></span>
        {title}
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <Link href={item.url} key={idx} className="group block bg-white dark:bg-slate-900/50 p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150" />
            <h4 className="font-bold text-lg mb-3 text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 relative z-10">
              {item.title}
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-6 relative z-10">
              {item.excerpt}
            </p>
            <div className="flex items-center text-sm font-bold text-blue-600 dark:text-blue-400 mt-auto relative z-10">
              Keep Reading 
              <span className="flex items-center justify-center w-6 h-6 ml-2 rounded-full bg-blue-50 dark:bg-blue-900/30 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
