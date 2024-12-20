'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function QRCodeForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [turnstileSiteKey, setTurnstileSiteKey] = useState('');
    const [turnstileSecretKey, setTurnstileSecretKey] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/qrcodes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, contactInfo }),
        });

        if (response.ok) {
            setTitle('');
            setDescription('');
            setContactInfo('');
            setContactEmail('');
            setTurnstileSiteKey('');
            setTurnstileSecretKey('');
            router.refresh();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <Input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="mt-1"
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1"
                />
            </div>
            <div>
                <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700">
                    Contact Information
                </label>
                <Textarea
                    id="contactInfo"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    required
                    className="mt-1"
                />
            </div>
            <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                    Contact Email (optional)
                </label>
                <Input
                    type="email"
                    id="contactEmail"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="mt-1"
                />
            </div>
            <div>
                <label htmlFor="turnstileSiteKey" className="block text-sm font-medium text-gray-700">
                    Turnstile Site Key (optional)
                </label>
                <Input
                    type="text"
                    id="turnstileSiteKey"
                    value={turnstileSiteKey}
                    onChange={(e) => setTurnstileSiteKey(e.target.value)}
                    className="mt-1"
                />
            </div>
            <div>
                <label htmlFor="turnstileSecretKey" className="block text-sm font-medium text-gray-700">
                    Turnstile Secret Key (optional)
                </label>
                <Input
                    type="password"
                    id="turnstileSecretKey"
                    value={turnstileSecretKey}
                    onChange={(e) => setTurnstileSecretKey(e.target.value)}
                    className="mt-1"
                />
            </div>
            <Button type="submit">
                Create QR Code
            </Button>
        </form>
    );
}

