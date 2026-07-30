import { useAuth } from '@/components/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import { useCart } from '@/components/providers/CartProvider'
import { useState } from 'react'
import { ShoppingCart, Trash2, ShoppingBag, Plus, Minus } from 'lucide-react'
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
import { addonsList } from '@/lib/constants'
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
    setPaymentType
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

  // Handle Input Change for Guest Form
  const handleGuestInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setGuestDetails({ ...guestDetails, [e.target.name]: e.target.value })
  }

  const proceedToCheckout = () => {
      if (user) {
          handleCheckout() // Proceed directly if logged in
      } else {
          setIsGuestCheckoutOpen(true) // Open guest dialog if not
      }
  }

  const handleGuestSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      if (!guestDetails.name || !guestDetails.email || !guestDetails.phone) {
          alert("Please fill in all fields.")
          return
      }
      setIsGuestCheckoutOpen(false)
      handleCheckout(true) // Pass true for isGuest
  }

  const handleCheckout = async (isGuest: boolean = false) => {
      setLoading(true)
      try {
          const currentUserDetails = isGuest ? guestDetails : { name: user?.name, email: user?.email, phone: '' }

          // 1. Create Razorpay Order with rich metadata
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
                  // 2. On Success, Submit Order Request to Backend
                  try {
                      // Pass 'payableTotal' as 'advanceAmount'
                      const res = await submitOrderRequest({
                          name: currentUserDetails.name,
                          email: currentUserDetails.email,
                          phone: currentUserDetails.phone,
                          cart: cart,
                          total: cartTotal,
                          advanceAmount: payableTotal, // Explicitly pass the calculated advance
                          paymentStatus: 'paid',
                          paymentId: response.razorpay_payment_id,
                          paymentType: paymentType, // Pass the type (advance or full)
                          isGuest: isGuest
                      })

                      if (res.success) {
                          alert(`Payment Successful! Request ID: ${response.razorpay_payment_id}. Our team will contact you shortly.`)
                          clearCart()
                          setIsCartOpen(false)
                          if(isGuest) {
                              setGuestDetails({ name: '', email: '', phone: '' })
                          }
                      } else {
                          alert("Payment successful but failed to save order/send email.")
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
          alert("Payment initiation failed.")
      } finally {
          setLoading(false)
      }
  }

  const handleAddAddon = (addonId: string) => {
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
  }

  return (
    <>
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 gap-0 bg-white dark:bg-slate-950">
        <SheetHeader className="px-6 py-4 border-b dark:border-slate-800">
          <SheetTitle className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
            Your Cart <span className="text-sm font-normal text-slate-500">({cart.length} items)</span>
          </SheetTitle>
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
                            <span className="font-bold text-slate-900 dark:text-white shrink-0">₹{item.price.toLocaleString()}</span>
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
                    .map((addon) => (
                    <div key={addon.id} className="flex items-center justify-between p-3 border dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors group">
                      <div className="flex-1 min-w-0 pr-4">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{addon.name}</p>
                        <p className="text-[10px] text-slate-500 truncate">{addon.description}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">₹{addon.price.toLocaleString()}</span>
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
                  ))}
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
                  <span className="font-bold text-slate-700 dark:text-slate-300">₹{cartTotal.toLocaleString()}</span>
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
                      <span>₹{(paymentType === 'full' ? packageTotal : packageTotal * 0.5).toLocaleString()}</span>
                    </div>
                    {addonTotal > 0 && (
                        <div className="flex justify-between items-center text-sm text-slate-600 dark:text-slate-400">
                          <span>Add-ons (100%)</span>
                          <span>₹{addonTotal.toLocaleString()}</span>
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="flex flex-col">
                    <span className="font-bold text-lg text-slate-900 dark:text-white pr-2">Net Payable Now</span>
                    <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">{paymentType === 'full' ? 'Full Payment' : 'Adv. Payment'}</span>
                  </div>
                  <span className="text-2xl font-black text-blue-600">₹{payableTotal.toLocaleString()}</span>
                </div>
                {paymentType === 'advance' && (
                  <p className="text-[10px] text-slate-500 mt-2">
                      Balance amount of ₹{(packageTotal * 0.5).toLocaleString()} will be due as per project milestones.
                  </p>
                )}
            </div>
            
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-7 text-lg shadow-xl shadow-blue-500/20 font-bold" 
              onClick={proceedToCheckout} 
              disabled={loading}
            >
              {loading ? 'Initiating Secure Payment...' : (paymentType === 'full' ? 'Pay Full Amount Now' : 'Pay Advance Now')}
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
              Please provide your details so our team can contact you.
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={guestDetails.email}
                onChange={handleGuestInputChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Mobile Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={guestDetails.phone}
                onChange={handleGuestInputChange}
                required
              />
            </div>
            <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setIsGuestCheckoutOpen(false)}>Cancel</Button>
                <Button type="submit">Proceed to Payment</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </>
  )
}
