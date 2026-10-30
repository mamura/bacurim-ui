
import type { NullableNumber } from './number';

export interface CurrencyFormatOptions
  extends Omit<Intl.NumberFormatOptions, 'style' | 'currency'> {
  locale?: string;
  currency?: string;
  fallback?: string;
}

export function formatCurrency(
  value: NullableNumber,
  {
    locale = 'pt-BR',
    currency = 'BRL',
    fallback = '—',
    ...options
  }: CurrencyFormatOptions = {},
): string {
  if (value == null || !Number.isFinite(value)) {
    return fallback;
  }

  return new Intl.NumberFormat(locale, {
    ...options,
    style: 'currency',
    currency,
  }).format(value);
}
