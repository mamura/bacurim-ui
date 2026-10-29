
import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';

import { cn } from '@/utilities/cn';

export type BadgeVariant = 'solid' | 'soft' | 'outline' | 'white';

export type BadgeColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';

export type BadgeSize = 'sm' | 'md' | 'lg';

export type BadgeRadius = 'sm' | 'md' | 'lg' | 'full';

export interface BadgeProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
  radius?: BadgeRadius;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  dot?: boolean;
  truncate?: boolean;
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'gap-1 px-2 py-0.5 text-caption',
  md: 'gap-1.5 px-2.5 py-1 text-body-sm',
  lg: 'gap-2 px-3 py-1.5 text-body-md',
};

const radiusClasses: Record<BadgeRadius, string> = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

const colorClasses: Record<
  BadgeColor,
  Record<BadgeVariant, string>
> = {
  primary: {
    solid: 'bg-primary text-primary-contrast',
    soft: 'bg-primary-soft text-primary',
    outline: 'border border-primary text-primary',
    white: 'border border-border bg-surface text-primary',
  },
  secondary: {
    solid: 'bg-secondary text-secondary-contrast',
    soft: 'bg-secondary-soft text-secondary',
    outline: 'border border-secondary text-secondary',
    white: 'border border-border bg-surface text-secondary',
  },
  success: {
    solid: 'bg-success text-success-contrast',
    soft: 'bg-success-soft text-success',
    outline: 'border border-success text-success',
    white: 'border border-border bg-surface text-success',
  },
  warning: {
    solid: 'bg-warning text-warning-contrast',
    soft: 'bg-warning-soft text-warning',
    outline: 'border border-warning text-warning',
    white: 'border border-border bg-surface text-warning',
  },
  error: {
    solid: 'bg-error text-error-contrast',
    soft: 'bg-error-soft text-error',
    outline: 'border border-error text-error',
    white: 'border border-border bg-surface text-error',
  },
  info: {
    solid: 'bg-info text-info-contrast',
    soft: 'bg-info-soft text-info',
    outline: 'border border-info text-info',
    white: 'border border-border bg-surface text-info',
  },
  neutral: {
    solid: 'bg-text-primary text-text-inverse',
    soft: 'bg-background text-text-primary',
    outline: 'border border-border text-text-primary',
    white: 'border border-border bg-surface text-text-primary',
  },
};

const dotClasses: Record<BadgeColor, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  info: 'bg-info',
  neutral: 'bg-text-primary',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge(
    {
      variant = 'soft',
      color = 'primary',
      size = 'md',
      radius = 'full',
      startIcon,
      endIcon,
      dot = false,
      truncate = false,
      className,
      children,
      ...props
    },
    ref,
  ) {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex max-w-full items-center align-middle font-medium',
          sizeClasses[size],
          radiusClasses[radius],
          colorClasses[color][variant],
          className,
        )}
        {...props}
      >
        {dot && (
          <span
            aria-hidden="true"
            className={cn(
              'size-1.5 shrink-0 rounded-full',
              variant === 'solid'
                ? 'bg-current'
                : dotClasses[color],
            )}
          />
        )}

        {startIcon != null && (
          <span
            aria-hidden="true"
            className="inline-flex shrink-0 items-center"
          >
            {startIcon}
          </span>
        )}

        <span className={cn('min-w-0', truncate && 'truncate')}>
          {children}
        </span>

        {endIcon != null && (
          <span
            aria-hidden="true"
            className="inline-flex shrink-0 items-center"
          >
            {endIcon}
          </span>
        )}
      </span>
    );
  },
);
