import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FindMind - Find Your Perfect Therapist",
  description: "AI-powered therapist matching platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <nav className="sticky top-0 z-50 border-b bg-white shadow-sm backdrop-blur-sm bg-opacity-90">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
                <span className="text-3xl">🧠</span>
                <span>FindMind</span>
              </a>
              <div className="flex gap-1">
                <a
                  href="/"
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition"
                >
                  AI Chat
                </a>
                <a
                  href="/explore"
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition"
                >
                  Explore
                </a>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen">{children}</main>
        <footer className="bg-gray-900 text-white py-8 mt-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-2xl font-bold mb-2">🧠 FindMind</p>
                <p className="text-gray-400 text-sm">Find your perfect therapist match</p>
              </div>
              <div className="flex gap-6">
                <a href="/" className="text-gray-400 hover:text-white transition">AI Chat</a>
                <a href="/explore" className="text-gray-400 hover:text-white transition">Explore</a>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
              <p>&copy; 2025 FindMind. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

