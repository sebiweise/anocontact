import { db } from '@/server/db';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { env } from "@/env";

const resend = new Resend(env.RESEND_API_KEY);

async function verifyCaptcha(token: string, secret: string) {
    const response = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                secret: secret,
                response: token,
            }),
        }
    );

    const data = await response.json();
    return data.success;
}

export async function POST(req: Request) {
    try {
        const { qrCodeId, name, email, message, captchaToken } = await req.json();

        const qrCode = await db.qRCode.findUnique({
            where: { id: qrCodeId },
            include: { user: true },
        });

        if (!qrCode) {
            return new NextResponse("QR Code not found", { status: 404 });
        }

        // Verify CAPTCHA
        const isCaptchaValid = await verifyCaptcha(
            captchaToken,
            qrCode.turnstileSecretKey || env.CLOUDFLARE_TURNSTILE_SECRET_KEY!
        );

        if (!isCaptchaValid) {
            return new NextResponse("Invalid CAPTCHA", { status: 400 });
        }

        // Send email to the QR code owner
        await resend.emails.send({
            from: 'AnoContact <noreply@anocontact.com>',
            to: qrCode.user.email,
            subject: `New message from your QR Code: ${qrCode.title}`,
            html: `
        <h1>New message from your QR Code</h1>
        <p><strong>QR Code:</strong> ${qrCode.title}</p>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error sending message:', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

