
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { SearchInput } from './SearchInput';

const meta = {
  title: 'Components/Forms/Search Input',
  component: SearchInput,
  parameters: {
    layout: 'padded',
  },
  args: {
    placeholder: 'Pesquisar...',
    size: 'md',
    radius: 'sm',
    clearable: true,
    disabled: false,
    readOnly: false,
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    radius: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
    },
    clearable: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-96">
      <SearchInput {...args} aria-label="Pesquisar" />
    </div>
  ),
};

export const WithValue: Story = {
  render: () => (
    <div className="w-96">
      <SearchInput
        aria-label="Pesquisar"
        defaultValue="Bacurim"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-5">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <label
            htmlFor={`search-${size}`}
            className="text-body-sm text-text-secondary"
          >
            {size}
          </label>

          <SearchInput
            id={`search-${size}`}
            size={size}
            placeholder={`Pesquisar (${size})...`}
          />
        </div>
      ))}
    </div>
  ),
};

export const Radii: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-5">
      {(['sm', 'md', 'lg', 'full'] as const).map(
        (radius) => (
          <div
            key={radius}
            className="flex flex-col gap-2"
          >
            <label
              htmlFor={`search-radius-${radius}`}
              className="text-body-sm text-text-secondary"
            >
              {radius}
            </label>

            <SearchInput
              id={`search-radius-${radius}`}
              radius={radius}
              defaultValue="Pesquisar registros"
            />
          </div>
        ),
      )}
    </div>
  ),
};

export const Controlled: Story = {
  render: function ControlledExample() {
    const [search, setSearch] = useState('');

    return (
      <div className="flex w-96 flex-col gap-3">
        <SearchInput
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          onClear={() => setSearch('')}
          aria-label="Pesquisar registros"
          placeholder="Buscar registros..."
        />

        <p className="text-body-sm text-text-secondary">
          {search
            ? `Termo informado: ${search}`
            : 'Nenhum termo informado.'}
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-96">
      <SearchInput
        defaultValue="Busca indisponível"
        disabled
        aria-label="Pesquisar"
      />
    </div>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <div className="w-96">
      <SearchInput
        defaultValue="Termo somente leitura"
        readOnly
        aria-label="Pesquisar"
      />
    </div>
  ),
};

export const WithoutClear: Story = {
  render: () => (
    <div className="w-96">
      <SearchInput
        defaultValue="Termo de busca"
        clearable={false}
        aria-label="Pesquisar"
      />
    </div>
  ),
};

const records = [
  'Ana Oliveira',
  'Carlos Lima',
  'Mariana Costa',
  'Pedro Santos',
  'Juliana Ferreira',
  'Rafael Martins',
];

export const WithFilteredList: Story = {
  render: function FilteredListExample() {
    const [search, setSearch] = useState('');

    const filtered = records.filter((name) =>
      name.toLocaleLowerCase('pt-BR').includes(
        search.toLocaleLowerCase('pt-BR'),
      ),
    );

    return (
      <div className="flex w-96 flex-col gap-4">
        <SearchInput
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          onClear={() => setSearch('')}
          placeholder="Buscar por nome..."
          aria-label="Buscar por nome"
        />

        <div className="overflow-hidden rounded-md border border-border">
          {filtered.length > 0 ? (
            <ul className="divide-y divide-border">
              {filtered.map((name) => (
                <li
                  key={name}
                  className="px-4 py-3 text-body-sm text-text-primary"
                >
                  {name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-6 text-center text-body-sm text-text-secondary">
              Nenhum resultado encontrado.
            </p>
          )}
        </div>

        <p className="text-body-sm text-text-secondary">
          {filtered.length} resultado(s) encontrado(s).
        </p>
      </div>
    );
  },
};
