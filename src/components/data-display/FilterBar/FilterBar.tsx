
import {
  createContext,
  forwardRef,
  useContext,
  type HTMLAttributes,
  type ReactNode,
} from 'react';

import { RotateCcw } from 'lucide-react';

import { cn } from '@/utilities/cn';

type FilterBarContextValue = {
  hasActiveFilters: boolean;
};

const FilterBarContext = createContext<FilterBarContextValue | null>(
  null,
);

function useFilterBarContext() {
  const context = useContext(FilterBarContext);

  if (!context) {
    throw new Error(
      'FilterBarContent e FilterBarActions devem ser utilizados dentro de FilterBar.',
    );
  }

  return context;
}

export interface FilterBarProps
  extends HTMLAttributes<HTMLDivElement> {
  activeFiltersCount?: number;
  onClear?: () => void;
  clearLabel?: string;
  showClearButton?: boolean;
  showActiveCount?: boolean;
  title?: string;
  children: ReactNode;
}

export const FilterBar = forwardRef<
  HTMLDivElement,
  FilterBarProps
>(function FilterBar(
  {
    activeFiltersCount = 0,
    onClear,
    clearLabel = 'Limpar filtros',
    showClearButton = true,
    showActiveCount = true,
    title = 'Filtros',
    children,
    className,
    ...props
  },
  ref,
) {
  const count = Math.max(
    0,
    Math.trunc(
      Number.isFinite(activeFiltersCount)
        ? activeFiltersCount
        : 0,
    ),
  );

  const hasActiveFilters = count > 0;

  const showHeader =
    Boolean(title) ||
    (showActiveCount && hasActiveFilters) ||
    (showClearButton && Boolean(onClear));

  return (
    <FilterBarContext.Provider value={{ hasActiveFilters }}>
      <div
        {...props}
        ref={ref}
        className={cn(
          'flex w-full flex-col gap-4',
          'rounded-md border border-border',
          'bg-surface p-4',
          className,
        )}
      >
        {showHeader && (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              {title && (
                <span className="text-body-sm font-semibold text-text-primary">
                  {title}
                </span>
              )}

              {showActiveCount && hasActiveFilters && (
                <span
                  className={cn(
                    'inline-flex min-h-6 items-center',
                    'rounded-full bg-primary-soft px-2.5',
                    'text-body-sm font-medium text-primary',
                  )}
                  aria-label={`${count} filtro${count === 1 ? '' : 's'} ativo${count === 1 ? '' : 's'}`}
                >
                  {count} ativo{count === 1 ? '' : 's'}
                </span>
              )}
            </div>

            {showClearButton && onClear && (
              <button
                type="button"
                onClick={onClear}
                disabled={!hasActiveFilters}
                className={cn(
                  'inline-flex min-h-9 items-center justify-center gap-2',
                  'rounded-sm px-3 text-body-sm font-medium',
                  'text-text-secondary transition-colors',
                  'hover:bg-background hover:text-text-primary',
                  'focus-visible:outline-2',
                  'focus-visible:outline-offset-2',
                  'focus-visible:outline-primary',
                  'disabled:cursor-not-allowed',
                  'disabled:opacity-50',
                  'motion-reduce:transition-none',
                )}
              >
                <RotateCcw
                  size={16}
                  aria-hidden="true"
                />
                {clearLabel}
              </button>
            )}
          </div>
        )}

        {children}
      </div>
    </FilterBarContext.Provider>
  );
});

export interface FilterBarContentProps
  extends HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4;
  children: ReactNode;
}

const columnClasses: Record<
  NonNullable<FilterBarContentProps['columns']>,
  string
> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 xl:grid-cols-3',
  4: 'md:grid-cols-2 xl:grid-cols-4',
};

export const FilterBarContent = forwardRef<
  HTMLDivElement,
  FilterBarContentProps
>(function FilterBarContent(
  {
    columns = 3,
    children,
    className,
    ...props
  },
  ref,
) {
  useFilterBarContext();

  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        'grid w-full grid-cols-1 items-end gap-3',
        columnClasses[columns],
        className,
      )}
    >
      {children}
    </div>
  );
});

export interface FilterBarActionsProps
  extends HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'center' | 'end';
  children: ReactNode;
}

const alignmentClasses: Record<
  NonNullable<FilterBarActionsProps['align']>,
  string
> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
};

export const FilterBarActions = forwardRef<
  HTMLDivElement,
  FilterBarActionsProps
>(function FilterBarActions(
  {
    align = 'end',
    children,
    className,
    ...props
  },
  ref,
) {
  useFilterBarContext();

  return (
    <div
      {...props}
      className={cn(
        'flex flex-wrap items-center gap-2',
        'border-t border-border pt-4',
        alignmentClasses[align],
        className,
      )}
      ref={ref}
    >
      {children}
    </div>
  );
});
