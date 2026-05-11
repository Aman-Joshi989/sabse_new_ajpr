import { Info } from 'lucide-react';

export const AffiliateDisclosure = () => {
  return (
    <div className="bg-slate-100 dark:bg-slate-800/50 rounded-xl p-4 flex items-start gap-3 my-8 border border-slate-200 dark:border-slate-700">
      <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        <strong>Transparency Disclosure:</strong> This article contains affiliate links. If you purchase through these links, we may earn a commission at no additional cost to you. We only recommend products we rigorously test and trust.
      </p>
    </div>
  );
};
