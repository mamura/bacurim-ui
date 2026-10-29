
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  MoneyInput,
  type MoneyInputSize,
} from './MoneyInput';

import {
  FormField,
  FormFieldLabel,
  FormFieldControl,
  FormFieldDescription,
  FormFieldError,
} from '@/components/forms/FormField';

const meta = {
  title: 'Components/Forms/Money Input',
  component: MoneyInput,
  parameters: {
    layout: 'padded',
  },
  args: {
    currency: 'BRL',
    locale: 'pt-BR',
    size: 'md',
    allowNegative: false,
    disabled: false,
    readOnly: false,
    invalid: false,
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    currency: {
      control: 'text',
    },
    locale: {
      control: 'text',
    },
    allowNegative: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    readOnly: {
      control: 'boolean',
    },
    invalid: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof MoneyInput>;

export default meta;

type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/* Default                                                                    */
/* -------------------------------------------------------------------------- */

export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <MoneyInput
        {...args}
        placeholder="R$ 0,00"
      />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* WithValue                                                                  */
/* -------------------------------------------------------------------------- */

export const WithValue: Story = {
  render: () => (
    <div className="w-80">
      <MoneyInput defaultValue={1250.9} />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* Sizes                                                                      */
/* -------------------------------------------------------------------------- */

export const Sizes: Story = {
  render: () => {
    const sizes: MoneyInputSize[] = [
      'sm',
      'md',
      'lg',
    ];

    return (
      <div className="flex w-80 flex-col gap-5">
        {sizes.map((size) => (
          <div
            key={size}
            className="flex flex-col gap-2"
          >
            <span className="body-sm text-text-secondary">
              Size: {size}
            </span>

            <MoneyInput
              size={size}
              defaultValue={1250.9}
            />
          </div>
        ))}
      </div>
    );
  },
};

/* -------------------------------------------------------------------------- */
/* Currencies                                                                 */
/* -------------------------------------------------------------------------- */

export const Currencies: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="body-sm text-text-primary">
          Real brasileiro (BRL)
        </span>

        <MoneyInput
          currency="BRL"
          locale="pt-BR"
          defaultValue={1250.9}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="body-sm text-text-primary">
          Dólar americano (USD)
        </span>

        <MoneyInput
          currency="USD"
          locale="en-US"
          defaultValue={1250.9}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="body-sm text-text-primary">
          Euro (EUR)
        </span>

        <MoneyInput
          currency="EUR"
          locale="de-DE"
          defaultValue={1250.9}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="body-sm text-text-primary">
          Iene japonês (JPY)
        </span>

        <MoneyInput
          currency="JPY"
          locale="ja-JP"
          defaultValue={1250}
        />
      </div>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* Negative                                                                   */
/* -------------------------------------------------------------------------- */

export const Negative: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-5">
      <MoneyInput
        allowNegative
        defaultValue={-1250.9}
      />

      <p className="body-sm text-text-secondary">
        Pressione a tecla "-" para alternar
        entre valores positivos e negativos.
      </p>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* States                                                                     */
/* -------------------------------------------------------------------------- */

export const States: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="body-sm text-text-primary">
          Default
        </span>

        <MoneyInput defaultValue={1250.9} />
      </div>

      <div className="flex flex-col gap-2">
        <span className="body-sm text-text-primary">
          Disabled
        </span>

        <MoneyInput
          defaultValue={1250.9}
          disabled
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="body-sm text-text-primary">
          Readonly
        </span>

        <MoneyInput
          defaultValue={1250.9}
          readOnly
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="body-sm text-text-primary">
          Invalid
        </span>

        <MoneyInput
          defaultValue={1250.9}
          invalid
        />
      </div>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* Controlled                                                                 */
/* -------------------------------------------------------------------------- */

function ControlledExample() {
  const [value, setValue] = useState<number | null>(
    1250.9,
  );

  return (
    <div className="flex w-80 flex-col gap-4">
      <MoneyInput
        value={value}
        onValueChange={setValue}
      />

      <div className="flex flex-col gap-1">
        <span className="body-sm text-text-secondary">
          Valor numérico:
        </span>

        <code className="body-sm text-text-primary">
          {value === null ? 'null' : String(value)}
        </code>
      </div>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

/* -------------------------------------------------------------------------- */
/* WithFormField                                                              */
/* -------------------------------------------------------------------------- */

export const WithFormField: Story = {
  render: () => (
    <div className="w-80">
      <FormField required>
        <FormFieldLabel>
          Valor da movimentação
        </FormFieldLabel>

        <FormFieldControl>
          <MoneyInput placeholder="R$ 0,00" />
        </FormFieldControl>

        <FormFieldDescription>
          Informe o valor da movimentação financeira.
        </FormFieldDescription>
      </FormField>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* InvalidFormField                                                           */
/* -------------------------------------------------------------------------- */

export const InvalidFormField: Story = {
  render: () => (
    <div className="w-80">
      <FormField required invalid>
        <FormFieldLabel>
          Valor da movimentação
        </FormFieldLabel>

        <FormFieldControl>
          <MoneyInput
            placeholder="R$ 0,00"
            invalid
          />
        </FormFieldControl>

        <FormFieldDescription>
          Informe o valor da movimentação financeira.
        </FormFieldDescription>

        <FormFieldError>
          O valor da movimentação é obrigatório.
        </FormFieldError>
      </FormField>
    </div>
  ),
};
