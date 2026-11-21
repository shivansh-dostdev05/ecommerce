import type { CollectionConfig } from 'payload'
import { isAdmin, isCustomer, adminOrCustomer } from '@/access'

export const Orders: CollectionConfig = {
  slug: 'orders',

  admin: {
    useAsTitle: 'id',
    defaultColumns: ['customer', 'total', 'status', 'createdAt'],
  },

  access: {
    create: isCustomer,
    read: adminOrCustomer('customer'),
    update: isAdmin,
    delete: isAdmin,
  },

  fields: [
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'customers',
      required: true,
    },
    {
      name: 'products',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          min: 0,
        },
      ],
    },
    {
      name: 'total',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        {
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'Delivered',
          value: 'delivered',
        },
        {
          label: 'Cancelled',
          value: 'cancelled',
        },
      ],
    },
  ],
}
