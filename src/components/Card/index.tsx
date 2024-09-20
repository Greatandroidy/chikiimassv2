'use client'
import { cn } from '@/utilities/cn'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Episode, Movie, Post, Series } from '@/payload-types'

import { Media } from '@/components/Media'
import { cmTimeAgo } from '@/utilities/time-ago'
import { cmAbbreviateNumber } from '@/utilities/views'

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: Post | Series | Movie
  relationTo?: 'posts' | 'series' | 'episodes' | 'movies'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  // Handle Post rendering
  if (relationTo === 'posts') {

    const { slug, categories, meta, title } = doc as Post || {}
    const { description, image: metaImage } = meta || {}

    const hasCategories = categories && Array.isArray(categories) && categories.length > 0
    const titleToUse = titleFromProps || title
    const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
    const href = `/${relationTo}/${slug}`

    return (
      <article
        className={cn(
          'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
          className,
        )}
        ref={card.ref}
      >
        <div className="relative w-full ">
          {!metaImage && <div className="">No image</div>}
          {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="360px" />}
        </div>
        <div className="p-4">
          {showCategories && hasCategories && (
            <div className="uppercase text-sm mb-4">
              {showCategories && hasCategories && (
                <div>
                  {categories?.map((category, index) => {
                    if (typeof category === 'object') {
                      const { title: titleFromCategory } = category

                      const categoryTitle = titleFromCategory || 'Untitled category'

                      const isLast = index === categories.length - 1

                      return (
                        <Fragment key={index}>
                          {categoryTitle}
                          {!isLast && <Fragment>, &nbsp;</Fragment>}
                        </Fragment>
                      )
                    }

                    return null
                  })}
                </div>
              )}
            </div>
          )}
          {titleToUse && (
            <div className="prose">
              <h3>
                <Link className="not-prose" href={href} ref={link.ref}>
                  {titleToUse}
                </Link>
              </h3>
            </div>
          )}
          {description && <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>}
        </div>
      </article>
    )
  }

  // Handle Movies && rendering
  if (relationTo === 'movies') {

    const { slug, id, views, meta, title, publishedAt } = doc as Movie || {}
    const { image: metaImage } = meta || {}


    const titleToUse = titleFromProps || title
    const href = `/watch/${id}`
    const info = `${relationTo}/${slug}`

    return (
      <article
        className={cn(
          'overflow-hidden hover:cursor-pointer',
          className,
        )}
        ref={card.ref}
      >
        <div className="relative w-full ">
          {!metaImage && <div className="">No image</div>}
          {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="360px" />}
        </div>
        <div className="p-4">
          {titleToUse && (
            <div className="prose">
              <h3>
                <Link className="not-prose" href={href} ref={link.ref}>
                  {titleToUse}
                </Link>
              </h3>
            </div>
          )}
          <div>
            <span>{cmAbbreviateNumber(views)} View . </span>
            <span>{cmTimeAgo(publishedAt)}</span>
          </div>
        </div>
      </article>
    )
  }

  // Handle Movies rendering
  if (relationTo === 'episodes') {

    const { slug, id, views, meta, title, publishedAt } = doc as Episode || {}
    const { image: metaImage } = meta || {}


    const titleToUse = titleFromProps || title
    const href = `/watch/${id}`
    const info = `/${relationTo}/${slug}`

    return (
      <article
        className={cn(
          'overflow-hidden hover:cursor-pointer',
          className,
        )}
        ref={card.ref}
      >
        <div className="relative w-full ">
          {!metaImage && <div className="">No image</div>}
          {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="360px" />}
        </div>
        <div className="p-4">
          {titleToUse && (
            <div className="prose">
              <h3>
                <Link className="not-prose" href={href} ref={link.ref}>
                  {titleToUse}
                </Link>
              </h3>
            </div>
          )}
          <div>
            <span>{cmAbbreviateNumber(views)} View . </span>
            <span>{cmTimeAgo(publishedAt)}</span>
          </div>
        </div>
      </article>
    )
  }

  // Handle and Series 
  return (
    <div className={cn('border rounded-lg overflow-hidden bg-card', className)}>
      <pre className='p-4'>{JSON.stringify(doc, null, 2)}</pre>
    </div>
  )
}