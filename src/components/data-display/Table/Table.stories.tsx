
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Pencil,
  Trash2,
} from 'lucide-react';

import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  type TableColor,
  type TableDensity,
} from './Table';

type Person = {
  id: number;
  name: string;
  role: string;
  project: string;
  status: string;
  budget: string;
};

const people: Person[] = [
  {
    id: 1,
    name: 'Ana Oliveira',
    role: 'Product Designer',
    project: 'Portal Administrativo',
    status: 'Ativo',
    budget: 'R$ 3.900',
  },
  {
    id: 2,
    name: 'Carlos Lima',
    role: 'Desenvolvedor',
    project: 'Aplicação Web',
    status: 'Pendente',
    budget: 'R$ 8.500',
  },
  {
    id: 3,
    name: 'Mariana Costa',
    role: 'Product Manager',
    project: 'Dashboard',
    status: 'Concluído',
    budget: 'R$ 12.800',
  },
  {
    id: 4,
    name: 'Pedro Santos',
    role: 'Analista',
    project: 'Integração API',
    status: 'Ativo',
    budget: 'R$ 5.200',
  },
];

function PersonTable({
  density = 'default',
  bordered = false,
  striped = false,
  stripeColor = 'neutral',
  hoverable = false,
  hoverColor = 'neutral',
}: {
  density?: TableDensity;
  bordered?: boolean;
  striped?: boolean;
  stripeColor?: TableColor;
  hoverable?: boolean;
  hoverColor?: TableColor;
}) {
  return (
    <Table
      density={density}
      variant={bordered ? 'bordered' : 'default'}
      striped={striped}
      stripeColor={stripeColor}
      hoverable={hoverable}
      hoverColor={hoverColor}
    >
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Projeto</TableHead>
          <TableHead>Status</TableHead>
          <TableHead align="right">Valor</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {people.map((person) => (
          <TableRow key={person.id}>
            <TableCell>{person.name}</TableCell>
            <TableCell>{person.project}</TableCell>
            <TableCell>{person.status}</TableCell>
            <TableCell align="right">
              {person.budget}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const meta = {
  title: 'Components/Data Display/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  args: {
    density: 'default',
    variant: 'default',
    striped: false,
    hoverable: false,
  },
  argTypes: {
    density: {
      control: 'select',
      options: ['compact', 'default', 'comfortable'],
    },
    variant: {
      control: 'select',
      options: ['default', 'bordered'],
    },
    stripeColor: {
      control: 'select',
      options: [
        'neutral',
        'success',
        'warning',
        'error',
        'info',
      ],
    },
    hoverColor: {
      control: 'select',
      options: [
        'neutral',
        'success',
        'warning',
        'error',
        'info',
      ],
    },
  },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="overflow-x-auto rounded-md border border-border">
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Projeto</TableHead>
            <TableHead>Status</TableHead>
            <TableHead align="right">Valor</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {people.map((person) => (
            <TableRow key={person.id}>
              <TableCell>{person.name}</TableCell>
              <TableCell>{person.project}</TableCell>
              <TableCell>{person.status}</TableCell>
              <TableCell align="right">
                {person.budget}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

export const Density: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(['compact', 'default', 'comfortable'] as const).map(
        (density) => (
          <div key={density} className="flex flex-col gap-3">
            <h3 className="font-medium">{density}</h3>

            <div className="overflow-x-auto rounded-md border border-border">
              <PersonTable density={density} />
            </div>
          </div>
        ),
      )}
    </div>
  ),
};

export const Bordered: Story = {
  render: () => (
    <div className="overflow-x-auto">
      <PersonTable bordered />
    </div>
  ),
};

export const Striped: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(
        ['neutral', 'success', 'error'] as const
      ).map((color) => (
        <div key={color} className="flex flex-col gap-3">
          <h3 className="font-medium">{color}</h3>

          <div className="overflow-x-auto rounded-md border border-border">
            <PersonTable striped stripeColor={color} />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const HighlightedRows: Story = {
  render: () => (
    <div className="overflow-x-auto rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Projeto</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {people.map((person, index) => (
            <TableRow
              key={person.id}
              highlight={
                index === 1
                  ? 'warning'
                  : index === 2
                    ? 'success'
                    : undefined
              }
            >
              <TableCell>{person.name}</TableCell>
              <TableCell>{person.project}</TableCell>
              <TableCell>{person.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

export const HighlightedCells: Story = {
  render: () => (
    <div className="overflow-x-auto rounded-md border border-border">
      <Table variant="bordered">
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Projeto</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {people.map((person, index) => (
            <TableRow key={person.id}>
              <TableCell
                highlight={
                  index === 0 ? 'info' : undefined
                }
              >
                {person.name}
              </TableCell>

              <TableCell
                highlight={
                  index === 1 ? 'warning' : undefined
                }
              >
                {person.project}
              </TableCell>

              <TableCell
                highlight={
                  index === 2 ? 'success' : undefined
                }
              >
                {person.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

export const Hoverable: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(['neutral', 'success', 'error'] as const).map(
        (color) => (
          <div key={color} className="flex flex-col gap-3">
            <h3 className="font-medium">
              Hover: {color}
            </h3>

            <div className="overflow-x-auto rounded-md border border-border">
              <PersonTable
                hoverable
                hoverColor={color}
              />
            </div>
          </div>
        ),
      )}
    </div>
  ),
};

export const Selectable: Story = {
  render: function SelectableExample() {
    const [selectedIds, setSelectedIds] = useState<number[]>(
      [],
    );

    const allSelected =
      selectedIds.length === people.length;

    const toggleSelection = (id: number) => {
      setSelectedIds((current) =>
        current.includes(id)
          ? current.filter((value) => value !== id)
          : [...current, id],
      );
    };

    const toggleAll = () => {
      setSelectedIds(
        allSelected ? [] : people.map((person) => person.id),
      );
    };

    return (
      <div className="flex flex-col gap-4">
        <div className="overflow-x-auto rounded-md border border-border">
          <Table hoverable>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    aria-label="Selecionar todos"
                    className="accent-primary"
                  />
                </TableHead>

                <TableHead>Nome</TableHead>
                <TableHead>Projeto</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {people.map((person) => {
                const selected = selectedIds.includes(
                  person.id,
                );

                return (
                  <TableRow
                    key={person.id}
                    selected={selected}
                  >
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() =>
                          toggleSelection(person.id)
                        }
                        aria-label={`Selecionar ${person.name}`}
                        className="accent-primary"
                      />
                    </TableCell>

                    <TableCell>{person.name}</TableCell>
                    <TableCell>{person.project}</TableCell>
                    <TableCell>{person.status}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <p className="text-body-sm text-text-secondary">
          {selectedIds.length} registro(s) selecionado(s).
        </p>
      </div>
    );
  },
};

export const CustomContent: Story = {
  render: () => (
    <div className="overflow-x-auto rounded-md border border-border">
      <Table hoverable>
        <TableHeader>
          <TableRow>
            <TableHead>Usuário</TableHead>
            <TableHead>Projeto</TableHead>
            <TableHead>Status</TableHead>
            <TableHead align="right">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {people.map((person, index) => (
            <TableRow key={person.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-soft font-semibold text-primary">
                    {person.name.charAt(0)}
                  </div>

                  <div className="flex flex-col">
                    <span className="font-medium">
                      {person.name}
                    </span>

                    <span className="text-xs text-text-secondary">
                      {person.role}
                    </span>
                  </div>
                </div>
              </TableCell>

              <TableCell>{person.project}</TableCell>

              <TableCell>
                <span
                  className={
                    index === 1
                      ? 'rounded-full bg-warning-soft px-2 py-1 text-xs text-warning'
                      : index === 2
                        ? 'rounded-full bg-info-soft px-2 py-1 text-xs text-info'
                        : 'rounded-full bg-success-soft px-2 py-1 text-xs text-success'
                  }
                >
                  {person.status}
                </span>
              </TableCell>

              <TableCell align="right">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    aria-label={`Editar ${person.name}`}
                    className="rounded-sm p-2 text-text-secondary hover:bg-background"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    type="button"
                    aria-label={`Excluir ${person.name}`}
                    className="rounded-sm p-2 text-error hover:bg-error-soft"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

export const InteractiveRows: Story = {
  render: function InteractiveRowsExample() {
    const [activeId, setActiveId] = useState<number | null>(
      null,
    );

    return (
      <div className="flex flex-col gap-4">
        <div className="overflow-x-auto rounded-md border border-border">
          <Table hoverable>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Projeto</TableHead>
                <TableHead align="right">Valor</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {people.map((person) => (
                <TableRow
                  key={person.id}
                  interactive
                  selected={activeId === person.id}
                  onClick={() => setActiveId(person.id)}
                  aria-label={`Selecionar ${person.name}`}
                >
                  <TableCell>{person.name}</TableCell>
                  <TableCell>{person.project}</TableCell>
                  <TableCell align="right">
                    {person.budget}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <p className="text-body-sm text-text-secondary">
          {activeId === null
            ? 'Selecione uma linha.'
            : `Selecionado: ${
                people.find((person) => person.id === activeId)
                  ?.name
              }`}
        </p>
      </div>
    );
  },
};

export const Empty: Story = {
  render: () => (
    <div className="overflow-x-auto rounded-md border border-border">
      <Table>
        <TableCaption>
          Exemplo de tabela sem registros.
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Projeto</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell
              colSpan={3}
              className="py-12 text-center text-text-secondary"
            >
              Nenhum registro encontrado.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <div className="overflow-x-auto rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Descrição</TableHead>
            <TableHead align="right">Valor</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>Serviço A</TableCell>
            <TableCell align="right">R$ 150,00</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Serviço B</TableCell>
            <TableCell align="right">R$ 250,00</TableCell>
          </TableRow>
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell align="right">R$ 400,00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  ),
};
