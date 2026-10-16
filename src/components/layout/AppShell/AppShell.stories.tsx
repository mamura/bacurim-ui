
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Bell,
  LayoutDashboard,
  Settings,
  UserRound,
  Wallet,
} from 'lucide-react';

import { AppShell } from './AppShell';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import type { SidebarGroup } from '../Sidebar';

const meta = {
  title: 'Components/Layout/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AppShell>;

export default meta;

type Story = StoryObj<typeof meta>;

function NavigationPlaceholder() {
  return (
    <nav
      aria-label="Example navigation"
      className="flex h-full w-64 flex-col gap-6 bg-primary p-6 text-primary-contrast"
    >
      <span className="heading-sm">Navigation</span>

      <div className="flex flex-col gap-3">
        <span className="body-sm">Overview</span>
        <span className="body-sm">Transactions</span>
        <span className="body-sm">Settings</span>
      </div>
    </nav>
  );
}

function HeaderPlaceholder() {
  return (
    <div className="flex min-h-16 items-center justify-between gap-4 bg-primary px-6 py-3 text-primary-contrast">
      <span className="font-heading text-xl font-semibold">
        Example App
      </span>

      <span className="body-sm">Actions</span>
    </div>
  );
}

function ContentPlaceholder() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="heading-lg text-text-primary">
        Main content
      </h1>

      <p className="body-md text-text-secondary">
        This region expands to occupy the available space.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {['Content A', 'Content B'].map((item) => (
          <div
            key={item}
            className="rounded-md border border-border bg-surface p-6 shadow-sm"
          >
            <span className="body-md text-text-primary">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export const Default: Story = {
  args: {
    navigation: <NavigationPlaceholder />,
    header: <HeaderPlaceholder />,
    children: <ContentPlaceholder />,
  },
};

export const WithoutNavigation: Story = {
  args: {
    header: <HeaderPlaceholder />,
    children: <ContentPlaceholder />,
  },
};

export const WithoutHeader: Story = {
  args: {
    navigation: <NavigationPlaceholder />,
    children: <ContentPlaceholder />,
  },
};

export const ContentOnly: Story = {
  args: {
    children: <ContentPlaceholder />,
  },
};

const administrativeGroups: SidebarGroup[] = [
  {
    id: 'workspace',
    label: 'Workspace',
    items: [
      {
        id: 'overview',
        label: 'Overview',
        icon: <LayoutDashboard size={20} />,
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: <Settings size={20} />,
      },
    ],
  },
];

function AdministrativeLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex size-9 items-center justify-center rounded-sm bg-white text-primary">
        <Wallet size={20} aria-hidden="true" />
      </div>

      <span className="font-heading text-xl font-semibold tracking-tight">
        bacurim
      </span>
    </div>
  );
}

function AdministrativeActions() {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label="Notifications"
        title="Notifications"
        className="flex size-10 items-center justify-center rounded-sm transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <Bell size={20} aria-hidden="true" />
      </button>

      <button
        type="button"
        aria-label="Account"
        title="Account"
        className="flex size-10 items-center justify-center rounded-sm transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <UserRound size={20} aria-hidden="true" />
      </button>
    </div>
  );
}

function AdministrativeContent({
  activeItemId,
}: {
  activeItemId: string;
}) {
  const pageTitle =
    activeItemId === 'settings' ? 'Settings' : 'Overview';

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="heading-lg text-text-primary">
          {pageTitle}
        </h1>

        <p className="body-md text-text-secondary">
          Administrative layout example using the Bacurim UI
          components.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {['Revenue', 'Expenses', 'Balance'].map((label) => (
          <div
            key={label}
            className="rounded-md border border-border bg-surface p-6 shadow-sm"
          >
            <span className="body-sm text-text-secondary">
              {label}
            </span>

            <div className="mt-4 h-8 rounded-sm bg-background" />
          </div>
        ))}
      </div>
    </div>
  );
}

export const AdministrativeLayout: Story = {
  args: {
    children: null,
  },
  render: function AdministrativeLayoutStory() {
    const [collapsed, setCollapsed] = useState(false);
    const [activeItemId, setActiveItemId] =
      useState('overview');

    const groups: SidebarGroup[] =
      administrativeGroups.map((group) => ({
        ...group,
        items: group.items.map((item) => ({
          ...item,
          onClick: () => setActiveItemId(item.id),
        })),
      }));

    return (
      <AppShell
        header={
          <Header
            logo={<AdministrativeLogo />}
            actions={<AdministrativeActions />}
          />
        }
        navigation={
          <Sidebar
            groups={groups}
            activeItemId={activeItemId}
            collapsed={collapsed}
            onCollapsedChange={setCollapsed}
          />
        }
      >
        <AdministrativeContent activeItemId={activeItemId} />
      </AppShell>
    );
  },
};
