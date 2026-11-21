import Link from 'next/link'
import { requireCustomer, getPayloadClient } from '@/lib/payload'
import { formatPrice } from '@/lib/format'
import { populated } from '@/lib/relations'

export default async function OrdersPage() {
  const customer = await requireCustomer('/orders')
  const payload = await getPayloadClient()

  const { docs: orders } = await payload.find({
    collection: 'orders',
    where: {
      customer: {
        equals: customer.id,
      },
    },
    sort: '-createdAt',
    depth: 1,
    overrideAccess: false,
    user: customer,
  })

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">My Orders</h1>

        <p className="mt-2 text-gray-600">
          View your recent purchases.
        </p>

        {orders.length === 0 ? (
          <div className="mt-12 rounded-xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold">
              No orders yet
            </h2>

            <p className="mt-3 text-gray-500">
              You haven't placed any orders.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            {orders.map((order) => (
              <article
                key={order.id}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      Order ID
                    </p>

                    <p className="font-semibold">
                      #{order.id}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium capitalize ${
                      order.status === 'delivered'
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'cancelled'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  {order.products.map((item, index) => {
                    const product = populated(item.product)

                    return (
                      <div
                        key={`${order.id}-${index}`}
                        className="flex justify-between gap-4"
                      >
                        <div>
                          <p className="font-medium">
                            {product?.name ?? 'Product'}
                          </p>

                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <p className="font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-5 flex justify-between border-t border-gray-100 pt-4">
                  <span className="font-semibold">
                    Total
                  </span>

                  <span className="text-lg font-bold">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
