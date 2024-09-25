import { CollectionConfig } from "payload";

export const Genres: CollectionConfig = {
    slug: 'genres',
    labels: {
        singular: 'Genre',
        plural: 'Genres',
    },
    access: {
        read: () => true,   // Allow read access to everyone
        create: () => true, // Allow creation of genres
        update: () => true, // Allow updates to genres
        delete: () => true, // Allow deletion of genres
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            label: 'Name',
        },
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
        },
    ],
};
