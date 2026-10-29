
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '@/utilities/cn';

export type RadioGroupSize = 'sm' | 'md' | 'lg';

export type RadioGroupColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export type RadioGroupOrientation = 'horizontal' | 'vertical';

export interface RadioGroupProps
  extends ComponentPropsWithoutRef<
    typeof RadioGroupPrimitive.Root
  > {}

export interface RadioGroupItemProps
  extends ComponentPropsWithoutRef<
    typeof RadioGroupPrimitive.Item
  > {
  size?: RadioGroupSize;
  color?: RadioGroupColor;
}

const sizeClasses: Record<RadioGroupSize, string> = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
};

const indicatorSizeClasses: Record<RadioGroupSize, string> = {
  sm: 'size-2',
  md: 'size-2.5',
  lg: 'size-3',
};

const colorClasses: Record<RadioGroupColor, string> = {
  primary: cn(
    'data-[state=checked]:border-primary',
    'focus-visible:border-primary',
    'text-primary',
  ),

  secondary: cn(
    'data-[state=checked]:border-secondary',
    'focus-visible:border-secondary',
    'text-secondary',
  ),

  success: cn(
    'data-[state=checked]:border-success',
    'focus-visible:border-success',
    'text-success',
  ),

  warning: cn(
    'data-[state=checked]:border-warning',
    'focus-visible:border-warning',
    'text-warning',
  ),

  error: cn(
    'data-[state=checked]:border-error',
    'focus-visible:border-error',
    'text-error',
  ),

  info: cn(
    'data-[state=checked]:border-info',
    'focus-visible:border-info',
    'text-info',
  ),
};

/* -------------------------------------------------------------------------- */
/* RadioGroup                                                                 */
/* -------------------------------------------------------------------------- */

export const RadioGroup = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(function RadioGroup(
  {
    orientation = 'vertical',
    className,
    ...props
  },
  ref,
) {
  return (
    <RadioGroupPrimitive.Root
      {...props}
      ref={ref}
      orientation={orientation}
      className={cn(
        'flex',
        orientation === 'horizontal'
          ? 'flex-row flex-wrap items-center gap-6'
          : 'flex-col gap-3',
        className,
      )}
    />
  );
});

/* -------------------------------------------------------------------------- */
/* RadioGroupItem                                                             */
/* -------------------------------------------------------------------------- */

export const RadioGroupItem = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(function RadioGroupItem(
  {
    size = 'md',
    color = 'primary',
    className,
    ...props
  },
  ref,
) {
  return (
    <RadioGroupPrimitive.Item
      {...props}
      ref={ref}
      className={cn(
        // Layout
        'relative inline-flex shrink-0 items-center justify-center',

        // Aparência
        'rounded-full border border-border bg-surface',
        'transition-colors duration-150',

        // Hover
        'hover:border-text-secondary',

        // Focus: borda simples, sem ring ou outline
        'focus-visible:outline-none',

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
      <RadioGroupPrimitive.Indicator
        className="flex items-center justify-center"
      >
        <span
          className={cn(
            'rounded-full bg-current',
            indicatorSizeClasses[size],
          )}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
