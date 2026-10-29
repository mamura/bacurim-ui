
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from '@/components/forms/Input';
import { Textarea } from '@/components/forms/Textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/forms/Select';
import { Checkbox } from '@/components/forms/Checkbox';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/forms/RadioGroup';

import {
  FormField,
  FormFieldLabel,
  FormFieldControl,
  FormFieldDescription,
  FormFieldError,
} from './FormField';

const meta = {
  title: 'Components/Forms/Form Field',
  component: FormField,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof FormField>;

export default meta;

type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/* Default                                                                    */
/* -------------------------------------------------------------------------- */

export const Default: Story = {
  render: () => (
    <div className="max-w-md">
      <FormField>
        <FormFieldLabel>
          Nome da categoria
        </FormFieldLabel>

        <FormFieldControl>
          <Input placeholder="Ex.: Alimentação" />
        </FormFieldControl>

        <FormFieldDescription>
          Informe um nome para identificar a categoria.
        </FormFieldDescription>
      </FormField>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* Required                                                                   */
/* -------------------------------------------------------------------------- */

export const Required: Story = {
  render: () => (
    <div className="max-w-md">
      <FormField required>
        <FormFieldLabel>
          Nome completo
        </FormFieldLabel>

        <FormFieldControl>
          <Input placeholder="Digite seu nome" />
        </FormFieldControl>

        <FormFieldDescription>
          Este campo é obrigatório.
        </FormFieldDescription>
      </FormField>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* Invalid                                                                    */
/* -------------------------------------------------------------------------- */

export const Invalid: Story = {
  render: () => (
    <div className="max-w-md">
      <FormField invalid required>
        <FormFieldLabel>
          Nome da categoria
        </FormFieldLabel>

        <FormFieldControl>
          <Input
            placeholder="Ex.: Alimentação"
            invalid
          />
        </FormFieldControl>

        <FormFieldDescription>
          Informe um nome para identificar a categoria.
        </FormFieldDescription>

        <FormFieldError>
          O nome da categoria é obrigatório.
        </FormFieldError>
      </FormField>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* WithTextarea                                                               */
/* -------------------------------------------------------------------------- */

export const WithTextarea: Story = {
  render: () => (
    <div className="max-w-md">
      <FormField>
        <FormFieldLabel>
          Descrição
        </FormFieldLabel>

        <FormFieldControl>
          <Textarea
            placeholder="Descreva a categoria..."
            rows={4}
          />
        </FormFieldControl>

        <FormFieldDescription>
          Utilize uma descrição curta e objetiva.
        </FormFieldDescription>
      </FormField>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* WithSelect                                                                 */
/* -------------------------------------------------------------------------- */

export const WithSelect: Story = {
  render: () => (
    <div className="max-w-md">
      <FormField required>
        <FormFieldLabel>
          Tipo de movimentação
        </FormFieldLabel>

        <Select>
          <FormFieldControl>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um tipo" />
            </SelectTrigger>
          </FormFieldControl>

          <SelectContent>
            <SelectItem value="income">
              Receita
            </SelectItem>

            <SelectItem value="expense">
              Despesa
            </SelectItem>

            <SelectItem value="transfer">
              Transferência
            </SelectItem>
          </SelectContent>
        </Select>

        <FormFieldDescription>
          Escolha o tipo de movimentação financeira.
        </FormFieldDescription>
      </FormField>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* WithCheckbox                                                               */
/* -------------------------------------------------------------------------- */

export const WithCheckbox: Story = {
  render: () => (
    <div className="max-w-md">
      <FormField>
        <div className="flex items-start gap-3">
          <FormFieldControl>
            <Checkbox className="mt-0.5" />
          </FormFieldControl>

          <div className="flex flex-col gap-1">
            <FormFieldLabel>
              Receber notificações
            </FormFieldLabel>

            <FormFieldDescription>
              Enviaremos avisos sobre movimentações
              importantes do seu negócio.
            </FormFieldDescription>
          </div>
        </div>
      </FormField>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* WithRadioGroup                                                             */
/* -------------------------------------------------------------------------- */

export const WithRadioGroup: Story = {
  render: () => (
    <div className="max-w-md">
      <FormField>
        <FormFieldLabel>
          Período de cobrança
        </FormFieldLabel>

        <FormFieldControl>
          <RadioGroup defaultValue="monthly">
            <div className="flex items-center gap-3">
              <RadioGroupItem
                id="field-radio-monthly"
                value="monthly"
              />

              <label
                htmlFor="field-radio-monthly"
                className="body-sm cursor-pointer text-text-primary"
              >
                Mensal
              </label>
            </div>

            <div className="flex items-center gap-3">
              <RadioGroupItem
                id="field-radio-yearly"
                value="yearly"
              />

              <label
                htmlFor="field-radio-yearly"
                className="body-sm cursor-pointer text-text-primary"
              >
                Anual
              </label>
            </div>
          </RadioGroup>
        </FormFieldControl>

        <FormFieldDescription>
          Selecione a frequência de cobrança.
        </FormFieldDescription>
      </FormField>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* FormExample                                                                */
/* -------------------------------------------------------------------------- */

function FormExampleComponent() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const nameInvalid = submitted && !name.trim();

  return (
    <div className="max-w-lg">
      <div className="flex flex-col gap-6">
        <FormField
          required
          invalid={nameInvalid}
        >
          <FormFieldLabel>
            Nome da categoria
          </FormFieldLabel>

          <FormFieldControl>
            <Input
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Ex.: Alimentação"
              invalid={nameInvalid}
            />
          </FormFieldControl>

          <FormFieldDescription>
            Informe um nome para identificar a categoria.
          </FormFieldDescription>

          <FormFieldError>
            O nome da categoria é obrigatório.
          </FormFieldError>
        </FormField>

        <FormField>
          <FormFieldLabel>
            Descrição
          </FormFieldLabel>

          <FormFieldControl>
            <Textarea
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Descrição opcional..."
              rows={3}
            />
          </FormFieldControl>

          <FormFieldDescription>
            Você pode adicionar informações complementares.
          </FormFieldDescription>
        </FormField>

        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="rounded-sm bg-primary px-4 py-2 text-primary-contrast"
        >
          Validar formulário
        </button>
      </div>
    </div>
  );
}

export const FormExample: Story = {
  render: () => <FormExampleComponent />,
};
