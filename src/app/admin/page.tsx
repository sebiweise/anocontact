import { auth } from "@/server/auth";
import { db } from "@/server/db";

export default async function AdminDashboard() {
    const session = await auth();

    if (!session?.user) {
        return <div>Please sign in to view this page.</div>;
    }

    if (session.user.email !== 'admin@example.com') {
        return <div>You do not have permission to view this page.</div>;
    }

    const user = await db.user.findUnique({ where: { email: session.user.email } });
    const totalUsers = await db.user.count();
    const totalQRCodes = await db.qRCode.count();
    const totalScans = await db.qRCode.aggregate({
        _sum: {
            scans: true,
        },
    });

    const recentQRCodes = await db.qRCode.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { user: true },
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white shadow rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Total Users</h2>
                    <p className="text-3xl font-bold">{totalUsers}</p>
                </div>
                <div className="bg-white shadow rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Total QR Codes</h2>
                    <p className="text-3xl font-bold">{totalQRCodes}</p>
                </div>
                <div className="bg-white shadow rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Total Scans</h2>
                    <p className="text-3xl font-bold">{totalScans._sum.scans || 0}</p>
                </div>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
                <h2 className="text-2xl font-semibold mb-4">Recent QR Codes</h2>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-left">Title</th>
                            <th className="text-left">User</th>
                            <th className="text-left">Created At</th>
                            <th className="text-left">Scans</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentQRCodes.map((qrCode) => (
                            <tr key={qrCode.id}>
                                <td>{qrCode.title}</td>
                                <td>{qrCode.user.email}</td>
                                <td>{qrCode.createdAt.toLocaleDateString()}</td>
                                <td>{qrCode.scans}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

