
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
} from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

import './drawer.css';

import { cn } from '@/utilities/cn';

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl';

export const Drawer = DialogPrimitive.Root;
export const DrawerTrigger = DialogPrimitive.Trigger;
export const DrawerClose = DialogPrimitive.Close;

export type DrawerProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Root
>;

export type DrawerTriggerProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Trigger
>;

export type DrawerCloseProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Close
>;

export interface DrawerContentProps
  extends ComponentPropsWithoutRef<
    typeof DialogPrimitive.Content
  > {
  side?: DrawerSide;
  size?: DrawerSize;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

const horizontalSizes: Record<DrawerSize, string> = {
  sm: 'max-w-xs',
  md: 'max-w-md',
  lg: 'max-w-xl',
  xl: 'max-w-2xl',
};

const verticalSizes: Record<DrawerSize, string> = {
  sm: 'max-h-48',
  md: 'max-h-80',
  lg: 'max-h-[32rem]',
  xl: 'max-h-[40rem]',
};

const sideClasses: Record<DrawerSide, string> = {
  left: [
    'inset-y-0 left-0 h-full w-[calc(100vw-1rem)]',
    'border-r border-border',
    'data-[state=open]:animate-[drawer-in-left_250ms_ease-out]',
    'data-[state=closed]:animate-[drawer-out-left_200ms_ease-in]',
  ].join(' '),
  right: [
    'inset-y-0 right-0 h-full w-[calc(100vw-1rem)]',
    'border-l border-border',
    'data-[state=open]:animate-[drawer-in-right_250ms_ease-out]',
    'data-[state=closed]:animate-[drawer-out-right_200ms_ease-in]',
  ].join(' '),
  top: [
    'inset-x-0 top-0 w-full h-[calc(100dvh-1rem)]',
    'border-b border-border',
    'data-[state=open]:animate-[drawer-in-top_250ms_ease-out]',
    'data-[state=closed]:animate-[drawer-out-top_200ms_ease-in]',
  ].join(' '),
  bottom: [
    'inset-x-0 bottom-0 w-full h-[calc(100dvh-1rem)]',
    'border-t border-border',
    'data-[state=open]:animate-[drawer-in-bottom_250ms_ease-out]',
    'data-[state=closed]:animate-[drawer-out-bottom_200ms_ease-in]',
  ].join(' '),
};

export const DrawerOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(function DrawerOverlay({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        'fixed inset-0 z-50 bg-black/40',
        'data-[state=open]:animate-[drawer-overlay-in_250ms_ease-out]',
        'data-[state=closed]:animate-[drawer-overlay-out_200ms_ease-in]',
        'motion-reduce:animate-none',
        className,
      )}
      {...props}
    />
  );
});

export const DrawerContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  DrawerContentProps
>(function DrawerContent(
  {
    className,
    children,
    side = 'right',
    size = 'md',
    showCloseButton = true,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    onPointerDownOutside,
    onEscapeKeyDown,
    ...props
  },
  ref,
) {
  const isHorizontal = side === 'left' || side === 'right';

  return (
    <DialogPrimitive.Portal>
      <DrawerOverlay />

      <DialogPrimitive.Content
        {...props}
        ref={ref}
        onPointerDownOutside={(event) => {
          onPointerDownOutside?.(event);

          if (!closeOnOverlayClick) {
            event.preventDefault();
          }
        }}
        onEscapeKeyDown={(event) => {
          onEscapeKeyDown?.(event);

          if (!closeOnEscape) {
            event.preventDefault();
          }
        }}
        className={cn(
          'fixed z-50 flex flex-col overflow-hidden',
          'bg-surface text-text-primary shadow-lg',
          'focus:outline-none',
          'motion-reduce:animate-none',
          sideClasses[side],
          isHorizontal
            ? horizontalSizes[size]
            : verticalSizes[size],
          className,
        )}
      >
        {children}

        {showCloseButton && (
          <DialogPrimitive.Close
            type="button"
            aria-label="Fechar painel"
            className={cn(
              'absolute right-4 top-4 z-10',
              'inline-flex size-8 items-center justify-center',
              'rounded-sm text-text-secondary',
              'transition-colors',
              'hover:bg-background hover:text-text-primary',
              'focus-visible:outline-2',
              'focus-visible:outline-offset-2',
              'focus-visible:outline-primary',
              'cursor-pointer',
            )}
          >
            <X size={18} aria-hidden="true" />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});

export const DrawerHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function DrawerHeader(
  { className, children, ...props },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        'flex shrink-0 flex-col gap-1.5',
        'border-b border-border px-6 py-5',
        className,
      )}
    >
      {children}
    </div>
  );
});

export const DrawerTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(function DrawerTitle({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Title
      {...props}
      ref={ref}
      className={cn(
        'heading-sm pr-8 text-text-primary',
        className,
      )}
    />
  );
});

export const DrawerDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(function DrawerDescription(
  { className, ...props },
  ref,
) {
  return (
    <DialogPrimitive.Description
      {...props}
      ref={ref}
      className={cn(
        'text-body-sm text-text-secondary',
        className,
      )}
    />
  );
});

export const DrawerBody = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function DrawerBody(
  { className, children, ...props },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        'min-h-0 flex-1 overflow-y-auto px-6 py-5',
        className,
      )}
    >
      {children}
    </div>
  );
});

export const DrawerFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function DrawerFooter(
  { className, children, ...props },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        'flex shrink-0 flex-wrap items-center',
        'justify-end gap-3 border-t border-border',
        'px-6 py-4',
        className,
      )}
    >
      {children}
    </div>
  );
});
