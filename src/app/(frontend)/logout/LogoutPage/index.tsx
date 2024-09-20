'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'

import { Settings } from '@/payload-types'
import { useAuth } from '@/providers/Auth'

export const LogoutPage: React.FC<{
  settings: Settings
}> = props => {
  const { settings } = props
  const { postsPage, moviesPage, seriesPage } = settings || {}
  const { logout } = useAuth()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout()
        setSuccess('Logged out successfully.')
      } catch (_) {
        setError('You are already logged out.')
      }
    }

    performLogout()
  }, [logout])

  const hasPostsPage = typeof postsPage === 'object' && postsPage?.slug
  const hasMoviesPage = typeof moviesPage === 'object' && moviesPage?.slug
   const hasSeriesPage = typeof seriesPage === 'object' && seriesPage?.slug

  return (
    <Fragment>
      {(error || success) && (
        <div>
          <h1>{error || success}</h1>
          <p>
            {'What would you like to do next? '}
            {hasPostsPage && hasMoviesPage && hasSeriesPage && <Fragment>{'Browse '}</Fragment>}
            {hasPostsPage && (
              <Fragment>
                <Link href={`/${postsPage.slug}`}>all posts</Link>
              </Fragment>
            )}
            {hasPostsPage && hasMoviesPage && hasSeriesPage &&  <Fragment>{' or '}</Fragment>}
            {hasMoviesPage && (
              <Fragment>
                <Link href={`/${moviesPage.slug}`}>all movies</Link>
              </Fragment>
            )}
            {hasPostsPage && hasMoviesPage && hasSeriesPage &&  <Fragment>{' or '}</Fragment>}
            {hasSeriesPage && (
              <Fragment>
                <Link href={`/${seriesPage.slug}`}>all series</Link>
              </Fragment>
            )}
            {` To log back in, `}
            <Link href="/login">click here</Link>
            {'.'}
          </p>
        </div>
      )}
    </Fragment>
  )
}
