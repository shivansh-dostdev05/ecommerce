import { headers } from 'next/headers'
import { getPayload } from 'payload'
import { redirect } from 'next/navigation'

import config from '@/payload.config'

export async function getPayloadClient() {
  return getPayload({ config })
}

export async function getCurrentCustomer() {
  const payload = await getPayloadClient()

  const { user } = await payload.auth({
    headers: await headers(),
  })

  if (!user || user.collection !== 'customers') {
    return null
  }

  return user
}

export async function requireCustomer(next = '/') {
  const customer = await getCurrentCustomer()

  if (!customer) redirect(`/login?next=${encodeURIComponent(next)}`)
  return customer
}
