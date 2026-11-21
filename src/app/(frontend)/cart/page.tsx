'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { getCart, removeFromCart, updateCartQuantity, type CartItem } from '../actions/carts'

import PlaceOrderButton from '../components/PlaceOrderButton'
//import RemoveCartButton from '../components/RemoveFromCartButton'

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    setCart(getCart())
  }, [])

  const handleRemove = (productId: string) => {
    setCart(removeFromCart(productId))
  }

  const handleQuantityChange = (
    productId: string,
    quantity: number,
  ) => {
    setCart(updateCartQuantity(productId, quantity))
  }

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price)

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold">Your Cart</h1>

          <p className="mt-4 text-gray-600">
            Your shopping cart is currently empty.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-block rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            {cart.map((item) => (
              <article
                key={item.productId}
                className="flex flex-col gap-5 rounded-xl border border-gray-200 bg-white p-5 sm:flex-row"
              >
                <div className="h-32 w-full shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:w-32">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                      No image
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-between gap-4">
                  <div>
                    <Link
                      href={`/products/${item.slug}`}
                      className="text-lg font-semibold hover:text-gray-600"
                    >
                      {item.name}
                    </Link>

                    <p className="mt-2 font-medium">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange(item.productId, item.quantity - 1)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 hover:bg-gray-100"
                      >
                        -
                      </button>

                      <span className="min-w-5 text-center">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange(item.productId, item.quantity + 1)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemove(item.productId)}
                      className="text-sm font-medium text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="font-bold sm:text-right">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </article>
            ))}
          </div>

          <aside className="h-fit rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-xl font-bold">
              Order Summary
            </h2>

            <div className="mt-6 flex justify-between text-gray-600">
              <span>Items ({cart.length})</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-lg font-bold">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="mt-6">
              <PlaceOrderButton
                items={cart.map((item) => ({
                  productId: item.productId,
                  quantity: item.quantity,
                }))}
              />
            </div>

            <Link
              href="/products"
              className="mt-4 block text-center text-sm text-gray-600 hover:text-black"
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  )
}
