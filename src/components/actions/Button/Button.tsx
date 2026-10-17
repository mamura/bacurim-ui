
import type {
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';

import { cn } from '@/utilities/cn';

export type ButtonVariant =
  | 'solid'
  | 'outline'
  | 'ghost'
  | 'soft'
  | 'white'
  | 'link';

export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonRadius = 'sm' | 'md' | 'lg' | 'full';

export interface ButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'color'
  > {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  radius?: ButtonRadius;
  fullWidth?: boolean;
  loading?: boolean;
  loadingText?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  iconOnly?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 gap-1.5 px-3 text-body-sm',
  md: 'h-10 gap-2 px-4 text-body-md',
  lg: 'h-12 gap-2.5 px-5 text-body-lg',
};

const iconSizeClasses: Record<ButtonSize, string> = {
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-12',
};

const radiusClasses: Record<ButtonRadius, string> = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

const spinnerSizeClasses: Record<ButtonSize, string> = {
  sm: 'size-3.5',
  md: 'size-4',
  lg: 'size-5',
};

const colorClasses: Record<
  ButtonColor,
  Record<ButtonVariant, string>
> = {
  primary: {
    solid:
      'bg-primary text-primary-contrast hover:bg-primary-hover active:bg-primary-active',
    outline:
      'border border-primary text-primary hover:bg-primary-soft active:bg-primary-soft',
    ghost:
      'text-primary hover:bg-primary-soft active:bg-primary-soft',
    soft:
      'bg-primary-soft text-primary hover:bg-primary-soft/80 active:bg-primary-soft',
    white:
      'border border-border bg-surface text-primary hover:bg-primary-soft active:bg-primary-soft',
    link:
      'text-primary underline-offset-4 hover:underline active:opacity-75',
  },
  secondary: {
    solid:
      'bg-secondary text-secondary-contrast hover:bg-secondary-hover active:bg-secondary-active',
    outline:
      'border border-secondary text-secondary hover:bg-secondary-soft active:bg-secondary-soft',
    ghost:
      'text-secondary hover:bg-secondary-soft active:bg-secondary-soft',
    soft:
      'bg-secondary-soft text-secondary hover:bg-secondary-soft/80 active:bg-secondary-soft',
    white:
      'border border-border bg-surface text-secondary hover:bg-secondary-soft active:bg-secondary-soft',
    link:
      'text-secondary underline-offset-4 hover:underline active:opacity-75',
  },
  success: {
    solid:
      'bg-success text-success-contrast hover:bg-success-hover active:bg-success-active',
    outline:
      'border border-success text-success hover:bg-success-soft active:bg-success-soft',
    ghost:
      'text-success hover:bg-success-soft active:bg-success-soft',
    soft:
      'bg-success-soft text-success hover:bg-success-soft/80 active:bg-success-soft',
    white:
      'border border-border bg-surface text-success hover:bg-success-soft active:bg-success-soft',
    link:
      'text-success underline-offset-4 hover:underline active:opacity-75',
  },
  warning: {
    solid:
      'bg-warning text-warning-contrast hover:bg-warning-hover active:bg-warning-active',
    outline:
      'border border-warning text-warning hover:bg-warning-soft active:bg-warning-soft',
    ghost:
      'text-warning hover:bg-warning-soft active:bg-warning-soft',
    soft:
      'bg-warning-soft text-warning hover:bg-warning-soft/80 active:bg-warning-soft',
    white:
      'border border-border bg-surface text-warning hover:bg-warning-soft active:bg-warning-soft',
    link:
      'text-warning underline-offset-4 hover:underline active:opacity-75',
  },
  error: {
    solid:
      'bg-error text-error-contrast hover:bg-error-hover active:bg-error-active',
    outline:
      'border border-error text-error hover:bg-error-soft active:bg-error-soft',
    ghost:
      'text-error hover:bg-error-soft active:bg-error-soft',
    soft:
      'bg-error-soft text-error hover:bg-error-soft/80 active:bg-error-soft',
    white:
      'border border-border bg-surface text-error hover:bg-error-soft active:bg-error-soft',
    link:
      'text-error underline-offset-4 hover:underline active:opacity-75',
  },
  info: {
    solid:
      'bg-info text-info-contrast hover:bg-info-hover active:bg-info-active',
    outline:
      'border border-info text-info hover:bg-info-soft active:bg-info-soft',
    ghost:
      'text-info hover:bg-info-soft active:bg-info-soft',
    soft:
      'bg-info-soft text-info hover:bg-info-soft/80 active:bg-info-soft',
    white:
      'border border-border bg-surface text-info hover:bg-info-soft active:bg-info-soft',
    link:
      'text-info underline-offset-4 hover:underline active:opacity-75',
  },
  neutral: {
    solid:
      'bg-text-primary text-text-inverse hover:opacity-90 active:opacity-80',
    outline:
      'border border-border text-text-primary hover:bg-background active:bg-background',
    ghost:
      'text-text-primary hover:bg-background active:bg-background',
    soft:
      'bg-background text-text-primary hover:brightness-95 active:brightness-90',
    white:
      'border border-border bg-surface text-text-primary hover:bg-background active:bg-background',
    link:
      'text-text-primary underline-offset-4 hover:underline active:opacity-75',
  },
};

function LoadingSpinner({ size }: { size: ButtonSize }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={`${spinnerSizeClasses[size]} shrink-0 animate-spin`}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.25"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Button({
  variant = 'solid',
  color = 'primary',
  size = 'md',
  radius = 'sm',
  fullWidth = false,
  loading = false,
  loadingText,
  startIcon,
  endIcon,
  iconOnly = false,
  disabled = false,
  type = 'button',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const classes = cn(
    'relative inline-flex shrink-0 items-center justify-center',
    'font-medium whitespace-nowrap',
    'transition-colors duration-150',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    iconOnly ? iconSizeClasses[size] : sizeClasses[size],
    radiusClasses[radius],
    colorClasses[color][variant],
    fullWidth && 'w-full',
    className,
  );

  return (
    <button
      {...props}
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-busy={loading || undefined}
    >
      {loading ? (
        <>
          <LoadingSpinner size={size} />
          {!iconOnly && (
            <span>{loadingText ?? children}</span>
          )}
        </>
      ) : (
        <>
          {iconOnly ? (
            <span className="flex items-center justify-center">
              {children ?? startIcon ?? endIcon}
            </span>
          ) : (
            <>
              {startIcon != null && (
                <span
                  aria-hidden="true"
                  className="flex shrink-0 items-center"
                >
                  {startIcon}
                </span>
              )}

              {children}

              {endIcon != null && (
                <span
                  aria-hidden="true"
                  className="flex shrink-0 items-center"
                >
                  {endIcon}
                </span>
              )}
            </>
          )}
        </>
      )}
    </button>
  );
}
