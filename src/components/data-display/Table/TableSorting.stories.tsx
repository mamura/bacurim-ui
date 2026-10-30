
import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from './Table';

import {
  TableSortHead,
  type TableSortDirection,
} from './TableSortHead';

type SortColumn = 'name' | 'amount';

interface SortingState {
  column: SortColumn | null;
  direction: TableSortDirection;
}

interface Item {
  id: number;
  name: string;
  category: string;
  amount: number;
}

const items: Item[] = [
  {
    id: 1,
    name: 'Ana Oliveira',
    category: 'Serviços',
    amount: 3900,
  },
  {
    id: 2,
    name: 'Carlos Lima',
    category: 'Infraestrutura',
    amount: 8500,
  },
  {
    id: 3,
    name: 'Mariana Costa',
    category: 'Software',
    amount: 12800,
  },
  {
    id: 4,
    name: 'Pedro Santos',
    category: 'Serviços',
    amount: 5200,
  },
];

function sortItems(
  data: Item[],
  sorting: SortingState,
): Item[] {
  if (!sorting.column || !sorting.direction) {
    return data;
  }

  const multiplier =
    sorting.direction === 'asc' ? 1 : -1;

  return [...data].sort((a, b) => {
    if (sorting.column === 'name') {
      return (
        a.name.localeCompare(b.name, 'pt-BR') *
        multiplier
      );
    }

    return (a.amount - b.amount) * multiplier;
  });
}

function SortingExample({
  initialColumn = 'name',
  initialDirection = 'asc',
  allowUnsort = true,
}: {
  initialColumn?: SortColumn | null;
  initialDirection?: TableSortDirection;
  allowUnsort?: boolean;
}) {
  const [sorting, setSorting] = useState<SortingState>({
    column: initialColumn,
    direction: initialDirection,
  });

  const sortedItems = useMemo(
    () => sortItems(items, sorting),
    [sorting],
  );

  const updateSorting = (
    column: SortColumn,
    direction: TableSortDirection,
  ) => {
    setSorting({
      column: direction === null ? null : column,
      direction,
    });
  };

  return (
    <div className="flex max-w-3xl flex-col gap-4">
      <div className="overflow-x-auto rounded-md border border-border">
        <Table hoverable>
          <TableHeader>
            <TableRow>
              <TableSortHead
                sortLabel="Nome"
                sortDirection={
                  sorting.column === 'name'
                    ? sorting.direction
                    : null
                }
                allowUnsort={allowUnsort}
                onSortChange={(direction) =>
                  updateSorting('name', direction)
                }
              >
                Nome
              </TableSortHead>

              <TableHead>Categoria</TableHead>

              <TableSortHead
                sortLabel="Valor"
                align="right"
                sortDirection={
                  sorting.column === 'amount'
                    ? sorting.direction
                    : null
                }
                allowUnsort={allowUnsort}
                onSortChange={(direction) =>
                  updateSorting('amount', direction)
                }
              >
                Valor
              </TableSortHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sortedItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>

                <TableCell>{item.category}</TableCell>

                <TableCell align="right">
                  {item.amount.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="text-body-sm text-text-secondary">
        Coluna: {sorting.column ?? 'nenhuma'}.
        Direção: {sorting.direction ?? 'nenhuma'}.
      </p>
    </div>
  );
}

const meta = {
  title: 'Components/Data Display/Table/Sorting',
  component: TableSortHead,
  parameters: {
    layout: 'padded',
  },
  args: {
    sortLabel: 'Nome',
    sortDirection: null,
    allowUnsort: true,
    disabled: false,
    children: 'Nome',
  },
  argTypes: {
    sortDirection: {
      control: 'select',
      options: [null, 'asc', 'desc'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
  },
} satisfies Meta<typeof TableSortHead>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <SortingExample />,
};

export const Ascending: Story = {
  render: () => (
    <SortingExample
      initialColumn="name"
      initialDirection="asc"
    />
  ),
};

export const Descending: Story = {
  render: () => (
    <SortingExample
      initialColumn="amount"
      initialDirection="desc"
    />
  ),
};

export const Unsorted: Story = {
  render: () => (
    <SortingExample
      initialColumn={null}
      initialDirection={null}
    />
  ),
};

export const WithoutUnsort: Story = {
  render: () => (
    <SortingExample
      initialColumn="name"
      initialDirection="asc"
      allowUnsort={false}
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="max-w-xl overflow-x-auto rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableSortHead
              sortLabel="Nome"
              disabled
              sortDirection={null}
            >
              Nome
            </TableSortHead>

            <TableHead>Categoria</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>Ana Oliveira</TableCell>
            <TableCell>Serviços</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};

export const ExternalControl: Story = {
  render: function ExternalControlExample() {
    const [sorting, setSorting] = useState<SortingState>({
      column: 'name',
      direction: 'asc',
    });

    const ordered = useMemo(
      () => sortItems(items, sorting),
      [sorting],
    );

    return (
      <div className="flex max-w-3xl flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              setSorting({
                column: 'name',
                direction: 'asc',
              })
            }
            className="rounded-sm border border-border px-3 py-2 text-body-sm"
          >
            Nome crescente
          </button>

          <button
            type="button"
            onClick={() =>
              setSorting({
                column: 'amount',
                direction: 'desc',
              })
            }
            className="rounded-sm border border-border px-3 py-2 text-body-sm"
          >
            Maior valor
          </button>

          <button
            type="button"
            onClick={() =>
              setSorting({
                column: null,
                direction: null,
              })
            }
            className="rounded-sm border border-border px-3 py-2 text-body-sm"
          >
            Limpar ordenação
          </button>
        </div>

        <div className="overflow-x-auto rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableSortHead
                  sortLabel="Nome"
                  sortDirection={
                    sorting.column === 'name'
                      ? sorting.direction
                      : null
                  }
                  onSortChange={(direction) =>
                    setSorting({
                      column:
                        direction === null
                          ? null
                          : 'name',
                      direction,
                    })
                  }
                >
                  Nome
                </TableSortHead>

                <TableSortHead
                  sortLabel="Valor"
                  align="right"
                  sortDirection={
                    sorting.column === 'amount'
                      ? sorting.direction
                      : null
                  }
                  onSortChange={(direction) =>
                    setSorting({
                      column:
                        direction === null
                          ? null
                          : 'amount',
                      direction,
                    })
                  }
                >
                  Valor
                </TableSortHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {ordered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>

                  <TableCell align="right">
                    {item.amount.toLocaleString(
                      'pt-BR',
                      {
                        style: 'currency',
                        currency: 'BRL',
                      },
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  },
};
