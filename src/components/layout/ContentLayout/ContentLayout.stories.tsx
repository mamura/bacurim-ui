
import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppShell } from '../AppShell';
import { ContentLayout } from './ContentLayout';

function ExampleContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="heading-lg text-text-primary">
          Content layout
        </h1>

        <p className="body-md text-text-secondary">
          Example content demonstrating the available layout width.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {['Content A', 'Content B'].map((item) => (
          <div
            key={item}
            className="rounded-md border border-border bg-surface p-6 shadow-sm"
          >
            <h2 className="heading-sm text-text-primary">
              {item}
            </h2>

            <p className="body-sm mt-2 text-text-secondary">
              This card adapts to the available content width.
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-md border border-border bg-surface p-6 shadow-sm">
        <h2 className="heading-sm text-text-primary">
          Additional content
        </h2>

        <p className="body-md mt-2 text-text-secondary">
          The layout provides consistent spacing and alignment
          without defining the structure of individual pages.
        </p>
      </div>
    </div>
  );
}

const meta = {
  title: 'Components/Layout/ContentLayout',
  component: ContentLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background">
        <Story />
      </div>
    ),
  ],
  args: {
    children: <ExampleContent />,
    width: 'constrained',
  },
  argTypes: {
    width: {
      control: 'select',
      options: ['constrained', 'wide', 'fluid'],
      description: 'Controls the maximum content width.',
    },
    children: {
      control: false,
    },
    className: {
      control: 'text',
    },
  },
} satisfies Meta<typeof ContentLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Wide: Story = {
  args: {
    width: 'wide',
  },
};

export const Fluid: Story = {
  args: {
    width: 'fluid',
  },
};

export const LongContent: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-6">
        <h1 className="heading-lg text-text-primary">
          Long content
        </h1>

        {Array.from({ length: 12 }, (_, index) => (
          <section
            key={index}
            className="rounded-md border border-border bg-surface p-6 shadow-sm"
          >
            <h2 className="heading-sm text-text-primary">
              Section {index + 1}
            </h2>

            <p className="body-md mt-3 text-text-secondary">
              This section demonstrates how ContentLayout handles
              pages with extensive vertical content.
            </p>
          </section>
        ))}
      </div>
    ),
  },
};

export const WithinAppShell: Story = {
  args: {},
  render: (args) => (
    <AppShell
      header={
        <div className="flex min-h-16 items-center bg-primary px-6 text-primary-contrast">
          <span className="font-heading text-xl font-semibold">
            Example App
          </span>
        </div>
      }
      navigation={
        <div className="h-full w-64 border-r border-border bg-surface p-6">
          <span className="heading-sm text-text-primary">
            Navigation
          </span>
        </div>
      }
    >
      <ContentLayout {...args} />
    </AppShell>
  ),
};
