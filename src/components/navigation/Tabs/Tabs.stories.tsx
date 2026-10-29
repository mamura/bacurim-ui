
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bell, Settings, User } from 'lucide-react';

import { Badge } from '@/components/data-display/Badge';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  type TabsVariant,
} from './Tabs';

const variants: TabsVariant[] = [
  'underline',
  'pills',
  'segment',
  'card',
  'bar',
];

const meta = {
  title: 'Components/Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  args: {
    defaultValue: 'overview',
    orientation: 'horizontal',
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

function Example({
  variant = 'underline',
}: {
  variant?: TabsVariant;
}) {
  return (
    <Tabs defaultValue="overview">
      <TabsList variant={variant}>
        <TabsTrigger value="overview">
          Visão geral
        </TabsTrigger>
        <TabsTrigger value="activity">
          Atividades
        </TabsTrigger>
        <TabsTrigger value="settings">
          Configurações
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <p className="body-md text-text-secondary">
          Informações gerais sobre a aplicação.
        </p>
      </TabsContent>

      <TabsContent value="activity">
        <p className="body-md text-text-secondary">
          Histórico de atividades recentes.
        </p>
      </TabsContent>

      <TabsContent value="settings">
        <p className="body-md text-text-secondary">
          Preferências e configurações.
        </p>
      </TabsContent>
    </Tabs>
  );
}

export const Default: Story = {
  render: () => <Example />,
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      {variants.map((variant) => (
        <section key={variant} className="flex flex-col gap-3">
          <h3 className="heading-sm capitalize">
            {variant}
          </h3>
          <Example variant={variant} />
        </section>
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="profile">
      <TabsList>
        <TabsTrigger value="profile">
          <User size={16} />
          Perfil
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <Bell size={16} />
          Notificações
        </TabsTrigger>
        <TabsTrigger value="settings">
          <Settings size={16} />
          Configurações
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        Dados do perfil.
      </TabsContent>
      <TabsContent value="notifications">
        Central de notificações.
      </TabsContent>
      <TabsContent value="settings">
        Configurações da conta.
      </TabsContent>
    </Tabs>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <Tabs defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">
          Todas
          <Badge size="sm">24</Badge>
        </TabsTrigger>
        <TabsTrigger value="pending">
          Pendentes
          <Badge color="warning" size="sm">
            8
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="completed">
          Concluídas
          <Badge color="success" size="sm">
            16
          </Badge>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        Todas as solicitações.
      </TabsContent>
      <TabsContent value="pending">
        Solicitações pendentes.
      </TabsContent>
      <TabsContent value="completed">
        Solicitações concluídas.
      </TabsContent>
    </Tabs>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">
          Visão geral
        </TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Indisponível
        </TabsTrigger>
        <TabsTrigger value="settings">
          Configurações
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        Conteúdo disponível.
      </TabsContent>
      <TabsContent value="disabled">
        Conteúdo indisponível.
      </TabsContent>
      <TabsContent value="settings">
        Configurações disponíveis.
      </TabsContent>
    </Tabs>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="overview" orientation="vertical">
      <TabsList variant="underline">
        <TabsTrigger value="overview">
          Visão geral
        </TabsTrigger>
        <TabsTrigger value="activity">
          Atividades
        </TabsTrigger>
        <TabsTrigger value="settings">
          Configurações
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        Conteúdo da visão geral.
      </TabsContent>
      <TabsContent value="activity">
        Histórico de atividades.
      </TabsContent>
      <TabsContent value="settings">
        Preferências da aplicação.
      </TabsContent>
    </Tabs>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabsList variant="segment" fullWidth>
        <TabsTrigger value="overview">
          Visão geral
        </TabsTrigger>
        <TabsTrigger value="activity">
          Atividades
        </TabsTrigger>
        <TabsTrigger value="settings">
          Configurações
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        Conteúdo da visão geral.
      </TabsContent>
      <TabsContent value="activity">
        Histórico de atividades.
      </TabsContent>
      <TabsContent value="settings">
        Preferências da aplicação.
      </TabsContent>
    </Tabs>
  ),
};

export const HorizontalScroll: Story = {
  render: () => (
    <div className="max-w-80">
      <Tabs defaultValue="first">
        <TabsList scrollable>
          {Array.from({ length: 8 }, (_, index) => (
            <TabsTrigger
              key={index}
              value={`tab-${index}`}
            >
              Aba com título longo {index + 1}
            </TabsTrigger>
          ))}
        </TabsList>

        {Array.from({ length: 8 }, (_, index) => (
          <TabsContent
            key={index}
            value={`tab-${index}`}
          >
            Conteúdo da aba {index + 1}.
          </TabsContent>
        ))}
      </Tabs>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('overview');

    return (
      <div className="flex flex-col gap-4">
        <Tabs value={value} onValueChange={setValue}>
          <TabsList variant="pills">
            <TabsTrigger value="overview">
              Visão geral
            </TabsTrigger>
            <TabsTrigger value="activity">
              Atividades
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            Conteúdo da visão geral.
          </TabsContent>
          <TabsContent value="activity">
            Conteúdo das atividades.
          </TabsContent>
        </Tabs>

        <p className="body-sm text-text-secondary">
          Aba selecionada: {value}
        </p>
      </div>
    );
  },
};
