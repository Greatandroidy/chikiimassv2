import React, { Fragment } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

//import { fetchComments } from '../../_api/fetchComments'
import { Button } from '@/components/ui/button'
import { HR } from '@/components/HR'
import { RenderParams } from '@/components/RenderParams'
import { LowImpactHero } from '@/heros/LowImpact'
import { formatDateTime } from '@/utilities/formatDateTime'
import { getMeUser } from '@/utilities/getMeUser'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import AccountForm from './AccountForm'

import classes from './index.module.scss'

export default async function Account() {
    const { user } = await getMeUser({
        nullUserRedirect: `/login?error=${encodeURIComponent(
            'You must be logged in to access your account.',
        )}&redirect=${encodeURIComponent('/account')}`,
    })

    /*   const comments = await fetchComments({
        user: user?.id,
      }) */

    return (
        <Fragment>
            <div>
                <RenderParams className={classes.params} />
            </div>
            {/*      <LowImpactHero
        type="lowImpact"
        media={null}
        richText={[
          {
            type: 'h1',
            children: [
              {
                text: 'Account',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: 'This is your account dashboard. Here you can update your account information, view your comment history, and more. To manage all users, ',
              },
              {
                type: 'link',
                url: '/admin/collections/users',
                children: [
                  {
                    text: 'login to the admin dashboard.',
                  },
                ],
              },
            ],
          },
        ]}
      /> */}
            <div className={classes.account}>
                <AccountForm />
                <HR />
                <h2>Comments</h2>
                <p>
                    These are the comments you have placed over time. Each comment is associated with a
                    specific post. All comments must be approved by an admin before they appear on the site.
                </p>
                <HR />
                {/*         {comments?.length === 0 && <p>You have not made any comments yet.</p>}
        {comments.length > 0 &&
          comments?.map((com, index) => {
            const { doc, comment, createdAt } = com

            if (!comment) return null

            return (
              <Fragment key={index}>
                <div className={classes.column}>
                  <p className={classes.comment}>"{comment}"</p>
                  <p className={classes.meta}>
                    {'Posted '}
                    {doc && typeof doc === 'object' && (
                      <Fragment>
                        {' to '}
                        <Link href={`/posts/${doc?.slug}`}>{doc?.title || 'Untitled Post'}</Link>
                      </Fragment>
                    )}
                    {createdAt && ` on ${formatDateTime(createdAt)}`}
                  </p>
                </div>
                {index < comments.length - 1 && <HR />}
              </Fragment>
            )
          })} */}
                <HR />
                <Button asChild variant="secondary">
                    <Link href="/logout" >Log out</Link>
                </Button>
            </div>
        </Fragment>
    )
}

export const metadata: Metadata = {
    title: 'Account',
    description: 'Create an account or log in to your existing account.',
    openGraph: mergeOpenGraph({
        title: 'Account',
        url: '/account',
    }),
}
