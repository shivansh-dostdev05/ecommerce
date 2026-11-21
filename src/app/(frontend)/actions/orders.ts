'use server'

import { headers } from 'next/headers'
import { getPayload } from 'payload'

import config from '@/payload.config'

type CartItem = {
  productId: string
  quantity: number
}

export async function placeOrder(items: CartItem[]) {
  try {
    if (!items.length) {
      return {
        success: false,
        message: 'Your cart is empty.',
      }
    }

    const payload = await getPayload({ config })

    const { user } = await payload.auth({
      headers: await headers(),
    })

    if (!user) {
      return {
        success: false,
        message: 'Please log in to place an order.',
      }
    }

    const orderProducts = await Promise.all(
      items.map(async (item) => {
        if (!item.productId){
          throw new Error('Invalid cart item.')
        }

        const product = await payload.findByID({
          collection: 'products',
          id: item.productId,
        })

        return {
          product: product.id,
          quantity: item.quantity,
          price: product.price,
        }
      }),
    )

    const total = orderProducts.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    )

    const order = await payload.create({
      collection: 'orders',
      data: {
        customer: user.id,
        products: orderProducts,
        total,
        status: 'pending',
      },
    })

    return {
      success: true,
      message: 'Order placed successfully!',
      orderId: order.id,
    }
  } catch (error) {
    console.error('Place order error:', error)

    return {
      success: false,
      message: 'Unable to place your order. Please try again.',
    }
  }
}
