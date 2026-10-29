import type { Meta, StoryObj } from '@storybook/react-vite';

const spacingScale = [
  { name: '4', value: 4, token: '1' },
  { name: '8', value: 8, token: '2' },
  { name: '12', value: 12, token: '3' },
  { name: '16', value: 16, token: '4' },
  { name: '20', value: 20, token: '5' },
  { name: '24', value: 24, token: '6' },
  { name: '32', value: 32, token: '8' },
  { name: '40', value: 40, token: '10' },
  { name: '48', value: 48, token: '12' },
  { name: '64', value: 64, token: '16' },
  { name: '80', value: 80, token: '20' },
  { name: '96', value: 96, token: '24' },
  { name: '120', value: 120, token: '30' },
] as const;

function SpacingSample({
  name,
  value,
  token,
}: {
  name: string;
  value: number;
  token: string;
}) {
  return (
    <div className="grid grid-cols-[80px_110px_1fr] items-center gap-6 border-b border-border py-4">
      <div className="flex flex-col gap-1">
        <span className="body-sm font-medium text-text-primary">
          {name}px
        </span>
        <code className="text-xs text-text-secondary">
          {value / 16}rem
        </code>
      </div>

      <code className="text-xs text-text-secondary">
        spacing-{token}
      </code>

      <div className="overflow-hidden rounded-md bg-surface p-3">
        <div className="h-5 rounded-sm bg-primary" style={{ width: `calc(var(--spacing) * ${token})` }}></div>
      </div>
    </div>
  );
}

function Spacing() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <header className="flex flex-col gap-3">
          <h1 className="heading-lg text-text-primary">
            Spacing
          </h1>

          <p className="body-md text-text-secondary">
            Official spacing scale used across the Bacurim UI
            library.
          </p>
        </header>

        <section className="flex flex-col gap-4">
          <div className="grid grid-cols-[80px_110px_1fr] gap-6 border-b border-border pb-3">
            <span className="text-xs font-semibold text-text-secondary">
              Size
            </span>
            <span className="text-xs font-semibold text-text-secondary">
              Token
            </span>
            <span className="text-xs font-semibold text-text-secondary">
              Preview
            </span>
          </div>

          <div>
            {spacingScale.map((spacing) => (
              <SpacingSample
                key={spacing.name}
                {...spacing}
              />
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-border bg-surface p-6">
          <h2 className="heading-sm text-text-primary">
            Usage
          </h2>

          <p className="body-sm mt-3 text-text-secondary">
            Use the spacing scale through Tailwind utilities
            for padding, margin and gap.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {['p-4', 'px-6', 'py-3', 'gap-8', 'mt-12'].map(
              (utility) => (
                <code
                  key={utility}
                  className="rounded-md border border-border bg-background px-3 py-2 text-xs text-text-primary"
                >
                  {utility}
                </code>
              ),
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

const meta = {
  title: 'Foundations/Spacing',
  component: Spacing,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Spacing>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};