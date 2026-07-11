'use client'

import { Button } from "@/components/ui/button"
import { useCart } from "@/components/providers/CartProvider"
import { ShoppingCart } from "lucide-react"

interface AddToCartButtonProps {
    service: {
        id: string | number
        title: string
        price: number | string
        description?: string
    }
}

export function AddToCartButton({ service }: AddToCartButtonProps) {
    const { addToCart } = useCart()

    const handleAddToCart = () => {
        addToCart({
            type: 'package',
            name: service.title,
            price: typeof service.price === 'string' ? parseFloat(service.price) : service.price,
            details: service.description,
            quantity: 1
        })
    }

    return (
        <Button 
            onClick={handleAddToCart}
            className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2"
        >
            <ShoppingCart className="w-5 h-5" />
            Buy Now
        </Button>
    )
}
