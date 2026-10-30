
import { useState } from 'react';

import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import { Download, Plus } from 'lucide-react';

import { FilterBar, FilterBarContent, FilterBarActions } from './FilterBar';

import { SearchInput } from '../../forms/SearchInput';
import { Input } from '../../forms/Input';

const meta = {
  title: 'Components/Data Display/Filter Bar',
  component: FilterBar,
  parameters: {
    layout: 'padded',
  },
  args: {
    title: 'Filtros',
    activeFiltersCount: 0,
    showClearButton: true,
    showActiveCount: true,
  },
  argTypes: {
    activeFiltersCount: {
      control: {
        type: 'number',
        min: 0,
      },
    },
    showClearButton: {
      control: 'boolean',
    },
    showActiveCount: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof FilterBar>;

export default meta;

type Story = StoryObj<typeof meta>;

const selectClasses =
  'h-11 w-full rounded-sm border border-border bg-surface px-3 text-body-sm text-text-primary outline-none focus:border-primary';

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="text-body-sm font-medium text-text-primary"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export const Default: Story = {
  render: (args) => (
    <FilterBar {...args}>
      <FilterBarContent columns={2}>
        <Field label="Buscar" htmlFor="filter-default-search">
          <SearchInput
            id="filter-default-search"
            placeholder="Buscar registros..."
          />
        </Field>

        <Field label="Status" htmlFor="filter-default-status">
          <select
            id="filter-default-status"
            className={selectClasses}
            defaultValue=""
          >
            <option value="">Todos os status</option>
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>
        </Field>
      </FilterBarContent>
    </FilterBar>
  ),
};

export const MultipleFilters: Story = {
  render: () => (
    <FilterBar title="Filtrar registros">
      <FilterBarContent columns={4}>
        <Field label="Buscar" htmlFor="filter-multiple-search">
          <SearchInput
            id="filter-multiple-search"
            placeholder="Nome ou descrição..."
          />
        </Field>

        <Field label="Status" htmlFor="filter-multiple-status">
          <select
            id="filter-multiple-status"
            className={selectClasses}
            defaultValue=""
          >
            <option value="">Todos</option>
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>
        </Field>

        <Field label="Categoria" htmlFor="filter-multiple-category">
          <select
            id="filter-multiple-category"
            className={selectClasses}
            defaultValue=""
          >
            <option value="">Todas</option>
            <option value="service">Serviços</option>
            <option value="product">Produtos</option>
          </select>
        </Field>

        <Field label="Data inicial" htmlFor="filter-multiple-date">
          <Input
            id="filter-multiple-date"
            type="text"
            placeholder="DD/MM/AAAA"
          />
        </Field>
      </FilterBarContent>
    </FilterBar>
  ),
};

export const WithActiveFilters: Story = {
  render: function ActiveFiltersExample() {
    const [search, setSearch] = useState('Bacurim');
    const [status, setStatus] = useState('active');

    const activeCount =
      Number(search.trim().length > 0) +
      Number(status.length > 0);

    const clearFilters = () => {
      setSearch('');
      setStatus('');
    };

    return (
      <FilterBar
        title="Filtros"
        activeFiltersCount={activeCount}
        onClear={clearFilters}
      >
        <FilterBarContent columns={2}>
          <Field label="Buscar" htmlFor="filter-active-search">
            <SearchInput
              id="filter-active-search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              onClear={() => setSearch('')}
              placeholder="Buscar..."
            />
          </Field>

          <Field label="Status" htmlFor="filter-active-status">
            <select
              id="filter-active-status"
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
              className={selectClasses}
            >
              <option value="">Todos</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
            </select>
          </Field>
        </FilterBarContent>
      </FilterBar>
    );
  },
};

export const WithActions: Story = {
  render: () => (
    <FilterBar title="Registros">
      <FilterBarContent columns={3}>
        <Field label="Buscar" htmlFor="filter-actions-search">
          <SearchInput
            id="filter-actions-search"
            placeholder="Buscar registros..."
          />
        </Field>

        <Field label="Status" htmlFor="filter-actions-status">
          <select
            id="filter-actions-status"
            className={selectClasses}
            defaultValue=""
          >
            <option value="">Todos</option>
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>
        </Field>
      </FilterBarContent>

      <FilterBarActions>
        <button
          type="button"
          className="inline-flex h-10 items-center gap-2 rounded-sm border border-border px-4 text-body-sm text-text-primary hover:bg-background"
        >
          <Download size={16} />
          Exportar
        </button>

        <button
          type="button"
          className="inline-flex h-10 items-center gap-2 rounded-sm bg-primary px-4 text-body-sm text-primary-contrast hover:opacity-90"
        >
          <Plus size={16} />
          Novo registro
        </button>
      </FilterBarActions>
    </FilterBar>
  ),
};

export const WithoutHeader: Story = {
  render: () => (
    <FilterBar
      title=""
      showActiveCount={false}
      showClearButton={false}
    >
      <FilterBarContent columns={2}>
        <SearchInput
          aria-label="Buscar"
          placeholder="Buscar..."
        />

        <select
          aria-label="Status"
          className={selectClasses}
          defaultValue=""
        >
          <option value="">Todos os status</option>
          <option value="active">Ativo</option>
          <option value="inactive">Inativo</option>
        </select>
      </FilterBarContent>
    </FilterBar>
  ),
};

export const Responsive: Story = {
  render: () => (
    <div className="max-w-lg">
      <FilterBar title="Layout responsivo">
        <FilterBarContent columns={4}>
          <SearchInput
            aria-label="Buscar"
            placeholder="Buscar..."
          />

          {['Status', 'Categoria', 'Período'].map(
            (label) => (
              <select
                key={label}
                aria-label={label}
                className={selectClasses}
                defaultValue=""
              >
                <option value="">{label}</option>
                <option value="one">Opção 1</option>
                <option value="two">Opção 2</option>
              </select>
            ),
          )}
        </FilterBarContent>
      </FilterBar>
    </div>
  ),
};

const records = [
  { id: 1, name: 'Ana Oliveira', status: 'active' },
  { id: 2, name: 'Carlos Lima', status: 'inactive' },
  { id: 3, name: 'Mariana Costa', status: 'active' },
  { id: 4, name: 'Pedro Santos', status: 'inactive' },
  { id: 5, name: 'Juliana Ferreira', status: 'active' },
];

export const WithFilteredList: Story = {
  render: function FilteredListExample() {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');

    const activeCount =
      Number(search.trim().length > 0) +
      Number(status.length > 0);

    const filteredRecords = records.filter((record) => {
      const matchesSearch = record.name
        .toLocaleLowerCase('pt-BR')
        .includes(search.toLocaleLowerCase('pt-BR'));

      const matchesStatus =
        !status || record.status === status;

      return matchesSearch && matchesStatus;
    });

    const clearFilters = () => {
      setSearch('');
      setStatus('');
    };

    return (
      <div className="flex flex-col gap-4">
        <FilterBar
          title="Clientes"
          activeFiltersCount={activeCount}
          onClear={clearFilters}
        >
          <FilterBarContent columns={2}>
            <Field label="Buscar" htmlFor="filter-list-search">
              <SearchInput
                id="filter-list-search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                onClear={() => setSearch('')}
                placeholder="Buscar cliente..."
              />
            </Field>

            <Field label="Status" htmlFor="filter-list-status">
              <select
                id="filter-list-status"
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value)
                }
                className={selectClasses}
              >
                <option value="">Todos</option>
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
            </Field>
          </FilterBarContent>
        </FilterBar>

        <div className="overflow-hidden rounded-md border border-border">
          {filteredRecords.length > 0 ? (
            <ul className="divide-y divide-border">
              {filteredRecords.map((record) => (
                <li
                  key={record.id}
                  className="flex items-center justify-between gap-3 px-4 py-3"
                >
                  <span className="text-body-sm text-text-primary">
                    {record.name}
                  </span>

                  <span className="text-body-sm text-text-secondary">
                    {record.status === 'active'
                      ? 'Ativo'
                      : 'Inativo'}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-6 text-center text-body-sm text-text-secondary">
              Nenhum registro encontrado.
            </p>
          )}
        </div>

        <p className="text-body-sm text-text-secondary">
          {filteredRecords.length} registro(s) encontrado(s).
        </p>
      </div>
    );
  },
};
