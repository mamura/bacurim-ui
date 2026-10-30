
import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';

import { cn } from '@/utilities/cn';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputRadius = 'sm' | 'md' | 'lg' | 'full';

export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'tel'
  | 'url'
  | 'search'
  | 'number';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  size?: InputSize;
  radius?: InputRadius;
  type?: InputType;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  endAdornment?: ReactNode;
  invalid?: boolean;
}

const sizeClasses: Record<InputSize, string> = {
  sm: 'h-9 px-3 text-body-sm',
  md: 'h-11 px-4 text-body-md',
  lg: 'h-14 px-5 text-body-lg',
};

const radiusClasses: Record<InputRadius, string> = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

const iconSizeClasses: Record<InputSize, string> = {
  sm: '[&_svg]:size-4',
  md: '[&_svg]:size-5',
  lg: '[&_svg]:size-5',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      size = 'md',
      radius = 'sm',
      type = 'text',
      startIcon,
      endIcon,
      endAdornment,
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
      <div
        data-disabled={disabled ? 'true' : undefined}
        data-readonly={readOnly ? 'true' : undefined}
        data-invalid={isInvalid ? 'true' : undefined}
        className={cn(
          'group relative flex w-full items-center',
          'border border-border bg-surface text-text-primary',
          'transition-colors duration-150',
          'hover:border-text-secondary',
          'focus-within:border-primary',
          'data-[invalid=true]:border-error',
          'data-[invalid=true]:focus-within:border-error',
          'data-[disabled=true]:cursor-not-allowed',
          'data-[disabled=true]:bg-background',
          'data-[disabled=true]:opacity-50',
          'data-[disabled=true]:hover:border-border',
          'data-[readonly=true]:bg-background',
          'data-[readonly=true]:hover:border-border',
          sizeClasses[size],
          radiusClasses[radius],
          iconSizeClasses[size],
          className,
        )}
      >
        {startIcon && (
          <span
            aria-hidden="true"
            className={cn(
              'mr-3 flex shrink-0 items-center justify-center',
              'text-text-secondary',
            )}
          >
            {startIcon}
          </span>
        )}

        <input
          {...props}
          ref={ref}
          type={type}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={isInvalid ? true : ariaInvalid}
          className={cn(
            'h-full min-w-0 flex-1 bg-transparent',
            'text-inherit outline-none',
            'placeholder:text-text-secondary',
            'disabled:cursor-not-allowed',
            'read-only:cursor-default',
          )}
        />

        {endIcon && (
          <span
            aria-hidden="true"
            className={cn(
              'ml-3 flex shrink-0 items-center justify-center',
              'text-text-secondary',
            )}
          >
            {endIcon}
          </span>
        )}

        {endAdornment && (
          <span className="ml-3 flex shrink-0 items-center justify-center">
            {endAdornment}
          </span>
        )}
      </div>
    );
  },
);
