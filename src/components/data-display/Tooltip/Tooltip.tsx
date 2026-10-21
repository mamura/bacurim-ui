
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '@/utilities/cn';

export type TooltipVariant = 'default' | 'light' | 'primary';

export const TooltipProvider = TooltipPrimitive.Provider;

export const Tooltip = TooltipPrimitive.Root;

export const TooltipTrigger = TooltipPrimitive.Trigger;

export interface TooltipContentProps
  extends ComponentPropsWithoutRef<
    typeof TooltipPrimitive.Content
  > {
  variant?: TooltipVariant;
  arrow?: boolean;
}

const variantClasses: Record<TooltipVariant, string> = {
  default: 'bg-text-primary text-text-inverse',
  light:
    'border border-border bg-surface text-text-primary shadow-md',
  primary: 'bg-primary text-primary-contrast',
};

const arrowClasses: Record<TooltipVariant, string> = {
  default: 'fill-text-primary',
  light: 'fill-surface',
  primary: 'fill-primary',
};

export const TooltipContent = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(function TooltipContent(
  {
    variant = 'default',
    arrow = false,
    side = 'top',
    align = 'center',
    sideOffset = 6,
    className,
    children,
    ...props
  },
  ref,
) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        {...props}
        ref={ref}
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-50 max-w-xs rounded-sm px-3 py-2',
          'text-body-sm leading-relaxed',
          'shadow-sm',
          'select-none',
          variantClasses[variant],
          className,
        )}
      >
        {children}

        {arrow && (
          <TooltipPrimitive.Arrow
            aria-hidden="true"
            width={10}
            height={5}
            className={cn(arrowClasses[variant])}
          />
        )}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
});
