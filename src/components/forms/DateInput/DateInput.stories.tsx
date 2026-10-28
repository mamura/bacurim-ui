
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  DateInput,
  type DateInputSize,
  type DateInputFormat,
} from './DateInput';

import {
  FormField,
  FormFieldLabel,
  FormFieldControl,
  FormFieldDescription,
  FormFieldError,
} from '@/components/forms/FormField';

const meta = {
  title: 'Components/Forms/Date Input',
  component: DateInput,
  parameters: {
    layout: 'padded',
  },
  args: {
    format: 'dd/MM/yyyy',
    size: 'md',
    disabled: false,
    readOnly: false,
    invalid: false,
  },
  argTypes: {
    format: {
      control: 'select',
      options: [
        'dd/MM/yyyy',
        'MM/dd/yyyy',
        'yyyy-MM-dd',
      ] satisfies DateInputFormat[],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'] satisfies DateInputSize[],
    },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
} satisfies Meta<typeof DateInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <DateInput {...args} />
    </div>
  ),
};

export const WithValue: Story = {
  render: () => (
    <div className="w-80">
      <DateInput defaultValue="2026-10-28" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-5">
      {(['sm', 'md', 'lg'] as DateInputSize[]).map(
        (size) => (
          <div
            key={size}
            className="flex flex-col gap-2"
          >
            <span className="body-sm text-text-secondary">
              Size: {size}
            </span>

            <DateInput
              size={size}
              defaultValue="2026-10-28"
            />
          </div>
        ),
      )}
    </div>
  ),
};

export const Formats: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="body-sm text-text-primary">
          Brasileiro
        </span>
        <DateInput
          format="dd/MM/yyyy"
          defaultValue="2026-10-28"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="body-sm text-text-primary">
          Americano
        </span>
        <DateInput
          format="MM/dd/yyyy"
          defaultValue="2026-10-28"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="body-sm text-text-primary">
          ISO
        </span>
        <DateInput
          format="yyyy-MM-dd"
          defaultValue="2026-10-28"
        />
      </div>
    </div>
  ),
};

export const WithLimits: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <DateInput
        defaultValue="2026-10-28"
        minDate="2026-10-01"
        maxDate="2026-10-31"
      />

      <p className="body-sm text-text-secondary">
        Apenas datas entre 01/10/2026 e 31/10/2026
        estão disponíveis.
      </p>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="body-sm text-text-primary">
          Default
        </span>
        <DateInput defaultValue="2026-10-28" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="body-sm text-text-primary">
          Disabled
        </span>
        <DateInput
          defaultValue="2026-10-28"
          disabled
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="body-sm text-text-primary">
          Readonly
        </span>
        <DateInput
          defaultValue="2026-10-28"
          readOnly
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="body-sm text-text-primary">
          Invalid
        </span>
        <DateInput
          defaultValue="2026-10-28"
          invalid
        />
      </div>
    </div>
  ),
};

function ControlledExample() {
  const [value, setValue] = useState<string | null>(
    '2026-10-28',
  );

  return (
    <div className="flex w-80 flex-col gap-4">
      <DateInput
        value={value}
        onValueChange={setValue}
      />

      <div className="flex flex-col gap-1">
        <span className="body-sm text-text-secondary">
          Valor ISO:
        </span>

        <code className="body-sm text-text-primary">
          {value ?? 'null'}
        </code>
      </div>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

export const WithFormField: Story = {
  render: () => (
    <div className="w-80">
      <FormField required>
        <FormFieldLabel>
          Data da movimentação
        </FormFieldLabel>

        <FormFieldControl>
          <DateInput />
        </FormFieldControl>

        <FormFieldDescription>
          Informe a data em que a movimentação ocorreu.
        </FormFieldDescription>
      </FormField>
    </div>
  ),
};

export const InvalidFormField: Story = {
  render: () => (
    <div className="w-80">
      <FormField required invalid>
        <FormFieldLabel>
          Data da movimentação
        </FormFieldLabel>

        <FormFieldControl>
          <DateInput invalid />
        </FormFieldControl>

        <FormFieldDescription>
          Informe a data em que a movimentação ocorreu.
        </FormFieldDescription>

        <FormFieldError>
          A data da movimentação é obrigatória.
        </FormFieldError>
      </FormField>
    </div>
  ),
};
