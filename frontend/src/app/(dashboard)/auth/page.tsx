'use client';

import { useState } from 'react';
import PageBreadcrumb from '@/components/dashboard/common/PageBreadcrumb';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import Button from '@/components/ui/button/Button';
import ButtonGroup from '@/components/ui/button/ButtonGroup';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card/Card';
import Tabs from '@/components/ui/tabs/Tabs';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Tooltip from '@/components/ui/tooltip/Tooltip';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');
  const [qrCode] = useState('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0id2hpdGUiLz4KICA8dGV4dCB4PSI3NSIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iYmxhY2siPkZha2UgUVIgQ29kZTwvdGV4dD4KPC9zdmc+');

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { label: 'Authentication' }
  ];

  const tabItems = [
    { id: 'login', label: 'Login', icon: '🔑' },
    { id: 'register', label: 'Register', icon: '👤' },
    { id: 'reset', label: 'Reset', icon: '🔄' },
    { id: '2fa', label: '2FA', icon: '🔐' }
  ];

  const socialProviders = [
    { name: 'Google', icon: '🟢', color: 'bg-red-500 hover:bg-red-600' },
    { name: 'Facebook', icon: '🔵', color: 'bg-blue-600 hover:bg-blue-700' },
    { name: 'Twitter', icon: '🐦', color: 'bg-sky-500 hover:bg-sky-600' },
    { name: 'GitHub', icon: '⚫', color: 'bg-gray-800 hover:bg-gray-900' },
    { name: 'LinkedIn', icon: '💼', color: 'bg-blue-700 hover:bg-blue-800' },
    { name: 'Apple', icon: '🍎', color: 'bg-black hover:bg-gray-900' }
  ];

  const renderLoginForm = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome back! Please enter your details.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="login-email">Email address</Label>
          <Input
            id="login-email"
            type="email"
            placeholder="john@example.com"
            disabled
          />
        </div>

        <div>
          <div className="flex justify-between items-center">
            <Label htmlFor="login-password">Password</Label>
            <button className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Forgot password?
            </button>
          </div>
          <Input
            id="login-password"
            type="password"
            placeholder="••••••••"
            disabled
          />
        </div>

        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            disabled
          />
          <Label htmlFor="remember-me" className="ml-2 text-sm">
            Remember me
          </Label>
        </div>
      </div>

      <Button className="w-full" disabled>
        Sign in
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500 dark:bg-gray-900 dark:text-gray-400">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {socialProviders.slice(0, 4).map((provider) => (
          <Button
            key={provider.name}
            variant="outline"
            className="w-full"
            disabled
          >
            <span className="mr-2">{provider.icon}</span>
            {provider.name}
          </Button>
        ))}
      </div>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Don't have an account?{' '}
        <button className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
          Sign up
        </button>
      </p>
    </div>
  );

  const renderRegisterForm = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create your account
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Join us today! It's quick and easy.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="first-name">First name</Label>
            <Input
              id="first-name"
              type="text"
              placeholder="John"
              disabled
            />
          </div>
          <div>
            <Label htmlFor="last-name">Last name</Label>
            <Input
              id="last-name"
              type="text"
              placeholder="Doe"
              disabled
            />
          </div>
        </div>

        <div>
          <Label htmlFor="register-email">Email address</Label>
          <Input
            id="register-email"
            type="email"
            placeholder="john@example.com"
            disabled
          />
        </div>

        <div>
          <Label htmlFor="register-password">Password</Label>
          <Input
            id="register-password"
            type="password"
            placeholder="••••••••"
            disabled
          />
          <div className="mt-2 space-y-1">
            <div className="flex items-center text-xs">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              <span className="text-gray-600 dark:text-gray-400">At least 8 characters</span>
            </div>
            <div className="flex items-center text-xs">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              <span className="text-gray-600 dark:text-gray-400">Contains uppercase letter</span>
            </div>
            <div className="flex items-center text-xs">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
              <span className="text-gray-600 dark:text-gray-400">Contains number</span>
            </div>
            <div className="flex items-center text-xs">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              <span className="text-gray-600 dark:text-gray-400">Contains special character</span>
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="confirm-password">Confirm password</Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="••••••••"
            disabled
          />
        </div>

        <div className="flex items-start">
          <input
            id="terms"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
            disabled
          />
          <Label htmlFor="terms" className="ml-2 text-sm">
            I agree to the{' '}
            <button className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Terms of Service
            </button>{' '}
            and{' '}
            <button className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Privacy Policy
            </button>
          </Label>
        </div>
      </div>

      <Button className="w-full" disabled>
        Create account
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500 dark:bg-gray-900 dark:text-gray-400">
            Or sign up with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {socialProviders.slice(0, 6).map((provider) => (
          <Tooltip key={provider.name} content={`Sign up with ${provider.name}`}>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              disabled
            >
              {provider.icon}
            </Button>
          </Tooltip>
        ))}
      </div>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{' '}
        <button className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
          Sign in
        </button>
      </p>
    </div>
  );

  const renderResetForm = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Reset your password
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Enter your email and we'll send you a link to reset your password.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="reset-email">Email address</Label>
          <Input
            id="reset-email"
            type="email"
            placeholder="john@example.com"
            disabled
          />
        </div>
      </div>

      <Button className="w-full" disabled>
        Send reset link
      </Button>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <span className="text-blue-500">ℹ️</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
              What happens next?
            </h3>
            <div className="mt-2 text-sm text-blue-700 dark:text-blue-400">
              <ul className="list-disc list-inside space-y-1">
                <li>We'll send a secure link to your email</li>
                <li>Click the link to create a new password</li>
                <li>The link expires in 24 hours for security</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <span className="text-yellow-500">⚠️</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
              Security tip
            </h3>
            <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-400">
              If you don't receive an email within 5 minutes, check your spam folder or try again.
            </p>
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Remember your password?{' '}
        <button className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
          Sign in
        </button>
      </p>
    </div>
  );

  const render2FAForm = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Two-Factor Authentication
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Secure your account with an additional layer of protection.
        </p>
      </div>

      <Tabs
        items={[
          { id: 'setup', label: 'Setup', icon: '⚙️' },
          { id: 'verify', label: 'Verify', icon: '✅' }
        ]}
        defaultActive="setup"
        variant="pills"
      >
        <div data-tab="setup" className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Setup Authenticator App
            </h3>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 inline-block">
              <img 
                src={qrCode} 
                alt="QR Code for 2FA setup" 
                className="mx-auto mb-4"
                width={150}
                height={150}
              />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Scan this QR code with your authenticator app
              </p>
            </div>

            <div className="mt-6">
              <Label>Or enter this code manually:</Label>
              <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg font-mono text-sm">
                JBSWY3DPEHPK3PXP
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Recommended Authenticator Apps:
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center">
                <span className="mr-2">📱</span>
                Google Authenticator
              </li>
              <li className="flex items-center">
                <span className="mr-2">🔐</span>
                Authy
              </li>
              <li className="flex items-center">
                <span className="mr-2">🔑</span>
                Microsoft Authenticator
              </li>
              <li className="flex items-center">
                <span className="mr-2">🛡️</span>
                1Password
              </li>
            </ul>
          </div>
        </div>

        <div data-tab="verify" className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Verify Setup
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Enter the 6-digit code from your authenticator app
            </p>
          </div>

          <div className="flex justify-center">
            <div className="flex space-x-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Input
                  key={i}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center text-lg font-bold"
                  disabled
                />
              ))}
            </div>
          </div>

          <Button className="w-full" disabled>
            Verify and Enable 2FA
          </Button>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="text-green-500">✅</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800 dark:text-green-300">
                  Recovery Codes
                </h3>
                <p className="mt-1 text-sm text-green-700 dark:text-green-400 mb-2">
                  Save these backup codes in a secure location:
                </p>
                <div className="grid grid-cols-2 gap-2 font-mono text-xs bg-white dark:bg-gray-800 p-3 rounded">
                  <div>12345-67890</div>
                  <div>09876-54321</div>
                  <div>11111-22222</div>
                  <div>33333-44444</div>
                  <div>55555-66666</div>
                  <div>77777-88888</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Tabs>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">
              Current Status
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Two-factor authentication is disabled
            </p>
          </div>
          <div className="flex items-center">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
              🔴 Disabled
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'login':
        return renderLoginForm();
      case 'register':
        return renderRegisterForm();
      case 'reset':
        return renderResetForm();
      case '2fa':
        return render2FAForm();
      default:
        return renderLoginForm();
    }
  };

  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Authentication" />
      
      <div className="mb-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Authentication Examples
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Visual examples of authentication forms and flows (display only)
          </p>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <span className="text-yellow-600 dark:text-yellow-400">⚠️</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
              Display Only
            </h3>
            <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-400">
              These are visual examples for demonstration purposes only. All form inputs are disabled and non-functional.
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Tabs
            items={tabItems}
            defaultActive="login"
            onTabChange={setActiveTab}
            variant="underline"
            className="border-b border-gray-200 dark:border-gray-700"
          >
            <div className="p-8">
              <div className="max-w-md mx-auto">
                {renderTabContent()}
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Login Methods
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  6
                </p>
              </div>
              <div className="p-3 bg-blue-100 text-blue-600 rounded-full dark:bg-blue-900/20 dark:text-blue-400">
                🔑
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Security Level
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  High
                </p>
              </div>
              <div className="p-3 bg-green-100 text-green-600 rounded-full dark:bg-green-900/20 dark:text-green-400">
                🛡️
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  2FA Status
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  Ready
                </p>
              </div>
              <div className="p-3 bg-purple-100 text-purple-600 rounded-full dark:bg-purple-900/20 dark:text-purple-400">
                🔐
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Social Logins
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {socialProviders.length}
                </p>
              </div>
              <div className="p-3 bg-orange-100 text-orange-600 rounded-full dark:bg-orange-900/20 dark:text-orange-400">
                🌐
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}