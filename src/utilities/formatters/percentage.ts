
import type { NullableNumber } from './number';

export interface PercentageFormatOptions
  extends Omit<Intl.NumberFormatOptions, 'style'> {
  locale?: string;
  fallback?: string;
}

export function formatPercentage(
  value: NullableNumber,
  {
    locale = 'pt-BR',
    fallback = '—',
    ...options
  }: PercentageFormatOptions = {},
): string {
  if (value == null || !Number.isFinite(value)) {
    return fallback;
  }

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
    style: 'percent',
  }).format(value);
}
