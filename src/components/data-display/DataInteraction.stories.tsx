
import { useEffect, useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  FilterBar,
  FilterBarContent,
  FilterBarActions,
} from './FilterBar';

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableSortHead,
} from './Table';

import { Pagination } from '../navigation/Pagination';
import { FormattedValue } from './FormattedValue';
import { SearchInput } from '../forms/SearchInput';
import { Skeleton } from '../feedback/Skeleton';

type Status = 'active' | 'inactive';
type StatusFilter = Status | 'all';
type SortDirection = 'asc' | 'desc' | null;

interface RecordItem {
  id: number;
  name: string;
  category: string;
  status: Status;
  amount: number;
  variation: number;
  date: string;
}

const records: RecordItem[] = [
  {
    id: 1,
    name: 'Ana Oliveira',
    category: 'Serviços',
    status: 'active',
    amount: 12500,
    variation: 0.125,
    date: '2026-10-01',
  },
  {
    id: 2,
    name: 'Carlos Lima',
    category: 'Produtos',
    status: 'inactive',
    amount: 4300,
    variation: -0.075,
    date: '2026-10-04',
  },
  {
    id: 3,
    name: 'Mariana Costa',
    category: 'Serviços',
    status: 'active',
    amount: 8750,
    variation: 0.052,
    date: '2026-10-07',
  },
  {
    id: 4,
    name: 'Pedro Santos',
    category: 'Produtos',
    status: 'active',
    amount: 3200,
    variation: -0.032,
    date: '2026-10-10',
  },
  {
    id: 5,
    name: 'Juliana Ferreira',
    category: 'Serviços',
    status: 'inactive',
    amount: 6100,
    variation: 0.084,
    date: '2026-10-12',
  },
  {
    id: 6,
    name: 'Rafael Martins',
    category: 'Produtos',
    status: 'active',
    amount: 9400,
    variation: 0.167,
    date: '2026-10-15',
  },
  {
    id: 7,
    name: 'Beatriz Rocha',
    category: 'Serviços',
    status: 'active',
    amount: 15200,
    variation: 0.093,
    date: '2026-10-18',
  },
  {
    id: 8,
    name: 'Lucas Almeida',
    category: 'Produtos',
    status: 'inactive',
    amount: 2750,
    variation: -0.114,
    date: '2026-10-20',
  },
  {
    id: 9,
    name: 'Fernanda Ribeiro',
    category: 'Serviços',
    status: 'active',
    amount: 11800,
    variation: 0.072,
    date: '2026-10-24',
  },
  {
    id: 10,
    name: 'Bruno Carvalho',
    category: 'Produtos',
    status: 'active',
    amount: 5600,
    variation: 0.045,
    date: '2026-10-28',
  },
];

const PAGE_SIZE = 5;

function StatusLabel({ status }: { status: Status }) {
  const active = status === 'active';

  return (
    <span
      className={
        active
          ? 'text-body-sm font-medium text-success'
          : 'text-body-sm text-text-secondary'
      }
    >
      {active ? 'Ativo' : 'Inativo'}
    </span>
  );
}

function DataLoading() {
  return (
    <div
      role="status"
      aria-label="Carregando registros"
      className="flex flex-col gap-3 rounded-md border border-border p-4"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className="flex items-center gap-4"
        >
          <div className="min-w-0 flex-1">
            <Skeleton
              variant="rounded"
              height={20}
              width="75%"
            />
          </div>

          <Skeleton
            variant="rounded"
            height={20}
            width={100}
          />
        </div>
      ))}

      <span className="sr-only">
        Carregando registros...
      </span>
    </div>
  );
}

function DataEmpty() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-md border border-border px-6 py-12 text-center">
      <h3 className="text-body-md font-semibold text-text-primary">
        Nenhum registro encontrado
      </h3>

      <p className="text-body-sm text-text-secondary">
        Tente alterar ou limpar os filtros para visualizar outros resultados.
      </p>
    </div>
  );
}

function DataInteractionExample({
  initialLoading = false,
  initialSearch = '',
  initialStatus = 'all',
}: {
  initialLoading?: boolean;
  initialSearch?: string;
  initialStatus?: StatusFilter;
}) {
  const [search, setSearch] = useState(initialSearch);
  const [status, setStatus] = useState<StatusFilter>(
    initialStatus,
  );
  const [sortDirection, setSortDirection] =
    useState<SortDirection>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(initialLoading);

  const activeFiltersCount =
    Number(search.trim().length > 0) +
    Number(status !== 'all');

  const filteredRecords = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLocaleLowerCase('pt-BR');

    const result = records.filter((record) => {
      const matchesSearch = record.name
        .toLocaleLowerCase('pt-BR')
        .includes(normalizedSearch);

      const matchesStatus =
        status === 'all' || record.status === status;

      return matchesSearch && matchesStatus;
    });

    if (sortDirection) {
      result.sort((a, b) =>
        sortDirection === 'asc'
          ? a.amount - b.amount
          : b.amount - a.amount,
      );
    }

    return result;
  }, [search, status, sortDirection]);

  const totalPages = Math.ceil(
    filteredRecords.length / PAGE_SIZE,
  );

  const currentPage = Math.min(
    page,
    Math.max(1, totalPages),
  );

  const visibleRecords = filteredRecords.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  useEffect(() => {
    setPage(1);
  }, [search, status, sortDirection]);

  const clearFilters = () => {
    setSearch('');
    setStatus('all');
    setPage(1);
  };

  return (
    <div className="flex w-full flex-col gap-5">
      <FilterBar
        title="Exploração de registros"
        activeFiltersCount={activeFiltersCount}
        onClear={clearFilters}
      >
        <FilterBarContent columns={2}>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="data-interaction-search"
              className="text-body-sm font-medium text-text-primary"
            >
              Buscar
            </label>

            <SearchInput
              id="data-interaction-search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              onClear={() => setSearch('')}
              placeholder="Buscar por nome..."
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="data-interaction-status"
              className="text-body-sm font-medium text-text-primary"
            >
              Status
            </label>

            <select
              id="data-interaction-status"
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value as StatusFilter,
                )
              }
              className="h-11 w-full rounded-sm border border-border bg-surface px-3 text-body-sm text-text-primary outline-none focus:border-primary"
            >
              <option value="all">Todos</option>
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
            </select>
          </div>
        </FilterBarContent>

        <FilterBarActions>
          <button
            type="button"
            onClick={() => setLoading((current) => !current)}
            className="inline-flex h-10 items-center rounded-sm border border-border px-4 text-body-sm text-text-primary hover:bg-background"
          >
            {loading
              ? 'Exibir resultados'
              : 'Simular carregamento'}
          </button>
        </FilterBarActions>
      </FilterBar>

      <div
        className="flex flex-wrap items-center justify-between gap-2"
        aria-live="polite"
      >
        <p className="text-body-sm text-text-secondary">
          {loading
            ? 'Carregando registros...'
            : `${filteredRecords.length} registro(s) encontrado(s)`}
        </p>

        {!loading && filteredRecords.length > 0 && (
          <p className="text-body-sm text-text-secondary">
            Página {currentPage} de {totalPages}
          </p>
        )}
      </div>

      {loading ? (
        <DataLoading />
      ) : filteredRecords.length === 0 ? (
        <DataEmpty />
      ) : (
        <>
          <Table hoverable>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Status</TableHead>

                <TableSortHead
                  sortLabel="Valor"
                  sortDirection={sortDirection}
                  onSortChange={setSortDirection}
                  align="right"
                >
                  Valor
                </TableSortHead>

                <TableHead align="right">
                  Variação
                </TableHead>

                <TableHead align="right">
                  Data
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {visibleRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-text-primary">
                        {record.name}
                      </span>

                      <span className="text-body-sm text-text-secondary">
                        {record.category}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <StatusLabel status={record.status} />
                  </TableCell>

                  <TableCell align="right">
                    <FormattedValue
                      type="currency"
                      value={record.amount}
                    />
                  </TableCell>

                  <TableCell align="right">
                    <FormattedValue
                      type="percentage"
                      value={record.variation}
                    />
                  </TableCell>

                  <TableCell align="right">
                    <FormattedValue
                      type="date"
                      value={record.date}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
}

const meta = {
  title: 'Components/Data Display/Data Interaction',
  component: DataInteractionExample,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof DataInteractionExample>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CompleteExample: Story = {
  render: () => <DataInteractionExample />,
};

export const WithActiveFilters: Story = {
  render: () => (
    <DataInteractionExample
      initialSearch="Ana"
      initialStatus="active"
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <DataInteractionExample initialLoading />
  ),
};

export const EmptyResults: Story = {
  render: () => (
    <DataInteractionExample
      initialSearch="Registro inexistente"
    />
  ),
};
