import Link from 'next/link';
import { Check, Star, ArrowRight, Layers } from 'lucide-react';

interface AffiliateProductCardProps {
  productName: string;
  image?: string;
  rating: number; // e.g., 4.5
  pros: string[];
  cons?: string[];
  affiliateSlug?: string; // The slug for /go/[slug]
  ctaUrl?: string; // Direct URL to override affiliateSlug
  buttonText?: string;
  badgeText?: string;
}

export const AffiliateProductCard = ({
  productName,
  image,
  rating,
  pros,
  cons,
  affiliateSlug,
  ctaUrl,
  buttonText = 'Check Price on Amazon',
  badgeText = 'Top Pick'
}: AffiliateProductCardProps) => {
  
  // Render stars
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />);
    } else {
      stars.push(<Star key={i} className="w-5 h-5 text-slate-300 dark:text-slate-600" />);
    }
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border-2 border-blue-500/20 hover:border-blue-500 transition-colors shadow-lg relative my-12">
      {badgeText && (
        <div className="absolute -top-4 left-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
          {badgeText}
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mt-4">
        {/* Product Image placeholder */}
        <div className="w-48 h-48 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700 p-4">
          {image ? (
            <img src={image} alt={productName} className="max-w-full max-h-full object-contain" />
          ) : (
            <div className="text-center p-2">
              <Layers className="w-10 h-10 text-slate-400 dark:text-slate-500 mx-auto mb-1" />
              <span className="text-slate-400 dark:text-slate-500 text-[11px] font-semibold uppercase tracking-wider block">{productName}</span>
            </div>
          )}
        </div>

        <div className="flex-1 w-full">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{productName}</h3>
          
          <div className="flex items-center gap-2 mb-6">
            <div className="flex">{stars}</div>
            <span className="font-bold text-slate-700 dark:text-slate-300 ml-2">{rating}/5</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="font-bold text-emerald-600 dark:text-emerald-400 mb-3 text-sm uppercase tracking-wider">What We Love</h4>
              <ul className="space-y-2">
                {pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {cons && cons.length > 0 && (
              <div>
                <h4 className="font-bold text-rose-500 dark:text-rose-400 mb-3 text-sm uppercase tracking-wider">Drawbacks</h4>
                <ul className="space-y-2">
                  {cons.map((con, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <span className="w-4 h-4 flex items-center justify-center text-rose-500 font-bold mt-0.5 shrink-0">-</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Link 
            href={ctaUrl || `/go/${affiliateSlug}`} 
            target="_blank" 
            rel="sponsored"
            className="w-full md:w-auto inline-flex items-center justify-center bg-amber-400 hover:bg-amber-500 text-slate-900 font-black px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 text-lg"
          >
            {buttonText} <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
