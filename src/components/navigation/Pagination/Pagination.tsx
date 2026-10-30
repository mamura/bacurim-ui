
import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import { cn } from '@/utilities/cn';

export type PaginationSize = 'sm' | 'md' | 'lg';
export type PaginationVariant = 'default' | 'outline';

export type PaginationItem = number | 'start-ellipsis' | 'end-ellipsis';

export interface PaginationProps
  extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
  showFirstLast?: boolean;
  showPreviousNext?: boolean;
  size?: PaginationSize;
  variant?: PaginationVariant;
  disabled?: boolean;
}

const sizeClasses: Record<PaginationSize, string> = {
  sm: 'size-8 text-xs',
  md: 'size-9 text-body-sm',
  lg: 'size-11 text-body-md',
};

const buttonBase = cn(
  'inline-flex shrink-0 items-center justify-center',
  'rounded-sm font-medium',
  'transition-colors',
  'motion-reduce:transition-none',
  'focus-visible:outline-2',
  'focus-visible:outline-offset-2',
  'focus-visible:outline-primary',
  'disabled:pointer-events-none',
  'disabled:opacity-40',
);

function range(start: number, end: number): number[] {
  return Array.from(
    { length: Math.max(0, end - start + 1) },
    (_, index) => start + index,
  );
}

export function getPaginationItems({
  page,
  totalPages,
  siblingCount = 1,
  boundaryCount = 1,
}: Pick<
  PaginationProps,
  'page' | 'totalPages' | 'siblingCount' | 'boundaryCount'
>): PaginationItem[] {
  const total = Math.max(0, Math.floor(totalPages));
  const current = Math.min(
    Math.max(1, Math.floor(page)),
    Math.max(1, total),
  );

  const siblings = Math.max(0, Math.floor(siblingCount));
  const boundaries = Math.max(0, Math.floor(boundaryCount));

  if (total === 0) {
    return [];
  }

  const startPages = range(1, Math.min(boundaries, total));

  const endPages = range(
    Math.max(total - boundaries + 1, boundaries + 1),
    total,
  );

  const siblingsStart = Math.max(
    Math.min(
      current - siblings,
      total - boundaries - siblings * 2 - 1,
    ),
    boundaries + 2,
  );

  const siblingsEnd = Math.min(
    Math.max(
      current + siblings,
      boundaries + siblings * 2 + 2,
    ),
    total - boundaries - 1,
  );

  const items: PaginationItem[] = [...startPages];

  if (siblingsStart > boundaries + 2) {
    items.push('start-ellipsis');
  } else if (boundaries + 1 < total - boundaries) {
    items.push(boundaries + 1);
  }

  items.push(...range(siblingsStart, siblingsEnd));

  if (siblingsEnd < total - boundaries - 1) {
    items.push('end-ellipsis');
  } else if (total - boundaries > boundaries) {
    items.push(total - boundaries);
  }

  items.push(...endPages);

  return [...new Set(items)];
}

interface NavigationButtonProps {
  label: string;
  disabled: boolean;
  onClick: () => void;
  size: PaginationSize;
  variant: PaginationVariant;
  children: ReactNode;
}

function NavigationButton({
  label,
  disabled,
  onClick,
  size,
  variant,
  children,
}: NavigationButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        buttonBase,
        sizeClasses[size],
        'text-text-secondary',
        variant === 'outline'
          ? 'border border-border bg-surface hover:bg-background'
          : 'hover:bg-background',
      )}
    >
      {children}
    </button>
  );
}

export const Pagination = forwardRef<
  HTMLElement,
  PaginationProps
>(function Pagination(
  {
    page,
    totalPages,
    onPageChange,
    siblingCount = 1,
    boundaryCount = 1,
    showFirstLast = true,
    showPreviousNext = true,
    size = 'md',
    variant = 'default',
    disabled = false,
    className,
    ...props
  },
  ref,
) {
  const total = Number.isFinite(totalPages)
    ? Math.max(0, Math.floor(totalPages))
    : 0;

  const current = Number.isFinite(page)
    ? Math.min(
        Math.max(1, Math.floor(page)),
        Math.max(1, total),
      )
    : 1;

  const hasPages = total > 0;

  const items = getPaginationItems({
    page: current,
    totalPages: total,
    siblingCount,
    boundaryCount,
  });

  const navigate = (nextPage: number) => {
    if (
      disabled ||
      !hasPages ||
      nextPage < 1 ||
      nextPage > total ||
      nextPage === current
    ) {
      return;
    }

    onPageChange(nextPage);
  };

  const previousDisabled =
    disabled || !hasPages || current <= 1;

  const nextDisabled =
    disabled || !hasPages || current >= total;

  return (
    <nav
      {...props}
      ref={ref}
      aria-label={props['aria-label'] ?? 'Paginação'}
      className={cn(
        'flex flex-wrap items-center justify-center gap-1',
        className,
      )}
    >
      {showFirstLast && (
        <NavigationButton
          label="Primeira página"
          disabled={previousDisabled}
          onClick={() => navigate(1)}
          size={size}
          variant={variant}
        >
          <ChevronsLeft size={16} aria-hidden="true" />
        </NavigationButton>
      )}

      {showPreviousNext && (
        <NavigationButton
          label="Página anterior"
          disabled={previousDisabled}
          onClick={() => navigate(current - 1)}
          size={size}
          variant={variant}
        >
          <ChevronLeft size={16} aria-hidden="true" />
        </NavigationButton>
      )}

      {items.map((item) => {
        if (typeof item !== 'number') {
          return (
            <span
              key={item}
              aria-hidden="true"
              className={cn(
                'inline-flex items-center justify-center',
                'text-text-secondary',
                sizeClasses[size],
              )}
            >
              …
            </span>
          );
        }

        const isCurrent = item === current;

        return (
          <button
            key={item}
            type="button"
            aria-label={`Página ${item}`}
            aria-current={isCurrent ? 'page' : undefined}
            disabled={disabled || isCurrent}
            onClick={() => navigate(item)}
            className={cn(
              buttonBase,
              sizeClasses[size],
              isCurrent
                ? 'bg-primary text-primary-contrast'
                : 'text-text-secondary',
              !isCurrent &&
                variant === 'outline' &&
                'border border-border bg-surface',
              !isCurrent &&
                'hover:bg-background',
              isCurrent && 'disabled:opacity-100',
            )}
          >
            {item}
          </button>
        );
      })}

      {showPreviousNext && (
        <NavigationButton
          label="Próxima página"
          disabled={nextDisabled}
          onClick={() => navigate(current + 1)}
          size={size}
          variant={variant}
        >
          <ChevronRight size={16} aria-hidden="true" />
        </NavigationButton>
      )}

      {showFirstLast && (
        <NavigationButton
          label="Última página"
          disabled={nextDisabled}
          onClick={() => navigate(total)}
          size={size}
          variant={variant}
        >
          <ChevronsRight size={16} aria-hidden="true" />
        </NavigationButton>
      )}
    </nav>
  );
});
