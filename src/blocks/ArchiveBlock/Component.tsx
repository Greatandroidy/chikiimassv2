import type { Post, ArchiveBlock as ArchiveBlockProps, Movie, Series, Episode } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs, relationTo } = props

  const limit = limitFromProps || 3

  let posts: Post[] = []
  let series: Series[] = []
  let episodes: Episode[] = []
  let movies: Movie[] = []


  if (populateBy === 'collection') {
    const payload = await getPayloadHMR({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })


    posts = fetchedPosts.docs

  } 

  if (populateBy === 'collection') {
    const payload = await getPayloadHMR({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedMovies = await payload.find({
      collection: 'movies',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    movies = fetchedMovies.docs

  }
  if (populateBy === 'collection') {
    const payload = await getPayloadHMR({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedSeries = await payload.find({
      collection: 'series',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    series = fetchedSeries.docs

  } 
  if (populateBy === 'collection') {
    const payload = await getPayloadHMR({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedEpisodes = await payload.find({
      collection: 'episodes',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

   episodes = fetchedEpisodes.docs

  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Post[]

      posts = filteredSelectedPosts
    }
    if (selectedDocs?.length) {
      const filteredSelectedMovies = selectedDocs.map((movie) => {
        if (typeof movie.value === 'object') return movie.value
      }) as Movie[]

      movies = filteredSelectedMovies
    } 
      if (selectedDocs?.length) {
        const filteredSelectedSeries = selectedDocs.map((serie) => {
          if (typeof serie.value === 'object') return serie.value
        }) as Series[]
  
        series = filteredSelectedSeries
      }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ml-0 max-w-[48rem]" content={introContent} enableGutter={false} />
        </div>
      )}
      {relationTo === 'posts' && <CollectionArchive posts={posts} /> }
       {relationTo === 'Series' && <CollectionArchive series={series} />}
       {relationTo === 'episodes' && <CollectionArchive episodes={episodes} />}
       {relationTo === 'Movies' && <CollectionArchive movies={movies} />}
    </div>
  )
}
