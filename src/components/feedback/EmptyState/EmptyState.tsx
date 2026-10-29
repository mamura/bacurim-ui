
import {
  forwardRef,
  type HTMLAttributes,
} from 'react';

import { cn } from '@/utilities/cn';

export type EmptyStateSize = 'sm' | 'md' | 'lg';

export interface EmptyStateProps
  extends HTMLAttributes<HTMLDivElement> {
  size?: EmptyStateSize;
}

export type EmptyStateIconProps =
  HTMLAttributes<HTMLDivElement>;

export type EmptyStateTitleProps =
  HTMLAttributes<HTMLHeadingElement>;

export type EmptyStateDescriptionProps =
  HTMLAttributes<HTMLParagraphElement>;

export type EmptyStateActionsProps =
  HTMLAttributes<HTMLDivElement>;

const containerSizes: Record<EmptyStateSize, string> = {
  sm: 'gap-3 px-4 py-6',
  md: 'gap-4 px-6 py-10',
  lg: 'gap-5 px-8 py-14',
};

const iconSizes: Record<EmptyStateSize, string> = {
  sm: '[&>svg]:size-5',
  md: '[&>svg]:size-7',
  lg: '[&>svg]:size-9',
};

const titleSizes: Record<EmptyStateSize, string> = {
  sm: 'text-body-md font-semibold',
  md: 'heading-sm',
  lg: 'heading-md',
};

export const EmptyState = forwardRef<
  HTMLDivElement,
  EmptyStateProps
>(function EmptyState(
  {
    size = 'md',
    className,
    children,
    ...props
  },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      data-size={size}
      className={cn(
        'flex w-full flex-col items-center',
        'justify-center text-center',
        containerSizes[size],
        className,
      )}
    >
      {children}
    </div>
  );
});

export const EmptyStateIcon = forwardRef<
  HTMLDivElement,
  EmptyStateIconProps
>(function EmptyStateIcon(
  { className, children, ...props },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      aria-hidden="true"
      className={cn(
        'flex shrink-0 items-center justify-center',
        'rounded-full bg-primary-soft text-primary',
        'size-16',
        '[[data-size=sm]_&]:size-12',
        '[[data-size=lg]_&]:size-20',
        '[&>svg]:size-7',
        '[[data-size=sm]_&>svg]:size-5',
        '[[data-size=lg]_&>svg]:size-9',
        className,
      )}
    >
      {children}
    </div>
  );
});

export const EmptyStateTitle = forwardRef<
  HTMLHeadingElement,
  EmptyStateTitleProps
>(function EmptyStateTitle(
  { className, children, ...props },
  ref,
) {
  return (
    <h3
      {...props}
      ref={ref}
      className={cn(
        'text-text-primary',
        'text-body-md font-semibold',
        '[[data-size=md]_&]:heading-sm',
        '[[data-size=lg]_&]:heading-md',
        className,
      )}
    >
      {children}
    </h3>
  );
});

export const EmptyStateDescription = forwardRef<
  HTMLParagraphElement,
  EmptyStateDescriptionProps
>(function EmptyStateDescription(
  { className, children, ...props },
  ref,
) {
  return (
    <p
      {...props}
      ref={ref}
      className={cn(
        'max-w-md text-body-sm text-text-secondary',
        '[[data-size=lg]_&]:text-body-md',
        className,
      )}
    >
      {children}
    </p>
  );
});

export const EmptyStateActions = forwardRef<
  HTMLDivElement,
  EmptyStateActionsProps
>(function EmptyStateActions(
  { className, children, ...props },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        'mt-2 flex flex-wrap items-center',
        'justify-center gap-3',
        className,
      )}
    >
      {children}
    </div>
  );
});
