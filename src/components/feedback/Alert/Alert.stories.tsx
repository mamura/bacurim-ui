
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Bell, RefreshCw } from 'lucide-react';

import { Button } from '@/components/actions/Button';

import {
  Alert,
  AlertIcon,
  AlertContent,
  AlertTitle,
  AlertDescription,
  AlertActions,
  type AlertVariant,
} from './Alert';

const meta = {
  title: 'Components/Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  args: {
    variant: 'info',
    dismissible: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
    },
    dismissible: {
      control: 'boolean',
    },
    onDismiss: {
      action: 'dismiss',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

const variants: AlertVariant[] = [
  'info',
  'success',
  'warning',
  'danger',
];

const messages: Record<
  AlertVariant,
  { title: string; description: string }
> = {
  info: {
    title: 'Informação',
    description:
      'Os dados serão atualizados automaticamente.',
  },
  success: {
    title: 'Operação concluída',
    description:
      'As alterações foram salvas com sucesso.',
  },
  warning: {
    title: 'Atenção',
    description:
      'Existem informações que precisam ser revisadas.',
  },
  danger: {
    title: 'Não foi possível salvar',
    description:
      'Verifique os dados e tente novamente.',
  },
};

function AlertExample({
  variant,
}: {
  variant: AlertVariant;
}) {
  const message = messages[variant];

  return (
    <Alert variant={variant}>
      <AlertIcon />

      <AlertContent>
        <AlertTitle>{message.title}</AlertTitle>

        <AlertDescription>
          {message.description}
        </AlertDescription>
      </AlertContent>
    </Alert>
  );
}

export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-2xl">
      <Alert {...args}>
        <AlertIcon />

        <AlertContent>
          <AlertTitle>Informação importante</AlertTitle>

          <AlertDescription>
            Esta mensagem apresenta informações contextuais
            relacionadas à interface.
          </AlertDescription>
        </AlertContent>
      </Alert>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      {variants.map((variant) => (
        <AlertExample
          key={variant}
          variant={variant}
        />
      ))}
    </div>
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Alert variant="success">
        <AlertIcon />

        <AlertContent>
          <AlertTitle>
            Operação concluída com sucesso.
          </AlertTitle>
        </AlertContent>
      </Alert>
    </div>
  ),
};

export const DescriptionOnly: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Alert variant="info">
        <AlertIcon />

        <AlertContent>
          <AlertDescription>
            As informações exibidas podem sofrer alterações.
          </AlertDescription>
        </AlertContent>
      </Alert>
    </div>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Alert variant="warning">
        <AlertContent>
          <AlertTitle>
            Revisão necessária
          </AlertTitle>

          <AlertDescription>
            Confira as informações antes de continuar.
          </AlertDescription>
        </AlertContent>
      </Alert>
    </div>
  ),
};

export const CustomIcon: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Alert variant="info">
        <AlertIcon>
          <Bell size={20} />
        </AlertIcon>

        <AlertContent>
          <AlertTitle>
            Nova atualização disponível
          </AlertTitle>

          <AlertDescription>
            Uma nova versão da aplicação está disponível.
          </AlertDescription>
        </AlertContent>
      </Alert>
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Alert variant="danger">
        <AlertIcon />

        <AlertContent>
          <AlertTitle>
            Não foi possível carregar os dados
          </AlertTitle>

          <AlertDescription>
            Ocorreu um problema durante o carregamento.
            Tente novamente.
          </AlertDescription>

          <AlertActions>
            <Button
              size="sm"
              color="error"
              startIcon={<RefreshCw size={16} />}
              onClick={() => window.alert('Tentar novamente')}
            >
              Tentar novamente
            </Button>

            <Button
              size="sm"
              variant="outline"
              color="error"
              onClick={() => window.alert('Ver detalhes')}
            >
              Ver detalhes
            </Button>
          </AlertActions>
        </AlertContent>
      </Alert>
    </div>
  ),
};

export const Dismissible: Story = {
  render: function DismissibleAlertStory() {
    const [visible, setVisible] = useState(true);

    return (
      <div className="flex w-full max-w-2xl flex-col gap-4">
        {visible ? (
          <Alert
            variant="info"
            dismissible
            onDismiss={() => setVisible(false)}
          >
            <AlertIcon />

            <AlertContent>
              <AlertTitle>
                Alerta dispensável
              </AlertTitle>

              <AlertDescription>
                Clique no botão de fechar para remover
                esta mensagem.
              </AlertDescription>
            </AlertContent>
          </Alert>
        ) : (
          <p className="body-sm text-text-secondary">
            O alerta foi fechado.
          </p>
        )}

        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setVisible(true)}
          >
            Restaurar alerta
          </Button>
        </div>
      </div>
    );
  },
};

export const DismissibleVariants: Story = {
  render: function DismissibleVariantsStory() {
    const [visible, setVisible] = useState<
      Record<AlertVariant, boolean>
    >({
      info: true,
      success: true,
      warning: true,
      danger: true,
    });

    return (
      <div className="flex w-full max-w-2xl flex-col gap-4">
        {variants.map((variant) => {
          if (!visible[variant]) {
            return null;
          }

          const message = messages[variant];

          return (
            <Alert
              key={variant}
              variant={variant}
              dismissible
              onDismiss={() =>
                setVisible((current) => ({
                  ...current,
                  [variant]: false,
                }))
              }
            >
              <AlertIcon />

              <AlertContent>
                <AlertTitle>
                  {message.title}
                </AlertTitle>

                <AlertDescription>
                  {message.description}
                </AlertDescription>
              </AlertContent>
            </Alert>
          );
        })}

        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setVisible({
                info: true,
                success: true,
                warning: true,
                danger: true,
              })
            }
          >
            Restaurar todos
          </Button>
        </div>
      </div>
    );
  },
};

export const Accessibility: Story = {
  render: () => (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <Alert variant="info" role="status">
        <AlertIcon />

        <AlertContent>
          <AlertTitle>
            Atualização de informações
          </AlertTitle>

          <AlertDescription>
            Esta mensagem utiliza role="status".
          </AlertDescription>
        </AlertContent>
      </Alert>

      <Alert variant="danger" role="alert">
        <AlertIcon />

        <AlertContent>
          <AlertTitle>
            Erro importante
          </AlertTitle>

          <AlertDescription>
            Esta mensagem utiliza role="alert".
          </AlertDescription>
        </AlertContent>
      </Alert>
    </div>
  ),
};

export const Responsive: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <Alert variant="warning" dismissible onDismiss={() => {}}>
        <AlertIcon />

        <AlertContent>
          <AlertTitle>
            Atenção às informações
          </AlertTitle>

          <AlertDescription>
            Esta é uma mensagem mais longa para demonstrar
            como o componente se comporta em espaços
            reduzidos e como o conteúdo se adapta à
            largura disponível.
          </AlertDescription>

          <AlertActions>
            <Button size="sm" variant="outline" color="warning">
              Revisar informações
            </Button>
          </AlertActions>
        </AlertContent>
      </Alert>
    </div>
  ),
};
