
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Separator } from './Separator';

const meta = {
  title: 'Components/Layout/Separator',
  component: Separator,
  parameters: {
    layout: 'padded',
  },
  args: {
    orientation: 'horizontal',
    decorative: true,
  },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    decorative: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <p className="body-md text-text-primary">
        Conteúdo acima
      </p>

      <Separator {...args} className="my-4" />

      <p className="body-md text-text-secondary">
        Conteúdo abaixo
      </p>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <div>
        <h3 className="heading-sm text-text-primary">
          Informações gerais
        </h3>
        <p className="body-sm text-text-secondary">
          Dados principais da aplicação.
        </p>
      </div>

      <Separator />

      <div>
        <h3 className="heading-sm text-text-primary">
          Informações financeiras
        </h3>
        <p className="body-sm text-text-secondary">
          Receitas, despesas e indicadores.
        </p>
      </div>

      <Separator />

      <div>
        <h3 className="heading-sm text-text-primary">
          Configurações
        </h3>
        <p className="body-sm text-text-secondary">
          Preferências e parâmetros.
        </p>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-4">
      <span className="body-sm text-text-primary">
        Visão geral
      </span>

      <Separator orientation="vertical" />

      <span className="body-sm text-text-primary">
        Relatórios
      </span>

      <Separator orientation="vertical" />

      <span className="body-sm text-text-primary">
        Configurações
      </span>
    </div>
  ),
};

export const Decorative: Story = {
  render: () => (
    <div className="w-96">
      <p className="body-md text-text-primary">
        Primeira seção
      </p>

      <Separator decorative className="my-4" />

      <p className="body-md text-text-primary">
        Segunda seção
      </p>
    </div>
  ),
};

export const Semantic: Story = {
  render: () => (
    <div className="w-96">
      <section aria-label="Resumo financeiro">
        <h3 className="heading-sm text-text-primary">
          Resumo financeiro
        </h3>

        <p className="body-sm text-text-secondary">
          Indicadores do período selecionado.
        </p>
      </section>

      <Separator
        decorative={false}
        aria-label="Separação entre resumo e movimentações"
        className="my-4"
      />

      <section aria-label="Movimentações">
        <h3 className="heading-sm text-text-primary">
          Movimentações
        </h3>

        <p className="body-sm text-text-secondary">
          Histórico de receitas e despesas.
        </p>
      </section>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="w-96 rounded-md border border-border bg-surface p-6 shadow-sm">
      <h3 className="heading-sm text-text-primary">
        Resumo financeiro
      </h3>

      <p className="body-sm mt-1 text-text-secondary">
        Informações do mês atual
      </p>

      <Separator className="my-4" />

      <div className="flex items-center justify-between">
        <span className="body-sm text-text-secondary">
          Receitas
        </span>

        <span className="body-md font-semibold text-success">
          R$ 12.500,00
        </span>
      </div>

      <Separator className="my-3" />

      <div className="flex items-center justify-between">
        <span className="body-sm text-text-secondary">
          Despesas
        </span>

        <span className="body-md font-semibold text-error">
          R$ 4.250,00
        </span>
      </div>

      <Separator className="my-3" />

      <div className="flex items-center justify-between">
        <span className="body-sm font-semibold text-text-primary">
          Saldo
        </span>

        <span className="body-md font-semibold text-primary">
          R$ 8.250,00
        </span>
      </div>
    </div>
  ),
};

export const Navigation: Story = {
  render: () => (
    <nav
      aria-label="Navegação de exemplo"
      className="flex h-10 items-center gap-4"
    >
      <a
        href="#overview"
        className="body-sm text-primary hover:underline"
      >
        Visão geral
      </a>

      <Separator orientation="vertical" />

      <a
        href="#transactions"
        className="body-sm text-primary hover:underline"
      >
        Transações
      </a>

      <Separator orientation="vertical" />

      <a
        href="#reports"
        className="body-sm text-primary hover:underline"
      >
        Relatórios
      </a>
    </nav>
  ),
};

export const CustomStyle: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <div>
        <p className="body-sm mb-3 text-text-secondary">
          Separador padrão
        </p>

        <Separator />
      </div>

      <div>
        <p className="body-sm mb-3 text-text-secondary">
          Separador com cor personalizada
        </p>

        <Separator className="bg-primary" />
      </div>

      <div>
        <p className="body-sm mb-3 text-text-secondary">
          Separador com espessura personalizada
        </p>

        <Separator className="h-0.5 bg-secondary" />
      </div>
    </div>
  ),
};
