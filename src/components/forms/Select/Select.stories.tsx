
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  type SelectRadius,
  type SelectSize,
} from './Select';

const sizes: SelectSize[] = ['sm', 'md', 'lg'];

const radii: SelectRadius[] = [
  'sm',
  'md',
  'lg',
  'full',
];

const periods = [
  { value: 'weekly', label: 'Semanal' },
  { value: 'monthly', label: 'Mensal' },
  { value: 'yearly', label: 'Anual' },
];

const meta = {
  title: 'Components/Forms/Select',
  component: Select,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <Select>
        <SelectTrigger aria-label="Período">
          <SelectValue placeholder="Selecione um período" />
        </SelectTrigger>

        <SelectContent>
          {periods.map((period) => (
            <SelectItem
              key={period.value}
              value={period.value}
            >
              {period.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-6">
      {sizes.map((size) => (
        <div
          key={size}
          className="flex flex-col gap-2"
        >
          <label
            htmlFor={`select-size-${size}`}
            className="body-sm text-text-primary"
          >
            Size: {size}
          </label>

          <Select>
            <SelectTrigger
              id={`select-size-${size}`}
              size={size}
            >
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="first">
                Primeira opção
              </SelectItem>

              <SelectItem value="second">
                Segunda opção
              </SelectItem>

              <SelectItem value="third">
                Terceira opção
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  ),
};

export const Radii: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-6">
      {radii.map((radius) => (
        <div
          key={radius}
          className="flex flex-col gap-2"
        >
          <label
            htmlFor={`select-radius-${radius}`}
            className="body-sm text-text-primary"
          >
            Radius: {radius}
          </label>

          <Select>
            <SelectTrigger
              id={`select-radius-${radius}`}
              radius={radius}
            >
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="first">
                Primeira opção
              </SelectItem>

              <SelectItem value="second">
                Segunda opção
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  ),
};

export const DefaultValue: Story = {
  render: () => (
    <div className="w-80">
      <Select defaultValue="monthly">
        <SelectTrigger aria-label="Período">
          <SelectValue placeholder="Selecione um período" />
        </SelectTrigger>

        <SelectContent>
          {periods.map((period) => (
            <SelectItem
              key={period.value}
              value={period.value}
            >
              {period.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <Select disabled>
        <SelectTrigger aria-label="Período">
          <SelectValue placeholder="Seleção desabilitada" />
        </SelectTrigger>

        <SelectContent>
          {periods.map((period) => (
            <SelectItem
              key={period.value}
              value={period.value}
            >
              {period.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
};

export const DisabledItems: Story = {
  render: () => (
    <div className="w-80">
      <Select>
        <SelectTrigger aria-label="Plano">
          <SelectValue placeholder="Selecione um plano" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="basic">
            Básico
          </SelectItem>

          <SelectItem value="professional">
            Profissional
          </SelectItem>

          <SelectItem value="enterprise" disabled>
            Empresarial (indisponível)
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-2">
      <label
        htmlFor="select-invalid"
        className="body-sm text-text-primary"
      >
        Categoria
      </label>

      <Select>
        <SelectTrigger
          id="select-invalid"
          invalid
          aria-describedby="select-error"
        >
          <SelectValue placeholder="Selecione uma categoria" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="income">
            Receita
          </SelectItem>

          <SelectItem value="expense">
            Despesa
          </SelectItem>
        </SelectContent>
      </Select>

      <p
        id="select-error"
        className="body-sm text-error"
      >
        Selecione uma categoria válida.
      </p>
    </div>
  ),
};

export const Groups: Story = {
  render: () => (
    <div className="w-80">
      <Select>
        <SelectTrigger aria-label="Categoria">
          <SelectValue placeholder="Selecione uma categoria" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Receitas</SelectLabel>

            <SelectItem value="sales">
              Vendas
            </SelectItem>

            <SelectItem value="services">
              Serviços
            </SelectItem>
          </SelectGroup>

          <SelectSeparator />

          <SelectGroup>
            <SelectLabel>Despesas</SelectLabel>

            <SelectItem value="suppliers">
              Fornecedores
            </SelectItem>

            <SelectItem value="employees">
              Colaboradores
            </SelectItem>

            <SelectItem value="infrastructure">
              Infraestrutura
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
};

function ControlledExample() {
  const [value, setValue] = useState('monthly');

  return (
    <div className="flex w-80 flex-col gap-4">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger aria-label="Período">
          <SelectValue placeholder="Selecione um período" />
        </SelectTrigger>

        <SelectContent>
          {periods.map((period) => (
            <SelectItem
              key={period.value}
              value={period.value}
            >
              {period.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <p className="body-sm text-text-secondary">
        Valor selecionado:{' '}
        <strong className="text-text-primary">
          {value}
        </strong>
      </p>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

export const ManyOptions: Story = {
  render: () => (
    <div className="w-80">
      <Select>
        <SelectTrigger aria-label="Mês">
          <SelectValue placeholder="Selecione um mês" />
        </SelectTrigger>

        <SelectContent>
          {[
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro',
          ].map((month, index) => (
            <SelectItem
              key={month}
              value={String(index + 1)}
            >
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-2">
      <label
        htmlFor="select-helper"
        className="body-sm text-text-primary"
      >
        Período de análise
      </label>

      <Select>
        <SelectTrigger
          id="select-helper"
          aria-describedby="select-helper-description"
        >
          <SelectValue placeholder="Selecione um período" />
        </SelectTrigger>

        <SelectContent>
          {periods.map((period) => (
            <SelectItem
              key={period.value}
              value={period.value}
            >
              {period.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <p
        id="select-helper-description"
        className="body-sm text-text-secondary"
      >
        O período define o intervalo utilizado nos indicadores.
      </p>
    </div>
  ),
};
