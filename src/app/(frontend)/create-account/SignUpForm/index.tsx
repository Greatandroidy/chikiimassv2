'use client'
import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/providers/Auth'

type SignUpFormData = {
  username: string
  email: string
  password: string
  passwordConfirm: string
}

const SignUpPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const { create } = useAuth()

  const formMethods = useForm<SignUpFormData>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = formMethods

  const password = watch('password')

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true)
    setError(undefined)

    try {
      await create({
        username: data.username,
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      })
      setHasSubmitted(true)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred during sign up. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container lg:max-w-[48rem] pb-20">
      <FormProvider {...formMethods}>
        <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
        {!isLoading && hasSubmitted && (
          <p className="text-green-600 mb-4">Sign up successful! Please check your email to verify your account.</p>
        )}
        {isLoading && <p>Loading, please wait...</p>}
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {!hasSubmitted && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2">Username</label>
              <input
                id="username"
                {...register('username', { required: 'Username is required' })}
                className="w-full p-2 border rounded text-black bg-white"
              />
              {errors.username && <p className="text-red-600">{errors.username.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">Email</label>
              <input
                id="email"
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className="w-full p-2 border rounded text-black bg-white"
              />
              {errors.email && <p className="text-red-600">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2">Password</label>
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
              <label htmlFor="passwordConfirm" className="block mb-2">Confirm Password</label>
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
            <Button type="submit" variant="default" disabled={isLoading}>
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </form>
        )}
      </FormProvider>
    </div>
  )
}

export default SignUpPage
