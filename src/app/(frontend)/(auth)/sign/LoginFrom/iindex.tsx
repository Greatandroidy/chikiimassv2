'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/providers/Auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Message } from '@/blocks/Form/Message';
import { useRouter } from 'next/navigation'; // Adjust based on your Next.js version
import { Label } from '@/components/ui/label';

type LoginData = {
    email: string;
    password: string;
};

const LoginForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setErrorState] = React.useState<string | null>(null);
    const [hasSubmitted, setHasSubmitted] = React.useState(false);
    const [confirmationType, setConfirmationType] = React.useState('');
    const router = useRouter(); // Initialize the router for navigation

    const onSubmit = async (data: LoginData) => {
        setIsLoading(true);
        setHasSubmitted(true);
        setErrorState(null);

        try {
            await login(data);
            setConfirmationType('message');
            router.push('/home'); // Redirect to /home on successful login
        } catch (e) {
            setErrorState('Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    {...register('email', { required: true })}
                    className={`border ${errors.email ? 'border-red-500' : 'border-border'}`}
                />
                {errors.email && <div className="text-red-500">Email is required.</div>}
            </div>

            {/* Password Field */}
            <div>
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    {...register('password', { required: true })}
                    className={`border ${errors.password ? 'border-red-500' : 'border-border'}`}
                />
                {errors.password && <div className="text-red-500">Password is required.</div>}
            </div>

            {/* Loading and Error Handling */}
            {isLoading && <p>Loading, please wait...</p>}
            {!isLoading && hasSubmitted && confirmationType === 'message' && (
                <Message message={{ text: 'Login successful!' }} />
            )}
            {error && <div className="text-red-500">{error}</div>}

            {/* Submit Button */}
            <Button type="submit" disabled={isLoading} className='w-full'>
                Log In
            </Button>
        </form>
    );
};

export default LoginForm;
