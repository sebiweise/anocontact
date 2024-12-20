import { notFound } from 'next/navigation';
import { ContactForm } from '../components/ContactForm';
import { db } from '@/server/db';

export default async function ContactPage({ params }: { params: { id: string } }) {
    const qrCode = await db.qRCode.findUnique({
        where: { id: params.id },
    });

    if (!qrCode) {
        notFound();
    }

    // Increment the scan count
    await db.qRCode.update({
        where: { id: params.id },
        data: { scans: { increment: 1 } },
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{qrCode.title}</h1>
            <p className="mb-4">{qrCode.description}</p>
            <div className="bg-white shadow rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">Contact Form</h2>
                <p className="mb-4">Use this form to send a message to the owner of this QR code.</p>
                <ContactForm qrCodeId={qrCode.id} />
            </div>
        </div>
    );
}

