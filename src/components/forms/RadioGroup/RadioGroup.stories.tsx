
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  RadioGroup,
  RadioGroupItem,
  type RadioGroupColor,
  type RadioGroupSize,
} from './RadioGroup';

const sizes: RadioGroupSize[] = ['sm', 'md', 'lg'];

const colors: RadioGroupColor[] = [
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
  'info',
];

const meta = {
  title: 'Components/Forms/Radio Group',
  component: RadioGroup,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/* Default                                                                    */
/* -------------------------------------------------------------------------- */

export const Default: Story = {
  render: () => (
    <RadioGroup
      defaultValue="monthly"
      aria-label="Período"
    >
      <div className="flex items-center gap-3">
        <RadioGroupItem
          id="radio-monthly"
          value="monthly"
        />

        <label
          htmlFor="radio-monthly"
          className="body-sm cursor-pointer text-text-primary"
        >
          Mensal
        </label>
      </div>

      <div className="flex items-center gap-3">
        <RadioGroupItem
          id="radio-yearly"
          value="yearly"
        />

        <label
          htmlFor="radio-yearly"
          className="body-sm cursor-pointer text-text-primary"
        >
          Anual
        </label>
      </div>
    </RadioGroup>
  ),
};

/* -------------------------------------------------------------------------- */
/* States                                                                     */
/* -------------------------------------------------------------------------- */

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="body-sm font-semibold text-text-primary">
          Unchecked e checked
        </p>

        <RadioGroup
          defaultValue="checked"
          aria-label="Estados"
        >
          <div className="flex items-center gap-3">
            <RadioGroupItem
              id="radio-unchecked"
              value="unchecked"
            />

            <label
              htmlFor="radio-unchecked"
              className="body-sm cursor-pointer text-text-primary"
            >
              Unchecked
            </label>
          </div>

          <div className="flex items-center gap-3">
            <RadioGroupItem
              id="radio-checked"
              value="checked"
            />

            <label
              htmlFor="radio-checked"
              className="body-sm cursor-pointer text-text-primary"
            >
              Checked
            </label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-2">
        <p className="body-sm font-semibold text-text-primary">
          Disabled
        </p>

        <RadioGroup
          defaultValue="selected"
          aria-label="Estados desabilitados"
        >
          <div className="flex items-center gap-3">
            <RadioGroupItem
              id="radio-disabled"
              value="disabled"
              disabled
            />

            <label
              htmlFor="radio-disabled"
              className="body-sm text-text-secondary"
            >
              Disabled
            </label>
          </div>

          <div className="flex items-center gap-3">
            <RadioGroupItem
              id="radio-disabled-selected"
              value="selected"
              disabled
            />

            <label
              htmlFor="radio-disabled-selected"
              className="body-sm text-text-secondary"
            >
              Disabled checked
            </label>
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* Sizes                                                                      */
/* -------------------------------------------------------------------------- */

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {sizes.map((size) => (
        <div
          key={size}
          className="flex items-center gap-3"
        >
          <RadioGroup
            defaultValue="selected"
            aria-label={`Tamanho ${size}`}
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem
                id={`radio-size-${size}`}
                value="selected"
                size={size}
              />

              <label
                htmlFor={`radio-size-${size}`}
                className="body-sm cursor-pointer text-text-primary"
              >
                Size: {size}
              </label>
            </div>
          </RadioGroup>
        </div>
      ))}
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* Colors                                                                     */
/* -------------------------------------------------------------------------- */

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {colors.map((color) => (
        <div
          key={color}
          className="flex items-center gap-6"
        >
          <span className="body-sm w-24 text-text-primary">
            {color}
          </span>

          <RadioGroup
            defaultValue="checked"
            orientation="horizontal"
            aria-label={`Cor ${color}`}
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem
                id={`radio-${color}-unchecked`}
                value="unchecked"
                color={color}
              />

              <label
                htmlFor={`radio-${color}-unchecked`}
                className="body-sm cursor-pointer text-text-primary"
              >
                Default
              </label>
            </div>

            <div className="flex items-center gap-2">
              <RadioGroupItem
                id={`radio-${color}-checked`}
                value="checked"
                color={color}
              />

              <label
                htmlFor={`radio-${color}-checked`}
                className="body-sm cursor-pointer text-text-primary"
              >
                Checked
              </label>
            </div>
          </RadioGroup>
        </div>
      ))}
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* Horizontal                                                                 */
/* -------------------------------------------------------------------------- */

export const Horizontal: Story = {
  render: () => (
    <RadioGroup
      defaultValue="income"
      orientation="horizontal"
      aria-label="Tipo de movimentação"
    >
      <div className="flex items-center gap-3">
        <RadioGroupItem
          id="radio-income"
          value="income"
        />

        <label
          htmlFor="radio-income"
          className="body-sm cursor-pointer text-text-primary"
        >
          Receita
        </label>
      </div>

      <div className="flex items-center gap-3">
        <RadioGroupItem
          id="radio-expense"
          value="expense"
        />

        <label
          htmlFor="radio-expense"
          className="body-sm cursor-pointer text-text-primary"
        >
          Despesa
        </label>
      </div>

      <div className="flex items-center gap-3">
        <RadioGroupItem
          id="radio-transfer"
          value="transfer"
        />

        <label
          htmlFor="radio-transfer"
          className="body-sm cursor-pointer text-text-primary"
        >
          Transferência
        </label>
      </div>
    </RadioGroup>
  ),
};

/* -------------------------------------------------------------------------- */
/* DisabledItems                                                              */
/* -------------------------------------------------------------------------- */

export const DisabledItems: Story = {
  render: () => (
    <RadioGroup
      defaultValue="basic"
      aria-label="Plano"
    >
      <div className="flex items-center gap-3">
        <RadioGroupItem
          id="radio-basic"
          value="basic"
        />

        <label
          htmlFor="radio-basic"
          className="body-sm cursor-pointer text-text-primary"
        >
          Básico
        </label>
      </div>

      <div className="flex items-center gap-3">
        <RadioGroupItem
          id="radio-professional"
          value="professional"
        />

        <label
          htmlFor="radio-professional"
          className="body-sm cursor-pointer text-text-primary"
        >
          Profissional
        </label>
      </div>

      <div className="flex items-center gap-3">
        <RadioGroupItem
          id="radio-enterprise"
          value="enterprise"
          disabled
        />

        <label
          htmlFor="radio-enterprise"
          className="body-sm text-text-secondary"
        >
          Empresarial (indisponível)
        </label>
      </div>
    </RadioGroup>
  ),
};

/* -------------------------------------------------------------------------- */
/* WithDescription                                                            */
/* -------------------------------------------------------------------------- */

export const WithDescription: Story = {
  render: () => (
    <RadioGroup
      defaultValue="automatic"
      aria-label="Modo de atualização"
      className="max-w-md"
    >
      <div className="flex items-start gap-3">
        <RadioGroupItem
          id="radio-automatic"
          value="automatic"
          aria-describedby="radio-automatic-description"
          className="mt-0.5"
        />

        <div className="flex flex-col gap-1">
          <label
            htmlFor="radio-automatic"
            className="body-sm cursor-pointer font-medium text-text-primary"
          >
            Atualização automática
          </label>

          <p
            id="radio-automatic-description"
            className="body-sm text-text-secondary"
          >
            Os dados serão atualizados automaticamente
            quando novas informações estiverem disponíveis.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <RadioGroupItem
          id="radio-manual"
          value="manual"
          aria-describedby="radio-manual-description"
          className="mt-0.5"
        />

        <div className="flex flex-col gap-1">
          <label
            htmlFor="radio-manual"
            className="body-sm cursor-pointer font-medium text-text-primary"
          >
            Atualização manual
          </label>

          <p
            id="radio-manual-description"
            className="body-sm text-text-secondary"
          >
            Você decide quando os dados devem ser atualizados.
          </p>
        </div>
      </div>
    </RadioGroup>
  ),
};

/* -------------------------------------------------------------------------- */
/* Controlled                                                                 */
/* -------------------------------------------------------------------------- */

function ControlledExample() {
  const [value, setValue] = useState('monthly');

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup
        value={value}
        onValueChange={setValue}
        aria-label="Período"
      >
        <div className="flex items-center gap-3">
          <RadioGroupItem
            id="radio-controlled-monthly"
            value="monthly"
          />

          <label
            htmlFor="radio-controlled-monthly"
            className="body-sm cursor-pointer text-text-primary"
          >
            Mensal
          </label>
        </div>

        <div className="flex items-center gap-3">
          <RadioGroupItem
            id="radio-controlled-yearly"
            value="yearly"
          />

          <label
            htmlFor="radio-controlled-yearly"
            className="body-sm cursor-pointer text-text-primary"
          >
            Anual
          </label>
        </div>
      </RadioGroup>

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

/* -------------------------------------------------------------------------- */
/* ListGroup                                                                  */
/* -------------------------------------------------------------------------- */

export const ListGroup: Story = {
  render: () => (
    <RadioGroup
      defaultValue="checking"
      aria-label="Conta bancária"
      className="w-80 gap-0 overflow-hidden rounded-sm border border-border"
    >
      {[
        {
          value: 'checking',
          label: 'Conta corrente',
        },
        {
          value: 'savings',
          label: 'Conta poupança',
        },
        {
          value: 'credit',
          label: 'Cartão de crédito',
        },
      ].map((item) => (
        <label
          key={item.value}
          className="flex cursor-pointer items-center gap-3 border-b border-border px-4 py-3 last:border-b-0"
        >
          <RadioGroupItem value={item.value} />

          <span className="body-sm text-text-primary">
            {item.label}
          </span>
        </label>
      ))}
    </RadioGroup>
  ),
};
