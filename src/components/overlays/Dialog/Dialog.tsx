
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

import { cn } from '@/utilities/cn';

export type DialogSize = 'sm' | 'md' | 'lg' | 'xl';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export type DialogProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Root
>;

export type DialogTriggerProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Trigger
>;

export type DialogCloseProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Close
>;

export interface DialogContentProps
  extends ComponentPropsWithoutRef<
    typeof DialogPrimitive.Content
  > {
  size?: DialogSize;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
}

const sizeClasses: Record<DialogSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

export const DialogOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(function DialogOverlay({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        'fixed inset-0 z-50 bg-black/50',
        'data-[state=open]:animate-in',
        'data-[state=closed]:animate-out',
        className,
      )}
      {...props}
    />
  );
});

export const DialogContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(function DialogContent(
  {
    className,
    children,
    size = 'md',
    closeOnOverlayClick = true,
    closeOnEscape = true,
    showCloseButton = true,
    onPointerDownOutside,
    onEscapeKeyDown,
    ...props
  },
  ref,
) {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />

      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed left-1/2 top-1/2 z-50',
          'flex max-h-[calc(100dvh-2rem)]',
          'w-[calc(100vw-2rem)] flex-col',
          '-translate-x-1/2 -translate-y-1/2',
          'overflow-hidden rounded-md',
          'border border-border bg-surface',
          'text-text-primary shadow-lg',
          'focus:outline-none',
          sizeClasses[size],
          className,
        )}
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
        {...props}
      >
        {children}

        {showCloseButton && (
          <DialogPrimitive.Close
            aria-label="Fechar diálogo"
            className={cn(
              'absolute right-4 top-4',
              'inline-flex size-7 items-center justify-center',
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

export const DialogHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function DialogHeader(
  { className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex shrink-0 flex-col gap-1.5 px-6 pt-6 pb-4',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

export const DialogTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(function DialogTitle({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn(
        'heading-sm pr-8 text-text-primary',
        className,
      )}
      {...props}
    />
  );
});

export const DialogDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(function DialogDescription(
  { className, ...props },
  ref,
) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn(
        'text-body-sm text-text-secondary',
        className,
      )}
      {...props}
    />
  );
});

export const DialogBody = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function DialogBody(
  { className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'min-h-0 flex-1 overflow-y-auto px-6 py-4',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

export const DialogFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function DialogFooter(
  { className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex shrink-0 flex-wrap items-center',
        'justify-end gap-3 px-6 py-4',
        'border-t border-border',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
