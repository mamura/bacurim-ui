import type { Meta, StoryObj } from '@storybook/react-vite';

const breakpoints = [
  {
    name: 'Base',
    token: 'Default',
    width: '0px',
    purpose: 'Mobile-first. Default styles for all viewports.',
  },
  {
    name: 'Small',
    token: 'sm:',
    width: '640px',
    purpose: 'Larger mobile viewports.',
  },
  {
    name: 'Medium',
    token: 'md:',
    width: '768px',
    purpose: 'Tablets and intermediate viewports.',
  },
  {
    name: 'Large',
    token: 'lg:',
    width: '1024px',
    purpose: 'Laptops and desktop interfaces.',
  },
  {
    name: 'Extra Large',
    token: 'xl:',
    width: '1280px',
    purpose: 'Wide desktop viewports.',
  },
  {
    name: '2X Large',
    token: '2xl:',
    width: '1536px',
    purpose: 'Extra-wide desktop viewports.',
  },
] as const;

function Breakpoints() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <header className="flex flex-col gap-3">
          <h1 className="heading-lg text-text-primary">
            Breakpoints
          </h1>

          <p className="body-md text-text-secondary">
            Responsive breakpoints used across the Bacurim UI library.
          </p>
        </header>

        <section className="flex flex-col gap-4">
          {breakpoints.map((breakpoint) => (
            <div
              key={breakpoint.name}
              className="flex flex-col gap-3 rounded-md border border-border bg-surface p-6 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex flex-col gap-1">
                <h2 className="heading-sm text-text-primary">
                  {breakpoint.name}
                </h2>

                <p className="body-sm text-text-secondary">
                  {breakpoint.purpose}
                </p>
              </div>

              <div className="flex flex-col gap-1 md:items-end">
                <code className="text-sm text-text-primary">
                  {breakpoint.token}
                </code>

                <span className="body-sm text-text-secondary">
                  ≥ {breakpoint.width}
                </span>
              </div>
            </div>
          ))}
        </section>

        <section className="rounded-md border border-border bg-surface p-6">
          <h2 className="heading-sm text-text-primary">
            Responsive preview
          </h2>

          <p className="body-sm mt-3 text-text-secondary">
            Resize the Storybook viewport to observe how the layout
            adapts to different breakpoints.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {['Item 1', 'Item 2', 'Item 3'].map((item) => (
              <div
                key={item}
                className="rounded-sm bg-primary-soft p-6 text-center"
              >
                <span className="body-sm text-text-primary">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const meta = {
  title: 'Foundations/Breakpoints',
  component: Breakpoints,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Breakpoints>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};