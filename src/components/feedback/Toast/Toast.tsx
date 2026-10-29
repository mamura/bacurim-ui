
import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import {
  CheckCircle2,
  CircleAlert,
  Info,
  LoaderCircle,
  TriangleAlert,
  X,
} from 'lucide-react';

import { cn } from '@/utilities/cn';

export type ToastVariant =
  | 'info'
  | 'success'
  | 'warning'
  | 'danger';

export type ToastAppearance = 'default' | 'soft' | 'solid';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: ToastVariant;
  appearance?: ToastAppearance;
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  loading?: boolean;
  progress?: number;
  action?: ToastAction;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const appearanceClasses: Record<
  ToastVariant,
  Record<ToastAppearance, string>
> = {
  info: {
    default: 'border-border bg-surface text-text-primary',
    soft: 'border-info/20 bg-info-soft text-info',
    solid: 'border-info bg-info text-info-contrast',
  },
  success: {
    default: 'border-border bg-surface text-text-primary',
    soft: 'border-success/20 bg-success-soft text-success',
    solid: 'border-success bg-success text-success-contrast',
  },
  warning: {
    default: 'border-border bg-surface text-text-primary',
    soft: 'border-warning/20 bg-warning-soft text-warning',
    solid: 'border-warning bg-warning text-warning-contrast',
  },
  danger: {
    default: 'border-border bg-surface text-text-primary',
    soft: 'border-error/20 bg-error-soft text-error',
    solid: 'border-error bg-error text-error-contrast',
  },
};

const iconClasses: Record<ToastVariant, string> = {
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-error',
};

const progressClasses: Record<ToastVariant, string> = {
  info: 'bg-info',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-error',
};

const defaultIcons = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  danger: CircleAlert,
};

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  function Toast(
    {
      variant = 'info',
      appearance = 'default',
      title,
      description,
      icon,
      loading = false,
      progress,
      action,
      dismissible = true,
      onDismiss,
      className,
      children,
      role,
      ...props
    },
    ref,
  ) {
    const DefaultIcon = defaultIcons[variant];

    const normalizedProgress =
      progress === undefined || !Number.isFinite(progress)
        ? undefined
        : Math.min(100, Math.max(0, progress));

    return (
      <div
        {...props}
        ref={ref}
        role={role ?? (variant === 'danger' ? 'alert' : 'status')}
        className={cn(
          'flex w-full items-start gap-3 rounded-md border p-4 shadow-md',
          appearanceClasses[variant][appearance],
          className,
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            'mt-0.5 inline-flex shrink-0',
            appearance === 'default' && iconClasses[variant],
          )}
        >
          {loading ? (
            <LoaderCircle
              size={20}
              className="animate-spin"
            />
          ) : (
            icon ?? <DefaultIcon size={20} />
          )}
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          {title != null && (
            <div className="text-body-sm font-semibold">
              {title}
            </div>
          )}

          {description != null && (
            <div
              className={cn(
                'text-body-sm leading-relaxed',
                appearance === 'default'
                  ? 'text-text-secondary'
                  : 'opacity-90',
              )}
            >
              {description}
            </div>
          )}

          {children}

          {normalizedProgress !== undefined && (
            <div className="mt-2 flex flex-col gap-1.5">
              <span className="text-caption">
                {Math.round(normalizedProgress)}%
              </span>

              <div
                role="progressbar"
                aria-label="Progresso da operação"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={normalizedProgress}
                className={cn(
                  'h-1.5 w-full overflow-hidden rounded-full',
                  appearance === 'solid'
                    ? 'bg-white/30'
                    : 'bg-border',
                )}
              >
                <div
                  className={cn(
                    'h-full rounded-full transition-[width]',
                    appearance === 'solid'
                      ? 'bg-current'
                      : progressClasses[variant],
                  )}
                  style={{ width: `${normalizedProgress}%` }}
                />
              </div>
            </div>
          )}

          {action && (
            <div className="mt-2">
              <button
                type="button"
                onClick={action.onClick}
                className={cn(
                  'cursor-pointer rounded-sm text-body-sm',
                  'font-semibold underline-offset-4',
                  'hover:underline',
                  'focus-visible:outline-2',
                  'focus-visible:outline-offset-2',
                  'focus-visible:outline-current',
                )}
              >
                {action.label}
              </button>
            </div>
          )}
        </div>

        {dismissible && (
          <button
            type="button"
            aria-label="Fechar notificação"
            onClick={onDismiss}
            className={cn(
              'inline-flex size-6 shrink-0 items-center',
              'justify-center rounded-sm opacity-60',
              'transition-opacity hover:opacity-100',
              'cursor-pointer',
              'focus-visible:outline-2',
              'focus-visible:outline-offset-2',
              'focus-visible:outline-current',
            )}
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </div>
    );
  },
);
