'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { EcommerceMetrics } from '@/components/dashboard/ecommerce/EcommerceMetrics';
import BasicTableOne from '@/components/dashboard/tables/BasicTableOne';
import PageBreadcrumb from '@/components/dashboard/common/PageBreadcrumb';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Page Breadcrumb */}
      <PageBreadcrumb pageTitle="Dashboard" />
      
      {/* Welcome Message */}
      <div className="mb-8">
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back, {user.name}!
        </p>
      </div>

      {/* Dashboard Metrics */}
      <EcommerceMetrics />
      
      {/* Recent Users Table */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Recent Users
        </h3>
        <BasicTableOne />
      </div>

      {/* User Profile Quick View */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Profile Overview
          </h3>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Personal Information
              </h4>
              <div className="space-y-1">
                <div className="flex items-center text-sm">
                  <strong className="text-gray-700 dark:text-gray-300">Name:</strong>
                  <span className="ml-2 text-gray-900 dark:text-white">{user.name}</span>
                </div>
                <div className="flex items-center text-sm">
                  <strong className="text-gray-700 dark:text-gray-300">Email:</strong>
                  <span className="ml-2 text-gray-900 dark:text-white">{user.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <strong className="text-gray-700 dark:text-gray-300">Status:</strong>
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Active
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Account Details
              </h4>
              <div className="space-y-1">
                <div className="flex items-center text-sm">
                  <strong className="text-gray-700 dark:text-gray-300">User ID:</strong>
                  <span className="ml-2 text-gray-900 dark:text-white">{user.id}</span>
                </div>
                <div className="flex items-center text-sm">
                  <strong className="text-gray-700 dark:text-gray-300">Verified:</strong>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {user.email_verified_at ? '✅' : '❌'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}