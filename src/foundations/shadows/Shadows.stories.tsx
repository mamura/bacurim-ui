import type { Meta, StoryObj } from '@storybook/react-vite';

const shadowScale = [
  {
    name: 'None',
    token: 'shadow-none',
    cssToken: 'none',
    description: 'No elevation. Flat surfaces defined by borders.',
    purpose: 'Flat surfaces',
  },
  {
    name: 'Small',
    token: 'shadow-sm',
    cssToken: '--shadow-sm',
    description: 'Subtle elevation for surfaces requiring light emphasis.',
    purpose: 'Cards and subtle surfaces',
  },
  {
    name: 'Medium',
    token: 'shadow-md',
    cssToken: '--shadow-md',
    description: 'Intermediate elevation for floating interface elements.',
    purpose: 'Menus and popovers',
  },
  {
    name: 'Large',
    token: 'shadow-lg',
    cssToken: '--shadow-lg',
    description: 'Higher elevation for prominent overlay surfaces.',
    purpose: 'Modals and overlays',
  },
] as const;

function ShadowSample({
  name,
  token,
  cssToken,
  description,
  purpose,
}: (typeof shadowScale)[number]) {
  return (
    <div className="flex flex-col gap-6 rounded-md border border-border bg-surface p-6">
      <div className="flex min-h-48 items-center justify-center rounded-sm bg-background p-8">
        <div
          className={`flex h-28 w-full max-w-56 items-center justify-center rounded-md border border-border bg-surface ${token}`}
        >
          <span className="body-sm text-text-secondary">{name}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="heading-sm text-text-primary">{name}</h3>

        <code className="text-xs text-text-secondary">{token}</code>

        <code className="text-xs text-text-secondary">{cssToken}</code>

        <p className="body-sm text-text-secondary">{description}</p>

        <div className="mt-2 border-t border-border pt-3">
          <span className="text-xs font-medium text-text-primary">
            Recommended usage
          </span>

          <p className="body-sm text-text-secondary">{purpose}</p>
        </div>
      </div>
    </div>
  );
}

function Shadows() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <header className="flex flex-col gap-3">
          <h1 className="heading-lg text-text-primary">Shadows</h1>

          <p className="body-md text-text-secondary">
            Official elevation scale used across the Bacurim UI library.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {shadowScale.map((shadow) => (
            <ShadowSample key={shadow.token} {...shadow} />
          ))}
        </section>

        <section className="rounded-md border border-border bg-surface p-6">
          <h2 className="heading-sm text-text-primary">Usage</h2>

          <p className="body-sm mt-3 text-text-secondary">
            Use semantic elevation levels through Tailwind utilities instead
            of arbitrary box-shadow values.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {shadowScale.map(({ token }) => (
              <code
                key={token}
                className="rounded-sm border border-border bg-background px-3 py-2 text-xs text-text-primary"
              >
                {token}
              </code>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const meta = {
  title: 'Foundations/Shadows',
  component: Shadows,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Shadows>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};