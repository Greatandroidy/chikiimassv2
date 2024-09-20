'use client'

import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'

type FormData = {
  email: string
}

export const RecoverPasswordForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = useCallback(async (data: FormData) => {
    setIsLoading(true)
    setError(undefined)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`,
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (response.ok) {
        setSuccess(true)
      } else {
        setError(
          'There was a problem while attempting to send you a password reset email. Please try again.',
        )
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <div className="container lg:max-w-[48rem] pb-20">
      <h1 className="text-2xl font-bold mb-6">Recover Password</h1>
      {!success ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <p className="text-gray-600">
            Please enter your email below. You will receive an email message with instructions on
            how to reset your password.
          </p>
          <div>
            <label htmlFor="email" className="block mb-2">Email Address</label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className="w-full p-2 border rounded text-black bg-white"
            />
            {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <Button
            type="submit"
            variant="default"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Processing...' : 'Recover Password'}
          </Button>
          <div className="text-center">
            <Link href="/login" className="text-blue-600 hover:underline">
              Back to login
            </Link>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <p className="text-green-600">
            Check your email for a link that will allow you to securely reset your password.
          </p>
          <div className="text-center">
            <Link href="/login" className="text-blue-600 hover:underline">
              Back to login
            </Link>
          </div>
        </div>
      )}
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          To manage all users, {' '}
          <Link href="/admin/collections/users" className="text-blue-600 hover:underline">
            login to the admin dashboard
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
