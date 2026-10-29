import type { Meta, StoryObj } from "@storybook/react-vite";

type ColorSwatchProps = {
  name: string;
  token: string;
  className: string;
};

function ColorSwatch({ name, token, className }: ColorSwatchProps) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`h-20 w-full rounded-lg border border-border ${className}`}
      />
      <span className="text-sm font-medium text-text-primary px-1">{name}</span>
      <code className="text-xs text-text-secondary">{token}</code>
    </div>
  );
}

function Colors() {
  return (
    <div className="flex max-w-5xl flex-col gap-12 bg-background p-8 text-text-primary">
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-bold">Brand Colors</h2>
          <p className="text-text-secondary">
            Semantic colors used by the Bacurim UI library
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <ColorSwatch
            name="Primary"
            token="--color-primary"
            className="bg-primary"
          />
          <ColorSwatch
            name="Secondary"
            token="--color-secondary"
            className="bg-secondary"
          />
          <ColorSwatch
            name="Accent"
            token="--color-accent"
            className="bg-accent"
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Semantic states</h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          <ColorSwatch
            name="Success"
            token="--color-success"
            className="bg-success"
          />
          <ColorSwatch
            name="Warning"
            token="--color-warning"
            className="bg-warning"
          />
          <ColorSwatch
            name="Error"
            token="--color-error"
            className="bg-error"
          />
          <ColorSwatch name="Info" token="--color-info" className="bg-info" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Soft colors</h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <ColorSwatch
            name="Primary Soft"
            token="--color-primary-soft"
            className="bg-primary-soft"
          />
          <ColorSwatch
            name="Secondary Soft"
            token="--color-secondary-soft"
            className="bg-secondary-soft"
          />
          <ColorSwatch
            name="Accent Soft"
            token="--color-accent-soft"
            className="bg-accent-soft"
          />
          <ColorSwatch
            name="Success Soft"
            token="--color-success-soft"
            className="bg-success-soft"
          />
          <ColorSwatch
            name="Warning Soft"
            token="--color-warning-soft"
            className="bg-warning-soft"
          />
          <ColorSwatch
            name="Error Soft"
            token="--color-error-soft"
            className="bg-error-soft"
          />
          <ColorSwatch
            name="Info Soft"
            token="--color-info-soft"
            className="bg-info-soft"
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Background and surface</h2>

        <div className="grid grid-cols-2 gap-4">
          <ColorSwatch
            token="--color-background"
            name="Background"
            className="bg-background"
          />
          <ColorSwatch
            token="--color-surface"
            name="Surface"
            className="bg-surface"
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Text</h2>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-text-primary">
            Primary text
          </span>
          <code className="text-xs text-text-secondary">
            --color-text-primary
          </code>
          <span className="mt-2 text-text-primary">
            Example using the primary text color
          </span>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Border</h2>

        <div className="rounded-lg border border-border bg-surface p-6">
          <span className="text-text-secondary">Default border</span>
        </div>
      </section>
    </div>
  );
}

const meta = {
  title: "Foundations/Colors",
  component: Colors,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Colors>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
