import { authenticated } from "@/access/authenticated";
import { authenticatedOrPublished } from "@/access/authenticatedOrPublished";
import { generatePreviewPath } from "@/utilities/generatePreviewPath";
import { CollectionConfig } from "payload";
import { revalidateMovie } from "./hooks/revalidateMovie";
import { slugField } from "@/fields/slug";
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from "@payloadcms/plugin-seo/fields";

export const Movies: CollectionConfig = {
    slug: 'movies',
    admin: {
        useAsTitle: 'title',
        group: 'Movies',
        livePreview: {
            url: ({ data }) => {
                const path = generatePreviewPath({
                    path: `/movies/${typeof data?.slug === 'string' ? data.slug : ''}`,
                })
                return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
            },
        },
        preview: (doc) =>
            generatePreviewPath({ path: `/movies/${typeof doc?.slug === 'string' ? doc.slug : ''}` }),
    },
    access: {
        create: authenticated,
        delete: authenticated,
        read: authenticatedOrPublished,
        update: authenticated,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
        },
        {
            name: 'views',
            type: 'number',
            defaultValue: 0,
            admin: {
                readOnly: true,
                position: 'sidebar',
            },
            access: {
                update: () => true,
            }
        },
        {
            type: 'tabs',
            tabs: [
                {
                    fields: [
                        {
                            name: 'relatedMovies',
                            type: 'relationship',
                            admin: {
                                position: 'sidebar',
                            },
                            filterOptions: ({ id }) => {
                                return {
                                    id: {
                                        not_in: [id],
                                    },
                                }
                            },
                            hasMany: true,
                            relationTo: 'movies',
                        },
                        {
                            name: 'relatedPosts',
                            type: 'relationship',
                            admin: {
                                position: 'sidebar',
                            },
                            hasMany: true,
                            relationTo: 'posts',
                        },
                        {
                            name: 'relatedSeries',
                            type: 'relationship',
                            admin: {
                                position: 'sidebar',
                            },
                            hasMany: true,
                            relationTo: 'series',
                        },
                        {
                            name: 'type',
                            type: 'text',
                            admin: {
                                position: 'sidebar',
                            },
                            defaultValue: 'movie',
                        },
                        {
                            name: 'categories',
                            type: 'relationship',
                            admin: {
                                position: 'sidebar',
                                readOnly: true
                            },
                            hasMany: true,
                            relationTo: 'categories',
                        },
                    ],
                    label: 'Details'
                },
                {
                    name: 'meta',
                    label: 'SEO',
                    fields: [
                        OverviewField({
                            titlePath: 'meta.title',
                            descriptionPath: 'meta.description',
                            imagePath: 'meta.image',
                        }),
                        MetaTitleField({
                            hasGenerateFn: true,
                        }),
                        MetaImageField({
                            relationTo: 'media',
                        }),

                        MetaDescriptionField({}),
                        PreviewField({
                            // if the `generateUrl` function is configured
                            hasGenerateFn: true,

                            // field paths to match the target field for data
                            titlePath: 'meta.title',
                            descriptionPath: 'meta.description',
                        }),
                    ],
                },
            ]
        },
        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                },
                position: 'sidebar',
            },
            hooks: {
                beforeChange: [
                    ({ siblingData, value }) => {
                        if (siblingData._status === 'published' && !value) {
                            return new Date()
                        }
                        return value
                    },
                ],
            },
        },
        ...slugField(),
    ],
    hooks: {
        afterChange: [revalidateMovie],
    },
    versions: {
        drafts: {
            autosave: {
                interval: 100, // We set this interval for optimal live preview
            },
        },
        maxPerDoc: 50,
    },
}