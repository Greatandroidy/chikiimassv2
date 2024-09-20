'use client'

import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/providers/Auth'
import { Button } from '@/components/ui/Button'

type FormData = {
  email: string
  password: string
}

const LoginForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const redirect = searchParams.get('redirect')
  const { login } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = useCallback(
    async (data: FormData) => {
      setIsLoading(true)
      setError(null)
      try {
        await login(data)
        if (redirect) router.push(redirect)
        else router.push('/account')
      } catch (_) {
        setError('There was an error with the credentials provided. Please try again.')
      } finally {
        setIsLoading(false)
      }
    },
    [login, router, redirect],
  )

  return (
    <div className="container lg:max-w-[48rem] pb-20">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <div>
          <label htmlFor="email" className="block mb-2">Email Address</label>
          <input
            id="email"
            type="email"
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            className="w-full p-2 border rounded text-black bg-white"
          />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block mb-2">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full p-2 border rounded text-black bg-white"
          />
          {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
        </div>
        <Button
          type="submit"
          variant="default"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Processing...' : 'Login'}
        </Button>
        <div className="text-center space-y-2">
          <Link href={`/create-account${allParams}`} className="text-blue-600 hover:underline block">
            Create an account
          </Link>
          <Link href={`/recover-password${allParams}`} className="text-blue-600 hover:underline block">
            Recover your password
          </Link>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
