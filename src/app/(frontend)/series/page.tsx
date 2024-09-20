import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayloadHMR({ config: configPromise })

  const episodes = await payload.find({
    collection: 'episodes',
    depth: 1,
    limit: 12,
  })

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Series</h1>
        </div>
      </div>

      <div className="container mb-8">
         <PageRange
          collection="episodes"
          currentPage={episodes.page}
          limit={12}
          totalDocs={episodes.totalDocs}
        />
      </div>

      <CollectionArchive episodes={episodes.docs} />

      <div className="container">
         {episodes.totalPages > 1 && episodes.page && (
          <Pagination route='series' page={episodes.page} totalPages={episodes.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template series`,
  }
}
