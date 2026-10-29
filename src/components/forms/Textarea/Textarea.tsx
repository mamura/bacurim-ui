
import {
  forwardRef,
  type TextareaHTMLAttributes,
} from 'react';

import { cn } from '@/utilities/cn';

export type TextareaSize = 'sm' | 'md' | 'lg';

export type TextareaRadius = 'sm' | 'md' | 'lg';

export type TextareaResize =
  | 'none'
  | 'vertical'
  | 'horizontal'
  | 'both';

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  size?: TextareaSize;
  radius?: TextareaRadius;
  resize?: TextareaResize;
  invalid?: boolean;
}

const sizeClasses: Record<TextareaSize, string> = {
  sm: 'px-3 py-2 text-body-sm',
  md: 'px-4 py-3 text-body-md',
  lg: 'px-5 py-4 text-body-lg',
};

const radiusClasses: Record<TextareaRadius, string> = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
};

const resizeClasses: Record<TextareaResize, string> = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
};

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(function Textarea(
  {
    size = 'md',
    radius = 'sm',
    resize = 'vertical',
    rows = 4,
    invalid = false,
    disabled,
    readOnly,
    className,
    'aria-invalid': ariaInvalid,
    ...props
  },
  ref,
) {
  const isInvalid =
    invalid || ariaInvalid === true || ariaInvalid === 'true';

  return (
    <textarea
      {...props}
      ref={ref}
      rows={rows}
      disabled={disabled}
      readOnly={readOnly}
      aria-invalid={isInvalid ? true : ariaInvalid}
      data-invalid={isInvalid ? 'true' : undefined}
      className={cn(
        // Layout
        'block w-full min-w-0',

        // Aparência
        'border border-border bg-surface text-text-primary',
        'placeholder:text-text-secondary',
        'transition-colors duration-150',

        // Hover
        'hover:border-text-secondary',

        // Focus: borda simples, sem ring ou outline
        'focus:border-primary focus:outline-none',

        // Estado inválido
        'data-[invalid=true]:border-error',
        'data-[invalid=true]:focus:border-error',

        // Estado desabilitado
        'disabled:cursor-not-allowed',
        'disabled:bg-background',
        'disabled:opacity-50',
        'disabled:hover:border-border',

        // Somente leitura
        'read-only:cursor-default',
        'read-only:bg-background',
        'read-only:hover:border-border',

        // Tamanho, radius e redimensionamento
        sizeClasses[size],
        radiusClasses[radius],
        resizeClasses[resize],

        // Personalização
        className,
      )}
    />
  );
});
