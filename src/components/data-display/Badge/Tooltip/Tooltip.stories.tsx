
import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  CircleHelp,
  Info,
  Pencil,
  Plus,
  Trash2,
} from 'lucide-react';

import { Button } from '@/components/actions/Button';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  type TooltipVariant,
} from './Tooltip';

const meta = {
  title: 'Components/Data Display/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <TooltipProvider delayDuration={300}>
        <Story />
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          startIcon={<CircleHelp size={16} />}
        >
          Ajuda
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        Informações complementares sobre esta funcionalidade.
      </TooltipContent>
    </Tooltip>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-3 items-center justify-items-center gap-6">
      <div />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            iconOnly
            aria-label="Tooltip acima"
            startIcon={<ArrowUp size={18} />}
          />
        </TooltipTrigger>

        <TooltipContent side="top" arrow>
          Tooltip acima
        </TooltipContent>
      </Tooltip>

      <div />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            iconOnly
            aria-label="Tooltip à esquerda"
            startIcon={<ArrowLeft size={18} />}
          />
        </TooltipTrigger>

        <TooltipContent side="left" arrow>
          Tooltip à esquerda
        </TooltipContent>
      </Tooltip>

      <div />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            iconOnly
            aria-label="Tooltip à direita"
            startIcon={<ArrowRight size={18} />}
          />
        </TooltipTrigger>

        <TooltipContent side="right" arrow>
          Tooltip à direita
        </TooltipContent>
      </Tooltip>

      <div />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            iconOnly
            aria-label="Tooltip abaixo"
            startIcon={<ArrowDown size={18} />}
          />
        </TooltipTrigger>

        <TooltipContent side="bottom" arrow>
          Tooltip abaixo
        </TooltipContent>
      </Tooltip>

      <div />
    </div>
  ),
};

export const Variants: Story = {
  render: () => {
    const variants: TooltipVariant[] = [
      'default',
      'light',
      'primary',
    ];

    return (
      <div className="flex flex-wrap items-center gap-4">
        {variants.map((variant) => (
          <Tooltip key={variant}>
            <TooltipTrigger asChild>
              <Button variant="outline">
                {variant}
              </Button>
            </TooltipTrigger>

            <TooltipContent variant={variant} arrow>
              Tooltip {variant}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    );
  },
};

export const WithArrow: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">
            Com seta
          </Button>
        </TooltipTrigger>

        <TooltipContent arrow>
          Tooltip com seta
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">
            Sem seta
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          Tooltip sem seta
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const IconButtons: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            iconOnly
            aria-label="Editar"
            startIcon={<Pencil size={18} />}
          />
        </TooltipTrigger>

        <TooltipContent>Editar registro</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            iconOnly
            aria-label="Excluir"
            color="error"
            startIcon={<Trash2 size={18} />}
          />
        </TooltipTrigger>

        <TooltipContent variant="light">
          Excluir registro
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            iconOnly
            aria-label="Adicionar"
            startIcon={<Plus size={18} />}
          />
        </TooltipTrigger>

        <TooltipContent variant="primary">
          Adicionar novo registro
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const TextTrigger: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-primary"
        >
          <Info size={16} />
          Saiba mais
        </button>
      </TooltipTrigger>

      <TooltipContent side="bottom" arrow>
        Informações adicionais sobre este recurso.
      </TooltipContent>
    </Tooltip>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">
          Informações
        </Button>
      </TooltipTrigger>

      <TooltipContent className="max-w-64" arrow>
        Este tooltip apresenta uma explicação um pouco mais
        longa, demonstrando como o conteúdo se adapta à
        largura disponível sem comprometer a leitura.
      </TooltipContent>
    </Tooltip>
  ),
};

export const InstantOpen: Story = {
  render: () => (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">
            Abertura imediata
          </Button>
        </TooltipTrigger>

        <TooltipContent arrow>
          Este tooltip não possui atraso de abertura.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
