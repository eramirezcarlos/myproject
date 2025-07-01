'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back, {user.name}!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Profile Information
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {user.name}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <p className="text-gray-700">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-gray-700">
                  <strong>User ID:</strong> {user.id}
                </p>
                <p className="text-gray-700">
                  <strong>Status:</strong> 
                  <span className="ml-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Authentication Info */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-green-600 rounded-full flex items-center justify-center">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Authentication
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      Authenticated
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <p className="text-gray-700">
                  ✅ Laravel Sanctum session active
                </p>
                <p className="text-gray-700">
                  ✅ CSRF protection enabled
                </p>
                <p className="text-gray-700">
                  ✅ Secure cookie authentication
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-purple-600 rounded-full flex items-center justify-center">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Quick Actions
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      Available
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm space-y-2">
                <button className="w-full text-left text-blue-600 hover:text-blue-900">
                  → Update Profile
                </button>
                <button className="w-full text-left text-blue-600 hover:text-blue-900">
                  → Change Password
                </button>
                <button className="w-full text-left text-blue-600 hover:text-blue-900">
                  → API Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* API Integration Status */}
        <div className="mt-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                API Integration Status
              </h3>
              <div className="mt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Backend</h4>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        Laravel 12 API
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        Laravel Breeze Authentication
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        Laravel Sanctum
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Frontend</h4>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        Next.js 15
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        React 19 Support
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        Tailwind CSS
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}