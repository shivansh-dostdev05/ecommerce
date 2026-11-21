import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',

  auth: true,

  access: {
    create: () => true
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
