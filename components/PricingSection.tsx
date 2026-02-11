import { useState } from 'react'
import Script from 'next/script'
import Link from 'next/link'
import { CheckCircle, XCircle, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { useAuth } from '@/components/providers/AuthProvider'
import { useCart } from '@/components/providers/CartProvider'
import { addonsList } from '@/lib/constants'

interface PricingTier {
  name: string
  price: number
  description: string
  features: string[]
  timeline: string
  isPopular?: boolean
  notIncluded?: string[]
}

const pricingTiers: PricingTier[] = [
  {
    name: 'BASIC PACKAGE',
    price: 11000,
    description: 'Static / Frontend Website',
    features: [
      '4-page Static Website',
      'Modern Frontend Design',
      'Mobile-responsive layout',
      'WhatsApp button integration',
      'Standard Contact form',
      'Basic SEO setup',
      '1 free correction'
    ],
    timeline: '12-15 working days'
  },
  {
    name: 'STANDARD PACKAGE',
    price: 15000,
    description: 'Full Stack (No Admin)',
    isPopular: true,
    features: [
      'Dynamic Website Solution',
      'Database Integration',
      'API Development',
      'Faster delivery',
      'Priority support',
      '3 free corrections'
    ],
    notIncluded: ['No Admin Panel included'],
    timeline: '12-15 working days'
  },
  {
    name: 'PREMIUM PACKAGE',
    price: 25000,
    description: 'Full Stack + Admin Panel',
    features: [
      'Complete Full Stack Solution',
      'Custom Admin Dashboard',
      'Content Management System (CMS)',
      'Advanced Database Management',
      'User Authentication (if needed)',
      'Monthly maintenance (1 month)',
      'Priority WhatsApp support'
    ],
    timeline: '12-15 working days'
  }
]

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PricingSection() {
  const { user } = useAuth()
  const { addToCart } = useCart()
  
  const [isAddonsOpen, setIsAddonsOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null)
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])

  const handleSelectPlan = (tier: PricingTier) => {
    setSelectedTier(tier)
    setSelectedAddons([])
    setIsAddonsOpen(true)
  }

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    )
  }

  const handleAddToCart = () => {
    if (!selectedTier) return

    // Add Main Plan
    addToCart({
      type: 'package',
      name: selectedTier.name,
      price: selectedTier.price,
      details: selectedTier.description,
      quantity: 1
    })

    // Add Selected Addons
    selectedAddons.forEach(addonId => {
      const addon = addonsList.find(a => a.id === addonId)
      if (addon) {
        addToCart({
          type: 'addon',
          name: `${addon.name} (Add-on)`,
          price: addon.price,
          details: addon.description,
          quantity: 1
        })
      }
    })

    setIsAddonsOpen(false)
    setSelectedTier(null)
    setSelectedAddons([])
  }

  const calculateTotal = () => {
    if (!selectedTier) return 0
    const addonsTotal = selectedAddons.reduce((sum, id) => {
      const addon = addonsList.find(a => a.id === id)
      return sum + (addon ? addon.price : 0)
    }, 0)
    return selectedTier.price + addonsTotal
  }

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300" id="pricing">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Transparent Pricing</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Choose the perfect package for your business needs. No hidden costs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {pricingTiers.map((tier) => (
            <Card 
              key={tier.name} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 
                ${tier.isPopular ? 'border-primary shadow-lg scale-105 z-10' : 'border-slate-200 dark:border-slate-800'}`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}
              
              <CardHeader>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wider">{tier.name}</h3>
                <div className="flex items-baseline mt-2">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">₹{tier.price.toLocaleString()}</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{tier.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {tier.notIncluded?.map((feature, i) => (
                    <div key={i} className="flex items-start text-sm text-slate-400 dark:text-slate-500 line-through">
                        <XCircle className="w-4 h-4 text-red-400 mr-2 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Timeline:</p>
                    <p className="text-sm text-slate-700 dark:text-slate-300">{tier.timeline}</p>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className={`w-full ${tier.isPopular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  onClick={() => handleSelectPlan(tier)}
                >
                  Select Plan
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Addons Dialog */}
        <Dialog open={isAddonsOpen} onOpenChange={setIsAddonsOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Customize Your Package</DialogTitle>
              <DialogDescription>
                Add extra services to your {selectedTier?.name} to get the best results.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border">
                <h4 className="font-bold text-sm mb-1">{selectedTier?.name}</h4>
                <p className="text-2xl font-bold text-blue-600">₹{selectedTier?.price.toLocaleString()}</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Recommended Add-ons</h4>
                {addonsList.map((addon) => (
                  <div key={addon.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                    <Checkbox 
                      id={addon.id} 
                      checked={selectedAddons.includes(addon.id)}
                      onCheckedChange={() => toggleAddon(addon.id)}
                    />
                    <div className="grid gap-1.5 leading-none flex-1">
                      <label 
                        htmlFor={addon.id} 
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {addon.name}
                      </label>
                      <p className="text-xs text-muted-foreground">
                        {addon.description}
                      </p>
                    </div>
                    <div className="font-semibold text-sm">
                      +₹{addon.price.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <span className="font-semibold">Total Amount:</span>
                <span className="text-2xl font-bold text-blue-600">₹{calculateTotal().toLocaleString()}</span>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddonsOpen(false)}>Cancel</Button>
              <Button onClick={handleAddToCart} className="gap-2">
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
