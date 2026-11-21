import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import config from '@/payload.config'
import AddToCartButton from '../../components/AddToCartButton'
import { formatPrice } from '@/lib/format'
import { populated } from '@/lib/relations'

type ProductPageProps = {
  params: Promise<{slug: string}>
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params

  const payload = await getPayload({ config })

  const { docs: products } = await payload.find({
    collection: 'products',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1,
    limit: 1,
  })

  const product = products[0]

  if (!product) notFound()

  const image = populated(product.image)

  const imageUrl = image?.url ?? null

  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/products"
          className="text-sm font-medium text-gray-500 hover:text-black"
        >
          ← Back to Products
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={image?.alt || product.name}
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                No image available
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">

            <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              {product.name}
            </h1>

            <p className="mt-6 text-2xl font-bold">
              {formatPrice(product.price)}
            </p>

            <div className="mt-8">
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
          </div>
        </div>
      </div>
    </main>
  )
}
