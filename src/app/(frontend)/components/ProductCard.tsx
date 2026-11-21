import Image from 'next/image'
import Link from 'next/link'

import type { Product } from '@/payload-types'

import AddToCartButton from './AddToCartButton'

type ProductCardProps = {
  product: Product
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const image =
    typeof product.image === 'object' && product.image !== null
      ? product.image
      : null

  const imageUrl = image?.url ?? null

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price)

  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-lg">
      <Link href={`/products/${product.slug}`}>
        <div className="relative h-64 w-full bg-gray-100">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={image?.alt || product.name}
              fill
              unoptimized
              className="object-cover transition duration-300 hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              No image available
            </div>
          )}
        </div>
      </Link>

      <div className="space-y-4 p-5">
        <div>
          <Link href={`/products/${product.slug}`}>
            <h2 className="font-semibold hover:text-gray-600">
              {product.name}
            </h2>
          </Link>

          <p className="mt-2 text-lg font-bold">
            {formatPrice(product.price)}
          </p>
        </div>

        <AddToCartButton
          product={{
            productId: String(product.id),
            name: product.name,
            slug: product.slug,
            price: product.price,
            image: imageUrl,
          }}
        />
      </div>
    </article>
  )
}
