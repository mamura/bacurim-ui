
export type DateValue =
  | Date
  | string
  | number
  | null
  | undefined;

export interface DateFormatOptions
  extends Intl.DateTimeFormatOptions {
  locale?: string;
  fallback?: string;
}

const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

function parseDate(
  value: Exclude<DateValue, null | undefined>,
): {
  date: Date;
  dateOnly: boolean;
} | null {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) {
      return null;
    }

    return {
      date: value,
      dateOnly: false,
    };
  }

  if (typeof value === 'number') {
    if (!Number.isFinite(value)) {
      return null;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return {
      date,
      dateOnly: false,
    };
  }

  const match = DATE_ONLY_PATTERN.exec(value);

  if (match) {
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);

    const date = new Date(0);

    date.setUTCFullYear(year, month - 1, day);
    date.setUTCHours(0, 0, 0, 0);

    if (
      date.getUTCFullYear() !== year ||
      date.getUTCMonth() !== month - 1 ||
      date.getUTCDate() !== day
    ) {
      return null;
    }

    return {
      date,
      dateOnly: true,
    };
  }

  const timestamp = Date.parse(value);

  if (Number.isNaN(timestamp)) {
    return null;
  }

  return {
    date: new Date(timestamp),
    dateOnly: false,
  };
}

export function formatDate(
  value: DateValue,
  {
    locale = 'pt-BR',
    fallback = '—',
    ...options
  }: DateFormatOptions = {},
): string {
  if (value == null || value === '') {
    return fallback;
  }

  const parsed = parseDate(value);

  if (!parsed) {
    return fallback;
  }

  const {
    timeZone,
    ...formatOptions
  } = options;

  const hasDateTimeStyle =
    formatOptions.dateStyle !== undefined ||
    formatOptions.timeStyle !== undefined;

  const defaultOptions: Intl.DateTimeFormatOptions =
    hasDateTimeStyle
      ? {}
      : {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        };

  const formatterOptions: Intl.DateTimeFormatOptions = {
    ...defaultOptions,
    ...formatOptions,
    timeZone: parsed.dateOnly
      ? 'UTC'
      : timeZone,
  };

  return new Intl.DateTimeFormat(
    locale,
    formatterOptions,
  ).format(parsed.date);
}
