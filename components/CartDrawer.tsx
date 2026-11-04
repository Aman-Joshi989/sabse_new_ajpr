import { useAuth } from '@/components/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import { useCart, CartCurrency } from '@/components/providers/CartProvider'
import { useState } from 'react'
import { ShoppingCart, Trash2, ShoppingBag, Plus, Minus, Globe, CreditCard, ExternalLink, ShieldCheck, CheckCircle2, Landmark, Copy, Check, FileText, Smartphone, Send, Clock, HelpCircle } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { addonsList, getAddonPrice } from '@/lib/constants'
import { submitOrderRequest } from '@/app/actions'
import Image from 'next/image'

export default function CartDrawer() {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    cartTotal, 
    packageTotal,
    addonTotal,
    payableTotal,
    isCartOpen, 
    setIsCartOpen, 
    clearCart,
    addToCart,
    paymentType,
    setPaymentType,
    currency,
    setCurrency,
    currencySymbol,
    formatPrice,
    getItemPrice
  } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // Order Details Modal State
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [orderDetails, setOrderDetails] = useState({
      name: '',
      email: '',
      phone: '',
      company: '',
      notes: ''
  })

  // Manual Payment Instruction Sheet State
  const [isPaymentSheetOpen, setIsPaymentSheetOpen] = useState(false)
  const [activeOrder, setActiveOrder] = useState<{
      referenceId: string;
      amount: number;
      currency: string;
      customerName: string;
      customerEmail: string;
      paymentType: string;
  } | null>(null)

  const [transactionRef, setTransactionRef] = useState('')
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [paymentTab, setPaymentTab] = useState<'skydo' | 'wire' | 'upi' | 'invoice'>('skydo')

  const copyToClipboard = (text: string, fieldId: string) => {
      navigator.clipboard.writeText(text)
      setCopiedField(fieldId)
      setTimeout(() => setCopiedField(null), 2500)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value })
  }

  const proceedToCheckout = () => {
      if (user) {
          setOrderDetails(prev => ({
              ...prev,
              name: prev.name || user.name || '',
              email: prev.email || user.email || ''
          }))
      }
      setIsOrderModalOpen(true)
  }

  const handleOrderSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      if (!orderDetails.name || !orderDetails.email || !orderDetails.phone) {
          alert("Please fill in your name, email, and contact number.")
          return
      }

      setLoading(true)
      const referenceId = `AJPR-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`

      try {
          // Register order as manual pending in DB & trigger admin notification email
          const paymentMethod = currency === 'INR' ? 'manual_upi' : 'manual_skydo'
          await submitOrderRequest({
              name: orderDetails.name,
              email: orderDetails.email,
              phone: orderDetails.phone,
              company: orderDetails.company,
              notes: orderDetails.notes,
              cart: cart.map(i => ({ ...i, price: getItemPrice(i) })),
              total: cartTotal,
              advanceAmount: payableTotal,
              currency: currency,
              paymentStatus: 'pending_verification',
              paymentMethod: paymentMethod,
              paymentId: referenceId,
              paymentType: paymentType,
              isGuest: !user
          })

          // Setup order info for manual payment sheet
          setActiveOrder({
              referenceId,
              amount: payableTotal,
              currency,
              customerName: orderDetails.name,
              customerEmail: orderDetails.email,
              paymentType
          })

          // Default tab based on currency
          if (currency === 'INR') {
              setPaymentTab('upi')
          } else {
              setPaymentTab('skydo')
          }

          setIsOrderModalOpen(false)
          setIsPaymentSheetOpen(true)

      } catch (err) {
          console.error("Manual order error:", err)
          alert("Failed to register order. Please try again or reach out to hello@ajprworld.com")
      } finally {
          setLoading(false)
      }
  }

  const handleFinalConfirm = async () => {
      clearCart()
      setIsPaymentSheetOpen(false)
      setIsCartOpen(false)
      alert(`Thank you ${activeOrder?.customerName}! Order ${activeOrder?.referenceId} has been confirmed.\n\nOur engineering pod will review your details and send your project kickoff confirmation to ${activeOrder?.customerEmail}.`)
  }

  const handleAddAddon = (addonId: string) => {
    const addon = addonsList.find(a => a.id === addonId)
    if (addon) {
        addToCart({
            type: 'addon',
            addonId: addon.id,
            name: `${addon.name} (Add-on)`,
            price: addon.priceUSD,
            details: addon.description,
            quantity: 1
        })
    }
  }

  const skydoBaseUrl = process.env.NEXT_PUBLIC_SKYDO_PAYMENT_URL || "https://pay.skydo.com"
  const skydoCheckoutUrl = activeOrder 
    ? `${skydoBaseUrl}?ref=${activeOrder.referenceId}&amount=${activeOrder.amount}&cur=${activeOrder.currency}&name=${encodeURIComponent(activeOrder.customerName)}`
    : skydoBaseUrl

  return (
    <>
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0 gap-0 bg-white dark:bg-slate-950 z-[70] border-l border-slate-200 dark:border-slate-800 shadow-2xl">
        <SheetHeader className="px-6 py-4 pr-14 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-10">
          <div className="flex items-center justify-between gap-3">
            <SheetTitle className="flex items-center gap-2 text-xl font-black text-slate-900 dark:text-white">
              Your Cart 
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </SheetTitle>

            {/* Currency Selector Pill */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
              {(['USD', 'EUR', 'GBP', 'INR'] as CartCurrency[]).map((cur) => (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                    currency === cur 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cur === 'USD' ? '$ USD' : cur === 'INR' ? '₹ INR' : cur === 'EUR' ? '€ EUR' : '£ GBP'}
                </button>
              ))}
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center px-10">
              <div className="w-24 h-24 mb-6 opacity-80 text-slate-300 dark:text-slate-700">
                <ShoppingBag className="w-full h-full" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Your cart is empty</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">Choose an engineering sprint or growth package to get started</p>
              <Button 
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 font-bold rounded-xl shadow-lg shadow-blue-500/20"
              >
                Explore Services & Sprints
              </Button>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              <div className="space-y-3.5">
                {cart.map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 transition-all">
                    <div className="flex gap-3.5">
                      <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700 shadow-xs text-blue-600 dark:text-blue-400">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">{item.name}</h4>
                          <span className="font-black text-sm text-slate-900 dark:text-white shrink-0 font-mono">
                            {formatPrice(getItemPrice(item))}
                          </span>
                        </div>
                        {item.details && <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{item.details}</p>}
                        
                        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-800/60">
                          {item.type === 'addon' ? (
                            <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 shadow-xs">
                              <button 
                                className="p-1 px-2.5 text-slate-500 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-r border-slate-200 dark:border-slate-800"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-3 text-xs font-bold text-slate-900 dark:text-white">{item.quantity}</span>
                              <button 
                                className="p-1 px-2.5 text-slate-500 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-l border-slate-200 dark:border-slate-800"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-0.5 rounded-full border border-blue-200/50 dark:border-blue-800/50">
                              Base Engineering Sprint
                            </span>
                          )}
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-rose-500 hover:text-rose-600 font-semibold hover:underline transition-colors flex items-center gap-1.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Addons List */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Enhance Your Package</h4>
                  <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">Optional Sprints</span>
                </div>
                <div className="space-y-2.5">
                  {addonsList
                    .filter(addon => !cart.some(item => item.name.includes(addon.name)))
                    .map((addon) => {
                      const addonPrice = getAddonPrice(addon, currency === 'INR' ? 'INR' : 'USD')
                      return (
                        <div key={addon.id} className="flex items-center justify-between p-3.5 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors group">
                          <div className="flex-1 min-w-0 pr-4">
                            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{addon.name}</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{addon.description}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                              {formatPrice(addonPrice)}
                            </span>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 px-3 rounded-lg border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition-all text-xs font-bold gap-1 shadow-xs"
                              onClick={() => handleAddAddon(addon.id)}
                            >
                              <Plus className="w-3.5 h-3.5" /> Add
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
          )}
        </ScrollArea>

        {cart.length > 0 && (
          <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/40">
            <div className="space-y-3 mb-5">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <span>Total Project Value</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 font-mono text-sm">{formatPrice(cartTotal)}</span>
                </div>
                
                <div className="space-y-3 py-3 border-y border-slate-200 dark:border-slate-800">
                    <div className="grid grid-cols-2 gap-3">
                        <label className={`flex flex-col p-3 rounded-xl cursor-pointer border transition-all ${paymentType === 'advance' ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/40 ring-1 ring-blue-600 shadow-xs' : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100/50 dark:hover:bg-slate-900/50'}`}>
                            <div className="flex items-center gap-2 mb-1">
                                <input type="radio" checked={paymentType === 'advance'} onChange={() => setPaymentType('advance')} className="w-4 h-4 text-blue-600" />
                                <span className="font-bold text-xs text-slate-900 dark:text-white">50% Advance</span>
                            </div>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">Pay half now, rest on milestones</span>
                        </label>
                        <label className={`flex flex-col p-3 rounded-xl cursor-pointer border transition-all ${paymentType === 'full' ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/40 ring-1 ring-blue-600 shadow-xs' : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100/50 dark:hover:bg-slate-900/50'}`}>
                            <div className="flex items-center gap-2 mb-1">
                                <input type="radio" checked={paymentType === 'full'} onChange={() => setPaymentType('full')} className="w-4 h-4 text-blue-600" />
                                <span className="font-bold text-xs text-slate-900 dark:text-white">100% Full</span>
                            </div>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">Clear all dues upfront</span>
                        </label>
                    </div>

                    <div className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-400">
                      <span>Package Amount</span>
                      <span className="font-mono">{formatPrice(paymentType === 'full' ? packageTotal : Math.round(packageTotal * 0.5))}</span>
                    </div>
                    {addonTotal > 0 && (
                        <div className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-400">
                          <span>Add-ons (100%)</span>
                          <span className="font-mono">{formatPrice(addonTotal)}</span>
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center pt-1">
                  <div className="flex flex-col">
                    <span className="font-black text-base text-slate-900 dark:text-white">Net Payable Now</span>
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">{paymentType === 'full' ? 'Full Settlement' : '50% Advance Milestone'}</span>
                  </div>
                  <span className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">{formatPrice(payableTotal)}</span>
                </div>
                {paymentType === 'advance' && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                      Remaining balance of {formatPrice(Math.round(packageTotal * 0.5))} is due upon milestone completion.
                  </p>
                )}
            </div>
            
            {/* Trust & Invoicing Notice */}
            <div className="mb-3.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
              <span className="flex items-center gap-1.5 font-medium text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Direct Invoicing & SLA Guarantee
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                {currency !== 'INR' ? 'Skydo • US Wire • Cards' : 'UPI • IMPS • NetBanking'}
              </span>
            </div>

            {/* Crisp, Non-Overflowing Checkout Button */}
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-2xl text-base shadow-xl shadow-blue-500/25 font-bold flex items-center justify-between px-6 transition-all active:scale-[0.99] group" 
              onClick={proceedToCheckout} 
              disabled={loading}
            >
              <span className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-blue-200 group-hover:scale-110 transition-transform" />
                <span>Proceed to Checkout</span>
              </span>
              <span className="font-mono text-base bg-blue-700/80 px-3.5 py-1.5 rounded-xl border border-blue-400/30 font-black">
                {formatPrice(payableTotal)}
              </span>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>

    {/* Order Details & Client Info Dialog */}
      <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Client & Project Details</DialogTitle>
            <DialogDescription>
              Please enter your contact details. Our team will log your order and generate your payment instructions.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleOrderSubmit} className="space-y-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={orderDetails.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label htmlFor="email">Work Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@company.com"
                  value={orderDetails.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone / WhatsApp *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={orderDetails.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company">Company / Website (Optional)</Label>
              <Input
                id="company"
                name="company"
                placeholder="Acme Inc. / https://example.com"
                value={orderDetails.company}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Project Scope / Specific Requirements (Optional)</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Briefly describe any custom requirements or preferred launch timeline..."
                value={orderDetails.notes}
                onChange={handleInputChange}
                rows={2}
              />
            </div>
            <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setIsOrderModalOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
                  {loading ? 'Submitting Order...' : 'Generate Payment Details →'}
                </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    {/* 100% Manual Payment & Invoicing Instructions Sheet */}
      <Dialog open={isPaymentSheetOpen} onOpenChange={setIsPaymentSheetOpen}>
        <DialogContent className="sm:max-w-[560px] p-6 bg-slate-950 text-white border border-slate-800 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Order Registered
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {activeOrder?.referenceId}
              </span>
            </div>
            <DialogTitle className="text-2xl font-bold text-white">
              Complete Your Payment
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-sm">
              Please send your payment using any of the manual methods below. Your engineering pod will verify and kick off work.
            </DialogDescription>
          </DialogHeader>

          {activeOrder && (
            <div className="space-y-5 py-3">
              {/* Order Summary Pill */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                <div>
                  <div className="text-xs text-slate-400">Payable Amount ({activeOrder.paymentType === 'full' ? '100% Full' : '50% Advance'}):</div>
                  <div className="text-2xl font-black text-white mt-0.5">
                    {formatPrice(activeOrder.amount)} <span className="text-sm font-normal text-slate-400">{activeOrder.currency}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Order Reference:</div>
                  <button 
                    onClick={() => copyToClipboard(activeOrder.referenceId, 'ref')}
                    className="flex items-center gap-1 font-mono text-xs text-blue-400 hover:text-blue-300 font-bold bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700 mt-1"
                  >
                    {activeOrder.referenceId}
                    {copiedField === 'ref' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              {/* Payment Method Selector Tabs */}
              <div className="grid grid-cols-3 gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setPaymentTab('skydo')}
                  className={`py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    paymentTab === 'skydo' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  Skydo / Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentTab('wire')}
                  className={`py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    paymentTab === 'wire' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Landmark className="w-3.5 h-3.5" />
                  US Wire / ACH
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentTab('upi')}
                  className={`py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    paymentTab === 'upi' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  UPI / India
                </button>
              </div>

              {/* Tab 1: Skydo Payment Link */}
              {paymentTab === 'skydo' && (
                <div className="space-y-4 p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="font-semibold text-white">Skydo International Payment Link</span>
                    <span className="text-emerald-400 font-medium">Visa • Mastercard • Amex</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Click below to open our official Skydo payment portal. Enter your reference ID <code className="text-blue-400 font-bold">{activeOrder.referenceId}</code> when completing payment.
                  </p>
                  <a
                    href={skydoCheckoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all group shadow-lg shadow-blue-600/20"
                  >
                    <span>Open Skydo Payment Link ({formatPrice(activeOrder.amount)})</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              )}

              {/* Tab 2: Direct US ACH / Wire */}
              {paymentTab === 'wire' && (
                <div className="space-y-3 p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="font-bold text-white">US ACH & Domestic Wire Transfer</span>
                    <span className="text-blue-400">0% Processing Fee</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    For enterprise retainers and international clients, transfer directly via local US ACH wire to our virtual account partner:
                  </p>
                  <div className="space-y-2 p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Beneficiary:</span>
                      <span className="text-slate-200">Aman Joshi / AJPR World</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Partner Bank:</span>
                      <span className="text-slate-200">Community Federal Savings Bank</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Routing / Account:</span>
                      <span className="text-blue-400">Available on invoice / Skydo link</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-slate-800">
                      <span className="text-slate-500">Memo / Reference:</span>
                      <span className="text-emerald-400 font-bold">{activeOrder.referenceId}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: UPI / India Domestic */}
              {paymentTab === 'upi' && (
                <div className="space-y-3 p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="font-bold text-white">Domestic UPI / IMPS Transfer</span>
                    <span className="text-emerald-400">Instant Verification</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-[11px]">UPI ID:</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('9997205257@paytm', 'upi')}
                        className="flex items-center gap-1 font-mono text-blue-400 hover:text-blue-300 font-bold bg-slate-900 px-2 py-1 rounded border border-slate-800"
                      >
                        9997205257@paytm
                        {copiedField === 'upi' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-[11px]">Phone / GPay / Paytm:</span>
                      <span className="font-mono text-slate-200">+91 9997205257</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-[11px]">Beneficiary:</span>
                      <span className="text-slate-200">Aman Joshi (AJPR World)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Transaction Reference / UTR Input */}
              <div className="space-y-2 pt-1">
                <Label htmlFor="txRef" className="text-xs text-slate-300">
                  Transaction Reference / UTR Number / Notes (Optional)
                </Label>
                <Input
                  id="txRef"
                  placeholder="e.g. UTR12345678, Skydo Receipt #, or 'Invoice requested'"
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                  className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 text-xs h-10"
                />
              </div>
            </div>
          )}

          <DialogFooter className="flex-col sm:flex-row gap-2 pt-3 border-t border-slate-800">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-slate-700 text-slate-300 hover:bg-slate-800 text-xs"
              onClick={() => {
                setIsPaymentSheetOpen(false)
                setIsCartOpen(false)
              }}
            >
              I Will Pay Later
            </Button>
            <Button
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
              onClick={handleFinalConfirm}
            >
              <CheckCircle2 className="w-4 h-4 mr-1.5" />
              I Have Sent Payment / Request Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}


