'use client'

export type CartItem = {
  productId: string
  name: string
  slug: string
  price: number
  image: string | null
  quantity: number
}

const CART_KEY = 'ecommerce-cart'

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return []

  try {
    const cart = localStorage.getItem(CART_KEY)
    return cart ? JSON.parse(cart) : []
  } catch(err) {
    return []
  }
}

function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export function addToCart(product: Omit<CartItem, 'quantity'>) {
  const cart = getCart()

  const existingItem = cart.find(
    (item) => item.productId === product.productId,
  )

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      ...product,
      quantity: 1,
    })
  }

  saveCart(cart)

  return cart;
}

export function removeFromCart(productId: string) {
  const cart = getCart().filter(
    (item) => item.productId !== productId,
  )

  saveCart(cart)

  return cart
}

export function updateCartQuantity(
  productId: string,
  quantity: number,
) {
  const cart = getCart()
    .map((item) =>
      item.productId === productId
        ? { ...item, quantity }
        : item,
    )
    .filter((item) => item.quantity > 0)

  saveCart(cart)

  return cart
}

export function clearCart() {
  localStorage.removeItem(CART_KEY)
}
