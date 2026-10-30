
export type NullableNumber = number | null | undefined;

export interface NumberFormatOptions
  extends Intl.NumberFormatOptions {
  locale?: string;
  fallback?: string;
}

export function formatNumber(
  value: NullableNumber,
  {
    locale = 'pt-BR',
    fallback = '—',
    ...options
  }: NumberFormatOptions = {},
): string {
  if (value == null || !Number.isFinite(value)) {
    return fallback;
  }

  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
    ...options,
  }).format(value);
}
