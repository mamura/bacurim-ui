
import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Textarea,
  type TextareaRadius,
  type TextareaResize,
  type TextareaSize,
} from './Textarea';

const sizes: TextareaSize[] = ['sm', 'md', 'lg'];

const radii: TextareaRadius[] = ['sm', 'md', 'lg'];

const resizeOptions: TextareaResize[] = [
  'none',
  'vertical',
  'horizontal',
  'both',
];

const meta = {
  title: 'Components/Forms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'padded',
  },
  args: {
    size: 'md',
    radius: 'sm',
    resize: 'vertical',
    rows: 4,
    placeholder: 'Digite sua mensagem...',
    invalid: false,
    disabled: false,
    readOnly: false,
  },
  argTypes: {
    size: {
      control: 'radio',
      options: sizes,
    },
    radius: {
      control: 'select',
      options: radii,
    },
    resize: {
      control: 'select',
      options: resizeOptions,
    },
    rows: {
      control: {
        type: 'number',
        min: 1,
        max: 20,
      },
    },
    invalid: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    readOnly: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-96">
      <Textarea {...args} aria-label="Mensagem" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <label
            htmlFor={`textarea-size-${size}`}
            className="body-sm text-text-primary"
          >
            Size: {size}
          </label>

          <Textarea
            id={`textarea-size-${size}`}
            size={size}
            placeholder={`Textarea ${size}`}
          />
        </div>
      ))}
    </div>
  ),
};

export const Radii: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-6">
      {radii.map((radius) => (
        <div key={radius} className="flex flex-col gap-2">
          <label
            htmlFor={`textarea-radius-${radius}`}
            className="body-sm text-text-primary"
          >
            Radius: {radius}
          </label>

          <Textarea
            id={`textarea-radius-${radius}`}
            radius={radius}
            placeholder={`Textarea ${radius}`}
          />
        </div>
      ))}
    </div>
  ),
};

export const Rows: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-6">
      {[2, 4, 6].map((rows) => (
        <div key={rows} className="flex flex-col gap-2">
          <label
            htmlFor={`textarea-rows-${rows}`}
            className="body-sm text-text-primary"
          >
            Rows: {rows}
          </label>

          <Textarea
            id={`textarea-rows-${rows}`}
            rows={rows}
            placeholder={`${rows} linhas iniciais`}
          />
        </div>
      ))}
    </div>
  ),
};

export const ResizeOptions: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {resizeOptions.map((resize) => (
        <div
          key={resize}
          className="flex w-72 flex-col gap-2"
        >
          <label
            htmlFor={`textarea-resize-${resize}`}
            className="body-sm text-text-primary"
          >
            Resize: {resize}
          </label>

          <Textarea
            id={`textarea-resize-${resize}`}
            resize={resize}
            rows={4}
            placeholder={`Redimensionamento: ${resize}`}
          />
        </div>
      ))}
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="textarea-default"
          className="body-sm text-text-primary"
        >
          Default
        </label>

        <Textarea
          id="textarea-default"
          placeholder="Digite sua mensagem..."
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="textarea-disabled"
          className="body-sm text-text-primary"
        >
          Disabled
        </label>

        <Textarea
          id="textarea-disabled"
          placeholder="Campo desabilitado"
          disabled
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="textarea-readonly"
          className="body-sm text-text-primary"
        >
          Readonly
        </label>

        <Textarea
          id="textarea-readonly"
          defaultValue="Este conteúdo pode ser selecionado e copiado, mas não pode ser alterado."
          readOnly
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="textarea-invalid"
          className="body-sm text-text-primary"
        >
          Invalid
        </label>

        <Textarea
          id="textarea-invalid"
          placeholder="Campo inválido"
          invalid
        />
      </div>
    </div>
  ),
};

export const Validation: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="textarea-description"
          className="body-sm text-text-primary"
        >
          Descrição
        </label>

        <Textarea
          id="textarea-description"
          rows={4}
          placeholder="Descreva sua solicitação..."
          invalid
          aria-describedby="textarea-description-error"
        />

        <p
          id="textarea-description-error"
          className="body-sm text-error"
        >
          A descrição é obrigatória.
        </p>
      </div>
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-2">
      <label
        htmlFor="textarea-helper"
        className="body-sm text-text-primary"
      >
        Observações
      </label>

      <Textarea
        id="textarea-helper"
        rows={5}
        placeholder="Adicione informações complementares..."
        aria-describedby="textarea-helper-description"
      />

      <p
        id="textarea-helper-description"
        className="body-sm text-text-secondary"
      >
        Utilize este campo para registrar informações
        adicionais que possam ajudar na análise.
      </p>
    </div>
  ),
};

export const WithContent: Story = {
  render: () => (
    <div className="w-96">
      <Textarea
        aria-label="Descrição do projeto"
        rows={5}
        defaultValue={
          'O Bacurim é uma plataforma de gestão financeira voltada para pequenos negócios.\n\nSeu objetivo é transformar informações financeiras em decisões mais claras.'
        }
      />
    </div>
  ),
};

export const NativeAttributes: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="textarea-maxlength"
          className="body-sm text-text-primary"
        >
          Máximo de 200 caracteres
        </label>

        <Textarea
          id="textarea-maxlength"
          maxLength={200}
          placeholder="Digite até 200 caracteres..."
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="textarea-required"
          className="body-sm text-text-primary"
        >
          Campo obrigatório
        </label>

        <Textarea
          id="textarea-required"
          required
          placeholder="Preenchimento obrigatório..."
        />
      </div>
    </div>
  ),
};
