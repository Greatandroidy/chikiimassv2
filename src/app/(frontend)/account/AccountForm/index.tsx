'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/Auth'
import { Button } from '@/components/ui/Button'

type FormData = {
  email: string
  name: string
  password: string
  passwordConfirm: string
}

const AccountForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const { user, setUser } = useAuth()
  const [changePassword, setChangePassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>()

  const password = watch('password')

  const router = useRouter()

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (user) {
        setIsLoading(true)
        setError(undefined)
        setSuccess(undefined)

        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user.id}`, {
            credentials: 'include',
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
          })

          if (response.ok) {
            const json = await response.json()
            setUser(json.doc)
            setSuccess('Successfully updated account.')
            setChangePassword(false)
            reset({
              email: json.doc.email,
              name: json.doc.name,
              password: '',
              passwordConfirm: '',
            })
          } else {
            setError('There was a problem updating your account.')
          }
        } catch (err) {
          setError('An unexpected error occurred. Please try again.')
        } finally {
          setIsLoading(false)
        }
      }
    },
    [user, setUser, reset],
  )

  useEffect(() => {
    if (user === null) {
      router.push(
        `/login?error=${encodeURIComponent(
          'You must be logged in to view this page.',
        )}&redirect=${encodeURIComponent('/account')}`,
      )
    }

    if (user) {
      reset({
        email: user.email,
        name: user.name,
        password: '',
        passwordConfirm: '',
      })
    }
  }, [user, router, reset, changePassword])

  return (
    <div className="container lg:max-w-[48rem] pb-20">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      {!isLoading && success && (
        <p className="text-green-600 mb-4">{success}</p>
      )}
      {isLoading && <p>Loading, please wait...</p>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        {!changePassword ? (
          <>
            <p className="mb-4">
              Change your account details below, or{' '}
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => setChangePassword(!changePassword)}
              >
                click here
              </button>
              {' to change your password.'}
            </p>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">Email Address</label>
              <input
                id="email"
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="w-full p-2 border rounded text-black bg-white"
              />
              {errors.email && <p className="text-red-600">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">Name</label>
              <input
                id="name"
                {...register('name')}
                className="w-full p-2 border rounded text-black bg-white"
              />
              {errors.name && <p className="text-red-600">{errors.name.message}</p>}
            </div>
          </>
        ) : (
          <>
            <p className="mb-4">
              Change your password below, or{' '}
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => setChangePassword(!changePassword)}
              >
                cancel
              </button>
              .
            </p>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2">New Password</label>
              <input
                id="password"
                type="password"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  }
                })}
                className="w-full p-2 border rounded text-black bg-white"
              />
              {errors.password && <p className="text-red-600">{errors.password.message}</p>}
            </div>
            <div className="mb-4">
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
              {errors.passwordConfirm && <p className="text-red-600">{errors.passwordConfirm.message}</p>}
            </div>
          </>
        )}
        <Button
          type="submit"
          variant="default"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : changePassword ? 'Change Password' : 'Update Account'}
        </Button>
      </form>
    </div>
  )
}

export default AccountForm
