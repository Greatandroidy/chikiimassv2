import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page({ params: { pageNumber = 2 } }) {
  const payload = await getPayloadHMR({ config: configPromise })

  const series = await payload.find({
    collection: 'series',
    depth: 1,
    limit: 12,
    page: pageNumber,
  })

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>series</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="series"
          currentPage={series.page}
          limit={12}
          totalDocs={series.totalDocs}
        />
      </div>

      <CollectionArchive series={series.docs} />

      <div className="container">
        {series.totalPages > 1 && series.page && (
          <Pagination page={series.page} totalPages={series.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata({ params: { pageNumber = 2 } }): Metadata {
  return {
    title: `Payload Website Template series Page ${pageNumber}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const series = await payload.find({
    collection: 'series',
    depth: 0,
    limit: 10,
  })

  const pages: number[] = []

  for (let i = 1; i <= series.totalPages; i++) {
    pages.push(i)
  }

  return pages
}
