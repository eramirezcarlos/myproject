'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserMetaCard from '@/components/user-profile/UserMetaCard';
import UserInfoCard from '@/components/user-profile/UserInfoCard';
import PageBreadcrumb from '@/components/dashboard/common/PageBreadcrumb';

export default function ProfilePage() {
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
      <PageBreadcrumb pageTitle="Profile" />
      
      {/* Profile Description */}
      <div className="mb-8">
        <p className="text-gray-600 dark:text-gray-400">
          Manage your profile information and settings
        </p>
      </div>

      {/* TailAdmin Profile Components */}
      <div className="space-y-6">
        <UserMetaCard />
        <UserInfoCard />
      </div>
    </div>
  );
}