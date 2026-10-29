
import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Inbox,
  SearchX,
  FolderOpen,
  Plus,
  RefreshCw,
  FileText,
} from 'lucide-react';

import { Button } from '@/components/actions/Button';

import {
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
  type EmptyStateSize,
} from './EmptyState';

const meta = {
  title: 'Components/Feedback/Empty State',
  component: EmptyState,
  parameters: {
    layout: 'padded',
  },
  args: {
    size: 'md',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] satisfies EmptyStateSize[],
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-2xl rounded-md border border-border bg-surface">
      <EmptyState {...args}>
        <EmptyStateIcon>
          <Inbox />
        </EmptyStateIcon>

        <EmptyStateTitle>
          Nenhum registro encontrado
        </EmptyStateTitle>

        <EmptyStateDescription>
          Ainda não existem registros para exibir.
          Adicione um novo item para começar.
        </EmptyStateDescription>

        <EmptyStateActions>
          <Button startIcon={<Plus size={16} />}>
            Adicionar registro
          </Button>

          <Button variant="outline">
            Saiba mais
          </Button>
        </EmptyStateActions>
      </EmptyState>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div
          key={size}
          className="rounded-md border border-border bg-surface"
        >
          <EmptyState size={size}>
            <EmptyStateIcon>
              <FolderOpen />
            </EmptyStateIcon>

            <EmptyStateTitle>
              Empty State {size.toUpperCase()}
            </EmptyStateTitle>

            <EmptyStateDescription>
              Exemplo de composição com tamanho {size}.
            </EmptyStateDescription>

            <EmptyStateActions>
              <Button size="sm">
                Adicionar item
              </Button>
            </EmptyStateActions>
          </EmptyState>
        </div>
      ))}
    </div>
  ),
};

export const WithoutActions: Story = {
  render: () => (
    <div className="w-full max-w-xl rounded-md border border-border bg-surface">
      <EmptyState>
        <EmptyStateIcon>
          <Inbox />
        </EmptyStateIcon>

        <EmptyStateTitle>
          Nenhum conteúdo disponível
        </EmptyStateTitle>

        <EmptyStateDescription>
          Não há informações para apresentar neste momento.
        </EmptyStateDescription>
      </EmptyState>
    </div>
  ),
};

export const NoSearchResults: Story = {
  render: () => (
    <div className="w-full max-w-xl rounded-md border border-border bg-surface">
      <EmptyState>
        <EmptyStateIcon>
          <SearchX />
        </EmptyStateIcon>

        <EmptyStateTitle>
          Nenhum resultado encontrado
        </EmptyStateTitle>

        <EmptyStateDescription>
          Não encontramos resultados para os filtros
          informados. Experimente ajustar sua pesquisa.
        </EmptyStateDescription>

        <EmptyStateActions>
          <Button
            variant="outline"
            startIcon={<RefreshCw size={16} />}
          >
            Limpar filtros
          </Button>
        </EmptyStateActions>
      </EmptyState>
    </div>
  ),
};

export const NoFiles: Story = {
  render: () => (
    <div className="w-full max-w-xl rounded-md border border-border bg-surface">
      <EmptyState>
        <EmptyStateIcon>
          <FileText />
        </EmptyStateIcon>

        <EmptyStateTitle>
          Nenhum arquivo adicionado
        </EmptyStateTitle>

        <EmptyStateDescription>
          Adicione um arquivo para visualizar os
          documentos disponíveis.
        </EmptyStateDescription>

        <EmptyStateActions>
          <Button startIcon={<Plus size={16} />}>
            Adicionar arquivo
          </Button>
        </EmptyStateActions>
      </EmptyState>
    </div>
  ),
};

export const CustomVisual: Story = {
  render: () => (
    <div className="w-full max-w-xl rounded-md border border-border bg-surface">
      <EmptyState>
        <EmptyStateIcon className="size-24 rounded-md bg-secondary-soft text-secondary">
          <FolderOpen size={40} />
        </EmptyStateIcon>

        <EmptyStateTitle>
          Personalização visual
        </EmptyStateTitle>

        <EmptyStateDescription>
          O elemento visual pode receber classes
          adicionais ou ser substituído por uma
          ilustração personalizada.
        </EmptyStateDescription>
      </EmptyState>
    </div>
  ),
};

export const Minimal: Story = {
  render: () => (
    <div className="w-full max-w-xl rounded-md border border-border bg-surface">
      <EmptyState size="sm">
        <EmptyStateTitle>
          Nenhum item encontrado
        </EmptyStateTitle>

        <EmptyStateDescription>
          Tente novamente mais tarde.
        </EmptyStateDescription>
      </EmptyState>
    </div>
  ),
};
