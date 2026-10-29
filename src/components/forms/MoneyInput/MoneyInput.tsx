
import {
  forwardRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
} from 'react';

import { cn } from '@/utilities/cn';

export type MoneyInputSize = 'sm' | 'md' | 'lg';

export interface MoneyInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'size' | 'value' | 'defaultValue' | 'onChange'
  > {
  value?: number | null;
  defaultValue?: number | null;
  onValueChange?: (value: number | null) => void;
  currency?: string;
  locale?: string;
  allowNegative?: boolean;
  invalid?: boolean;
  size?: MoneyInputSize;
}

const sizeClasses: Record<MoneyInputSize, string> = {
  sm: 'h-9 px-3 text-body-sm',
  md: 'h-11 px-4 text-body-md',
  lg: 'h-13 px-4 text-body-lg',
};

function getCurrencyDigits(
  locale: string,
  currency: string,
): number {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).resolvedOptions().maximumFractionDigits;
}

function toMinorUnits(
  value: number,
  digits: number,
): number {
  const factor = 10 ** digits;

  return Math.round(value * factor);
}

function fromMinorUnits(
  value: number,
  digits: number,
): number {
  return value / 10 ** digits;
}

function formatMoney(
  value: number | null,
  locale: string,
  currency: string,
): string {
  if (value === null) {
    return '';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
}

function parseDigits(
  value: string,
): string {
  return value.replace(/\D/g, '');
}

export const MoneyInput = forwardRef<
  HTMLInputElement,
  MoneyInputProps
>(function MoneyInput(
  {
    value,
    defaultValue = null,
    onValueChange,
    currency = 'BRL',
    locale = 'pt-BR',
    allowNegative = false,
    invalid = false,
    size = 'md',
    disabled,
    readOnly,
    className,
    onKeyDown,
    onChange,
    onFocus,
    onBlur,
    ...props
  },
  ref,
) {
  const isControlled = value !== undefined;

  const [internalValue, setInternalValue] = useState<
    number | null
  >(defaultValue);

  const currentValue = isControlled
    ? value
    : internalValue;

  const digits = getCurrencyDigits(locale, currency);

  const formattedValue = formatMoney(
    currentValue ?? null,
    locale,
    currency,
  );

  function updateValue(nextValue: number | null) {
    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    if (disabled || readOnly) {
      return;
    }

    const rawValue = event.target.value;
    const numericDigits = parseDigits(rawValue);

    if (!numericDigits) {
      updateValue(null);
      onChange?.(event);
      return;
    }

    const minorUnits = Number(numericDigits);

    if (!Number.isSafeInteger(minorUnits)) {
      return;
    }

    const nextValue = fromMinorUnits(
      minorUnits,
      digits,
    );

    const isNegative =
      allowNegative &&
      (rawValue.includes('-') ||
        (currentValue !== null &&
          currentValue !== undefined &&
          currentValue < 0));

    updateValue(
      isNegative ? -nextValue : nextValue,
    );

    onChange?.(event);
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (disabled || readOnly) {
      onKeyDown?.(event);
      return;
    }

    if (
      allowNegative &&
      event.key === '-'
    ) {
      event.preventDefault();

      const nextValue =
        currentValue === null
          ? 0
          : -currentValue;

      updateValue(nextValue);
    }

    onKeyDown?.(event);
  }

  function handleFocus(
    event: FocusEvent<HTMLInputElement>,
  ) {
    onFocus?.(event);
  }

  function handleBlur(
    event: FocusEvent<HTMLInputElement>,
  ) {
    onBlur?.(event);
  }

  return (
    <input
      {...props}
      ref={ref}
      type="text"
      inputMode="numeric"
      autoComplete="off"
      disabled={disabled}
      readOnly={readOnly}
      value={formattedValue}
      aria-invalid={invalid || undefined}
      data-invalid={invalid || undefined}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={cn(
        // Layout
        'w-full min-w-0',

        // Aparência
        'rounded-sm border border-border',
        'bg-surface text-text-primary',
        'font-body tabular-nums',
        'transition-colors duration-150',

        // Placeholder
        'placeholder:text-text-secondary',

        // Hover
        'hover:border-text-secondary',

        // Focus
        'focus:border-primary',
        'focus:outline-none',

        // Invalid
        'data-[invalid=true]:border-error',
        'data-[invalid=true]:focus:border-error',

        // Disabled
        'disabled:cursor-not-allowed',
        'disabled:opacity-50',

        // Readonly
        'read-only:cursor-default',

        // Tamanho
        sizeClasses[size],

        // Personalização
        className,
      )}
    />
  );
});
