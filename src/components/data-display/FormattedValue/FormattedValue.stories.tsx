
import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import {
  FormattedValue,
} from './FormattedValue';

const meta = {
  title: 'Components/Data Display/Formatted Value',
  component: FormattedValue,
  parameters: {
    layout: 'padded',
  },
  args: {
    type: 'currency',
    value: 12345.67,
  },
} satisfies Meta<typeof FormattedValue>;

export default meta;

type Story = StoryObj<typeof meta>;

function Example({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-md border border-border bg-surface p-4">
      <span className="text-body-sm text-text-secondary">
        {label}
      </span>

      <div className="text-xl font-semibold text-text-primary">
        {children}
      </div>

      {description && (
        <span className="text-body-sm text-text-secondary">
          {description}
        </span>
      )}
    </div>
  );
}

export const Default: Story = {
  render: (args) => (
    <Example label="Valor formatado">
      <FormattedValue {...args} />
    </Example>
  ),
};

export const Numbers: Story = {
  render: () => (
    <div className="grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
      <Example label="Número inteiro">
        <FormattedValue type="number" value={1234567} />
      </Example>

      <Example label="Número decimal">
        <FormattedValue type="number" value={1234567.89} />
      </Example>

      <Example label="Três casas decimais">
        <FormattedValue
          type="number"
          value={1234.567}
          options={{
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          }}
        />
      </Example>

      <Example label="Locale en-US">
        <FormattedValue
          type="number"
          value={1234567.89}
          options={{ locale: 'en-US' }}
        />
      </Example>
    </div>
  ),
};

export const Currencies: Story = {
  render: () => (
    <div className="grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
      <Example label="Real brasileiro">
        <FormattedValue
          type="currency"
          value={12345.67}
        />
      </Example>

      <Example label="Dólar americano">
        <FormattedValue
          type="currency"
          value={12345.67}
          options={{
            locale: 'en-US',
            currency: 'USD',
          }}
        />
      </Example>

      <Example label="Euro">
        <FormattedValue
          type="currency"
          value={12345.67}
          options={{
            locale: 'de-DE',
            currency: 'EUR',
          }}
        />
      </Example>

      <Example label="Valor negativo">
        <FormattedValue
          type="currency"
          value={-350.5}
        />
      </Example>
    </div>
  ),
};

export const Percentages: Story = {
  render: () => (
    <div className="grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
      <Example label="Percentual inteiro">
        <FormattedValue
          type="percentage"
          value={0.5}
        />
      </Example>

      <Example label="Percentual decimal">
        <FormattedValue
          type="percentage"
          value={0.1575}
        />
      </Example>

      <Example label="Duas casas decimais">
        <FormattedValue
          type="percentage"
          value={0.125}
          options={{
            minimumFractionDigits: 2,
          }}
        />
      </Example>

      <Example label="Percentual negativo">
        <FormattedValue
          type="percentage"
          value={-0.075}
        />
      </Example>
    </div>
  ),
};

export const Dates: Story = {
  render: () => (
    <div className="grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
      <Example label="Data padrão">
        <FormattedValue
          type="date"
          value="2026-10-30"
        />
      </Example>

      <Example label="Data por extenso">
        <FormattedValue
          type="date"
          value="2026-10-30"
          options={{
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }}
        />
      </Example>

      <Example label="Locale en-US">
        <FormattedValue
          type="date"
          value="2026-10-30"
          options={{ locale: 'en-US' }}
        />
      </Example>

      <Example label="Data e hora">
        <FormattedValue
          type="date"
          value="2026-10-30T15:45:00Z"
          options={{
            dateStyle: 'short',
            timeStyle: 'short',
            timeZone: 'America/Fortaleza',
          }}
        />
      </Example>
    </div>
  ),
};

export const MissingValues: Story = {
  render: () => (
    <div className="grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
      <Example label="Número ausente">
        <FormattedValue
          type="number"
          value={null}
        />
      </Example>

      <Example label="Moeda ausente">
        <FormattedValue
          type="currency"
          value={undefined}
        />
      </Example>

      <Example label="Data inválida">
        <FormattedValue
          type="date"
          value="2026-02-30"
        />
      </Example>

      <Example label="Fallback personalizado">
        <FormattedValue
          type="percentage"
          value={null}
          options={{
            fallback: 'Não informado',
          }}
        />
      </Example>
    </div>
  ),
};

const records = [
  {
    id: 1,
    name: 'Receita de serviços',
    amount: 12500,
    variation: 0.125,
    date: '2026-10-01',
  },
  {
    id: 2,
    name: 'Despesas operacionais',
    amount: -4200.5,
    variation: -0.075,
    date: '2026-10-15',
  },
  {
    id: 3,
    name: 'Outras receitas',
    amount: 1850.75,
    variation: 0.0325,
    date: '2026-10-30',
  },
];

export const InDataTable: Story = {
  render: () => (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="w-full border-collapse text-body-sm">
        <thead className="bg-background">
          <tr className="border-b border-border text-left text-text-secondary">
            <th className="px-4 py-3 font-medium">
              Descrição
            </th>
            <th className="px-4 py-3 text-right font-medium">
              Valor
            </th>
            <th className="px-4 py-3 text-right font-medium">
              Variação
            </th>
            <th className="px-4 py-3 text-right font-medium">
              Data
            </th>
          </tr>
        </thead>

        <tbody>
          {records.map((record) => (
            <tr
              key={record.id}
              className="border-b border-border last:border-b-0"
            >
              <td className="px-4 py-3 text-text-primary">
                {record.name}
              </td>

              <td className="px-4 py-3 text-right text-text-primary">
                <FormattedValue
                  type="currency"
                  value={record.amount}
                />
              </td>

              <td className="px-4 py-3 text-right text-text-primary">
                <FormattedValue
                  type="percentage"
                  value={record.variation}
                />
              </td>

              <td className="px-4 py-3 text-right text-text-secondary">
                <FormattedValue
                  type="date"
                  value={record.date}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};
