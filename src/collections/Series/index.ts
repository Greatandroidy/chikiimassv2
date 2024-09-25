import { authenticated } from "@/access/authenticated";
import { authenticatedOrPublished } from "@/access/authenticatedOrPublished";
import { generatePreviewPath } from "@/utilities/generatePreviewPath";
import { CollectionConfig } from "payload";
import { revalidateSeries } from "./hooks/revalidateSeries";
import { slugField } from "@/fields/slug";
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from "@payloadcms/plugin-seo/fields";
import { SeasonsBlock } from "@/blocks/SeasonsBlock";

export const Series: CollectionConfig = {
    slug: 'series',
    admin: {
        useAsTitle: 'title',
        group: 'Series',
        livePreview: {
            url: ({ data }) => {
                const path = generatePreviewPath({
                    path: `/series/${typeof data?.slug === 'string' ? data.slug : ''}`,
                })
                return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
            },
        },
        preview: (doc) =>
            generatePreviewPath({ path: `/series/${typeof doc?.slug === 'string' ? doc.slug : ''}` }),
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
            type: 'tabs',
            tabs: [
                {
                    fields: [
                        {
                            name: 'relatedSeries',
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
                            relationTo: 'series',
                        },
                        {
                            name: 'relatedMovie',
                            type: 'relationship',
                            admin: {
                                position: 'sidebar',
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
                            name: 'categories',
                            type: 'relationship',
                            admin: {
                                position: 'sidebar',
                            },
                            hasMany: true,
                            relationTo: 'categories',
                        },
                        {
                            name: 'Genres',
                            type: 'relationship',
                            relationTo: 'genres',
                            hasMany: true,
                            admin: {
                                position: 'sidebar',
                            }
                        },
                    ],
                    label: 'Details'
                },
                {
                    label: 'Seasons',
                    fields: [
                        {
                            name: 'seasons',
                            type: 'blocks',
                            blocks: [SeasonsBlock]
                        },
                    ]
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
                readOnly: true,
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
        afterChange: [revalidateSeries],
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