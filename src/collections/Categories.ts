import type { CollectionConfig } from 'payload'
import { isAdmin, anyone } from '@/access'

export const Categories: CollectionConfig = {
  slug: 'categories',

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'parent', 'updatedAt'],
  },

  access: {
    read: anyone,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
