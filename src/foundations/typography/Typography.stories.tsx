import type { Meta, StoryObj } from "@storybook/react-vite";

type TypographySampleProps = {
  name: string;
  token: string;
  className: string;
  text?: string;
};

function TypographySample({
  name,
  token,
  className,
  text = "Lorem ipsum dolor sit amet consectetur adipiscing elit",
}: TypographySampleProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-border pb-8">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-text-primary">{name}</span>
        <code className="text-xs text-text-secondary">{token}</code>
      </div>

      <p className={`${className} text-text-primary`}>{text}</p>
    </div>
  );
}

function Typography() {
  return (
    <div className="flex max-w-5xl flex-col gap-12 bg-background p-8">
      <section className="flex flex-col gap-6">
        <div>
          <h2 className="heading-lg text-text-primary">Typography</h2>
          <p className="body-md text-text-secondary">
            Semantic typography styles used by the Bacurim UI library.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <TypographySample
            name="Display"
            token="display"
            className="display"
          />

          <TypographySample
            name="Heading XL"
            token="heading-xl"
            className="heading-xl"
          />

          <TypographySample
            name="Heading LG"
            token="heading-lg"
            className="heading-lg"
          />

          <TypographySample
            name="Heading MD"
            token="heading-md"
            className="heading-md"
          />

          <TypographySample
            name="Heading SM"
            token="heading-sm"
            className="heading-sm"
          />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="heading-lg text-text-primary">Body</h2>

        <div className="flex flex-col gap-8">
          <TypographySample
            name="Body LG"
            token="body-lg"
            className="body-lg"
          />

          <TypographySample
            name="Body MD"
            token="body-md"
            className="body-md"
          />

          <TypographySample
            name="Body SM"
            token="body-sm"
            className="body-sm"
          />

          <TypographySample
            name="Caption"
            token="caption"
            className="caption"
          />

          <TypographySample
            name="Lead"
            token="text-lead"
            className="text-lead"
          />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="heading-lg text-text-primary">Font families</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-6">
            <div className="mb-4 flex flex-col">
              <span className="text-sm font-medium text-text-primary">
                Heading
              </span>
              <code className="text-xs text-text-secondary">
                --font-heading
              </code>
            </div>

            <p className="font-heading text-2xl text-text-primary">Poppins</p>
          </div>

          <div className="rounded-lg border border-border bg-surface p-6">
            <div className="mb-4 flex flex-col">
              <span className="text-sm font-medium text-text-primary">
                Body
              </span>
              <code className="text-xs text-text-secondary">--font-body</code>
            </div>

            <p className="font-body text-2xl text-text-primary">Inter</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="heading-lg text-text-primary">Font weights</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <TypographySample
            name="Regular"
            token="--font-weight-regular"
            className="font-body font-normal text-xl"
            text="Inter Regular 400"
          />

          <TypographySample
            name="Medium"
            token="--font-weight-medium"
            className="font-body font-medium text-xl"
            text="Inter Medium 500"
          />

          <TypographySample
            name="Semibold"
            token="--font-weight-semibold"
            className="font-heading font-semibold text-xl"
            text="Poppins Semibold 600"
          />

          <TypographySample
            name="Bold"
            token="--font-weight-bold"
            className="font-heading font-bold text-xl"
            text="Poppins Bold 700"
          />
        </div>
      </section>
    </div>
  );
}

const meta = {
  title: "Foundations/Typography",
  component: Typography,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
