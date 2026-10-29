
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { Check, Minus } from 'lucide-react';

import { cn } from '@/utilities/cn';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export type CheckboxColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export type CheckboxCheckedState = boolean | 'indeterminate';

export interface CheckboxProps
  extends ComponentPropsWithoutRef<
    typeof CheckboxPrimitive.Root
  > {
  size?: CheckboxSize;
  color?: CheckboxColor;
}

const sizeClasses: Record<CheckboxSize, string> = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
};

const iconSizeClasses: Record<CheckboxSize, string> = {
  sm: '[&_svg]:size-3',
  md: '[&_svg]:size-3.5',
  lg: '[&_svg]:size-4',
};

const colorClasses: Record<CheckboxColor, string> = {
  primary: cn(
    'data-[state=checked]:border-primary',
    'data-[state=checked]:bg-primary',
    'data-[state=indeterminate]:border-primary',
    'data-[state=indeterminate]:bg-primary',
    'focus-visible:border-primary',
  ),

  secondary: cn(
    'data-[state=checked]:border-secondary',
    'data-[state=checked]:bg-secondary',
    'data-[state=indeterminate]:border-secondary',
    'data-[state=indeterminate]:bg-secondary',
    'focus-visible:border-secondary',
  ),

  success: cn(
    'data-[state=checked]:border-success',
    'data-[state=checked]:bg-success',
    'data-[state=indeterminate]:border-success',
    'data-[state=indeterminate]:bg-success',
    'focus-visible:border-success',
  ),

  warning: cn(
    'data-[state=checked]:border-warning',
    'data-[state=checked]:bg-warning',
    'data-[state=indeterminate]:border-warning',
    'data-[state=indeterminate]:bg-warning',
    'focus-visible:border-warning',
  ),

  error: cn(
    'data-[state=checked]:border-error',
    'data-[state=checked]:bg-error',
    'data-[state=indeterminate]:border-error',
    'data-[state=indeterminate]:bg-error',
    'focus-visible:border-error',
  ),

  info: cn(
    'data-[state=checked]:border-info',
    'data-[state=checked]:bg-info',
    'data-[state=indeterminate]:border-info',
    'data-[state=indeterminate]:bg-info',
    'focus-visible:border-info',
  ),
};

const contrastClasses: Record<CheckboxColor, string> = {
  primary: 'text-primary-contrast',
  secondary: 'text-secondary-contrast',
  success: 'text-success-contrast',
  warning: 'text-warning-contrast',
  error: 'text-error-contrast',
  info: 'text-info-contrast',
};

export const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(function Checkbox(
  {
    size = 'md',
    color = 'primary',
    className,
    ...props
  },
  ref,
) {
  return (
    <CheckboxPrimitive.Root
      {...props}
      ref={ref}
      className={cn(
        // Layout
        'peer inline-flex shrink-0 items-center justify-center',

        // Aparência
        'rounded-sm border border-border bg-surface',
        'transition-colors duration-150',

        // Hover
        'hover:border-text-secondary',

        // Foco discreto
        'focus-visible:outline-none',

        // Estados selecionados
        'data-[state=checked]:hover:opacity-90',
        'data-[state=indeterminate]:hover:opacity-90',

        // Disabled
        'disabled:cursor-not-allowed',
        'disabled:opacity-40',
        'disabled:hover:border-border',

        // Tamanho
        sizeClasses[size],

        // Cor semântica
        colorClasses[color],

        // Personalização
        className,
      )}
    >
      <CheckboxPrimitive.Indicator
        className={cn(
          'flex size-full items-center justify-center',
          contrastClasses[color],
          iconSizeClasses[size],
        )}
      >
        <Check
          aria-hidden="true"
          strokeWidth={3}
          className="hidden [[data-state=checked]>&]:block"
        />

        <Minus
          aria-hidden="true"
          strokeWidth={3}
          className="hidden [[data-state=indeterminate]>&]:block"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
