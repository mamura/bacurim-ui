
import {
  forwardRef,
  useId,
  type CSSProperties,
  type HTMLAttributes,
} from 'react';

import { cn } from '@/utilities/cn';

import './progress.css';

export type ProgressColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export type ProgressSize = 'sm' | 'md' | 'lg';

export type ProgressRadius = 'none' | 'sm' | 'md' | 'full';

export type ProgressLabelPosition =
  | 'top'
  | 'end'
  | 'inside'
  | 'floating';

export type ProgressValueFormat = 'percentage' | 'value';

export interface ProgressProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
  value?: number;
  min?: number;
  max?: number;
  indeterminate?: boolean;
  color?: ProgressColor;
  size?: ProgressSize;
  radius?: ProgressRadius;
  label?: string;
  showValue?: boolean;
  labelPosition?: ProgressLabelPosition;
  valueFormat?: ProgressValueFormat;
}

const colorClasses: Record<ProgressColor, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  info: 'bg-info',
};

const sizeClasses: Record<ProgressSize, string> = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-5',
};

const radiusClasses: Record<ProgressRadius, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  full: 'rounded-full',
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const formatNumber = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 1,
  }).format(value);

export const Progress = forwardRef<
  HTMLDivElement,
  ProgressProps
>(function Progress(
  {
    value = 0,
    min = 0,
    max = 100,
    indeterminate = false,
    color = 'primary',
    size = 'md',
    radius = 'full',
    label,
    showValue = false,
    labelPosition = 'end',
    valueFormat = 'percentage',
    className,
    ...props
  },
  ref,
) {
  const generatedId = useId();

  // Garante um intervalo válido mesmo com valores incorretos.
  const safeMin = Number.isFinite(min) ? min : 0;
  const safeMax =
    Number.isFinite(max) && max > safeMin
      ? max
      : safeMin + 100;

  const safeValue = clamp(
    Number.isFinite(value) ? value : safeMin,
    safeMin,
    safeMax,
  );

  const percentage =
    ((safeValue - safeMin) / (safeMax - safeMin)) * 100;

  const formattedValue =
    valueFormat === 'value'
      ? formatNumber(safeValue)
      : `${formatNumber(percentage)}%`;

  const hasTopLabel =
    Boolean(label) ||
    (showValue && labelPosition === 'top');

  const valueId = `${generatedId}-value`;
  const labelId = `${generatedId}-label`;

  const progressStyle = {
    '--progress-value': `${percentage}%`,
  } as CSSProperties;

  const valueElement = (
    <span
      id={valueId}
      className="shrink-0 text-body-sm tabular-nums text-text-secondary"
    >
      {formattedValue}
    </span>
  );

  return (
    <div
      ref={ref}
      className={cn('flex w-full flex-col gap-2', className)}
      {...props}
    >
      {hasTopLabel && (
        <div className="flex items-center justify-between gap-3">
          {label ? (
            <span
              id={labelId}
              className="text-body-sm font-medium text-text-primary"
            >
              {label}
            </span>
          ) : (
            <span />
          )}

          {showValue &&
            labelPosition === 'top' &&
            !indeterminate &&
            valueElement}
        </div>
      )}

      <div className="flex w-full items-center gap-3">
        <div
          className={cn(
            'relative min-w-0 flex-1',
            labelPosition === 'floating' &&
              showValue &&
              !indeterminate &&
              'pt-7',
          )}
        >
          {showValue &&
            labelPosition === 'floating' &&
            !indeterminate && (
              <div
                className="bacurim-progress-floating-label"
                style={progressStyle}
              >
                <span className="bacurim-progress-floating-value">
                  {formattedValue}
                </span>
              </div>
            )}

          <div
            role="progressbar"
            aria-label={label || 'Progresso'}
            aria-valuemin={indeterminate ? undefined : safeMin}
            aria-valuemax={indeterminate ? undefined : safeMax}
            aria-valuenow={
              indeterminate ? undefined : safeValue
            }
            aria-valuetext={
              indeterminate
                ? undefined
                : valueFormat === 'percentage'
                  ? formattedValue
                  : undefined
            }
            aria-busy={indeterminate || undefined}
            className={cn(
              'relative w-full overflow-hidden bg-border',
              sizeClasses[size],
              radiusClasses[radius],
            )}
          >
            <div
              className={cn(
                'relative h-full',
                'transition-[width] duration-300 ease-out',
                'motion-reduce:transition-none',
                colorClasses[color],
                radiusClasses[radius],
                indeterminate
                  ? 'bacurim-progress-indeterminate'
                  : 'bacurim-progress-determinate',
              )}
              style={
                indeterminate
                  ? undefined
                  : { width: `${percentage}%` }
              }
            >
              {showValue &&
                labelPosition === 'inside' &&
                !indeterminate &&
                percentage > 0 && (
                  <span
                    className={cn(
                      'absolute inset-0 flex items-center',
                      'justify-center whitespace-nowrap',
                      'text-xs font-medium',
                      'text-white tabular-nums',
                      percentage < 15 && 'sr-only',
                    )}
                  >
                    {formattedValue}
                  </span>
                )}
            </div>
          </div>
        </div>

        {showValue &&
          labelPosition === 'end' &&
          !indeterminate &&
          valueElement}
      </div>
    </div>
  );
});
