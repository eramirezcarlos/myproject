'use client';

import { useState } from 'react';
import PageBreadcrumb from '@/components/dashboard/common/PageBreadcrumb';

// Import UI Components
import Breadcrumbs, { BreadcrumbSeparators } from '@/components/ui/breadcrumbs/Breadcrumbs';
import Button from '@/components/ui/button/Button';
import ButtonGroup, { ButtonGroupPresets } from '@/components/ui/button/ButtonGroup';
import Card, { CardHeader, CardTitle, CardContent, CardFooter, StatsCard } from '@/components/ui/card/Card';
import Select from '@/components/ui/dropdown/Select';
import Menu from '@/components/ui/dropdown/Menu';
import Spinner, { LoadingOverlay, Skeleton } from '@/components/ui/loading/Spinner';
import Tabs, { VerticalTabs } from '@/components/ui/tabs/Tabs';
import Tooltip, { InfoTooltip, HelpTooltip } from '@/components/ui/tooltip/Tooltip';

export default function UIElementsPage() {
  const [selectedValue, setSelectedValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('buttons');

  // Sample data for components
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { label: 'Components', href: '/dashboard/components' },
    { label: 'UI Elements' }
  ];

  const selectOptions = [
    { value: 'option1', label: 'Option 1', icon: '📝' },
    { value: 'option2', label: 'Option 2', icon: '🎨' },
    { value: 'option3', label: 'Option 3', icon: '⚙️' },
    { value: 'option4', label: 'Option 4 (Disabled)', disabled: true }
  ];

  const menuItems = [
    { id: 'edit', label: 'Edit', icon: '✏️', onClick: () => alert('Edit clicked') },
    { id: 'duplicate', label: 'Duplicate', icon: '📋', onClick: () => alert('Duplicate clicked') },
    { id: 'separator1', label: '', separator: true },
    { id: 'archive', label: 'Archive', icon: '📦', onClick: () => alert('Archive clicked') },
    { id: 'delete', label: 'Delete', icon: '🗑️', danger: true, onClick: () => alert('Delete clicked') }
  ];

  const tabItems = [
    {
      id: 'buttons',
      label: 'Buttons',
      icon: '🔘',
      content: <ButtonsDemo />
    },
    {
      id: 'cards',
      label: 'Cards',
      icon: '🃏',
      badge: '4',
      content: <CardsDemo />
    },
    {
      id: 'forms',
      label: 'Forms',
      icon: '📝',
      content: <FormsDemo selectedValue={selectedValue} setSelectedValue={setSelectedValue} selectOptions={selectOptions} />
    },
    {
      id: 'loading',
      label: 'Loading',
      icon: '⏳',
      content: <LoadingDemo isLoading={isLoading} setIsLoading={setIsLoading} />
    }
  ];

  const verticalTabItems = [
    {
      id: 'overview',
      label: 'Overview',
      content: <div className="p-4">Overview content goes here...</div>
    },
    {
      id: 'settings',
      label: 'Settings',
      content: <div className="p-4">Settings content goes here...</div>
    },
    {
      id: 'notifications',
      label: 'Notifications',
      badge: '3',
      content: <div className="p-4">Notifications content goes here...</div>
    }
  ];

  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="UI Elements" />
      
      <div className="mb-8">
        <p className="text-gray-600 dark:text-gray-400">
          Comprehensive showcase of all available UI components and their variations.
        </p>
      </div>

      {/* Breadcrumbs Section */}
      <Card>
        <CardHeader>
          <CardTitle>Breadcrumbs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Default Breadcrumbs</h4>
              <Breadcrumbs items={breadcrumbItems} />
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">With Different Separators</h4>
              <div className="space-y-2">
                <Breadcrumbs items={breadcrumbItems} separator={BreadcrumbSeparators.chevron} />
                <Breadcrumbs items={breadcrumbItems} separator={BreadcrumbSeparators.arrow} />
                <Breadcrumbs items={breadcrumbItems} separator={BreadcrumbSeparators.dot} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
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

      {/* Tooltips Section */}
      <Card>
        <CardHeader>
          <CardTitle>Tooltips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center">
            <Tooltip content="This is a top tooltip" position="top">
              <Button variant="outline">Top Tooltip</Button>
            </Tooltip>
            
            <Tooltip content="This is a bottom tooltip" position="bottom">
              <Button variant="outline">Bottom Tooltip</Button>
            </Tooltip>
            
            <Tooltip content="This is a left tooltip" position="left">
              <Button variant="outline">Left Tooltip</Button>
            </Tooltip>
            
            <Tooltip content="This is a right tooltip" position="right">
              <Button variant="outline">Right Tooltip</Button>
            </Tooltip>

            <div className="flex items-center gap-2">
              <span>Need help?</span>
              <InfoTooltip content="This is helpful information about this feature." />
            </div>

            <div className="flex items-center gap-2">
              <span>Complex feature</span>
              <HelpTooltip content="Click here to learn more about how this works." trigger="click" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Dropdown */}
      <Card>
        <CardHeader>
          <CardTitle>Menu Dropdowns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Menu
              trigger={<Button variant="outline">Actions Menu</Button>}
              items={menuItems}
              position="bottom-left"
            />
            
            <Menu
              trigger={<Button variant="outline">⋯</Button>}
              items={menuItems}
              position="bottom-right"
            />
          </div>
        </CardContent>
      </Card>

      {/* Vertical Tabs Example */}
      <Card>
        <CardHeader>
          <CardTitle>Vertical Tabs</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <VerticalTabs
            items={verticalTabItems}
            defaultActiveTab="overview"
            tabWidth="160px"
          />
        </CardContent>
      </Card>
    </div>
  );
}

// Demo Components
function ButtonsDemo() {
  const [loading, setLoading] = useState(false);

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Button Variants</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="default">Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Button Sizes</h3>
        <div className="flex flex-wrap gap-3 items-center">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Button States</h3>
        <div className="flex flex-wrap gap-3">
          <Button disabled>Disabled</Button>
          <Button loading={loading} onClick={simulateLoading}>
            {loading ? 'Loading...' : 'Click to Load'}
          </Button>
          <Button leftIcon="📧">With Left Icon</Button>
          <Button rightIcon="→">With Right Icon</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Button Groups</h3>
        <div className="space-y-4">
          <ButtonGroup orientation="horizontal">
            <Button variant="outline">Left</Button>
            <Button variant="outline">Center</Button>
            <Button variant="outline">Right</Button>
          </ButtonGroup>

          <ButtonGroup orientation="vertical" className="w-fit">
            <Button variant="outline">Top</Button>
            <Button variant="outline">Middle</Button>
            <Button variant="outline">Bottom</Button>
          </ButtonGroup>

          <div className="bg-gray-100 p-1 rounded-lg w-fit dark:bg-gray-800">
            <ButtonGroup {...ButtonGroupPresets.segmented}>
              <Button>View</Button>
              <Button>Edit</Button>
              <Button>Share</Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardsDemo() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Total Users"
          value="12,345"
          change={{ value: "+12%", type: "increase" }}
          icon="👥"
        />
        
        <StatsCard
          title="Revenue"
          value="$45,678"
          change={{ value: "-5%", type: "decrease" }}
          icon="💰"
        />
        
        <StatsCard
          title="Orders"
          value="1,234"
          change={{ value: "0%", type: "neutral" }}
          icon="📦"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="elevated" padding="lg">
          <CardHeader actions={<Button size="sm">Action</Button>}>
            <CardTitle level={2}>Elevated Card</CardTitle>
          </CardHeader>
          <CardContent>
            This is an elevated card with a shadow and rounded corners.
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">Cancel</Button>
            <Button size="sm">Save</Button>
          </CardFooter>
        </Card>

        <Card variant="outlined" padding="lg">
          <CardHeader>
            <CardTitle level={2}>Outlined Card</CardTitle>
          </CardHeader>
          <CardContent>
            This is an outlined card with a border.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function FormsDemo({ selectedValue, setSelectedValue, selectOptions }: {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  selectOptions: Array<{ value: string; label: string; icon?: string; disabled?: boolean }>;
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Select Components</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Basic Select</label>
              <Select
                options={selectOptions}
                value={selectedValue}
                onChange={setSelectedValue}
                placeholder="Choose an option..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Searchable Select</label>
              <Select
                options={selectOptions}
                searchable
                clearable
                placeholder="Search options..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Different Sizes</label>
              <div className="space-y-2">
                <Select options={selectOptions} size="sm" placeholder="Small select" />
                <Select options={selectOptions} size="md" placeholder="Medium select" />
                <Select options={selectOptions} size="lg" placeholder="Large select" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingDemo({ isLoading, setIsLoading }: {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}) {
  const toggleLoading = () => {
    setIsLoading(!isLoading);
    if (!isLoading) {
      setTimeout(() => setIsLoading(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Spinner Variants</h3>
        <div className="flex flex-wrap gap-6 items-center">
          <div className="text-center">
            <Spinner variant="circular" />
            <p className="text-sm mt-2">Circular</p>
          </div>
          <div className="text-center">
            <Spinner variant="dots" />
            <p className="text-sm mt-2">Dots</p>
          </div>
          <div className="text-center">
            <Spinner variant="pulse" />
            <p className="text-sm mt-2">Pulse</p>
          </div>
          <div className="text-center">
            <Spinner variant="bars" />
            <p className="text-sm mt-2">Bars</p>
          </div>
          <div className="text-center">
            <Spinner variant="ring" />
            <p className="text-sm mt-2">Ring</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Loading Overlay</h3>
        <Button onClick={toggleLoading}>
          {isLoading ? 'Stop Loading' : 'Start Loading'}
        </Button>
        <LoadingOverlay isLoading={isLoading} message="Loading content...">
          <Card className="mt-4" padding="lg">
            <CardContent>
              <p>This content will be covered by the loading overlay when loading is active.</p>
              <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </CardContent>
          </Card>
        </LoadingOverlay>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Skeleton Loaders</h3>
        <div className="space-y-4">
          <Skeleton variant="text" />
          <Skeleton variant="text" lines={3} />
          <div className="flex items-center space-x-4">
            <Skeleton variant="circular" width={40} height={40} />
            <div className="flex-1">
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </div>
          </div>
          <Skeleton variant="rectangular" height={200} />
        </div>
      </div>
    </div>
  );
}