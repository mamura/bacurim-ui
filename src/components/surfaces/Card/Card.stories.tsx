
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowUpRight, MoreHorizontal, TrendingUp, Wallet } from 'lucide-react';

import { Button } from '../../actions/Button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardMedia,
} from './Card';

const meta = {
  title: 'Components/Surfaces/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  args: {
    variant: 'outlined',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'elevated', 'filled'],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader>
        <CardTitle>Título do card</CardTitle>
        <CardDescription>
          Uma descrição breve sobre o conteúdo.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="body-md text-text-secondary">
          Os cards organizam informações relacionadas em uma
          superfície visual independente.
        </p>
      </CardContent>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-3">
      {(['outlined', 'elevated', 'filled'] as const).map(
        (variant) => (
          <Card key={variant} variant={variant}>
            <CardHeader>
              <CardTitle className="capitalize">
                {variant}
              </CardTitle>
              <CardDescription>
                Variante visual do componente Card.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="body-sm text-text-secondary">
                Conteúdo demonstrativo.
              </p>
            </CardContent>
          </Card>
        ),
      )}
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>Informações gerais</CardTitle>
        <CardDescription>
          Revise as informações antes de continuar.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="body-md">
          O conteúdo pode incluir textos, formulários,
          listas ou outros componentes.
        </p>
      </CardContent>

      <CardFooter className="justify-end border-t border-border">
        <Button variant="outline">Cancelar</Button>
        <Button>Salvar alterações</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithMedia: Story = {
  render: () => (
    <Card variant="elevated" className="max-w-sm">
      <CardMedia
        src="https://images.unsplash.com/photo-1497366811353-6870744d04b?w=900"
        alt="Ambiente de trabalho com mesa e cadeiras"
        className="aspect-video"
        loading="lazy"
      />

      <CardContent className="flex flex-col gap-3">
        <CardTitle>Ambiente de trabalho</CardTitle>

        <CardDescription>
          Imagens podem ocupar toda a largura do card,
          respeitando seus cantos arredondados.
        </CardDescription>

        <div>
          <Button size="sm">Saiba mais</Button>
        </div>
      </CardContent>
    </Card>
  ),
};

export const ColoredHeader: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader className="bg-primary">
        <CardTitle className="text-white">
          Cabeçalho destacado
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <CardTitle>Conteúdo independente</CardTitle>

        <CardDescription>
          O cabeçalho pode receber cores semânticas sem
          exigir uma variante adicional do Card.
        </CardDescription>

        <div>
          <Button size="sm">Continuar</Button>
        </div>
      </CardContent>
    </Card>
  ),
};


export const ColoredSurface: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-3">
      <Card
        variant="outlined"
        className="border-0 bg-primary text-primary-contrast"
      >
        <CardContent className="flex flex-col gap-5">
          <Wallet size={24} aria-hidden="true" />

          <div>
            <p className="body-sm opacity-80">Receita</p>
            <p className="heading-lg">R$ 12.450</p>
          </div>
        </CardContent>
      </Card>

      <Card
        variant="outlined"
        className="border-0 bg-success text-success-contrast"
      >
        <CardContent className="flex flex-col gap-5">
          <TrendingUp size={24} aria-hidden="true" />

          <div>
            <p className="body-sm opacity-80">Crescimento</p>
            <p className="heading-lg">+18,5%</p>
          </div>
        </CardContent>
      </Card>

      <Card
        variant="outlined"
        className="border-0 bg-secondary text-secondary-contrast"
      >
        <CardContent className="flex flex-col gap-5">
          <ArrowUpRight size={24} aria-hidden="true" />

          <div>
            <p className="body-sm opacity-80">Atividades</p>
            <p className="heading-lg">248</p>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};


export const Compact: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-3">
      {[
        { label: 'Projetos', value: '24' },
        { label: 'Atividades', value: '156' },
        { label: 'Concluídas', value: '89' },
      ].map((item) => (
        <Card key={item.label} variant="elevated">
          <CardContent className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <CardDescription>{item.label}</CardDescription>
              <CardTitle>{item.value}</CardTitle>
            </div>

            <span className="rounded-md bg-primary-soft p-3 text-primary">
              <TrendingUp size={20} aria-hidden="true" />
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};

export const Profile: Story = {
  render: () => (
    <Card variant="elevated" className="max-w-sm">
      <CardContent className="flex flex-col items-center gap-4 text-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-primary-soft text-primary">
          <span className="heading-lg">JD</span>
        </div>

        <div className="flex flex-col gap-1">
          <CardTitle>João da Silva</CardTitle>
          <CardDescription>
            Membro da equipe
          </CardDescription>
        </div>

        <span className="rounded-full bg-success-soft px-3 py-1 text-success">
          Ativo
        </span>

        <Button variant="soft" fullWidth>
          Ver perfil
        </Button>
      </CardContent>
    </Card>
  ),
};

export const CustomComposition: Story = {
  render: () => (
    <Card variant="elevated" className="max-w-md">
      <CardHeader className="flex-row items-start justify-between">
        <div className="flex flex-col gap-1">
          <CardTitle>Resumo de atividades</CardTitle>
          <CardDescription>
            Informações atualizadas
          </CardDescription>
        </div>

        <Button
          variant="ghost"
          color="neutral"
          size="sm"
          iconOnly
          aria-label="Mais opções"
        >
          <MoreHorizontal size={18} />
        </Button>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="body-sm text-text-secondary">
            Atividades concluídas
          </span>
          <span className="heading-md">75%</span>
        </div>

        <div
          className="h-2 overflow-hidden rounded-full bg-primary-soft"
          role="progressbar"
          aria-label="Atividades concluídas"
          aria-valuenow={75}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="h-full w-3/4 rounded-full bg-primary" />
        </div>
      </CardContent>

      <CardFooter className="justify-end">
        <Button variant="link" endIcon={<ArrowUpRight size={16} />}>
          Ver detalhes
        </Button>
      </CardFooter>
    </Card>
  ),
};
