import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from "@payloadcms/plugin-seo/fields";
import { Block } from "payload";

export const SeasonsBlock: Block = {
    slug: 'seasonsblock',
    fields: [
        {
            name: 'SeasonTitle',
            type: 'text',
            admin: {
                description: 'Season 1',
            },
        },
        {
            name: 'SeasonNumber',
            type: 'number',
            defaultValue: 1,
        },
        {
            name: 'SeasonDescr',
            type: 'textarea',
        },
        {
            name: 'Episodes',
            type: 'relationship',
            relationTo: 'episodes',
            hasMany: true
        },
    ]
}