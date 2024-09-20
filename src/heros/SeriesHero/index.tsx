import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Series } from '@/payload-types'

import { Media } from '@/components/Media'

export const SeriesHero: React.FC<{
  series: Series
}> = ({ series }) => {
  const { categories, meta: { image: metaImage, description } = {}, publishedAt, title} = series

  return (
    <div className="relative -mt-[10.4rem] flex items-end">
      <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8">
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <div className="uppercase text-sm mb-6">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </div>

          <div className="">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>
          </div>

          <div className="">
            <h1 className="mb-6 text-lg">{description}</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            <div className="flex flex-col gap-4">

            </div>
            {publishedAt && (
              <div className="flex flex-row gap-1">
              

                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {metaImage && typeof metaImage !== 'string' && (
          <Media fill imgClassName="-z-10 object-cover" resource={metaImage} />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  )
}
