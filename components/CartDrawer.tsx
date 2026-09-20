import { useAuth } from '@/components/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import { useCart, CartCurrency } from '@/components/providers/CartProvider'
import { useState } from 'react'
import { ShoppingCart, Trash2, ShoppingBag, Plus, Minus, Globe, CreditCard, ExternalLink, ShieldCheck, CheckCircle2, Landmark, Copy, Check } from 'lucide-react'
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
import { addonsList, getAddonPrice } from '@/lib/constants'
import { submitOrderRequest, createRazorpayOrder } from '@/app/actions'
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

  // Guest Checkout State
  const [isGuestCheckoutOpen, setIsGuestCheckoutOpen] = useState(false)
  const [guestDetails, setGuestDetails] = useState({
      name: '',
      email: '',
      phone: ''
  })

  // Skydo International Payment Dialog State
  const [isSkydoModalOpen, setIsSkydoModalOpen] = useState(false)
  const [skydoOrderInfo, setSkydoOrderInfo] = useState<{
      referenceId: string;
      amount: number;
      currency: string;
      customerName: string;
      customerEmail: string;
  } | null>(null)
  const [copiedAccount, setCopiedAccount] = useState(false)

  // Handle Input Change for Guest Form
  const handleGuestInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setGuestDetails({ ...guestDetails, [e.target.name]: e.target.value })
  }

  const proceedToCheckout = () => {
      if (user) {
          handleCheckout()
      } else {
          setIsGuestCheckoutOpen(true)
      }
  }

  const handleGuestSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      if (!guestDetails.name || !guestDetails.email || !guestDetails.phone) {
          alert("Please fill in all fields.")
          return
      }
      setIsGuestCheckoutOpen(false)
      handleCheckout(true)
  }

  const handleCheckout = async (isGuest: boolean = false) => {
      setLoading(true)
      const currentUserDetails = isGuest ? guestDetails : { name: user?.name, email: user?.email, phone: '' }

      try {
          // ROUTE 1: International Checkout via SKYDO (for USD, EUR, GBP)
          if (currency !== 'INR') {
              const referenceId = `SKYDO-${Date.now().toString(36).toUpperCase()}`

              // 1. Register order as pending_payment in database & send email notification
              await submitOrderRequest({
                  name: currentUserDetails.name,
                  email: currentUserDetails.email,
                  phone: currentUserDetails.phone,
                  cart: cart.map(i => ({ ...i, price: getItemPrice(i) })),
                  total: cartTotal,
                  advanceAmount: payableTotal,
                  currency: currency,
                  paymentStatus: 'pending_payment',
                  paymentMethod: 'skydo',
                  paymentId: referenceId,
                  paymentType: paymentType,
                  isGuest: isGuest
              })

              // Fire GTM Event
              if (typeof window !== 'undefined' && (window as any).dataLayer) {
                  (window as any).dataLayer.push({
                      event: 'begin_checkout',
                      transaction_id: referenceId,
                      value: payableTotal,
                      currency: currency
                  });
              }

              setSkydoOrderInfo({
                  referenceId,
                  amount: payableTotal,
                  currency,
                  customerName: currentUserDetails.name || 'Client',
                  customerEmail: currentUserDetails.email || ''
              })
              setIsSkydoModalOpen(true)
              return
          }

          // ROUTE 2: Domestic Indian Checkout via RAZORPAY (for INR)
          const order = await createRazorpayOrder(payableTotal, {
              type: 'cart_checkout',
              name: currentUserDetails.name,
              email: currentUserDetails.email,
              phone: currentUserDetails.phone,
              paymentType: paymentType,
              advanceAmount: payableTotal,
              totalAmount: cartTotal,
              cartItems: cart.map(i => `${i.name} (x${i.quantity})`).join(', ')
          })
          if (!order) throw new Error('Order creation failed')

          const options = {
              key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
              amount: order.amount,
              currency: order.currency,
              name: "AJPR World",
              description: paymentType === 'full' ? "Full Service Payment (100%)" : "Service Advance Payment (50%)",
              order_id: order.id,
              handler: async function (response: any) {
                  try {
                      const res = await submitOrderRequest({
                          name: currentUserDetails.name,
                          email: currentUserDetails.email,
                          phone: currentUserDetails.phone,
                          cart: cart.map(i => ({ ...i, price: getItemPrice(i) })),
                          total: cartTotal,
                          advanceAmount: payableTotal,
                          currency: 'INR',
                          paymentStatus: 'paid',
                          paymentMethod: 'razorpay',
                          paymentId: response.razorpay_payment_id,
                          paymentType: paymentType,
                          isGuest: isGuest
                      })

                      if (res.success) {
                          if (typeof window !== 'undefined' && (window as any).dataLayer) {
                              (window as any).dataLayer.push({
                                  event: 'purchase',
                                  transaction_id: response.razorpay_payment_id,
                                  value: payableTotal,
                                  currency: 'INR'
                              });
                          }
                          alert(`Payment Successful! Request ID: ${response.razorpay_payment_id}. Our team will contact you shortly.`)
                          clearCart()
                          setIsCartOpen(false)
                          if (isGuest) {
                              setGuestDetails({ name: '', email: '', phone: '' })
                          }
                      } else {
                          alert("Payment recorded, but email notification had a delay.")
                      }
                  } catch (saveError) {
                      console.error("Save Error:", saveError)
                      alert("Payment successful but error saving order.")
                  }
              },
              prefill: {
                  name: currentUserDetails.name,
                  email: currentUserDetails.email,
                  contact: currentUserDetails.phone
              },
              theme: {
                  color: "#2563EB"
              }
          }

          const rzp1 = new (window as any).Razorpay(options)
          rzp1.on('payment.failed', function (response: any) {
              alert(`Payment Failed: ${response.error.description}`)
          })
          rzp1.open()

      } catch (error) {
          console.error('Payment Error:', error)
          alert("Payment initiation failed. Please try again or reach out to support.")
      } finally {
          setLoading(false)
      }
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
  const skydoCheckoutUrl = skydoOrderInfo 
    ? `${skydoBaseUrl}?ref=${skydoOrderInfo.referenceId}&amount=${skydoOrderInfo.amount}&cur=${skydoOrderInfo.currency}&name=${encodeURIComponent(skydoOrderInfo.customerName)}`
    : skydoBaseUrl

  return (
    <>
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 gap-0 bg-white dark:bg-slate-950">
        <SheetHeader className="px-6 py-4 border-b dark:border-slate-800">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
              Your Cart <span className="text-sm font-normal text-slate-500">({cart.length} items)</span>
            </SheetTitle>

            {/* Currency Selector Pill */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
              {(['USD', 'EUR', 'GBP', 'INR'] as CartCurrency[]).map((cur) => (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  className={`px-2 py-1 text-xs font-bold rounded-md transition-colors ${
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
              <div className="w-24 h-24 mb-6 opacity-80 text-slate-300">
                <ShoppingBag className="w-full h-full" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Your cart is empty</h3>
              <p className="text-slate-500 mb-8">Choose a package to get started</p>
              <Button 
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6"
              >
                Explore Services
              </Button>
            </div>
          ) : (
            <div className="p-6 space-y-8">
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-center shrink-0 border dark:border-slate-800">
                        <ShoppingBag className="w-8 h-8 opacity-20 text-slate-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold text-slate-900 dark:text-white truncate pr-4">{item.name}</h4>
                            <span className="font-bold text-slate-900 dark:text-white shrink-0">
                                {formatPrice(getItemPrice(item))}
                            </span>
                        </div>
                        {item.details && <p className="text-xs text-slate-500 line-clamp-1">{item.details}</p>}
                        
                        <div className="flex items-center justify-between mt-3">
                            {item.type === 'addon' ? (
                                <div className="flex items-center border dark:border-slate-800 rounded-md">
                                    <button 
                                        className="p-1 px-2 text-slate-500 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors border-r dark:border-slate-800"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                        <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="px-3 text-sm font-bold text-slate-900 dark:text-white">{item.quantity}</span>
                                    <button 
                                        className="p-1 px-2 text-slate-500 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors border-l dark:border-slate-800"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        <Plus className="w-3 h-3" />
                                    </button>
                                </div>
                            ) : (
                                <span className="text-xs font-semibold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded">
                                    Base Plan
                                </span>
                            )}
                            <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-xs text-red-500 hover:text-red-600 font-semibold"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Addons List */}
              <div className="pt-6 border-t dark:border-slate-800">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Enhance Your Package</h4>
                <div className="space-y-3">
                  {addonsList
                    .filter(addon => !cart.some(item => item.name.includes(addon.name)))
                    .map((addon) => {
                      const addonPrice = getAddonPrice(addon, currency === 'INR' ? 'INR' : 'USD')
                      return (
                        <div key={addon.id} className="flex items-center justify-between p-3 border dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors group">
                          <div className="flex-1 min-w-0 pr-4">
                            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{addon.name}</p>
                            <p className="text-[10px] text-slate-500 truncate">{addon.description}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-slate-900 dark:text-white">
                              {formatPrice(addonPrice)}
                            </span>
                            <Button 
                              size="icon" 
                              variant="outline" 
                              className="h-8 w-8 rounded-full border-blue-200 dark:border-blue-900 hover:bg-blue-600 hover:text-white"
                              onClick={() => handleAddAddon(addon.id)}
                            >
                              <Plus className="w-4 h-4" />
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
          <div className="p-6 border-t dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
            <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm text-slate-500">
                  <span>Total Project Value</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{formatPrice(cartTotal)}</span>
                </div>
                
                <div className="space-y-3 py-3 border-y dark:border-slate-800">
                    <div className="flex gap-4">
                        <label className={`flex-1 flex flex-col p-3 border rounded-xl cursor-pointer transition-colors ${paymentType === 'advance' ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50'}`}>
                            <div className="flex items-center gap-2 mb-1">
                                <input type="radio" checked={paymentType === 'advance'} onChange={() => setPaymentType('advance')} className="w-4 h-4 text-blue-600" />
                                <span className="font-bold text-sm text-slate-900 dark:text-white">50% Advance</span>
                            </div>
                            <span className="text-xs text-slate-500 pl-6">Pay half now, rest later</span>
                        </label>
                        <label className={`flex-1 flex flex-col p-3 border rounded-xl cursor-pointer transition-colors ${paymentType === 'full' ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50'}`}>
                            <div className="flex items-center gap-2 mb-1">
                                <input type="radio" checked={paymentType === 'full'} onChange={() => setPaymentType('full')} className="w-4 h-4 text-blue-600" />
                                <span className="font-bold text-sm text-slate-900 dark:text-white">100% Full Payment</span>
                            </div>
                            <span className="text-xs text-slate-500 pl-6">Clear all dues upfront</span>
                        </label>
                    </div>

                    <div className="flex justify-between items-center text-sm text-slate-600 dark:text-slate-400 mt-4">
                      <span>Package Payment</span>
                      <span>{formatPrice(paymentType === 'full' ? packageTotal : Math.round(packageTotal * 0.5))}</span>
                    </div>
                    {addonTotal > 0 && (
                        <div className="flex justify-between items-center text-sm text-slate-600 dark:text-slate-400">
                          <span>Add-ons (100%)</span>
                          <span>{formatPrice(addonTotal)}</span>
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="flex flex-col">
                    <span className="font-bold text-lg text-slate-900 dark:text-white pr-2">Net Payable Now</span>
                    <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">{paymentType === 'full' ? 'Full Payment' : 'Adv. Payment'}</span>
                  </div>
                  <span className="text-2xl font-black text-blue-600">{formatPrice(payableTotal)}</span>
                </div>
                {paymentType === 'advance' && (
                  <p className="text-[10px] text-slate-500 mt-2">
                      Balance amount of {formatPrice(Math.round(packageTotal * 0.5))} will be due as per project milestones.
                  </p>
                )}
            </div>
            
            {/* Gateway trust indicator */}
            <div className="mb-3 flex items-center justify-between text-xs text-slate-500 px-1">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                {currency !== 'INR' ? 'Global Checkout via Skydo' : 'Domestic UPI/Cards via Razorpay'}
              </span>
              <span className="text-[11px] text-slate-400">
                {currency !== 'INR' ? 'Visa • MC • Amex • ACH' : 'UPI • RuPay • NetBanking'}
              </span>
            </div>

            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-7 text-lg shadow-xl shadow-blue-500/20 font-bold flex items-center justify-center gap-2" 
              onClick={proceedToCheckout} 
              disabled={loading}
            >
              {loading ? (
                'Processing...'
              ) : currency !== 'INR' ? (
                <>
                  <CreditCard className="w-5 h-5" />
                  {paymentType === 'full' ? `Pay Full (${formatPrice(payableTotal)}) with Skydo` : `Pay Advance (${formatPrice(payableTotal)}) with Skydo`}
                </>
              ) : (
                <>
                  {paymentType === 'full' ? `Pay Full (${formatPrice(payableTotal)}) Now` : `Pay Advance (${formatPrice(payableTotal)}) Now`}
                </>
              )}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>

    {/* Guest Details Dialog */}
      <Dialog open={isGuestCheckoutOpen} onOpenChange={setIsGuestCheckoutOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Guest Checkout</DialogTitle>
            <DialogDescription>
              Please provide your details so our engineering pod can connect and set up your project workspace.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleGuestSubmit} className="space-y-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={guestDetails.name}
                onChange={handleGuestInputChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Work Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@company.com"
                value={guestDetails.email}
                onChange={handleGuestInputChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone / WhatsApp</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={guestDetails.phone}
                onChange={handleGuestInputChange}
                required
              />
            </div>
            <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setIsGuestCheckoutOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
                  Continue to {currency !== 'INR' ? 'Skydo Payment' : 'Payment'}
                </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    {/* Skydo International Payment Confirmation Dialog */}
      <Dialog open={isSkydoModalOpen} onOpenChange={setIsSkydoModalOpen}>
        <DialogContent className="sm:max-w-[500px] p-6 bg-slate-950 text-white border border-slate-800">
          <DialogHeader>
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-2">
              <CreditCard className="w-6 h-6" />
            </div>
            <DialogTitle className="text-2xl font-bold text-white">
              Complete Your International Payment
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-sm">
              Your order has been registered on AJPR World. Complete payment securely via <strong>Skydo</strong>.
            </DialogDescription>
          </DialogHeader>

          {skydoOrderInfo && (
            <div className="space-y-4 py-4">
              {/* Order Pill */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Reference ID:</span>
                  <span className="font-mono text-blue-400 font-bold">{skydoOrderInfo.referenceId}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Client Email:</span>
                  <span className="text-slate-200">{skydoOrderInfo.customerEmail}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                  <span className="text-sm font-semibold text-slate-300">Amount Due:</span>
                  <span className="text-2xl font-black text-white">
                    {formatPrice(skydoOrderInfo.amount)} <span className="text-sm font-normal text-slate-400">{skydoOrderInfo.currency}</span>
                  </span>
                </div>
              </div>

              {/* Payment Methods Supported */}
              <div className="flex items-center justify-between px-2 text-xs text-slate-400">
                <span>Accepted Rails:</span>
                <span className="text-slate-300 font-medium">Visa • Mastercard • Amex • Apple Pay • US ACH</span>
              </div>

              {/* Primary Skydo Action Button */}
              <a
                href={skydoCheckoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold text-base shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all group"
              >
                <span>Pay {formatPrice(skydoOrderInfo.amount)} on Skydo Portal</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Direct US ACH / Wire Details (Zero Card Fees) */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-300">
                  <Landmark className="w-4 h-4 text-blue-400" />
                  <span>Paying via US ACH Wire / Bank Transfer?</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  For large retainers, our US virtual bank details can be found directly on your Skydo payment link or generated invoice. You can also mention Reference ID <code className="text-blue-400">{skydoOrderInfo.referenceId}</code> in your transfer memo.
                </p>
              </div>
            </div>
          )}

          <DialogFooter className="flex-col sm:flex-row gap-2 pt-2 border-t border-slate-800">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-slate-700 text-slate-300 hover:bg-slate-800"
              onClick={() => {
                setIsSkydoModalOpen(false)
                setIsCartOpen(false)
              }}
            >
              Close & Pay Later
            </Button>
            <Button
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
              onClick={() => {
                clearCart()
                setIsSkydoModalOpen(false)
                setIsCartOpen(false)
                alert(`Thank you! Order ${skydoOrderInfo?.referenceId} has been logged. Once your Skydo transfer is received, your project pod will immediately kick off!`)
              }}
            >
              <CheckCircle2 className="w-4 h-4 mr-1.5" />
              I Have Completed Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

