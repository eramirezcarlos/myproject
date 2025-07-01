'use client';

import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Welcome to Laravel + Next.js SPA
          </h1>
          
          {loading ? (
            <div className="animate-pulse">
              <div className="bg-gray-200 h-4 w-64 mx-auto rounded mb-4"></div>
              <div className="bg-gray-200 h-4 w-48 mx-auto rounded"></div>
            </div>
          ) : user ? (
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Hello, {user.name}! 👋
              </h2>
              <p className="text-gray-600 mb-4">
                You are successfully authenticated with Laravel Breeze API.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <p className="text-green-800 text-sm">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-green-800 text-sm">
                  <strong>User ID:</strong> {user.id}
                </p>
                {user.email_verified_at && (
                  <p className="text-green-800 text-sm">
                    <strong>Verified:</strong> ✅
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Ready to get started?
              </h2>
              <p className="text-gray-600 mb-6">
                This is a Laravel Breeze API backend with a Next.js 15 frontend. 
                Create an account or log in to see the authentication in action!
              </p>
              <div className="space-y-3">
                <a
                  href="/register"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md text-center transition-colors"
                >
                  Create Account
                </a>
                <a
                  href="/login"
                  className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md text-center transition-colors"
                >
                  Sign In
                </a>
              </div>
            </div>
          )}

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                🚀 Laravel 12 API
              </h3>
              <p className="text-gray-600 text-sm">
                Powered by Laravel Breeze for authentication with secure API endpoints.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                ⚡ Next.js 15
              </h3>
              <p className="text-gray-600 text-sm">
                Modern React framework with App Router and Turbopack support.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                🎨 Tailwind CSS
              </h3>
              <p className="text-gray-600 text-sm">
                Utility-first CSS framework for rapid UI development.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}



