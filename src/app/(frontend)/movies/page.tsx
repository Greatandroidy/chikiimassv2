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

  const movies = await payload.find({
    collection: 'movies',
    depth: 1,
    limit: 12,
  })

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Movies</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="movies"
          currentPage={movies.page}
          limit={12}
          totalDocs={movies.totalDocs}
        />
      </div>

      <CollectionArchive movies={movies.docs} />

      <div className="container">
        {movies.totalPages > 1 && movies.page && (
          <Pagination route='movies' page={movies.page} totalPages={movies.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `ChikiiMass Movies`,
  }
}
