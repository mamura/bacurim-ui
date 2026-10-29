
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Checkbox,
  type CheckboxCheckedState,
  type CheckboxColor,
  type CheckboxSize,
} from './Checkbox';

const sizes: CheckboxSize[] = ['sm', 'md', 'lg'];

const colors: CheckboxColor[] = [
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
  'info',
];

const meta = {
  title: 'Components/Forms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'padded',
  },
  args: {
    size: 'md',
    color: 'primary',
    disabled: false,
  },
  argTypes: {
    size: {
      control: 'radio',
      options: sizes,
    },
    color: {
      control: 'select',
      options: colors,
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Checkbox
        {...args}
        id="checkbox-default"
      />

      <label
        htmlFor="checkbox-default"
        className="body-sm cursor-pointer text-text-primary"
      >
        Aceito os termos e condições
      </label>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <Checkbox id="checkbox-unchecked" />

        <label
          htmlFor="checkbox-unchecked"
          className="body-sm cursor-pointer text-text-primary"
        >
          Unchecked
        </label>
      </div>

      <div className="flex items-center gap-3">
        <Checkbox
          id="checkbox-checked"
          defaultChecked
        />

        <label
          htmlFor="checkbox-checked"
          className="body-sm cursor-pointer text-text-primary"
        >
          Checked
        </label>
      </div>

      <div className="flex items-center gap-3">
        <Checkbox
          id="checkbox-indeterminate"
          checked="indeterminate"
        />

        <label
          htmlFor="checkbox-indeterminate"
          className="body-sm cursor-pointer text-text-primary"
        >
          Indeterminate
        </label>
      </div>

      <div className="flex items-center gap-3">
        <Checkbox
          id="checkbox-disabled"
          disabled
        />

        <label
          htmlFor="checkbox-disabled"
          className="body-sm text-text-secondary"
        >
          Disabled
        </label>
      </div>

      <div className="flex items-center gap-3">
        <Checkbox
          id="checkbox-disabled-checked"
          disabled
          checked
        />

        <label
          htmlFor="checkbox-disabled-checked"
          className="body-sm text-text-secondary"
        >
          Disabled checked
        </label>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      {sizes.map((size) => (
        <div
          key={size}
          className="flex items-center gap-3"
        >
          <Checkbox
            id={`checkbox-size-${size}`}
            size={size}
            defaultChecked
          />

          <label
            htmlFor={`checkbox-size-${size}`}
            className="body-sm cursor-pointer text-text-primary"
          >
            Size: {size}
          </label>
        </div>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      {colors.map((color) => (
        <div
          key={color}
          className="flex items-center gap-6"
        >
          <span className="body-sm w-24 text-text-primary">
            {color}
          </span>

          <div className="flex items-center gap-2">
            <Checkbox
              id={`checkbox-${color}-unchecked`}
              color={color}
            />

            <label
              htmlFor={`checkbox-${color}-unchecked`}
              className="body-sm cursor-pointer text-text-secondary"
            >
              Default
            </label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id={`checkbox-${color}-checked`}
              color={color}
              defaultChecked
            />

            <label
              htmlFor={`checkbox-${color}-checked`}
              className="body-sm cursor-pointer text-text-secondary"
            >
              Checked
            </label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id={`checkbox-${color}-disabled`}
              color={color}
              checked
              disabled
            />

            <label
              htmlFor={`checkbox-${color}-disabled`}
              className="body-sm text-text-secondary"
            >
              Disabled
            </label>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <div className="flex items-start gap-3">
        <Checkbox
          id="checkbox-notifications"
          aria-describedby="checkbox-notifications-description"
          className="mt-0.5"
        />

        <div className="flex flex-col gap-1">
          <label
            htmlFor="checkbox-notifications"
            className="body-sm cursor-pointer font-medium text-text-primary"
          >
            Receber notificações
          </label>

          <p
            id="checkbox-notifications-description"
            className="body-sm text-text-secondary"
          >
            Enviaremos avisos sobre movimentações e
            atualizações importantes.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="checkbox-reports"
          defaultChecked
          aria-describedby="checkbox-reports-description"
          className="mt-0.5"
        />

        <div className="flex flex-col gap-1">
          <label
            htmlFor="checkbox-reports"
            className="body-sm cursor-pointer font-medium text-text-primary"
          >
            Relatórios periódicos
          </label>

          <p
            id="checkbox-reports-description"
            className="body-sm text-text-secondary"
          >
            Receba resumos sobre a situação financeira
            do seu negócio.
          </p>
        </div>
      </div>
    </div>
  ),
};

export const HorizontalList: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      {['Receitas', 'Despesas', 'Transferências'].map(
        (item) => (
          <div
            key={item}
            className="flex items-center gap-2"
          >
            <Checkbox
              id={`checkbox-${item}`}
            />

            <label
              htmlFor={`checkbox-${item}`}
              className="body-sm cursor-pointer text-text-primary"
            >
              {item}
            </label>
          </div>
        ),
      )}
    </div>
  ),
};

export const ListGroup: Story = {
  render: () => (
    <div className="w-80 overflow-hidden rounded-sm border border-border">
      {[
        'Conta corrente',
        'Conta poupança',
        'Cartão de crédito',
      ].map((item, index) => (
        <label
          key={item}
          className="flex cursor-pointer items-center gap-3 border-b border-border px-4 py-3 last:border-b-0"
        >
          <Checkbox
            defaultChecked={index === 0}
          />

          <span className="body-sm text-text-primary">
            {item}
          </span>
        </label>
      ))}
    </div>
  ),
};

function ControlledExample() {
  const [checked, setChecked] =
    useState<CheckboxCheckedState>(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Checkbox
          id="checkbox-controlled"
          checked={checked}
          onCheckedChange={setChecked}
        />

        <label
          htmlFor="checkbox-controlled"
          className="body-sm cursor-pointer text-text-primary"
        >
          Checkbox controlado
        </label>
      </div>

      <p className="body-sm text-text-secondary">
        Estado atual:{' '}
        <strong className="text-text-primary">
          {String(checked)}
        </strong>
      </p>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

function IndeterminateExample() {
  const [items, setItems] = useState([
    { id: 'income', label: 'Receitas', checked: true },
    { id: 'expense', label: 'Despesas', checked: false },
    { id: 'transfer', label: 'Transferências', checked: false },
  ]);

  const checkedCount = items.filter(
    (item) => item.checked,
  ).length;

  const allChecked = checkedCount === items.length;
  const someChecked = checkedCount > 0 && !allChecked;

  const parentState: CheckboxCheckedState = allChecked
    ? true
    : someChecked
      ? 'indeterminate'
      : false;

  function toggleAll(checked: CheckboxCheckedState) {
    const nextChecked = checked === true;

    setItems((current) =>
      current.map((item) => ({
        ...item,
        checked: nextChecked,
      })),
    );
  }

  function toggleItem(id: string, checked: CheckboxCheckedState) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, checked: checked === true }
          : item,
      ),
    );
  }

  return (
    <div className="flex w-80 flex-col gap-4">
      <div className="flex items-center gap-3 border-b border-border pb-3">
        <Checkbox
          id="checkbox-all"
          checked={parentState}
          onCheckedChange={toggleAll}
        />

        <label
          htmlFor="checkbox-all"
          className="body-sm cursor-pointer font-semibold text-text-primary"
        >
          Selecionar todas
        </label>
      </div>

      <div className="flex flex-col gap-3 pl-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3"
          >
            <Checkbox
              id={`checkbox-item-${item.id}`}
              checked={item.checked}
              onCheckedChange={(checked) =>
                toggleItem(item.id, checked)
              }
            />

            <label
              htmlFor={`checkbox-item-${item.id}`}
              className="body-sm cursor-pointer text-text-primary"
            >
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export const Indeterminate: Story = {
  render: () => <IndeterminateExample />,
};
