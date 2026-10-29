
import {
  createContext,
  forwardRef,
  useContext,
  type HTMLAttributes,
  type TableHTMLAttributes,
  type ThHTMLAttributes,
  type TdHTMLAttributes,
} from 'react';

import { cn } from '@/utilities/cn';

export type TableDensity = 'compact' | 'default' | 'comfortable';
export type TableVariant = 'default' | 'bordered';

export type TableColor =
  | 'neutral'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export type TableAlign = 'left' | 'center' | 'right';

export interface TableProps
  extends TableHTMLAttributes<HTMLTableElement> {
  density?: TableDensity;
  variant?: TableVariant;
  striped?: boolean;
  stripeColor?: TableColor;
  hoverable?: boolean;
  hoverColor?: TableColor;
}

export type TableHeaderProps =
  HTMLAttributes<HTMLTableSectionElement>;

export type TableBodyProps =
  HTMLAttributes<HTMLTableSectionElement>;

export type TableFooterProps =
  HTMLAttributes<HTMLTableSectionElement>;

export interface TableRowProps
  extends HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
  highlight?: TableColor;
  interactive?: boolean;
}

export interface TableHeadProps
  extends ThHTMLAttributes<HTMLTableCellElement> {
  align?: TableAlign;
  highlight?: TableColor;
}

export interface TableCellProps
  extends TdHTMLAttributes<HTMLTableCellElement> {
  align?: TableAlign;
  highlight?: TableColor;
}

export type TableCaptionProps =
  HTMLAttributes<HTMLTableCaptionElement>;

interface TableContextValue {
  density: TableDensity;
  variant: TableVariant;
  striped: boolean;
  stripeColor: TableColor;
  hoverable: boolean;
  hoverColor: TableColor;
}

const TableContext = createContext<TableContextValue>({
  density: 'default',
  variant: 'default',
  striped: false,
  stripeColor: 'neutral',
  hoverable: false,
  hoverColor: 'neutral',
});

const densityClasses: Record<TableDensity, string> = {
  compact: 'px-3 py-2',
  default: 'px-4 py-3',
  comfortable: 'px-5 py-4',
};

const alignClasses: Record<TableAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const highlightClasses: Record<TableColor, string> = {
  neutral: 'bg-background',
  success: 'bg-success-soft',
  warning: 'bg-warning-soft',
  error: 'bg-error-soft',
  info: 'bg-info-soft',
};

const hoverClasses: Record<TableColor, string> = {
  neutral: 'hover:bg-background',
  success: 'hover:bg-success-soft',
  warning: 'hover:bg-warning-soft',
  error: 'hover:bg-error-soft',
  info: 'hover:bg-info-soft',
};

const stripeClasses: Record<TableColor, string> = {
  neutral: 'even:bg-background',
  success: 'even:bg-success-soft',
  warning: 'even:bg-warning-soft',
  error: 'even:bg-error-soft',
  info: 'even:bg-info-soft',
};

export const Table = forwardRef<
  HTMLTableElement,
  TableProps
>(function Table(
  {
    density = 'default',
    variant = 'default',
    striped = false,
    stripeColor = 'neutral',
    hoverable = false,
    hoverColor = 'neutral',
    className,
    children,
    ...props
  },
  ref,
) {
  return (
    <TableContext.Provider
      value={{
        density,
        variant,
        striped,
        stripeColor,
        hoverable,
        hoverColor,
      }}
    >
      <table
        {...props}
        ref={ref}
        className={cn(
          'w-full caption-bottom border-collapse',
          'text-body-sm text-text-primary',
          variant === 'bordered' &&
            'border border-border',
          className,
        )}
      >
        {children}
      </table>
    </TableContext.Provider>
  );
});

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(function TableHeader(
  { className, ...props },
  ref,
) {
  return (
    <thead
      {...props}
      ref={ref}
      className={cn(
        'bg-surface',
        '[&_tr]:border-b [&_tr]:border-border',
        className,
      )}
    />
  );
});

export const TableBody = forwardRef<
  HTMLTableSectionElement,
  TableBodyProps
>(function TableBody(
  { className, ...props },
  ref,
) {
  return (
    <tbody
      {...props}
      ref={ref}
      className={cn(
        '[&_tr:last-child]:border-b-0',
        className,
      )}
    />
  );
});

export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  TableFooterProps
>(function TableFooter(
  { className, ...props },
  ref,
) {
  return (
    <tfoot
      {...props}
      ref={ref}
      className={cn(
        'border-t border-border bg-background',
        'font-medium',
        className,
      )}
    />
  );
});

export const TableRow = forwardRef<
  HTMLTableRowElement,
  TableRowProps
>(function TableRow(
  {
    selected = false,
    highlight,
    interactive = false,
    className,
    onClick,
    onKeyDown,
    tabIndex,
    ...props
  },
  ref,
) {
  const {
    striped,
    stripeColor,
    hoverable,
    hoverColor,
    variant,
  } = useContext(TableContext);

  const isInteractive = interactive || Boolean(onClick);

  const handleKeyDown: TableRowProps['onKeyDown'] = (event) => {
    onKeyDown?.(event);

    if (
      event.defaultPrevented ||
      !isInteractive ||
      !onClick
    ) {
      return;
    }

    if (
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault();
      event.currentTarget.click();
    }
  };

  return (
    <tr
      {...props}
      ref={ref}
      aria-selected={selected || undefined}
      tabIndex={
        isInteractive
          ? (tabIndex ?? 0)
          : tabIndex
      }
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'border-b border-border',
        'transition-colors',
        'motion-reduce:transition-none',
        variant === 'bordered' &&
          '[&>td]:border [&>td]:border-border',
        striped && stripeClasses[stripeColor],
        hoverable && hoverClasses[hoverColor],
        highlight && highlightClasses[highlight],
        selected && 'bg-primary-soft',
        isInteractive &&
          'cursor-pointer focus-visible:outline-2',
        isInteractive &&
          'focus-visible:outline-offset-[-2px]',
        isInteractive &&
          'focus-visible:outline-primary',
        className,
      )}
    />
  );
});

export const TableHead = forwardRef<
  HTMLTableCellElement,
  TableHeadProps
>(function TableHead(
  {
    align = 'left',
    highlight,
    className,
    scope = 'col',
    ...props
  },
  ref,
) {
  const { density, variant } = useContext(TableContext);

  return (
    <th
      {...props}
      ref={ref}
      scope={scope}
      className={cn(
        'font-medium text-text-secondary',
        'align-middle',
        densityClasses[density],
        alignClasses[align],
        variant === 'bordered' &&
          'border border-border',
        highlight && highlightClasses[highlight],
        className,
      )}
    />
  );
});

export const TableCell = forwardRef<
  HTMLTableCellElement,
  TableCellProps
>(function TableCell(
  {
    align = 'left',
    highlight,
    className,
    ...props
  },
  ref,
) {
  const { density, variant } = useContext(TableContext);

  return (
    <td
      {...props}
      ref={ref}
      className={cn(
        'align-middle',
        densityClasses[density],
        alignClasses[align],
        variant === 'bordered' &&
          'border border-border',
        highlight && highlightClasses[highlight],
        className,
      )}
    />
  );
});

export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(function TableCaption(
  { className, ...props },
  ref,
) {
  return (
    <caption
      {...props}
      ref={ref}
      className={cn(
        'mt-3 text-body-sm text-text-secondary',
        className,
      )}
    />
  );
});
