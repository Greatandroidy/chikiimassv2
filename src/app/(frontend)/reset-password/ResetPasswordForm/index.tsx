'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { useAuth } from '@/providers/Auth'

type FormData = {
  password: string
  passwordConfirm: string
  token: string
}

export const ResetPasswordForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState(false)
  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>()

  const password = watch('password')

  const onSubmit = useCallback(
    async (data: FormData) => {
      setIsLoading(true)
      setError(undefined)

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/reset-password`,
          {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )

        if (response.ok) {
          const json = await response.json()

          // Automatically log the user in after they successfully reset password
          await login({ email: json.user.email, password: data.password })

          setSuccess(true)
          // Redirect them to `/account` with success message in URL
          setTimeout(() => {
            router.push('/account?success=Password reset successfully.')
          }, 3000)
        } else {
          setError('There was a problem while resetting your password. Please try again later.')
        }
      } catch (err) {
        setError('An unexpected error occurred. Please try again.')
      } finally {
        setIsLoading(false)
      }
    },
    [router, login],
  )

  useEffect(() => {
    reset({ token: token || undefined })
  }, [reset, token])

  return (
    <div className="container lg:max-w-[48rem] pb-20">
      <h1 className="text-2xl font-bold mb-6">Reset Password</h1>
      {!success ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div>
            <label htmlFor="password" className="block mb-2">New Password</label>
            <input
              id="password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
              className="w-full p-2 border rounded text-black bg-white"
            />
            {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <div>
            <label htmlFor="passwordConfirm" className="block mb-2">Confirm New Password</label>
            <input
              id="passwordConfirm"
              type="password"
              {...register('passwordConfirm', {
                required: 'Please confirm your password',
                validate: value => value === password || "Passwords do not match"
              })}
              className="w-full p-2 border rounded text-black bg-white"
            />
            {errors.passwordConfirm && <p className="text-red-600 text-xs mt-1">{errors.passwordConfirm.message}</p>}
          </div>
          <input type="hidden" {...register('token')} />
          <Button
            type="submit"
            variant="default"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Processing...' : 'Reset Password'}
          </Button>
        </form>
      ) : (
        <div className="space-y-6">
          <p className="text-green-600">
            Your password has been successfully reset. You will be redirected to your account page shortly.
          </p>
          <div className="text-center">
            <Link href="/account" className="text-blue-600 hover:underline">
              Go to account page
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
