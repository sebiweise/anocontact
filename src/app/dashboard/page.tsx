import QRCodeList from './components/QRCodeList';
import QRCodeForm from './components/QRCodeForm';
import { auth } from '@/server/auth';
import { redirect } from 'next/navigation';
import { Navigation } from '@/components/Navigation';

export default async function Home() {
    const session = await auth();

    if (!session?.user) {
        redirect('/login');
    }

    return (
        <>
            <Navigation />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">AnoContact Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Your QR Codes</h2>
                        <QRCodeList />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Create New QR Code</h2>
                        <QRCodeForm />
                    </div>
                </div>
            </div>
        </>
    );
}

