import { CollectionConfig } from "payload";

export const Casts: CollectionConfig = {
    slug: 'casts',
    access: {
        create: () => true,
        update: () => true,
        delete: () => true,
        read: () => true,
    },
    labels: {
        singular: 'Cast Member',
        plural: 'Cast Members',
    },
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            label: 'Name',
        },
        {
            name: 'bio',
            type: 'richText',
            label: 'Biography',
        },
        {
            name: 'photo',
            type: 'upload',
            relationTo: 'media',
            label: 'Photo',
        },
        {
            name: 'roleInMovies',
            type: 'array',
            fields: [
                {
                    name: 'movie',
                    type: 'relationship',
                    relationTo: 'movies',
                    required: true,
                    label: 'Movie',
                },
                {
                    name: 'role',
                    type: 'text',
                    required: true,
                    label: 'Role',
                },
            ],
            label: 'Roles in Movies',
            admin: {
                description: 'Specify the role of this cast member in each movie.',
            },
        },
        {
            name: 'roleInSeries',
            type: 'array',
            fields: [
                {
                    name: 'series',
                    type: 'relationship',
                    relationTo: 'series',
                    required: true,
                    label: 'Series',
                },
                {
                    name: 'role',
                    type: 'text',
                    required: true,
                    label: 'Role',
                },
            ],
            label: 'Roles in Series',
            admin: {
                description: 'Specify the role of this cast member in each series.',
            },
        },
    ],
};
