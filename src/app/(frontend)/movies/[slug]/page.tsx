import type { Metadata } from 'next'

import { RelatedMovies } from '@/blocks/RelatedMovies/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode, headers } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Movie } from '@/payload-types'

import { MovieHero } from '@/heros/MovieHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const movies = await payload.find({
    collection: 'movies',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return movies.docs?.map(({ slug }) => slug)
}

export default async function Post({ params: { slug = '' } }) {
  const url = '/movies/' + slug
  const movie = await queryPostBySlug({ slug })

  if (!movie) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <MovieHero movie={movie} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container lg:mx-0 lg:grid lg:grid-cols-[1fr_48rem_1fr] grid-rows-[1fr]">

        </div>

        {movie.relatedMovies && movie.relatedMovies.length > 0 && (
          <RelatedMovies
            className="mt-12"
            docs={movie.relatedMovies.filter((movie) => typeof movie === 'object')}
          />
        )}
      </div>
    </article>
  )
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const movie = await queryPostBySlug({ slug })

  return generateMeta({ doc: movie })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'movies',
    draft,
    limit: 1,
    overrideAccess: true,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
