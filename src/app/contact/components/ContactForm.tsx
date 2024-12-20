'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import Turnstile, { useTurnstile } from "react-turnstile";
import { env } from "@/env";

interface ContactFormProps {
    qrCodeId: string;
    turnstileSitekey?: string;
}

export function ContactForm({ qrCodeId, turnstileSitekey }: ContactFormProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const { toast } = useToast();
    const turnstile = useTurnstile();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!captchaToken) {
            toast({
                title: "Error",
                description: "Please complete the CAPTCHA",
                variant: "destructive",
            });
            return;
        }
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ qrCodeId, name, email, message, captchaToken }),
            });

            if (response.ok) {
                toast({
                    title: "Message sent successfully",
                    description: "The QR code owner will receive your message.",
                });
                setName('');
                setEmail('');
                setMessage('');
                setCaptchaToken(null);
                turnstile.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to send message. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                </label>
                <Input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1"
                />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1"
                />
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                </label>
                <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="mt-1"
                    rows={4}
                />
            </div>
            <Turnstile
                sitekey={turnstileSitekey || env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!}
                onVerify={(token) => setCaptchaToken(token)}
            />
            <Button type="submit" disabled={isSubmitting || !captchaToken}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
        </form>
    );
}

