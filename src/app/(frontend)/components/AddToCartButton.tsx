'use client'

import { useState } from 'react'

import { addToCart } from '../actions/carts'

type AddToCartButtonProps = {
  product: {
    productId: string
    name: string
    slug: string
    price: number
    image: string | null
  }
}

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart(product)
    setAdded(true)

    setTimeout(() => {
      setAdded(false)
    }, 1500)
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="w-full rounded-lg bg-black px-5 py-3 font-semibold text-white transition hover:bg-gray-800"
    >
      {added ? 'Added to Cart ✓' : 'Add to Cart'}
    </button>
  )
}
