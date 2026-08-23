import type { Meta, StoryObj } from "@storybook/react-vite";

type ExampleProps = {
  label: string;
};

function Example({ label }: ExampleProps) {
  return (
    <div className="p-8">
      <span className="text-3xl font-bold">{label}</span>
    </div>
  );
}

const meta = {
  title: "Development/Example",
  component: Example,
  args: {
    label: "Bacurim UI",
  },
} satisfies Meta<typeof Example>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Alternative: Story = {
  args: {
    label: "Alternative state",
  },
};
