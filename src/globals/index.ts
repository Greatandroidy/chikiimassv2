import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  typescript: {
    interface: 'Settings',
  },
  graphQL: {
    name: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'postsPage',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Posts page',
    },
    {
      name: 'moviesPage',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Movies page',
    },
    {
        name: 'seriesPage',
        type: 'relationship',
        relationTo: 'pages',
        label: 'Series page',
      },
  ],
}
