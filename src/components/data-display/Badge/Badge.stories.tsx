
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  AlertCircle,
  Check,
  Clock,
  Info,
  LoaderCircle,
  TrendingUp,
} from 'lucide-react';

import {
  Badge,
  type BadgeColor,
  type BadgeSize,
  type BadgeVariant,
} from './Badge';

const variants: BadgeVariant[] = [
  'solid',
  'soft',
  'outline',
  'white',
];

const colors: BadgeColor[] = [
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
  'info',
  'neutral',
];

const sizes: BadgeSize[] = ['sm', 'md', 'lg'];

const meta = {
  title: 'Components/Data Display/Badge',
  component: Badge,
  parameters: {
    layout: 'padded',
  },
  args: {
    children: 'Badge',
    variant: 'soft',
    color: 'primary',
    size: 'md',
    radius: 'full',
    dot: false,
    truncate: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: variants,
    },
    color: {
      control: 'select',
      options: colors,
    },
    size: {
      control: 'select',
      options: sizes,
    },
    radius: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
    },
    dot: {
      control: 'boolean',
    },
    truncate: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {variants.map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
};

export const ColorVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {variants.map((variant) => (
        <section key={variant} className="flex flex-col gap-3">
          <h3 className="heading-sm capitalize text-text-primary">
            {variant}
          </h3>

          <div className="flex flex-wrap items-center gap-2">
            {colors.map((color) => (
              <Badge
                key={`${variant}-${color}`}
                variant={variant}
                color={color}
              >
                {color}
              </Badge>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((size) => (
        <Badge key={size} size={size}>
          {size}
        </Badge>
      ))}
    </div>
  ),
};

export const Rounded: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge radius="sm">Small radius</Badge>
      <Badge radius="md">Medium radius</Badge>
      <Badge radius="lg">Large radius</Badge>
      <Badge radius="full">Pill badge</Badge>
    </div>
  ),
};

export const WithIndicators: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge dot color="success">
        Disponível
      </Badge>

      <Badge dot color="warning">
        Aguardando
      </Badge>

      <Badge dot color="error">
        Indisponível
      </Badge>

      <Badge dot variant="outline" color="info">
        Informação
      </Badge>

      <Badge dot variant="solid" color="primary">
        Em andamento
      </Badge>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge
        color="success"
        startIcon={<Check size={12} />}
      >
        Concluído
      </Badge>

      <Badge
        color="warning"
        startIcon={<Clock size={12} />}
      >
        Pendente
      </Badge>

      <Badge
        color="error"
        startIcon={<AlertCircle size={12} />}
      >
        Atenção
      </Badge>

      <Badge
        color="info"
        startIcon={<Info size={12} />}
      >
        Informação
      </Badge>

      <Badge
        color="success"
        variant="outline"
        endIcon={<TrendingUp size={12} />}
      >
        +14,5%
      </Badge>

      <Badge
        color="primary"
        startIcon={
          <LoaderCircle size={12} className="animate-spin" />
        }
      >
        Carregando
      </Badge>
    </div>
  ),
};

export const MaxWidth: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-3">
      <Badge truncate className="max-w-32">
        Este conteúdo possui um texto bastante longo
      </Badge>

      <Badge
        truncate
        className="max-w-48"
        variant="outline"
        color="secondary"
      >
        Uma classificação com descrição extensa
      </Badge>

      <Badge
        truncate
        className="max-w-40"
        startIcon={<Info size={12} />}
      >
        Informação contextual muito longa
      </Badge>
    </div>
  ),
};

export const SemanticExamples: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge color="success" dot>
        Ativo
      </Badge>

      <Badge color="warning" startIcon={<Clock size={12} />}>
        Em análise
      </Badge>

      <Badge color="error" variant="outline">
        Cancelado
      </Badge>

      <Badge color="info" variant="solid">
        Novo
      </Badge>

      <Badge color="neutral" variant="white">
        Arquivado
      </Badge>
    </div>
  ),
};
