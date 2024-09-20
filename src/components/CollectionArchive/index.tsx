import { cn } from 'src/utilities/cn'
import React from 'react'

import type { Episode, Movie, Post, Series } from '@/payload-types'

import { Card } from '@/components/Card'

export type Props = {
  posts?: Post[]
  movies?: Movie[]
  series?: Series[]
  episodes?: Episode[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts, movies, series, episodes } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {/* Check for posts */}
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <Card className="h-full" doc={result} relationTo="posts" showCategories />
                </div>
              )
            }

            return null
          })}

          {/* Check for movies */}
          {movies?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <Card className="h-full" doc={result} relationTo="movies" showCategories />
                </div>
              )
            }

            return null
          })}
          {/* Check for series */}
          {series?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <Card className="h-full" doc={result} relationTo="series" showCategories />
                </div>
              )
            }

            return null
          })}

          {/* Check for Episodes */}
          {episodes?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <Card className="h-full" doc={result} relationTo="episodes" showCategories />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
