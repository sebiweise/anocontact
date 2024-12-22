import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from "@/components/ui/button";

export function Navigation() {
    const { data: session } = useSession();

    return (
        <nav className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/dashboard" className="text-xl font-bold text-gray-800">
                    AnoContact
                </Link>
                <div>
                    {session?.user ? (
                        <>
                            <span className="mr-4">{session.user.email}</span>
                            <Button onClick={() => signOut({ callbackUrl: '/' })}>Sign out</Button>
                        </>
                    ) : (
                        <Link href="/login">
                            <Button>Sign in</Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

