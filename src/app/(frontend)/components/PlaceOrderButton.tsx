'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

import { placeOrder } from '../actions/orders'

type CartItem = {
  productId: string
  quantity: number
}

type PlaceOrderButtonProps = {
  items: CartItem[]
}

export default function PlaceOrderButton({
  items,
}: PlaceOrderButtonProps) {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')

  const handlePlaceOrder = () => {
    setMessage('')

    startTransition(async () => {
      const result = await placeOrder(items)

      setMessage(result.message)

      if (result.success) {
        router.push('/orders')
        router.refresh()
      }
    })
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handlePlaceOrder}
        disabled={isPending || items.length === 0}
        className="w-full rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? 'Placing Order...' : 'Place Order'}
      </button>

      {message && (
        <p className="text-center text-sm text-gray-600">
          {message}
        </p>
      )}
    </div>
  )
}
