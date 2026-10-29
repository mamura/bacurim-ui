
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@/components/actions/Button';
import { Input } from '@/components/forms/Input';

import {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  type DrawerSide,
  type DrawerSize,
} from './Drawer';

const meta = {
  title: 'Components/Overlays/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Abrir Drawer</Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Detalhes do registro</DrawerTitle>
          <DrawerDescription>
            Consulte as informações do registro selecionado.
          </DrawerDescription>
        </DrawerHeader>

        <DrawerBody>
          <p className="body-md text-text-primary">
            Conteúdo do painel lateral.
          </p>
        </DrawerBody>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Fechar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

const sides: DrawerSide[] = [
  'left',
  'right',
  'top',
  'bottom',
];

export const Positions: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {sides.map((side) => (
        <Drawer key={side}>
          <DrawerTrigger asChild>
            <Button variant="outline">
              {side}
            </Button>
          </DrawerTrigger>

          <DrawerContent side={side}>
            <DrawerHeader>
              <DrawerTitle>
                Drawer: {side}
              </DrawerTitle>
              <DrawerDescription>
                Painel aberto a partir da borda {side}.
              </DrawerDescription>
            </DrawerHeader>

            <DrawerBody>
              <p className="body-md">
                Exemplo de posicionamento.
              </p>
            </DrawerBody>

            <DrawerFooter>
              <DrawerClose asChild>
                <Button>Fechar</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  ),
};

const sizes: DrawerSize[] = [
  'sm',
  'md',
  'lg',
  'xl',
];

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {sizes.map((size) => (
        <Drawer key={size}>
          <DrawerTrigger asChild>
            <Button variant="outline">
              {size.toUpperCase()}
            </Button>
          </DrawerTrigger>

          <DrawerContent size={size}>
            <DrawerHeader>
              <DrawerTitle>
                Tamanho {size.toUpperCase()}
              </DrawerTitle>
              <DrawerDescription>
                Exemplo de dimensionamento.
              </DrawerDescription>
            </DrawerHeader>

            <DrawerBody>
              <p className="body-md">
                O tamanho do painel é configurado
                pela propriedade size.
              </p>
            </DrawerBody>

            <DrawerFooter>
              <DrawerClose asChild>
                <Button>Fechar</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Editar informações</Button>
      </DrawerTrigger>

      <DrawerContent side="right" size="lg">
        <DrawerHeader>
          <DrawerTitle>
            Editar informações
          </DrawerTitle>
          <DrawerDescription>
            Atualize os dados do registro.
          </DrawerDescription>
        </DrawerHeader>

        <DrawerBody>
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-body-sm font-medium">
                Nome
              </span>
              <Input placeholder="Informe o nome" />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-body-sm font-medium">
                Categoria
              </span>
              <Input placeholder="Informe a categoria" />
            </label>
          </div>
        </DrawerBody>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">
              Cancelar
            </Button>
          </DrawerClose>

          <DrawerClose asChild>
            <Button>Salvar alterações</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const Controlled: Story = {
  render: function ControlledDrawerStory() {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex flex-col items-start gap-3">
        <Button onClick={() => setOpen(true)}>
          Abrir programaticamente
        </Button>

        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
                Drawer controlado
              </DrawerTitle>
              <DrawerDescription>
                A aplicação controla a visibilidade.
              </DrawerDescription>
            </DrawerHeader>

            <DrawerBody>
              <p className="body-md">
                O estado open determina se o painel
                está visível.
              </p>
            </DrawerBody>

            <DrawerFooter>
              <Button onClick={() => setOpen(false)}>
                Fechar
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <p className="body-sm text-text-secondary">
          Estado: {open ? 'Aberto' : 'Fechado'}
        </p>
      </div>
    );
  },
};

export const CloseBehavior: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          Testar fechamento
        </Button>
      </DrawerTrigger>

      <DrawerContent
        closeOnOverlayClick={false}
        closeOnEscape={false}
      >
        <DrawerHeader>
          <DrawerTitle>
            Fechamento explícito
          </DrawerTitle>
          <DrawerDescription>
            Clique fora ou pressione Escape para testar.
          </DrawerDescription>
        </DrawerHeader>

        <DrawerBody>
          <p className="body-md">
            O fechamento externo e por Escape
            estão desabilitados.
          </p>
        </DrawerBody>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Entendi</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const ScrollableContent: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          Conteúdo longo
        </Button>
      </DrawerTrigger>

      <DrawerContent size="md">
        <DrawerHeader>
          <DrawerTitle>
            Conteúdo com rolagem
          </DrawerTitle>
          <DrawerDescription>
            Cabeçalho e rodapé permanecem visíveis.
          </DrawerDescription>
        </DrawerHeader>

        <DrawerBody>
          <div className="flex flex-col gap-4">
            {Array.from({ length: 30 }, (_, index) => (
              <p
                key={index}
                className="body-md text-text-primary"
              >
                Item {index + 1}. Exemplo de conteúdo
                com rolagem interna.
              </p>
            ))}
          </div>
        </DrawerBody>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Fechar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
