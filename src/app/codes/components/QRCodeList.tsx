'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Pencil, Trash } from 'lucide-react';

interface QRCodeItem {
    id: string;
    title: string;
    description: string;
    contactInfo: string;
    scans: number;
}

export default function QRCodeList() {
    const [qrCodes, setQRCodes] = useState<QRCodeItem[]>([]);

    useEffect(() => {
        fetchQRCodes();
    }, []);

    const fetchQRCodes = async () => {
        const response = await fetch('/api/qrcodes');
        const data = await response.json();
        setQRCodes(data);
    };

    const handleDelete = async (id: string) => {
        await fetch(`/api/qrcodes/${id}`, { method: 'DELETE' });
        fetchQRCodes();
    };

    return (
        <div className="space-y-4">
            {qrCodes.map((qrCode) => (
                <div key={qrCode.id} className="bg-white shadow rounded-lg p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-semibold">{qrCode.title}</h3>
                            <p className="text-gray-600">{qrCode.description}</p>
                            <p className="text-sm text-gray-500 mt-2">Scans: {qrCode.scans}</p>
                        </div>
                        <div className="flex space-x-2">
                            <button className="p-2 bg-blue-100 text-blue-600 rounded-full">
                                <Pencil size={16} />
                            </button>
                            <button
                                className="p-2 bg-red-100 text-red-600 rounded-full"
                                onClick={() => handleDelete(qrCode.id)}
                            >
                                <Trash size={16} />
                            </button>
                        </div>
                    </div>
                    <div className="mt-4">
                        <QRCodeSVG value={`https://anocontact.com/contact/${qrCode.id}`} size={128} />
                    </div>
                </div>
            ))}
        </div>
    );
}

