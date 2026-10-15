import type { Meta, StoryObj } from '@storybook/react-vite';

const radiusScale = [
  {
    name: 'Small',
    token: '--radius-sm',
    utility: 'rounded-sm',
    value: '8px',
  },
  {
    name: 'Medium',
    token: '--radius-md',
    utility: 'rounded-md',
    value: '16px',
  },
  {
    name: 'Large',
    token: '--radius-lg',
    utility: 'rounded-lg',
    value: '24px',
  },
  {
    name: 'Full',
    token: '--radius-full',
    utility: 'rounded-full',
    value: '999px',
  },
] as const;

function RadiusSample({
  name,
  token,
  utility,
  value,
}: (typeof radiusScale)[number]) {
  return (
    <div className="flex flex-col gap-4 rounded-md border border-border bg-surface p-6">
      <div
        className={`h-28 w-full bg-primary ${utility}`}
      />

      <div className="flex flex-col gap-1">
        <span className="body-sm font-medium text-text-primary">
          {name}
        </span>

        <code className="text-xs text-text-secondary">
          {token}: {value}
        </code>

        <code className="text-xs text-text-secondary">
          {utility}
        </code>
      </div>
    </div>
  );
}

function Radius() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <header className="flex flex-col gap-3">
          <h1 className="heading-lg text-text-primary">
            Border Radius
          </h1>

          <p className="body-md text-text-secondary">
            Official border radius scale used across the Bacurim UI
            library.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {radiusScale.map((radius) => (
            <RadiusSample key={radius.token} {...radius} />
          ))}
        </section>

        <section className="rounded-md border border-border bg-surface p-6">
          <h2 className="heading-sm text-text-primary">
            Usage
          </h2>

          <p className="body-sm mt-3 text-text-secondary">
            Use the approved border radius tokens through Tailwind
            utilities instead of arbitrary values.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {radiusScale.map(({ utility }) => (
              <code
                key={utility}
                className="rounded-sm border border-border bg-background px-3 py-2 text-xs text-text-primary"
              >
                {utility}
              </code>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const meta = {
  title: 'Foundations/Radius',
  component: Radius,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Radius>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};