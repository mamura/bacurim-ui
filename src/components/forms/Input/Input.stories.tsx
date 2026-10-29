
import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  CircleAlert,
  CircleCheck,
  Lock,
  Mail,
  Search,
  UserRound,
} from 'lucide-react';

import {
  Input,
  type InputRadius,
  type InputSize,
  type InputType,
} from './Input';

const sizes: InputSize[] = ['sm', 'md', 'lg'];

const radii: InputRadius[] = [
  'sm',
  'md',
  'lg',
  'full',
];

const types: Array<{
  label: string;
  type: InputType;
  placeholder: string;
}> = [
  {
    label: 'Text',
    type: 'text',
    placeholder: 'Digite seu nome',
  },
  {
    label: 'Email',
    type: 'email',
    placeholder: 'seu@email.com',
  },
  {
    label: 'Password',
    type: 'password',
    placeholder: 'Digite sua senha',
  },
  {
    label: 'Telephone',
    type: 'tel',
    placeholder: '(00) 00000-0000',
  },
  {
    label: 'URL',
    type: 'url',
    placeholder: 'https://exemplo.com',
  },
  {
    label: 'Search',
    type: 'search',
    placeholder: 'Pesquisar...',
  },
  {
    label: 'Number',
    type: 'number',
    placeholder: '0',
  },
];

const meta = {
  title: 'Components/Forms/Input',
  component: Input,
  parameters: {
    layout: 'padded',
  },
  args: {
    type: 'text',
    size: 'md',
    radius: 'sm',
    placeholder: 'Digite um valor',
    invalid: false,
    disabled: false,
    readOnly: false,
  },
  argTypes: {
    type: {
      control: 'select',
      options: types.map((item) => item.type),
    },
    size: {
      control: 'radio',
      options: sizes,
    },
    radius: {
      control: 'select',
      options: radii,
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
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <Input {...args} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <label
            htmlFor={`input-size-${size}`}
            className="body-sm text-text-primary"
          >
            Size: {size}
          </label>

          <Input
            id={`input-size-${size}`}
            size={size}
            placeholder={`Input ${size}`}
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
            htmlFor={`input-radius-${radius}`}
            className="body-sm text-text-primary"
          >
            Radius: {radius}
          </label>

          <Input
            id={`input-radius-${radius}`}
            radius={radius}
            placeholder={`Input ${radius}`}
          />
        </div>
      ))}
    </div>
  ),
};

export const InputTypes: Story = {
  render: () => (
    <div className="grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
      {types.map(({ label, type, placeholder }) => (
        <div key={type} className="flex flex-col gap-2">
          <label
            htmlFor={`input-type-${type}`}
            className="body-sm text-text-primary"
          >
            {label}
          </label>

          <Input
            id={`input-type-${type}`}
            type={type}
            placeholder={placeholder}
          />
        </div>
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-5">
      <Input
        aria-label="Pesquisar"
        placeholder="Pesquisar..."
        startIcon={<Search />}
      />

      <Input
        type="email"
        aria-label="E-mail"
        placeholder="seu@email.com"
        startIcon={<Mail />}
      />

      <Input
        type="password"
        aria-label="Senha"
        placeholder="Digite sua senha"
        startIcon={<Lock />}
      />

      <Input
        aria-label="Nome"
        placeholder="Nome completo"
        startIcon={<UserRound />}
        endIcon={<CircleCheck />}
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="input-default"
          className="body-sm text-text-primary"
        >
          Default
        </label>
        <Input
          id="input-default"
          placeholder="Input padrão"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="input-disabled"
          className="body-sm text-text-primary"
        >
          Disabled
        </label>
        <Input
          id="input-disabled"
          placeholder="Campo desabilitado"
          disabled
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="input-readonly"
          className="body-sm text-text-primary"
        >
          Readonly
        </label>
        <Input
          id="input-readonly"
          defaultValue="Valor somente leitura"
          readOnly
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="input-invalid"
          className="body-sm text-text-primary"
        >
          Invalid
        </label>
        <Input
          id="input-invalid"
          placeholder="Campo inválido"
          invalid
          endIcon={<CircleAlert />}
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
          htmlFor="email-success"
          className="body-sm text-text-primary"
        >
          E-mail
        </label>

        <Input
          id="email-success"
          type="email"
          defaultValue="contato@bacurim.com"
          endIcon={<CircleCheck />}
          className="border-success"
          aria-describedby="email-success-message"
        />

        <p
          id="email-success-message"
          className="body-sm text-success"
        >
          E-mail válido.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="email-error"
          className="body-sm text-text-primary"
        >
          E-mail
        </label>

        <Input
          id="email-error"
          type="email"
          defaultValue="email-invalido"
          invalid
          endIcon={<CircleAlert />}
          aria-describedby="email-error-message"
        />

        <p
          id="email-error-message"
          className="body-sm text-error"
        >
          Informe um endereço de e-mail válido.
        </p>
      </div>
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-2">
      <label
        htmlFor="input-helper"
        className="body-sm text-text-primary"
      >
        Nome completo
      </label>

      <Input
        id="input-helper"
        placeholder="Digite seu nome"
        aria-describedby="input-helper-description"
      />

      <p
        id="input-helper-description"
        className="body-sm text-text-secondary"
      >
        Informe o nome que será exibido no seu perfil.
      </p>
    </div>
  ),
};

export const NativeAttributes: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="input-maxlength"
          className="body-sm text-text-primary"
        >
          Máximo de 20 caracteres
        </label>

        <Input
          id="input-maxlength"
          maxLength={20}
          placeholder="Digite até 20 caracteres"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="input-number"
          className="body-sm text-text-primary"
        >
          Quantidade
        </label>

        <Input
          id="input-number"
          type="number"
          min={1}
          max={100}
          step={1}
          placeholder="1 a 100"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="input-required"
          className="body-sm text-text-primary"
        >
          Campo obrigatório
        </label>

        <Input
          id="input-required"
          required
          placeholder="Preenchimento obrigatório"
        />
      </div>
    </div>
  ),
};
