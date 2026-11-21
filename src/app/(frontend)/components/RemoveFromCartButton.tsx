'use client'

import { removeFromCart } from '../actions/carts'

type RemoveCartButtonProps = {
  productId: string
  onRemove: (productId: string) => void
}

export default function RemoveCartButton({
  productId,
  onRemove,
}: RemoveCartButtonProps) {
  const handleRemove = () => {
    removeFromCart(productId)
    onRemove(productId)
  }

  return (
    <button
      type="button"
      onClick={handleRemove}
      className="text-sm font-medium text-red-600 transition hover:text-red-800"
    >
      Remove
    </button>
  )
}
