import { headers as getHeaders } from 'next/headers'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const { user } = await payload.auth({ headers: await getHeaders() })
  const customer = user?.collection === 'customers' ? user : null

  return (
    <main className="flex min-h-screen flex-col bg-white text-black">
      <nav className="flex items-center justify-between border-b border-black/10 px-6 py-6 sm:px-12">
        <Link href="/" className="text-2xl font-black tracking-[-1.5px]">
          ecommerce
        </Link>

        <div className="flex items-center gap-5 sm:gap-8">

          {customer ? (
            <>
              <Link
                href="/orders"
                className="text-sm font-medium text-black transition hover:text-blue-600"
              >
                My Orders
              </Link>

              <Link
                href="/cart"
                className="bg-[#20201e] px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-600"
              >
                Cart
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-[#555550] transition hover:text-blue-600"
              >
                Sign in
              </Link>

              <Link
                href="/signup"
                className="bg-[#20201e] px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-600"
              >
                Join us
              </Link>
            </>
          )}
        </div>
      </nav>

      
      <section className="flex flex-1 items-center justify-center px-6 py-24">
        <div className="mx-auto w-full max-w-3xl text-center">
          <p className="mb-8 text-xs font-bold uppercase tracking-[3px] text-black">
            Products which are made for you
          </p>

          {customer ? (
            <>
              <h1 className="text-5xl font-semibold leading-[1.08] tracking-[-2.5px] sm:text-7xl">
                Good to see you
              </h1>

              <p className="mx-auto mt-8 max-w-xl text-base leading-8 text-black">
                Shop products from our store
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href="/products"
                  className="bg-[#20201e] px-7 py-4 text-sm font-semibold text-white transition hover:bg-blue-600"
                >
                  Explore collection →
                </Link>

                <Link
                  href="/orders"
                  className="border border-[#20201e]/20 px-7 py-4 text-sm font-semibold transition hover:border-blue-600 hover:text-blue-600"
                >
                  View orders
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-6xl font-semibold leading-[1.05] tracking-[-3px] sm:text-8xl">
                Happy Shopping
              </h1>

              <p className="mx-auto mt-8 max-w-xl text-base leading-8 text-black">
                Chose from our wide range variety of products
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
                <Link
                  href="/products"
                  className="bg-[#20201e] px-8 py-4 text-sm font-semibold text-white transition hover:bg-blue-600"
                >
                  Shop the collection →
                </Link>

                <Link
                  href="/signup"
                  className="text-sm font-semibold underline decoration-black underline-offset-8 transition hover:text-blue-600"
                >
                  Create an account
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}