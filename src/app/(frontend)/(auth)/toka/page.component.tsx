'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const baseClass = 'logout'

export const LogoutClient: React.FC<{
  inactivity?: boolean
  redirect: string
}> = ({ inactivity, redirect }) => {
  const [isLoggingOut, setIsLoggingOut] = useState<boolean | undefined>(undefined)
  const router = useRouter()

  // API call for logging out
  const logOut = async () => {
    try {
      const response = await fetch('https://shiny-goggles-6jjv97576r6fg5g-3000.app.github.dev/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in request if using cookie-based sessions
      })

      if (response.ok) {
        // Clear any local storage or session storage
        localStorage.removeItem('authToken')
        sessionStorage.removeItem('authToken')

        // Optionally, handle the response data if needed
      } else {
        // Handle errors (e.g., failed to log out)
        console.error('Failed to log out')
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  useEffect(() => {
    if (!isLoggingOut) {
      setIsLoggingOut(true)
      logOut().then(() => {
        // Redirect to login or a public page after logging out
        router.push(redirect || '/login')
      })
    }
  }, [isLoggingOut, logOut, redirect, router])

  if (isLoggingOut) {
    return (
      <div className={`${baseClass}__wrap`}>
        {inactivity && <h2>You have been logged out due to inactivity</h2>}
        {!inactivity && <h2>You have been logged out successfully</h2>}
        <Link href={redirect || '/login'}>
          <a className="button secondary large">Log Back In</a>
        </Link>
      </div>
    )
  }

  return <Fragment>Logging out...</Fragment>
}
