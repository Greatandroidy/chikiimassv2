import { authenticated } from "@/access/authenticated";
import { authenticatedOrPublished } from "@/access/authenticatedOrPublished";
import { generatePreviewPath } from "@/utilities/generatePreviewPath";
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from "@payloadcms/plugin-seo/fields";
import payload, { CollectionConfig } from "payload";
import { revalidateEpisode } from "./hooks/revalidateEpisode";
import { slugField } from "@/fields/slug";

export const Episodes: CollectionConfig = {
    slug: 'episodes',
    admin: {
        useAsTitle: 'title',
        group: 'Series',
        livePreview: {
            url: ({ data }) => {
                const path = generatePreviewPath({
                    path: `/watch/${typeof data?.id === 'string' ? data.id : ''}`,
                })
                return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
            },
        },
        preview: (doc) =>
            generatePreviewPath({ path: `/watch/${typeof doc?.id === 'string' ? doc.id : ''}` }),
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
            name: 'descr',
            type: 'textarea'
        },
        {
            name: 'series',
            type: 'relationship',
            relationTo: 'series',
        },
        {
            name: 'relatedMovies',
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
                readOnly: true,
                position: 'sidebar',
            },
            defaultValue: 'series',
        },
        {
            name: 'otherEpisodes',
            type: 'number',
            admin: {
                position: 'sidebar',
            },
  /*           hooks: {
                afterRead: [
                    ({ siblingData, value }) => {
                        if (siblingData.series === true && !value) {
                            return Episodes
                        }
                        return value
                    },
                ],
            }, */
/*             hooks: {
                afterRead: [
                    async ({ siblingData, value }) => {
                        if (siblingData.series && !value) {
                            try {
                                const result = await payload.find({
                                    collection: 'episodes',
                                    where: {
                                        series: { equals: siblingData.series },
                                        id: { not_equals: siblingData.id } // Exclude the current episode
                                    },
                                    depth: 0 // Adjust depth as needed
                                });
                                return result.docs.length;
                            } catch (error) {
                                console.error('Error fetching other episodes:', error);
                                return 0;
                            }
                        }
                        return value;
                    },
                ],
            }, */
            
        },
        {
            type: 'tabs',
            tabs: [
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
            name: 'publishedAt',
            type: 'date',
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                },
                readOnly: true,
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
        afterChange: [revalidateEpisode],
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