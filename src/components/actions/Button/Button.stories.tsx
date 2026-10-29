
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  ArrowRight,
  Check,
  Download,
  Plus,
  Save,
  Settings,
  Trash2,
} from 'lucide-react';

import {
  Button,
  type ButtonColor,
  type ButtonSize,
  type ButtonVariant,
} from './Button';

const meta = {
  title: 'Components/Actions/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Button',
    variant: 'solid',
    color: 'primary',
    size: 'md',
    radius: 'sm',
    disabled: false,
    loading: false,
    fullWidth: false,
    iconOnly: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'solid',
        'outline',
        'ghost',
        'soft',
        'white',
        'link',
      ],
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'warning',
        'error',
        'info',
        'neutral',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    radius: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const variants: ButtonVariant[] = [
  'solid',
  'outline',
  'ghost',
  'soft',
  'white',
  'link',
];

const colors: ButtonColor[] = [
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
  'info',
  'neutral',
];

const sizes: ButtonSize[] = ['sm', 'md', 'lg'];

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {variants.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const ColorVariants: Story = {
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <div className="flex flex-col gap-6">
      {variants.map((variant) => (
        <section key={variant} className="flex flex-col gap-3">
          <h3 className="heading-sm capitalize text-text-primary">
            {variant}
          </h3>

          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <Button
                key={`${variant}-${color}`}
                variant={variant}
                color={color}
              >
                {color}
              </Button>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {sizes.map((size) => (
        <Button key={size} size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
};

export const Rounded: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button radius="sm">Small radius</Button>
      <Button radius="md">Medium radius</Button>
      <Button radius="lg">Large radius</Button>
      <Button radius="full">Pill button</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button startIcon={<Plus size={18} />}>
        Novo registro
      </Button>

      <Button
        variant="outline"
        startIcon={<Save size={18} />}
      >
        Salvar
      </Button>

      <Button
        color="success"
        endIcon={<Check size={18} />}
      >
        Confirmar
      </Button>

      <Button
        variant="soft"
        color="secondary"
        endIcon={<ArrowRight size={18} />}
      >
        Continuar
      </Button>
    </div>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {sizes.map((size) => (
        <div key={size} className="flex items-center gap-3">
          <Button
            size={size}
            iconOnly
            aria-label="Adicionar"
          >
            <Plus size={18} />
          </Button>

          <Button
            size={size}
            variant="outline"
            iconOnly
            aria-label="Configurações"
          >
            <Settings size={18} />
          </Button>

          <Button
            size={size}
            variant="ghost"
            color="error"
            iconOnly
            aria-label="Excluir"
          >
            <Trash2 size={18} />
          </Button>
        </div>
      ))}
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button loading>Salvar</Button>

      <Button loading loadingText="Salvando...">
        Salvar
      </Button>

      <Button
        loading
        variant="outline"
        color="secondary"
      >
        Processando
      </Button>

      <Button
        loading
        iconOnly
        aria-label="Carregando"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {variants.map((variant) => (
        <Button key={variant} variant={variant} disabled>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const FullWidth: Story = {
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <div className="w-full max-w-xl">
      <Button fullWidth>
        Continuar
      </Button>
    </div>
  ),
};

export const Interactive: Story = {
  render: function InteractiveButtonStory() {
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    function handleSave() {
      setSaving(true);
      setSaved(false);

      window.setTimeout(() => {
        setSaving(false);
        setSaved(true);
      }, 1500);
    }

    return (
      <div className="flex flex-col items-start gap-4">
        <Button
          loading={saving}
          loadingText="Salvando..."
          color={saved ? 'success' : 'primary'}
          startIcon={
            saved ? <Check size={18} /> : <Save size={18} />
          }
          onClick={handleSave}
        >
          {saved ? 'Salvo' : 'Salvar alterações'}
        </Button>

        <p className="body-sm text-text-secondary">
          {saving
            ? 'Processando a ação...'
            : saved
              ? 'Alterações salvas.'
              : 'Clique para simular uma ação.'}
        </p>
      </div>
    );
  },
};

export const Examples: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button startIcon={<Plus size={18} />}>
        Novo registro
      </Button>

      <Button
        variant="outline"
        color="secondary"
        startIcon={<Download size={18} />}
      >
        Exportar
      </Button>

      <Button
        variant="soft"
        color="success"
        startIcon={<Check size={18} />}
      >
        Aprovar
      </Button>

      <Button
        variant="ghost"
        color="error"
        startIcon={<Trash2 size={18} />}
      >
        Excluir
      </Button>
    </div>
  ),
};
