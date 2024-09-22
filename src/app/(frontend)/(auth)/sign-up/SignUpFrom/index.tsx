'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Message } from '@/blocks/Form/Message';
import { useAuth } from '@/providers/Auth';

type FormData = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const SignUpForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const { create } = useAuth();
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasSubmitted, setHasSubmitted] = React.useState(false);
    const [confirmationType, setConfirmationType] = React.useState('');
    const [error, setErrorState] = React.useState<string | null>(null);

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        setHasSubmitted(true);
        setErrorState(null);

        try {
            await create(data);
            setConfirmationType('message'); // Set this based on response
        } catch (err) {
            setErrorState('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username Field */}
            <Input
                type="text"
                placeholder="Username"
                {...register('username', { required: true })}
                className={`border ${errors.username ? 'border-red-500' : 'border-border'}`}
            />
            {errors.username && <div className="text-red-500">Username is required.</div>}

            {/* Email Field */}
            <Input
                type="email"
                placeholder="Email"
                {...register('email', { required: true })}
                className={`border ${errors.email ? 'border-red-500' : 'border-border'}`}
            />
            {errors.email && <div className="text-red-500">Email is required.</div>}

            {/* Password Field */}
            <Input
                type="password"
                placeholder="Password"
                {...register('password', { required: true })}
                className={`border ${errors.password ? 'border-red-500' : 'border-border'}`}
            />
            {errors.password && <div className="text-red-500">Password is required.</div>}

            {/* Confirm Password Field */}
            <Input
                type="password"
                placeholder="Confirm Password"
                {...register('confirmPassword', { required: true })}
                className={`border ${errors.confirmPassword ? 'border-red-500' : 'border-border'}`}
            />
            {errors.confirmPassword && <div className="text-red-500">Confirm Password is required.</div>}

            {/* Loading and Error Handling */}
            {isLoading && <p>Loading, please wait...</p>}
            {!isLoading && hasSubmitted && confirmationType === 'message' && (
                <Message message={{ text: 'Registration successful!' }} />
            )}
            {error && <div className="text-red-500">{error}</div>}

            {/* Submit Button */}
            <Button type="submit" disabled={isLoading} className='w-full'>
                Sign Up
            </Button>
        </form>
    );
};

export default SignUpForm;
