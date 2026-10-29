
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@/components/actions/Button';
import { Input } from '@/components/forms/Input';
import { Textarea } from '@/components/forms/Textarea';

import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  type DialogSize,
} from './Dialog';

const meta = {
  title: 'Components/Overlays/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Abrir Dialog</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar informações</DialogTitle>
          <DialogDescription>
            Atualize os dados necessários.
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
          <p className="body-md text-text-primary">
            Este é um exemplo de conteúdo modal.
          </p>
        </DialogBody>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              Cancelar
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button>Confirmar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

const sizes: DialogSize[] = ['sm', 'md', 'lg', 'xl'];

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {sizes.map((size) => (
        <Dialog key={size}>
          <DialogTrigger asChild>
            <Button variant="outline">
              {size.toUpperCase()}
            </Button>
          </DialogTrigger>

          <DialogContent size={size}>
            <DialogHeader>
              <DialogTitle>
                Dialog {size.toUpperCase()}
              </DialogTitle>
              <DialogDescription>
                Exemplo de tamanho do Dialog.
              </DialogDescription>
            </DialogHeader>

            <DialogBody>
              <p className="body-md">
                O tamanho máximo é definido pela
                propriedade size.
              </p>
            </DialogBody>

            <DialogFooter>
              <DialogClose asChild>
                <Button>Fechar</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Editar registro</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Editar registro
          </DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo.
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-body-sm font-medium">
                Nome
              </span>
              <Input
                placeholder="Informe o nome"
                autoFocus
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-body-sm font-medium">
                Descrição
              </span>
              <Textarea
                rows={4}
                placeholder="Informe a descrição"
              />
            </label>
          </div>
        </DialogBody>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              Cancelar
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button>Salvar alterações</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Controlled: Story = {
  render: function ControlledDialogStory() {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex flex-col items-start gap-3">
        <Button onClick={() => setOpen(true)}>
          Abrir programaticamente
        </Button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Dialog controlado
              </DialogTitle>
              <DialogDescription>
                A visibilidade é gerenciada pela aplicação.
              </DialogDescription>
            </DialogHeader>

            <DialogBody>
              <p className="body-md">
                O estado open controla a exibição.
              </p>
            </DialogBody>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <p className="body-sm text-text-secondary">
          Estado: {open ? 'Aberto' : 'Fechado'}
        </p>
      </div>
    );
  },
};

export const OverlayBehavior: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Abrir sem fechamento externo
        </Button>
      </DialogTrigger>

      <DialogContent
        closeOnOverlayClick={false}
        closeOnEscape={false}
      >
        <DialogHeader>
          <DialogTitle>
            Fechamento controlado
          </DialogTitle>
          <DialogDescription>
            Clique fora ou pressione Escape para testar.
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
          <p className="body-md">
            Este Dialog só pode ser fechado pelos
            controles internos.
          </p>
        </DialogBody>

        <DialogFooter>
          <DialogClose asChild>
            <Button>Entendi</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithoutCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Sem botão X
        </Button>
      </DialogTrigger>

      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>
            Sem fechamento no cabeçalho
          </DialogTitle>
          <DialogDescription>
            Utilize o botão abaixo para fechar.
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
          <p className="body-md">
            O botão de fechamento padrão está oculto.
          </p>
        </DialogBody>

        <DialogFooter>
          <DialogClose asChild>
            <Button>Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const ScrollableContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Conteúdo longo
        </Button>
      </DialogTrigger>

      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>
            Conteúdo com rolagem
          </DialogTitle>
          <DialogDescription>
            O cabeçalho e as ações permanecem visíveis.
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
          <div className="flex flex-col gap-4">
            {Array.from({ length: 20 }, (_, index) => (
              <p
                key={index}
                className="body-md text-text-primary"
              >
                Parágrafo {index + 1}. Este conteúdo
                demonstra a rolagem interna do Dialog
                quando a altura disponível é ultrapassada.
              </p>
            ))}
          </div>
        </DialogBody>

        <DialogFooter>
          <DialogClose asChild>
            <Button>Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
