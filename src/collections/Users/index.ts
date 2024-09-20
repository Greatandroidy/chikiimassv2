import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { checkRole } from './checkRole'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
import { admins } from '@/access/admin'

const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
    admin: ({ req: { user } }) => checkRole(['admin'], user),
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
    group: 'Auth',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'profile pic',
      type: 'text',

    },
    {
     name: 'country',
     type: 'text'
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['user'],
      options: [
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'user',
          value: 'user',
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      access: {
        read: admins,
        create: admins,
        update: admins,
      },
    },
  ],
  timestamps: true,
}

export default Users
