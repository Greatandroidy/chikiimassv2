import { CollectionConfig } from "payload";

export const Genres: CollectionConfig = {
    slug: 'genres',
    admin: {
        useAsTitle: 'options',
    },
    labels: {
        singular: 'Genre',
        plural: 'Genres',
    },
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    fields: [
        {
            name: 'options',
            type: 'select',
            options: [
                { label: 'Action', value: 'action' },
                { label: 'Adventure', value: 'adventure' },
                { label: 'Comedy', value: 'comedy' },
                { label: 'Drama', value: 'drama' },
                { label: 'Fantasy', value: 'fantasy' },
                { label: 'Historical', value: 'historical' },
                { label: 'Horror', value: 'horror' },
                { label: 'Mystery', value: 'mystery' },
                { label: 'Romance', value: 'romance' },
                { label: 'Science Fiction', value: 'science-fiction' },
                { label: 'Thriller', value: 'thriller' },
                { label: 'Western', value: 'western' },
            ],
            label: 'Options',
            admin: {
                description: 'Select the genre from the predefined options.',
            },
            hasMany: true,
        },
    ],
};
