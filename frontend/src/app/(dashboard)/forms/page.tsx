'use client';

import { useState } from 'react';
import PageBreadcrumb from '@/components/dashboard/common/PageBreadcrumb';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import Button from '@/components/ui/button/Button';
import ButtonGroup from '@/components/ui/button/ButtonGroup';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card/Card';
import Select from '@/components/ui/dropdown/Select';
import { LoadingOverlay } from '@/components/ui/loading/Spinner';
import Tabs from '@/components/ui/tabs/Tabs';
import { InfoTooltip } from '@/components/ui/tooltip/Tooltip';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';

interface FormData {
  [key: string]: string | boolean | File | null;
}

interface FormErrors {
  [key: string]: string;
}

interface FormAlert {
  type: 'success' | 'error' | 'info';
  message: string;
  show: boolean;
}

const countryOptions = [
  { value: 'us', label: '🇺🇸 United States', icon: '🇺🇸' },
  { value: 'ca', label: '🇨🇦 Canada', icon: '🇨🇦' },
  { value: 'uk', label: '🇬🇧 United Kingdom', icon: '🇬🇧' },
  { value: 'de', label: '🇩🇪 Germany', icon: '🇩🇪' },
  { value: 'fr', label: '🇫🇷 France', icon: '🇫🇷' },
  { value: 'mx', label: '🇲🇽 Mexico', icon: '🇲🇽' }
];

const roleOptions = [
  { value: 'admin', label: '👑 Administrator', icon: '👑' },
  { value: 'user', label: '👤 User', icon: '👤' },
  { value: 'moderator', label: '🛡️ Moderator', icon: '🛡️' },
  { value: 'guest', label: '👁️ Guest', icon: '👁️' }
];

const themeOptions = [
  { value: 'light', label: '☀️ Light', icon: '☀️' },
  { value: 'dark', label: '🌙 Dark', icon: '🌙' },
  { value: 'auto', label: '🔄 Auto', icon: '🔄' }
];

export default function FormsPage() {
  const [activeTab, setActiveTab] = useState('contact');
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<FormAlert>({ type: 'info', message: '', show: false });
  
  // Form states
  const [contactForm, setContactForm] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [registrationForm, setRegistrationForm] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    country: '',
    role: 'user',
    agreeTerms: false,
    newsletter: false
  });
  
  const [settingsForm, setSettingsForm] = useState<FormData>({
    displayName: '',
    email: '',
    theme: 'light',
    language: 'en',
    notifications: true,
    publicProfile: false,
    twoFactor: false
  });
  
  const [uploadForm, setUploadForm] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    file: null
  });
  
  const [wizardStep, setWizardStep] = useState(0);
  const [wizardForm, setWizardForm] = useState<FormData>({
    // Step 1: Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Step 2: Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    // Step 3: Preferences
    theme: 'light',
    notifications: true,
    newsletter: false
  });
  
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState<FormErrors>({});

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { label: 'Forms' }
  ];

  const showAlert = (type: FormAlert['type'], message: string) => {
    setAlert({ type, message, show: true });
    setTimeout(() => setAlert(prev => ({ ...prev, show: false })), 5000);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (formData: FormData, formType: string): FormErrors => {
    const newErrors: FormErrors = {};
    
    switch (formType) {
      case 'contact':
        if (!formData.name || (formData.name as string).trim().length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
        }
        if (!formData.email || !validateEmail(formData.email as string)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.message || (formData.message as string).trim().length < 10) {
          newErrors.message = 'Message must be at least 10 characters';
        }
        break;
        
      case 'registration':
        if (!formData.firstName || (formData.firstName as string).trim().length < 2) {
          newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName || (formData.lastName as string).trim().length < 2) {
          newErrors.lastName = 'Last name is required';
        }
        if (!formData.email || !validateEmail(formData.email as string)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.password || (formData.password as string).length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
        }
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!formData.agreeTerms) {
          newErrors.agreeTerms = 'You must agree to the terms and conditions';
        }
        break;
        
      case 'upload':
        if (!formData.title || (formData.title as string).trim().length < 3) {
          newErrors.title = 'Title must be at least 3 characters';
        }
        if (!formData.file) {
          newErrors.file = 'Please select a file to upload';
        }
        break;
    }
    
    return newErrors;
  };

  const handleSubmit = async (formData: FormData, formType: string) => {
    const formErrors = validateForm(formData, formType);
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length > 0) {
      showAlert('error', 'Please fix the errors below');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    showAlert('success', `${formType} form submitted successfully!`);
    
    // Reset form based on type
    switch (formType) {
      case 'contact':
        setContactForm({ name: '', email: '', subject: '', message: '' });
        break;
      case 'registration':
        setRegistrationForm({
          firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
          birthDate: '', country: '', role: 'user', agreeTerms: false, newsletter: false
        });
        break;
      case 'upload':
        setUploadForm({ title: '', description: '', category: '', file: null });
        setUploadProgress(0);
        break;
    }
  };

  const simulateUpload = async () => {
    setUploadProgress(0);
    const totalSteps = 20;
    
    for (let i = 0; i <= totalSteps; i++) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setUploadProgress((i / totalSteps) * 100);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadForm(prev => ({ ...prev, file }));
      await simulateUpload();
    }
  };

  const wizardSteps = [
    {
      id: 'personal',
      label: 'Personal Info',
      icon: '👤',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                value={wizardForm.firstName as string}
                onChange={(e) => setWizardForm(prev => ({ ...prev, firstName: e.target.value }))}
                placeholder="Enter your first name"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                value={wizardForm.lastName as string}
                onChange={(e) => setWizardForm(prev => ({ ...prev, lastName: e.target.value }))}
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={wizardForm.email as string}
                onChange={(e) => setWizardForm(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={wizardForm.phone as string}
                onChange={(e) => setWizardForm(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter your phone number"
              />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'address',
      label: 'Address',
      icon: '🏠',
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="address">Street Address</Label>
            <Input
              id="address"
              type="text"
              value={wizardForm.address as string}
              onChange={(e) => setWizardForm(prev => ({ ...prev, address: e.target.value }))}
              placeholder="Enter your street address"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                type="text"
                value={wizardForm.city as string}
                onChange={(e) => setWizardForm(prev => ({ ...prev, city: e.target.value }))}
                placeholder="City"
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                type="text"
                value={wizardForm.state as string}
                onChange={(e) => setWizardForm(prev => ({ ...prev, state: e.target.value }))}
                placeholder="State"
              />
            </div>
            <div>
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                type="text"
                value={wizardForm.zipCode as string}
                onChange={(e) => setWizardForm(prev => ({ ...prev, zipCode: e.target.value }))}
                placeholder="ZIP Code"
              />
            </div>
          </div>
          
          <div>
            <Label>Country</Label>
            <Select
              options={countryOptions}
              value={wizardForm.country as string}
              onChange={(value) => setWizardForm(prev => ({ ...prev, country: value }))}
              placeholder="Select your country"
            />
          </div>
        </div>
      )
    },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: '⚙️',
      content: (
        <div className="space-y-4">
          <div>
            <Label>Theme Preference</Label>
            <Select
              options={themeOptions}
              value={wizardForm.theme as string}
              onChange={(value) => setWizardForm(prev => ({ ...prev, theme: value }))}
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label>Email Notifications</Label>
                <InfoTooltip content="Receive updates about your account via email" />
              </div>
              <input
                type="checkbox"
                checked={wizardForm.notifications as boolean}
                onChange={(e) => setWizardForm(prev => ({ ...prev, notifications: e.target.checked }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Subscribe to Newsletter</Label>
              <input
                type="checkbox"
                checked={wizardForm.newsletter as boolean}
                onChange={(e) => setWizardForm(prev => ({ ...prev, newsletter: e.target.checked }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
      )
    }
  ];

  const tabItems = [
    {
      id: 'contact',
      label: 'Contact Form',
      icon: '📞',
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactName">Full Name</Label>
                  <Input
                    id="contactName"
                    type="text"
                    value={contactForm.name as string}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <Label htmlFor="contactEmail">Email Address</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={contactForm.email as string}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>
              
              <div>
                <Label htmlFor="contactSubject">Subject</Label>
                <Input
                  id="contactSubject"
                  type="text"
                  value={contactForm.subject as string}
                  onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="What is this about?"
                />
              </div>
              
              <div>
                <Label htmlFor="contactMessage">Message</Label>
                <textarea
                  id="contactMessage"
                  value={contactForm.message as string}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Tell us more..."
                  rows={4}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white ${errors.message ? 'border-red-500' : ''}`}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <ButtonGroup>
              <Button
                variant="outline"
                onClick={() => setContactForm({ name: '', email: '', subject: '', message: '' })}
                disabled={isLoading}
              >
                Reset
              </Button>
              <Button
                onClick={() => handleSubmit(contactForm, 'contact')}
                loading={isLoading}
                leftIcon="📤"
              >
                Send Message
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      )
    },
    {
      id: 'registration',
      label: 'Registration',
      icon: '👤',
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="regFirstName">First Name</Label>
                  <Input
                    id="regFirstName"
                    type="text"
                    value={registrationForm.firstName as string}
                    onChange={(e) => setRegistrationForm(prev => ({ ...prev, firstName: e.target.value }))}
                    placeholder="First name"
                    className={errors.firstName ? 'border-red-500' : ''}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                
                <div>
                  <Label htmlFor="regLastName">Last Name</Label>
                  <Input
                    id="regLastName"
                    type="text"
                    value={registrationForm.lastName as string}
                    onChange={(e) => setRegistrationForm(prev => ({ ...prev, lastName: e.target.value }))}
                    placeholder="Last name"
                    className={errors.lastName ? 'border-red-500' : ''}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>
              
              <div>
                <Label htmlFor="regEmail">Email Address</Label>
                <Input
                  id="regEmail"
                  type="email"
                  value={registrationForm.email as string}
                  onChange={(e) => setRegistrationForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="regPassword">Password</Label>
                  <Input
                    id="regPassword"
                    type="password"
                    value={registrationForm.password as string}
                    onChange={(e) => setRegistrationForm(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter password"
                    className={errors.password ? 'border-red-500' : ''}
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                
                <div>
                  <Label htmlFor="regConfirmPassword">Confirm Password</Label>
                  <Input
                    id="regConfirmPassword"
                    type="password"
                    value={registrationForm.confirmPassword as string}
                    onChange={(e) => setRegistrationForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="Confirm password"
                    className={errors.confirmPassword ? 'border-red-500' : ''}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="regBirthDate">Birth Date</Label>
                  <Input
                    id="regBirthDate"
                    type="date"
                    value={registrationForm.birthDate as string}
                    onChange={(e) => setRegistrationForm(prev => ({ ...prev, birthDate: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label>Country</Label>
                  <Select
                    options={countryOptions}
                    value={registrationForm.country as string}
                    onChange={(value) => setRegistrationForm(prev => ({ ...prev, country: value }))}
                    placeholder="Select your country"
                  />
                </div>
              </div>
              
              <div>
                <Label>Account Role</Label>
                <Select
                  options={roleOptions}
                  value={registrationForm.role as string}
                  onChange={(value) => setRegistrationForm(prev => ({ ...prev, role: value }))}
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    checked={registrationForm.agreeTerms as boolean}
                    onChange={(e) => setRegistrationForm(prev => ({ ...prev, agreeTerms: e.target.checked }))}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <Label htmlFor="agreeTerms" className="text-sm">
                    I agree to the Terms and Conditions and Privacy Policy
                  </Label>
                </div>
                {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}
                
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="newsletter"
                    checked={registrationForm.newsletter as boolean}
                    onChange={(e) => setRegistrationForm(prev => ({ ...prev, newsletter: e.target.checked }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <Label htmlFor="newsletter" className="text-sm">
                    Subscribe to our newsletter for updates
                  </Label>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <ButtonGroup>
              <Button
                variant="outline"
                onClick={() => setRegistrationForm({
                  firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
                  birthDate: '', country: '', role: 'user', agreeTerms: false, newsletter: false
                })}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleSubmit(registrationForm, 'registration')}
                loading={isLoading}
                leftIcon="👤"
              >
                Create Account
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      )
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    type="text"
                    value={settingsForm.displayName as string}
                    onChange={(e) => setSettingsForm(prev => ({ ...prev, displayName: e.target.value }))}
                    placeholder="Your display name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="settingsEmail">Email Address</Label>
                  <Input
                    id="settingsEmail"
                    type="email"
                    value={settingsForm.email as string}
                    onChange={(e) => setSettingsForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Your email address"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Theme</Label>
                  <Select
                    options={themeOptions}
                    value={settingsForm.theme as string}
                    onChange={(value) => setSettingsForm(prev => ({ ...prev, theme: value }))}
                  />
                </div>
                
                <div>
                  <Label>Language</Label>
                  <Select
                    options={[
                      { value: 'en', label: '🇺🇸 English', icon: '🇺🇸' },
                      { value: 'es', label: '🇪🇸 Español', icon: '🇪🇸' },
                      { value: 'fr', label: '🇫🇷 Français', icon: '🇫🇷' },
                      { value: 'de', label: '🇩🇪 Deutsch', icon: '🇩🇪' }
                    ]}
                    value={settingsForm.language as string}
                    onChange={(value) => setSettingsForm(prev => ({ ...prev, language: value }))}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Privacy & Notifications</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates about your account</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settingsForm.notifications as boolean}
                      onChange={(e) => setSettingsForm(prev => ({ ...prev, notifications: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Public Profile</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Make your profile visible to others</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settingsForm.publicProfile as boolean}
                      onChange={(e) => setSettingsForm(prev => ({ ...prev, publicProfile: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label>Two-Factor Authentication</Label>
                      <InfoTooltip content="Add an extra layer of security to your account" />
                    </div>
                    <input
                      type="checkbox"
                      checked={settingsForm.twoFactor as boolean}
                      onChange={(e) => setSettingsForm(prev => ({ ...prev, twoFactor: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <ButtonGroup>
              <Button variant="outline" disabled={isLoading}>
                Reset to Defaults
              </Button>
              <Button
                onClick={() => showAlert('success', 'Settings saved successfully!')}
                loading={isLoading}
                leftIcon="💾"
              >
                Save Settings
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      )
    },
    {
      id: 'upload',
      label: 'File Upload',
      icon: '📁',
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Upload Files</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="uploadTitle">Title</Label>
                <Input
                  id="uploadTitle"
                  type="text"
                  value={uploadForm.title as string}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Give your file a title"
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>
              
              <div>
                <Label htmlFor="uploadDescription">Description</Label>
                <textarea
                  id="uploadDescription"
                  value={uploadForm.description as string}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your file (optional)"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
              </div>
              
              <div>
                <Label>Category</Label>
                <Select
                  options={[
                    { value: 'document', label: '📄 Document', icon: '📄' },
                    { value: 'image', label: '🖼️ Image', icon: '🖼️' },
                    { value: 'video', label: '🎥 Video', icon: '🎥' },
                    { value: 'audio', label: '🎵 Audio', icon: '🎵' },
                    { value: 'other', label: '📦 Other', icon: '📦' }
                  ]}
                  value={uploadForm.category as string}
                  onChange={(value) => setUploadForm(prev => ({ ...prev, category: value }))}
                  placeholder="Select file category"
                />
              </div>
              
              <div>
                <Label htmlFor="fileUpload">Choose File</Label>
                <input
                  id="fileUpload"
                  type="file"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.mp4,.mp3"
                />
                {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file}</p>}
              </div>
              
              {uploadProgress > 0 && (
                <div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <span>Upload Progress</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter>
            <ButtonGroup>
              <Button
                variant="outline"
                onClick={() => {
                  setUploadForm({ title: '', description: '', category: '', file: null });
                  setUploadProgress(0);
                }}
                disabled={isLoading}
              >
                Clear
              </Button>
              <Button
                onClick={() => handleSubmit(uploadForm, 'upload')}
                loading={isLoading}
                leftIcon="📤"
              >
                Upload File
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      )
    },
    {
      id: 'wizard',
      label: 'Multi-Step Wizard',
      icon: '🪄',
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Setup Wizard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                {wizardSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                      wizardStep >= index 
                        ? 'bg-blue-600 border-blue-600 text-white' 
                        : 'border-gray-300 text-gray-400'
                    }`}>
                      {wizardStep > index ? '✓' : index + 1}
                    </div>
                    <span className={`ml-2 text-sm ${
                      wizardStep >= index ? 'text-blue-600' : 'text-gray-400'
                    }`}>
                      {step.label}
                    </span>
                    {index < wizardSteps.length - 1 && (
                      <div className={`w-16 h-0.5 mx-4 ${
                        wizardStep > index ? 'bg-blue-600' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="min-h-[300px]">
              {wizardSteps[wizardStep].content}
            </div>
          </CardContent>
          <CardFooter>
            <ButtonGroup>
              <Button
                variant="outline"
                onClick={() => setWizardStep(Math.max(0, wizardStep - 1))}
                disabled={wizardStep === 0 || isLoading}
                leftIcon="←"
              >
                Previous
              </Button>
              
              {wizardStep < wizardSteps.length - 1 ? (
                <Button
                  onClick={() => setWizardStep(wizardStep + 1)}
                  disabled={isLoading}
                  rightIcon="→"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    showAlert('success', 'Wizard completed successfully!');
                    setWizardStep(0);
                  }}
                  loading={isLoading}
                  leftIcon="✨"
                >
                  Complete Setup
                </Button>
              )}
            </ButtonGroup>
          </CardFooter>
        </Card>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Forms" />
      
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Forms Showcase
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive examples of form components and patterns
          </p>
        </div>
      </div>

      {/* Alert */}
      {alert.show && (
        <div className={`p-4 rounded-md border ${
          alert.type === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400'
            : alert.type === 'error'
            ? 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400'
            : 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400'
        }`}>
          <div className="flex items-center">
            <span className="mr-2">
              {alert.type === 'success' ? '✅' : alert.type === 'error' ? '❌' : 'ℹ️'}
            </span>
            {alert.message}
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      <LoadingOverlay isLoading={isLoading} message="Processing form...">
        
        {/* Forms Tabs */}
        <Card>
          <CardContent className="p-0">
            <Tabs
              items={tabItems}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              variant="underline"
              size="md"
              className="p-6"
            />
          </CardContent>
        </Card>
        
      </LoadingOverlay>
    </div>
  );
}