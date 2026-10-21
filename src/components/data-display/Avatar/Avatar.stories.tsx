
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Building2, UserRound } from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  type AvatarRadius,
  type AvatarSize,
} from './Avatar';

const sizes: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const radii: AvatarRadius[] = ['sm', 'md', 'lg', 'full'];

// Public example image used only for Storybook demonstrations.
const exampleImage =
  'https://i.pravatar.cc/300?img=12';

const meta = {
  title: 'Components/Data Display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'padded',
  },
  args: {
    size: 'md',
    radius: 'full',
  },
  argTypes: {
    size: {
      control: 'select',
      options: sizes,
    },
    radius: {
      control: 'select',
      options: radii,
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage
        src={exampleImage}
        alt="Foto de perfil de exemplo"
      />
      <AvatarFallback>MM</AvatarFallback>
    </Avatar>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-6">
      {sizes.map((size) => (
        <div
          key={size}
          className="flex flex-col items-center gap-2"
        >
          <Avatar size={size}>
            <AvatarImage
              src={exampleImage}
              alt="Foto de perfil de exemplo"
            />
            <AvatarFallback>MM</AvatarFallback>
          </Avatar>

          <span className="caption text-text-secondary">
            {size}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const FallbackSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-6">
      {sizes.map((size) => (
        <div
          key={size}
          className="flex flex-col items-center gap-2"
        >
          <Avatar size={size}>
            <AvatarFallback delayMs={0}>
              MM
            </AvatarFallback>
          </Avatar>

          <span className="caption text-text-secondary">
            {size}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Radii: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-6">
      {radii.map((radius) => (
        <div
          key={radius}
          className="flex flex-col items-center gap-2"
        >
          <Avatar size="lg" radius={radius}>
            <AvatarImage
              src={exampleImage}
              alt="Foto de perfil de exemplo"
            />
            <AvatarFallback>MM</AvatarFallback>
          </Avatar>

          <span className="caption text-text-secondary">
            {radius}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const InitialsFallback: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <AvatarFallback delayMs={0}>AM</AvatarFallback>
      </Avatar>

      <Avatar size="md">
        <AvatarFallback delayMs={0}>JS</AvatarFallback>
      </Avatar>

      <Avatar size="lg">
        <AvatarFallback delayMs={0}>MM</AvatarFallback>
      </Avatar>

      <Avatar size="xl">
        <AvatarFallback delayMs={0}>BC</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const IconFallback: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <AvatarFallback delayMs={0}>
          <UserRound size={16} aria-hidden="true" />
        </AvatarFallback>
      </Avatar>

      <Avatar size="lg">
        <AvatarFallback delayMs={0}>
          <UserRound size={24} aria-hidden="true" />
        </AvatarFallback>
      </Avatar>

      <Avatar size="xl" radius="lg">
        <AvatarFallback delayMs={0}>
          <Building2 size={28} aria-hidden="true" />
        </AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const ImageError: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="lg">
        <AvatarImage
          src="/invalid-avatar-image.jpg"
          alt="Foto de perfil indisponível"
        />
        <AvatarFallback delayMs={0}>
          MM
        </AvatarFallback>
      </Avatar>

      <Avatar size="lg">
        <AvatarImage
          src="/another-invalid-image.jpg"
          alt="Imagem indisponível"
        />
        <AvatarFallback delayMs={0}>
          <UserRound size={24} aria-hidden="true" />
        </AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="lg">
        <AvatarFallback
          delayMs={0}
          className="bg-primary-soft text-primary"
        >
          MM
        </AvatarFallback>
      </Avatar>

      <Avatar size="lg">
        <AvatarFallback
          delayMs={0}
          className="bg-secondary-soft text-secondary"
        >
          JS
        </AvatarFallback>
      </Avatar>

      <Avatar size="lg">
        <AvatarFallback
          delayMs={0}
          className="bg-info-soft text-info"
        >
          AM
        </AvatarFallback>
      </Avatar>

      <Avatar size="lg">
        <AvatarFallback
          delayMs={0}
          className="bg-success-soft text-success"
        >
          BC
        </AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const EntityAvatars: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex items-center gap-3">
        <Avatar size="lg">
          <AvatarImage
            src={exampleImage}
            alt="Foto de perfil de exemplo"
          />
          <AvatarFallback>MM</AvatarFallback>
        </Avatar>

        <div>
          <p className="body-md font-semibold text-text-primary">
            Usuário
          </p>
          <p className="body-sm text-text-secondary">
            Avatar com imagem
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Avatar size="lg" radius="lg">
          <AvatarFallback delayMs={0}>
            <Building2 size={24} aria-hidden="true" />
          </AvatarFallback>
        </Avatar>

        <div>
          <p className="body-md font-semibold text-text-primary">
            Organização
          </p>
          <p className="body-sm text-text-secondary">
            Avatar com ícone
          </p>
        </div>
      </div>
    </div>
  ),
};
