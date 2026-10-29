
import {
  createContext,
  forwardRef,
  useContext,
  type HTMLAttributes,
  type ReactNode,
} from 'react';

import {
  CheckCircle2,
  CircleAlert,
  Info,
  TriangleAlert,
  X,
} from 'lucide-react';

import { cn } from '@/utilities/cn';

export type AlertVariant =
  | 'info'
  | 'success'
  | 'warning'
  | 'danger';

export interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: AlertVariant;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export interface AlertIconProps
  extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
}

export type AlertContentProps =
  HTMLAttributes<HTMLDivElement>;

export type AlertTitleProps =
  HTMLAttributes<HTMLHeadingElement>;

export type AlertDescriptionProps =
  HTMLAttributes<HTMLParagraphElement>;

export type AlertActionsProps =
  HTMLAttributes<HTMLDivElement>;

interface AlertContextValue {
  variant: AlertVariant;
}

const AlertContext = createContext<AlertContextValue | null>(
  null,
);

function useAlertContext(): AlertContextValue {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error(
      'Alert composition components must be used inside Alert.',
    );
  }

  return context;
}

const variantClasses: Record<AlertVariant, string> = {
  info: 'border-info bg-info-soft text-info',
  success: 'border-success bg-success-soft text-success',
  warning: 'border-warning bg-warning-soft text-warning',
  danger: 'border-error bg-error-soft text-error',
};

const defaultIcons: Record<
  AlertVariant,
  typeof Info
> = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  danger: CircleAlert,
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  function Alert(
    {
      variant = 'info',
      dismissible = false,
      onDismiss,
      className,
      children,
      role,
      ...props
    },
    ref,
  ) {
    const resolvedRole =
      role ?? (variant === 'danger' ? 'alert' : 'status');

    return (
      <AlertContext.Provider value={{ variant }}>
        <div
          {...props}
          ref={ref}
          role={resolvedRole}
          className={cn(
            'relative flex w-full items-start gap-3',
            'rounded-md border p-4',
            variantClasses[variant],
            dismissible && 'pr-12',
            className,
          )}
        >
          {children}

          {dismissible && (
            <button
              type="button"
              aria-label="Fechar alerta"
              onClick={onDismiss}
              className={cn(
                'absolute right-3 top-3',
                'inline-flex size-7 items-center justify-center',
                'rounded-sm text-current opacity-70',
                'transition-opacity hover:opacity-100',
                'focus-visible:outline-2',
                'focus-visible:outline-offset-2',
                'focus-visible:outline-current',
                'cursor-pointer',
              )}
            >
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </AlertContext.Provider>
    );
  },
);

export const AlertIcon = forwardRef<
  HTMLSpanElement,
  AlertIconProps
>(function AlertIcon(
  { className, children, ...props },
  ref,
) {
  const { variant } = useAlertContext();
  const DefaultIcon = defaultIcons[variant];

  return (
    <span
      {...props}
      ref={ref}
      aria-hidden="true"
      className={cn(
        'mt-0.5 inline-flex shrink-0 items-center',
        className,
      )}
    >
      {children ?? <DefaultIcon size={20} />}
    </span>
  );
});

export const AlertContent = forwardRef<
  HTMLDivElement,
  AlertContentProps
>(function AlertContent(
  { className, children, ...props },
  ref,
) {
  useAlertContext();

  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        'flex min-w-0 flex-1 flex-col gap-1',
        className,
      )}
    >
      {children}
    </div>
  );
});

export const AlertTitle = forwardRef<
  HTMLHeadingElement,
  AlertTitleProps
>(function AlertTitle(
  { className, children, ...props },
  ref,
) {
  useAlertContext();

  return (
    <h3
      {...props}
      ref={ref}
      className={cn(
        'text-body-md font-semibold leading-snug',
        className,
      )}
    >
      {children}
    </h3>
  );
});

export const AlertDescription = forwardRef<
  HTMLParagraphElement,
  AlertDescriptionProps
>(function AlertDescription(
  { className, children, ...props },
  ref,
) {
  useAlertContext();

  return (
    <p
      {...props}
      ref={ref}
      className={cn(
        'text-body-sm leading-relaxed text-text-primary',
        className,
      )}
    >
      {children}
    </p>
  );
});

export const AlertActions = forwardRef<
  HTMLDivElement,
  AlertActionsProps
>(function AlertActions(
  { className, children, ...props },
  ref,
) {
  useAlertContext();

  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        'mt-3 flex flex-wrap items-center gap-2',
        className,
      )}
    >
      {children}
    </div>
  );
});
