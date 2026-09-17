"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/components/providers/CartProvider';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  features: any;
}

export default function PricingClient({ products }: { products: Product[] }) {
  const { addToCart, setIsCartOpen } = useCart();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleAddToCart = (product: Product) => {
    addToCart({
      type: 'package',
      name: product.name,
      price: Number(product.price),
      details: product.description,
      quantity: 1
    });
    setIsCartOpen(true);
  };

  const getFeatures = (featuresJson: any) => {
    if (!featuresJson) return [];
    try {
      return typeof featuresJson === 'string' ? JSON.parse(featuresJson) : featuresJson;
    } catch (e) {
      return [];
    }
  };

  return (
    <div className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight"
          >
            Premium Solutions, <span className="text-blue-500">Fixed Prices.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400"
          >
            Stop guessing your budget. Select a productized service below and we'll start executing immediately.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product, index) => {
            const features = getFeatures(product.features);
            const isPopular = index === 1; // Highlight the middle one

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative rounded-3xl p-8 backdrop-blur-sm border transition-all duration-300 ${
                  isPopular || hoveredId === product.id 
                    ? 'bg-slate-800/80 border-blue-500 shadow-2xl shadow-blue-500/20 scale-[1.02]' 
                    : 'bg-slate-900/50 border-slate-800'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                
                <h3 className="text-2xl font-semibold text-white mb-2">{product.name}</h3>
                <p className="text-slate-400 text-sm mb-6 h-16">{product.description}</p>
                
                <div className="mb-8">
                  <span className="text-5xl font-bold text-white">${Number(product.price).toLocaleString()}</span>
                  <span className="text-slate-500 ml-2 uppercase">{product.currency || 'USD'}</span>
                </div>

                <Button 
                  onClick={() => handleAddToCart(product)}
                  className={`w-full py-6 rounded-xl text-lg font-semibold transition-all duration-300 ${
                    isPopular || hoveredId === product.id
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>

                <div className="mt-8 space-y-4">
                  {features.map((feature: string, i: number) => (
                    <div key={i} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 2026 Transparent Cost & Retainer Guides */}
        <div className="max-w-7xl mx-auto mt-24 pt-16 border-t border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Explore Dedicated 2026 Cost & Retainer Guides
            </h2>
            <p className="text-slate-400 text-sm">
              We believe in radical pricing transparency. Check real retainer breakdowns, hourly rates, and ROI expectations for every marketing channel.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="/pricing/seo-cost"
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 transition-all group block"
            >
              <div className="text-xs uppercase font-bold text-blue-400 tracking-wider mb-2">SEO Retainers</div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                How Much Does SEO Cost? (2026 Guide) →
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Realistic retainers range from $1,500 to $10,000/mo. Compare hourly vs project vs ongoing performance tiers.
              </p>
            </a>

            <a
              href="/pricing/ppc-cost"
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition-all group block"
            >
              <div className="text-xs uppercase font-bold text-emerald-400 tracking-wider mb-2">Google & Meta Ads</div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-2">
                PPC Management Cost Breakdown →
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Discover standard flat fees ($1,500–$5,000/mo) vs % of ad spend (10-20%) with zero media markups.
              </p>
            </a>

            <a
              href="/pricing/website-cost"
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition-all group block"
            >
              <div className="text-xs uppercase font-bold text-indigo-400 tracking-wider mb-2">Web Design Scope</div>
              <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors mb-2">
                Custom Website Cost Guide (2026) →
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                From $3,500 startup sites to $25,000+ custom Next.js platforms. See exact scope and timeline deliverables.
              </p>
            </a>
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-900/40 to-indigo-950/50 border border-blue-800/40 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <div className="text-sm font-bold text-white">Need a customized agency budget projection?</div>
              <div className="text-xs text-slate-400">Calculate recommended monthly retainers and projected 12-month revenue with our free calculator.</div>
            </div>
            <a
              href="/tools/agency-pricing-calculator"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold whitespace-nowrap transition-colors"
            >
              Open Agency ROI Calculator →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
