
import {
  forwardRef,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
} from 'lucide-react';

import { cn } from '@/utilities/cn';

import {
  TableHead,
  type TableHeadProps,
} from './Table';

export type TableSortDirection = 'asc' | 'desc' | null;

export interface TableSortHeadProps
  extends Omit<
    TableHeadProps,
    'children' | 'onClick' | 'onKeyDown'
  > {
  children: ReactNode;
  sortDirection?: TableSortDirection;
  onSortChange?: (direction: TableSortDirection) => void;
  allowUnsort?: boolean;
  disabled?: boolean;
}

export function getNextSortDirection(
  current: TableSortDirection,
  allowUnsort = true,
): TableSortDirection {
  if (current === null) {
    return 'asc';
  }

  if (current === 'asc') {
    return 'desc';
  }

  return allowUnsort ? null : 'asc';
}

const sortLabels: Record<
  Exclude<TableSortDirection, null>,
  string
> = {
  asc: 'crescente',
  desc: 'decrescente',
};

export const TableSortHead = forwardRef<
  HTMLTableCellElement,
  TableSortHeadProps
>(function TableSortHead(
  {
    children,
    sortDirection = null,
    onSortChange,
    allowUnsort = true,
    disabled = false,
    align = 'left',
    className,
    ...props
  },
  ref,
) {
  const isSorted = sortDirection !== null;

  const nextDirection = getNextSortDirection(
    sortDirection,
    allowUnsort,
  );

  const SortIcon =
    sortDirection === 'asc'
      ? ArrowUp
      : sortDirection === 'desc'
        ? ArrowDown
        : ArrowUpDown;

  const handleSort = () => {
    if (disabled) {
      return;
    }

    onSortChange?.(nextDirection);
  };

  const nextAction =
    nextDirection === null
      ? 'Remover ordenação'
      : `Ordenar ${sortLabels[nextDirection]}`;

  return (
    <TableHead
      {...props}
      ref={ref}
      align={align}
      aria-sort={
        sortDirection === 'asc'
          ? 'ascending'
          : sortDirection === 'desc'
            ? 'descending'
            : undefined
      }
      className={cn(className)}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={handleSort}
        className={cn(
          'group inline-flex w-full items-center gap-2',
          'rounded-sm text-inherit',
          'transition-colors',
          'motion-reduce:transition-none',
          'focus-visible:outline-2',
          'focus-visible:outline-offset-2',
          'focus-visible:outline-primary',
          'disabled:cursor-not-allowed',
          'disabled:opacity-50',
          align === 'left' && 'justify-start',
          align === 'center' && 'justify-center',
          align === 'right' && 'justify-end',
          !disabled && 'cursor-pointer',
          !disabled && 'hover:text-primary',
        )}
        aria-label={nextAction}
      >
        <span>{children}</span>

        <SortIcon
          size={14}
          aria-hidden="true"
          className={cn(
            'shrink-0 transition-colors',
            'motion-reduce:transition-none',
            isSorted
              ? 'text-primary'
              : 'text-text-secondary',
          )}
        />
      </button>
    </TableHead>
  );
});
