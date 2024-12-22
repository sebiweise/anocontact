'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
    const router = useRouter();
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (session) {
        router.push('/dashboard');
        return null;
    }

    const handleGoogleSignIn = () => {
        signIn('google', { callbackUrl: '/dashboard' });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <div className="mt-8 space-y-6">
                    <div>
                        <Button
                            onClick={handleGoogleSignIn}
                            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <FcGoogle className="w-5 h-5 mr-2" />
                            Sign in with Google
                        </Button>
                    </div>
                </div>
                <div className="text-center">
                    <Link href="/" className="text-indigo-600 hover:text-indigo-500">
                        Back to home
                    </Link>
                </div>
            </div>
        </div>
    );
}

