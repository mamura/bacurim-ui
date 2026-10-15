import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShell } from './AppShell';

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
    <div className="flex h-16 items-center border-b border-border bg-surface px-6">
      <span className="heading-sm text-text-primary">Header</span>
    </div>
  );
}

function ContentPlaceholder() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="heading-lg text-text-primary">Main content</h1>

      <p className="body-md text-text-secondary">
        This region expands to occupy the available space.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {['Content A', 'Content B'].map((item) => (
          <div
            key={item}
            className="rounded-md border border-border bg-surface p-6 shadow-sm"
          >
            <span className="body-md text-text-primary">{item}</span>
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