import type { CollectionConfig } from 'payload'
import { adminOrCustomer, anyone, isAdmin } from '@/access'

export const Customers: CollectionConfig = {
  slug: 'customers',

  auth: true,

 access: {
    create: anyone,
    read: adminOrCustomer(),
    update: adminOrCustomer(),
    delete: isAdmin,
  },

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'createdAt'],
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
}
