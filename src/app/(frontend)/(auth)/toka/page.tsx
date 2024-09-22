'use client'
import React from 'react'
import { LogoutClient } from './page.component'

const LogoutPage: React.FC = () => {
  const redirectURL = '/login'

  return (
    <div>
      <LogoutClient inactivity={false} redirect={redirectURL} />
    </div>
  )
}

export default LogoutPage
