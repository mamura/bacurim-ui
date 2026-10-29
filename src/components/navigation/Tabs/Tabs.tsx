
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';

import { cn } from '@/utilities/cn';

export type TabsOrientation = 'horizontal' | 'vertical';

export type TabsVariant =
  | 'underline'
  | 'pills'
  | 'segment'
  | 'card'
  | 'bar';

export type TabsSize = 'sm' | 'md' | 'lg';

export type TabsAlign = 'start' | 'center' | 'end';

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
  orientation: TabsOrientation;
  baseId: string;
}

interface TabsListContextValue {
  variant: TabsVariant;
  size: TabsSize;
  fullWidth: boolean;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const TabsListContext = createContext<TabsListContextValue | null>(
  null,
);

function useTabsContext(): TabsContextValue {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error(
      'Tabs components must be used inside <Tabs>.',
    );
  }

  return context;
}

function useTabsListContext(): TabsListContextValue {
  const context = useContext(TabsListContext);

  if (!context) {
    throw new Error(
      'TabsTrigger must be used inside <TabsList>.',
    );
  }

  return context;
}

function getTabId(baseId: string, value: string): string {
  return `${baseId}-tab-${encodeURIComponent(value)}`;
}

function getPanelId(baseId: string, value: string): string {
  return `${baseId}-panel-${encodeURIComponent(value)}`;
}

/* -------------------------------------------------------------------------- */
/* Tabs                                                                       */
/* -------------------------------------------------------------------------- */

export interface TabsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: TabsOrientation;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  function Tabs(
    {
      value,
      defaultValue = '',
      onValueChange,
      orientation = 'horizontal',
      className,
      children,
      ...props
    },
    ref,
  ) {
    const baseId = useId();

    const [internalValue, setInternalValue] = useState(defaultValue);

    const isControlled = value !== undefined;

    const selectedValue = isControlled ? value : internalValue;

    const setValue = useCallback(
      (nextValue: string) => {
        if (nextValue === selectedValue) {
          return;
        }

        if (!isControlled) {
          setInternalValue(nextValue);
        }

        onValueChange?.(nextValue);
      },
      [isControlled, onValueChange, selectedValue],
    );

    return (
      <TabsContext.Provider
        value={{
          value: selectedValue,
          setValue,
          orientation,
          baseId,
        }}
      >
        <div
          {...props}
          ref={ref}
          data-orientation={orientation}
          className={cn(
            orientation === 'vertical'
              ? 'flex items-start gap-4'
              : 'flex flex-col gap-4',
            className,
          )}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);

/* -------------------------------------------------------------------------- */
/* TabsList                                                                   */
/* -------------------------------------------------------------------------- */

export interface TabsListProps
  extends HTMLAttributes<HTMLDivElement> {
  variant?: TabsVariant;
  size?: TabsSize;
  align?: TabsAlign;
  fullWidth?: boolean;
  scrollable?: boolean;
}

const alignClasses: Record<TabsAlign, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
};

const listVariantClasses: Record<TabsVariant, string> = {
  underline: 'border-b border-border',
  pills: '',
  segment: 'rounded-md bg-background p-1',
  card: '',
  bar: 'rounded-sm border border-border',
};

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  function TabsList(
    {
      variant = 'underline',
      size = 'md',
      align = 'start',
      fullWidth = false,
      scrollable = false,
      className,
      children,
      onKeyDown,
      ...props
    },
    ref,
  ) {
    const { orientation, setValue } = useTabsContext();

    const internalRef = useRef<HTMLDivElement | null>(null);

    const isVertical = orientation === 'vertical';

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);

      if (event.defaultPrevented) {
        return;
      }

      const key = event.key;

      const isNext = isVertical
        ? key === 'ArrowDown'
        : key === 'ArrowRight';

      const isPrevious = isVertical
        ? key === 'ArrowUp'
        : key === 'ArrowLeft';

      if (
        !isNext &&
        !isPrevious &&
        key !== 'Home' &&
        key !== 'End'
      ) {
        return;
      }

      const triggers = Array.from(
        internalRef.current?.querySelectorAll<HTMLButtonElement>(
          '[role="tab"]:not(:disabled)',
        ) ?? [],
      );

      if (triggers.length === 0) {
        return;
      }

      const currentIndex = triggers.indexOf(
        document.activeElement as HTMLButtonElement,
      );

      // Do not intercept keyboard events from other elements.
      if (currentIndex === -1) {
        return;
      }

      event.preventDefault();

      let nextIndex = currentIndex;

      if (key === 'Home') {
        nextIndex = 0;
      } else if (key === 'End') {
        nextIndex = triggers.length - 1;
      } else if (isNext) {
        nextIndex = (currentIndex + 1) % triggers.length;
      } else if (isPrevious) {
        nextIndex =
          (currentIndex - 1 + triggers.length) % triggers.length;
      }

      const nextTrigger = triggers[nextIndex];

      if (!nextTrigger) {
        return;
      }

      nextTrigger.focus();

      // Keep the focused tab visible inside a scrollable list.
      if (!isVertical) {
        const list = internalRef.current;

        if (list && list.scrollWidth > list.clientWidth) {
          const triggerLeft = nextTrigger.offsetLeft;
          const triggerRight =
            triggerLeft + nextTrigger.offsetWidth;

          const visibleLeft = list.scrollLeft;
          const visibleRight =
            visibleLeft + list.clientWidth;

          if (triggerLeft < visibleLeft) {
            list.scrollTo({
              left: triggerLeft,
              behavior: 'smooth',
            });
          } else if (triggerRight > visibleRight) {
            list.scrollTo({
              left: triggerRight - list.clientWidth,
              behavior: 'smooth',
            });
          }
        }
      }

      const nextValue = nextTrigger.dataset.value;

      if (nextValue !== undefined) {
        setValue(nextValue);
      }
    };

    return (
      <TabsListContext.Provider
        value={{
          variant,
          size,
          fullWidth,
        }}
      >
        <div
          {...props}
          ref={(node) => {
            internalRef.current = node;

            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          role="tablist"
          aria-orientation={orientation}
          onKeyDown={handleKeyDown}
          className={cn(
            'flex min-w-0',
            isVertical
              ? 'flex-col items-stretch'
              : 'flex-row items-center',
            !isVertical && alignClasses[align],
            listVariantClasses[variant],
            isVertical &&
              variant === 'underline' &&
              'border-b-0 border-r',
            scrollable &&
              !isVertical &&
              'max-w-full overflow-x-auto',
            fullWidth && 'w-full',
            className,
          )}
        >
          {children}
        </div>
      </TabsListContext.Provider>
    );
  },
);

/* -------------------------------------------------------------------------- */
/* TabsTrigger                                                                */
/* -------------------------------------------------------------------------- */

export interface TabsTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  children?: ReactNode;
}

const triggerSizeClasses: Record<TabsSize, string> = {
  sm: 'gap-1.5 px-3 py-1.5 text-body-sm',
  md: 'gap-2 px-4 py-2 text-body-sm',
  lg: 'gap-2 px-5 py-3 text-body-md',
};

const triggerVariantClasses: Record<
  TabsVariant,
  {
    base: string;
    active: string;
    inactive: string;
  }
> = {
  underline: {
    base: 'border-b-2 border-transparent',
    active: 'border-primary text-primary',
    inactive: 'text-text-secondary hover:text-text-primary',
  },
  pills: {
    base: 'rounded-sm',
    active: 'bg-primary text-primary-contrast',
    inactive: 'text-text-secondary hover:bg-background',
  },
  segment: {
    base: 'rounded-sm',
    active: 'bg-surface text-primary shadow-sm',
    inactive: 'text-text-secondary hover:text-text-primary',
  },
  card: {
    base: 'rounded-sm border',
    active: 'border-primary bg-primary-soft text-primary',
    inactive:
      'border-border bg-surface text-text-secondary hover:text-text-primary',
  },
  bar: {
    base: 'border-b-2 border-transparent',
    active: 'border-primary bg-primary-soft text-primary',
    inactive: 'text-text-secondary hover:bg-background',
  },
};

export const TabsTrigger = forwardRef<
  HTMLButtonElement,
  TabsTriggerProps
>(function TabsTrigger(
  {
    value,
    disabled = false,
    className,
    children,
    onClick,
    type,
    ...props
  },
  ref,
) {
  const {
    value: selectedValue,
    setValue,
    orientation,
    baseId,
  } = useTabsContext();

  const { variant, size, fullWidth } = useTabsListContext();

  const active = selectedValue === value;

  const styles = triggerVariantClasses[variant];

  return (
    <button
      {...props}
      ref={ref}
      type={type ?? 'button'}
      role="tab"
      id={getTabId(baseId, value)}
      aria-selected={active}
      aria-controls={getPanelId(baseId, value)}
      data-value={value}
      data-state={active ? 'active' : 'inactive'}
      disabled={disabled}
      tabIndex={active ? 0 : -1}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented && !disabled) {
          setValue(value);
        }
      }}
      className={cn(
        'inline-flex shrink-0 items-center justify-center whitespace-nowrap font-medium transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        'disabled:cursor-not-allowed disabled:opacity-50',
        triggerSizeClasses[size],
        styles.base,
        active ? styles.active : styles.inactive,
        fullWidth && 'flex-1',
        orientation === 'vertical' &&
          variant === 'underline' &&
          'border-b-0 border-r-2',
        className,
      )}
    >
      {children}
    </button>
  );
});

/* -------------------------------------------------------------------------- */
/* TabsContent                                                                */
/* -------------------------------------------------------------------------- */

export interface TabsContentProps
  extends HTMLAttributes<HTMLDivElement> {
  value: string;
  forceMount?: boolean;
}

export const TabsContent = forwardRef<
  HTMLDivElement,
  TabsContentProps
>(function TabsContent(
  {
    value,
    forceMount = false,
    className,
    children,
    ...props
  },
  ref,
) {
  const {
    value: selectedValue,
    baseId,
  } = useTabsContext();

  const active = selectedValue === value;

  return (
    <div
      {...props}
      ref={ref}
      role="tabpanel"
      id={getPanelId(baseId, value)}
      aria-labelledby={getTabId(baseId, value)}
      data-state={active ? 'active' : 'inactive'}
      tabIndex={active ? 0 : -1}
      hidden={!active}
      className={cn(
        'min-w-0 flex-1 outline-none',
        'focus-visible:ring-2 focus-visible:ring-primary',
        className,
      )}
    >
      {active || forceMount ? children : null}
    </div>
  );
});
