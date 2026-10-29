
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Progress } from './Progress';

const meta = {
  title: 'Components/Feedback/Progress',
  component: Progress,
  parameters: {
    layout: 'padded',
  },
  args: {
    value: 65,
    min: 0,
    max: 100,
    color: 'primary',
    size: 'md',
    radius: 'full',
    showValue: true,
    labelPosition: 'end',
    valueFormat: 'percentage',
    indeterminate: false,
  },
  argTypes: {
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'warning',
        'error',
        'info',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'full'],
    },
    labelPosition: {
      control: 'select',
      options: ['top', 'end', 'inside', 'floating'],
    },
    valueFormat: {
      control: 'select',
      options: ['percentage', 'value'],
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="max-w-xl">
      <Progress {...args} />
    </div>
  ),
};

export const Determinate: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-6">
      {[0, 25, 50, 75, 100].map((value) => (
        <Progress
          key={value}
          value={value}
          showValue
        />
      ))}
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-6">
      <Progress
        indeterminate
        label="Processando informações"
      />

      <Progress
        indeterminate
        color="secondary"
        size="lg"
        label="Aguarde..."
      />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-5">
      {(
        [
          'primary',
          'secondary',
          'success',
          'warning',
          'error',
          'info',
        ] as const
      ).map((color) => (
        <div key={color} className="flex flex-col gap-2">
          <span className="text-body-sm text-text-secondary">
            {color}
          </span>

          <Progress
            value={65}
            color={color}
            showValue
          />
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-6">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <span className="text-body-sm text-text-secondary">
            {size}
          </span>

          <Progress
            value={60}
            size={size}
            showValue
          />
        </div>
      ))}
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-6">
      {(['none', 'sm', 'md', 'full'] as const).map(
        (radius) => (
          <div
            key={radius}
            className="flex flex-col gap-2"
          >
            <span className="text-body-sm text-text-secondary">
              {radius}
            </span>

            <Progress
              value={65}
              size="lg"
              radius={radius}
              showValue
            />
          </div>
        ),
      )}
    </div>
  ),
};

export const LabelPositions: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-8">
      <Progress
        value={25}
        label="Progresso da operação"
        showValue
        labelPosition="top"
      />

      <Progress
        value={50}
        showValue
        labelPosition="end"
      />

      <Progress
        value={75}
        size="lg"
        showValue
        labelPosition="inside"
      />

      <Progress
        value={85}
        showValue
        labelPosition="floating"
      />
    </div>
  ),
};

export const FloatingLabels: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-8">
      {[0, 25, 50, 75, 100].map((value) => (
        <Progress
          key={value}
          value={value}
          showValue
          labelPosition="floating"
        />
      ))}
    </div>
  ),
};

export const InsideLabels: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-5">
      {[25, 50, 75, 100].map((value) => (
        <Progress
          key={value}
          value={value}
          size="lg"
          showValue
          labelPosition="inside"
        />
      ))}
    </div>
  ),
};

export const CustomRange: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-6">
      <Progress
        label="Itens processados"
        min={0}
        max={500}
        value={350}
        valueFormat="value"
        labelPosition="top"
        showValue
      />

      <Progress
        label="Intervalo personalizado"
        min={100}
        max={500}
        value={300}
        showValue
        labelPosition="top"
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-6">
      <Progress
        value={25}
        label="Em andamento"
        color="primary"
        labelPosition="top"
        showValue
      />

      <Progress
        value={100}
        label="Concluído"
        color="success"
        labelPosition="top"
        showValue
      />

      <Progress
        value={40}
        label="Falha no processamento"
        color="error"
        labelPosition="top"
        showValue
      />
    </div>
  ),
};
