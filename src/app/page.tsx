import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">AnoContact</h1>
          <div>
            <Link href="/login">
              <Button variant="ghost" className="mr-2">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Anonymous Contact Made Easy</h2>
        <p className="text-xl text-gray-600 mb-8">Create QR codes for anonymous communication. Perfect for lost and found, vehicle contact, and more.</p>
        <Link href="/register">
          <Button size="lg" className="text-lg px-8 py-4">Get Started</Button>
        </Link>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Easy Setup</h3>
            <p>Create your QR code in minutes. No technical skills required.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
            <p>Keep your personal information private while still being reachable.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Versatile Use</h3>
            <p>Perfect for vehicles, pets, valuable items, and more.</p>
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center text-gray-600">
        <p>&copy; 2023 AnoContact. All rights reserved.</p>
      </footer>
    </div>
  );
}

