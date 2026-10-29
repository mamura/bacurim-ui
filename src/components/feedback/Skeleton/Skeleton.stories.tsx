
import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Skeleton,
  type SkeletonAnimation,
  type SkeletonVariant,
} from './Skeleton';

const meta = {
  title: 'Components/Feedback/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
  },
  args: {
    variant: 'rounded',
    animation: 'pulse',
    width: 240,
    height: 24,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'text',
        'rectangle',
        'rounded',
        'circle',
      ] satisfies SkeletonVariant[],
    },
    animation: {
      control: 'select',
      options: [
        'pulse',
        'wave',
        'none',
      ] satisfies SkeletonAnimation[],
    },
    width: {
      control: 'number',
    },
    height: {
      control: 'number',
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Skeleton {...args} />,
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-body-sm text-text-secondary">
          Text
        </span>
        <Skeleton
          variant="text"
          width={240}
          height={14}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-body-sm text-text-secondary">
          Rectangle
        </span>
        <Skeleton
          variant="rectangle"
          width={240}
          height={80}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-body-sm text-text-secondary">
          Rounded
        </span>
        <Skeleton
          variant="rounded"
          width={240}
          height={80}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-body-sm text-text-secondary">
          Circle
        </span>
        <Skeleton
          variant="circle"
          width={64}
          height={64}
        />
      </div>
    </div>
  ),
};

export const Animations: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-6">
      {(
        ['pulse', 'wave', 'none'] as const
      ).map((animation) => (
        <div
          key={animation}
          className="flex flex-col gap-2"
        >
          <span className="text-body-sm text-text-secondary">
            {animation}
          </span>

          <Skeleton
            animation={animation}
            height={48}
          />
        </div>
      ))}
    </div>
  ),
};

export const UserCard: Story = {
  render: () => (
    <div
      aria-busy="true"
      aria-label="Carregando perfil"
      className="w-full max-w-sm rounded-md border border-border bg-surface p-5"
    >
      <div className="flex items-center gap-4">
        <Skeleton
          variant="circle"
          width={56}
          height={56}
        />

        <div className="flex flex-1 flex-col gap-2">
          <Skeleton
            variant="text"
            width="70%"
            height={16}
          />

          <Skeleton
            variant="text"
            width="45%"
            height={12}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <Skeleton
          variant="text"
          height={12}
        />

        <Skeleton
          variant="text"
          width="90%"
          height={12}
        />

        <Skeleton
          variant="text"
          width="65%"
          height={12}
        />
      </div>
    </div>
  ),
};

export const ContentCard: Story = {
  render: () => (
    <div
      aria-busy="true"
      aria-label="Carregando conteúdo"
      className="w-full max-w-md overflow-hidden rounded-md border border-border bg-surface"
    >
      <Skeleton
        variant="rectangle"
        height={180}
        animation="wave"
      />

      <div className="flex flex-col gap-3 p-5">
        <Skeleton
          variant="text"
          width="65%"
          height={22}
          animation="wave"
        />

        <Skeleton
          variant="text"
          height={12}
          animation="wave"
        />

        <Skeleton
          variant="text"
          width="92%"
          height={12}
          animation="wave"
        />

        <Skeleton
          variant="text"
          width="55%"
          height={12}
          animation="wave"
        />
      </div>
    </div>
  ),
};

export const List: Story = {
  render: () => (
    <div
      aria-busy="true"
      aria-label="Carregando lista"
      className="w-full max-w-md divide-y divide-border rounded-md border border-border bg-surface"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 p-4"
        >
          <Skeleton
            variant="circle"
            width={40}
            height={40}
          />

          <div className="flex flex-1 flex-col gap-2">
            <Skeleton
              variant="text"
              width={`${75 - index * 5}%`}
              height={14}
            />

            <Skeleton
              variant="text"
              width="45%"
              height={10}
            />
          </div>

          <Skeleton
            variant="rounded"
            width={56}
            height={24}
          />
        </div>
      ))}
    </div>
  ),
};

export const Table: Story = {
  render: () => (
    <div
      aria-busy="true"
      aria-label="Carregando tabela"
      className="w-full max-w-3xl overflow-hidden rounded-md border border-border bg-surface"
    >
      <div className="grid grid-cols-4 gap-4 border-b border-border p-4">
        {[60, 80, 70, 55].map((width, index) => (
          <Skeleton
            key={index}
            variant="text"
            width={`${width}%`}
            height={14}
          />
        ))}
      </div>

      {Array.from({ length: 6 }, (_, row) => (
        <div
          key={row}
          className="grid grid-cols-4 gap-4 border-b border-border p-4 last:border-b-0"
        >
          {[80, 65, 75, 50].map((width, column) => (
            <Skeleton
              key={column}
              variant="text"
              width={`${width}%`}
              height={12}
            />
          ))}
        </div>
      ))}
    </div>
  ),
};
