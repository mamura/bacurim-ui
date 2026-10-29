
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import * as SelectPrimitive from '@radix-ui/react-select';

import {
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

import { cn } from '@/utilities/cn';

export type SelectSize = 'sm' | 'md' | 'lg';

export type SelectRadius = 'sm' | 'md' | 'lg' | 'full';

export interface SelectTriggerProps
  extends ComponentPropsWithoutRef<
    typeof SelectPrimitive.Trigger
  > {
  size?: SelectSize;
  radius?: SelectRadius;
  invalid?: boolean;
}

const sizeClasses: Record<SelectSize, string> = {
  sm: 'h-9 px-3 text-body-sm',
  md: 'h-11 px-4 text-body-md',
  lg: 'h-14 px-5 text-body-lg',
};

const radiusClasses: Record<SelectRadius, string> = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

/* -------------------------------------------------------------------------- */
/* Root                                                                       */
/* -------------------------------------------------------------------------- */

export const Select = SelectPrimitive.Root;

/* -------------------------------------------------------------------------- */
/* Trigger                                                                    */
/* -------------------------------------------------------------------------- */

export const SelectTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(function SelectTrigger(
  {
    size = 'md',
    radius = 'sm',
    invalid = false,
    className,
    children,
    'aria-invalid': ariaInvalid,
    ...props
  },
  ref,
) {
  const isInvalid =
    invalid || ariaInvalid === true || ariaInvalid === 'true';

  return (
    <SelectPrimitive.Trigger
      {...props}
      ref={ref}
      aria-invalid={isInvalid ? true : ariaInvalid}
      data-invalid={isInvalid ? 'true' : undefined}
      className={cn(
        'flex w-full items-center justify-between gap-3',
        'border border-border bg-surface text-text-primary',
        'transition-colors duration-150',
        'hover:border-text-secondary',
        'focus:border-primary focus:outline-none',
        'data-[state=open]:border-primary',
        'data-[invalid=true]:border-error',
        'data-[invalid=true]:focus:border-error',
        'data-[invalid=true]:data-[state=open]:border-error',
        'disabled:cursor-not-allowed',
        'disabled:bg-background',
        'disabled:opacity-50',
        'disabled:hover:border-border',
        'data-[placeholder]:text-text-secondary',
        sizeClasses[size],
        radiusClasses[radius],
        className,
      )}
    >
      <span className="min-w-0 flex-1 truncate text-left">
        {children}
      </span>

      <SelectPrimitive.Icon asChild>
        <ChevronDown
          size={18}
          aria-hidden="true"
          className="shrink-0 text-text-secondary"
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});

/* -------------------------------------------------------------------------- */
/* Value                                                                      */
/* -------------------------------------------------------------------------- */

export const SelectValue = SelectPrimitive.Value;

/* -------------------------------------------------------------------------- */
/* Content                                                                    */
/* -------------------------------------------------------------------------- */

export type SelectContentProps = ComponentPropsWithoutRef<
  typeof SelectPrimitive.Content
>;

export const SelectContent = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(function SelectContent(
  {
    className,
    children,
    position = 'popper',
    sideOffset = 4,
    ...props
  },
  ref,
) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        {...props}
        ref={ref}
        position={position}
        sideOffset={sideOffset}
        className={cn(
          'relative z-50 max-h-72 min-w-40 overflow-hidden',
          'rounded-sm border border-border',
          'bg-surface text-text-primary shadow-md',
          'data-[state=closed]:pointer-events-none',
          className,
        )}
      >
        <SelectScrollUpButton />

        <SelectPrimitive.Viewport
          className={cn(
            'p-1',
            position === 'popper' &&
              'w-full min-w-[var(--radix-select-trigger-width)]',
          )}
        >
          {children}
        </SelectPrimitive.Viewport>

        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});

/* -------------------------------------------------------------------------- */
/* Item                                                                       */
/* -------------------------------------------------------------------------- */

export type SelectItemProps = ComponentPropsWithoutRef<
  typeof SelectPrimitive.Item
>;

export const SelectItem = forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(function SelectItem(
  {
    className,
    children,
    ...props
  },
  ref,
) {
  return (
    <SelectPrimitive.Item
      {...props}
      ref={ref}
      className={cn(
        'relative flex w-full cursor-default items-center',
        'rounded-sm py-2 pr-8 pl-3',
        'text-body-sm text-text-primary',
        'outline-none select-none',
        'focus:bg-primary-soft focus:text-primary',
        'data-[state=checked]:font-medium',
        'data-[disabled]:pointer-events-none',
        'data-[disabled]:opacity-40',
        className,
      )}
    >
      <SelectPrimitive.ItemText>
        {children}
      </SelectPrimitive.ItemText>

      <span className="absolute right-2 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check
            size={16}
            aria-hidden="true"
            className="text-primary"
          />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  );
});

/* -------------------------------------------------------------------------- */
/* Group                                                                      */
/* -------------------------------------------------------------------------- */

export const SelectGroup = SelectPrimitive.Group;

/* -------------------------------------------------------------------------- */
/* Label                                                                      */
/* -------------------------------------------------------------------------- */

export type SelectLabelProps = ComponentPropsWithoutRef<
  typeof SelectPrimitive.Label
>;

export const SelectLabel = forwardRef<
  ElementRef<typeof SelectPrimitive.Label>,
  SelectLabelProps
>(function SelectLabel(
  {
    className,
    ...props
  },
  ref,
) {
  return (
    <SelectPrimitive.Label
      {...props}
      ref={ref}
      className={cn(
        'px-3 py-2',
        'text-body-sm font-semibold text-text-secondary',
        className,
      )}
    />
  );
});

/* -------------------------------------------------------------------------- */
/* Separator                                                                  */
/* -------------------------------------------------------------------------- */

export type SelectSeparatorProps = ComponentPropsWithoutRef<
  typeof SelectPrimitive.Separator
>;

export const SelectSeparator = forwardRef<
  ElementRef<typeof SelectPrimitive.Separator>,
  SelectSeparatorProps
>(function SelectSeparator(
  {
    className,
    ...props
  },
  ref,
) {
  return (
    <SelectPrimitive.Separator
      {...props}
      ref={ref}
      className={cn(
        'my-1 h-px bg-border',
        className,
      )}
    />
  );
});

/* -------------------------------------------------------------------------- */
/* Scroll buttons                                                             */
/* -------------------------------------------------------------------------- */

export type SelectScrollButtonProps = ComponentPropsWithoutRef<
  typeof SelectPrimitive.ScrollUpButton
>;

export const SelectScrollUpButton = forwardRef<
  ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  SelectScrollButtonProps
>(function SelectScrollUpButton(
  {
    className,
    ...props
  },
  ref,
) {
  return (
    <SelectPrimitive.ScrollUpButton
      {...props}
      ref={ref}
      className={cn(
        'flex h-7 cursor-default items-center justify-center',
        'bg-surface text-text-secondary',
        className,
      )}
    >
      <ChevronUp size={16} aria-hidden="true" />
    </SelectPrimitive.ScrollUpButton>
  );
});

export const SelectScrollDownButton = forwardRef<
  ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  SelectScrollButtonProps
>(function SelectScrollDownButton(
  {
    className,
    ...props
  },
  ref,
) {
  return (
    <SelectPrimitive.ScrollDownButton
      {...props}
      ref={ref}
      className={cn(
        'flex h-7 cursor-default items-center justify-center',
        'bg-surface text-text-secondary',
        className,
      )}
    >
      <ChevronDown size={16} aria-hidden="true" />
    </SelectPrimitive.ScrollDownButton>
  );
});
