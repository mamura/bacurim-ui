
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ChevronDown,
  Copy,
  Download,
  MoreVertical,
  Pencil,
  Settings,
  Trash2,
  User,
} from 'lucide-react';

import { Button } from '@/components/actions/Button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './DropdownMenu';

const meta = {
  title: 'Components/Navigation/Dropdown Menu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" endIcon={<ChevronDown size={16} />}>
          Ações
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem>Editar</DropdownMenuItem>
        <DropdownMenuItem>Duplicar</DropdownMenuItem>
        <DropdownMenuItem>Exportar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" endIcon={<ChevronDown size={16} />}>
          Ações
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem>
          <Pencil size={16} />
          Editar
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Copy size={16} />
          Duplicar
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Download size={16} />
          Exportar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" endIcon={<ChevronDown size={16} />}>
          Opções
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Conta</DropdownMenuLabel>

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User size={16} />
            Perfil
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Settings size={16} />
            Configurações
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem disabled>
            <Download size={16} />
            Exportar dados
          </DropdownMenuItem>

          <DropdownMenuItem color="error">
            <Trash2 size={16} />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const IconTrigger: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          iconOnly
          aria-label="Abrir menu de opções"
          startIcon={<MoreVertical size={18} />}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Pencil size={16} />
          Editar
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Copy size={16} />
          Duplicar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {(['bottom', 'top', 'left', 'right'] as const).map(
        (side) => (
          <DropdownMenu key={side}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {side}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent side={side}>
              <DropdownMenuItem>Primeira ação</DropdownMenuItem>
              <DropdownMenuItem>Segunda ação</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      )}
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" endIcon={<ChevronDown size={16} />}>
          Gerenciar
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onSelect={() => window.alert('Editar selecionado')}
        >
          <Pencil size={16} />
          Editar
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={() => window.alert('Duplicar selecionado')}
        >
          <Copy size={16} />
          Duplicar
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          color="error"
          onSelect={() => window.alert('Excluir selecionado')}
        >
          <Trash2 size={16} />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
