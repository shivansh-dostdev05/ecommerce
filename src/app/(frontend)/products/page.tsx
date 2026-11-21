import { getPayload } from 'payload'

import config from '@/payload.config'
import ProductCard from '../components/ProductCard'

export default async function ProductsPage() {
  const payload = await getPayload({ config })

  const { docs: products } = await payload.find({
    collection: 'products',
    depth: 1,
    limit: 100,
    sort: '-createdAt',
  })

  return (
    <main className="min-h-screen bg-gray px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold">
          All Products
        </h1>

        <p className="mt-2 text-black">
          Explore our latest collection.
        </p>

        {products.length === 0 ? (
          <p className="mt-12 text-center text-black">
            No products available yet.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
