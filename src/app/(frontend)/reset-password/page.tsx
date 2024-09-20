import React from 'react'
import { Metadata } from 'next'

import { mergeOpenGraph } from '../../../utilities/mergeOpenGraph'
import { ResetPasswordForm } from './ResetPasswordForm'

import classes from './index.module.scss'

export default async function ResetPassword() {
  return (
    <div className={classes.resetPassword}>
      <h1>Reset Password</h1>
      <p>Please enter a new password below.</p>
      <ResetPasswordForm />
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Enter a new password.',
  openGraph: mergeOpenGraph({
    title: 'Reset Password',
    url: '/reset-password',
  }),
}
