
import {
  forwardRef,
  useEffect,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
} from 'react';

import * as PopoverPrimitive from '@radix-ui/react-popover';

import { DayPicker } from 'react-day-picker';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/utilities/cn';

export type DateInputSize = 'sm' | 'md' | 'lg';

export type DateInputFormat =
  | 'dd/MM/yyyy'
  | 'MM/dd/yyyy'
  | 'yyyy-MM-dd';

export interface DateInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'size' | 'value' | 'defaultValue' | 'onChange'
  > {
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  format?: DateInputFormat;
  minDate?: string;
  maxDate?: string;
  invalid?: boolean;
  size?: DateInputSize;
}

const sizeClasses: Record<DateInputSize, string> = {
  sm: 'h-9 px-3 text-body-sm',
  md: 'h-11 px-4 text-body-md',
  lg: 'h-13 px-4 text-body-lg',
};

function parseISO(value: string | null | undefined): Date | undefined {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return undefined;
  }

  const [year, month, day] = value.split('-').map(Number);

  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return undefined;
  }

  return date;
}

function toISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function formatDate(
  value: string | null | undefined,
  format: DateInputFormat,
): string {
  const date = parseISO(value);

  if (!date) {
    return '';
  }

  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  switch (format) {
    case 'MM/dd/yyyy':
      return `${month}/${day}/${year}`;

    case 'yyyy-MM-dd':
      return `${year}-${month}-${day}`;

    default:
      return `${day}/${month}/${year}`;
  }
}

function parseDate(
  value: string,
  format: DateInputFormat,
): string | null {
  const parts = value.split(/[/-]/);

  if (parts.length !== 3) {
    return null;
  }

  let year: number;
  let month: number;
  let day: number;

  if (format === 'dd/MM/yyyy') {
    [day, month, year] = parts.map(Number);
  } else if (format === 'MM/dd/yyyy') {
    [month, day, year] = parts.map(Number);
  } else {
    [year, month, day] = parts.map(Number);
  }

  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day) ||
    year < 100 ||
    year > 9999
  ) {
    return null;
  }

  const iso = [
    String(year).padStart(4, '0'),
    String(month).padStart(2, '0'),
    String(day).padStart(2, '0'),
  ].join('-');

  return parseISO(iso) ? iso : null;
}

function isWithinRange(
  value: string,
  minDate?: string,
  maxDate?: string,
): boolean {
  if (minDate && value < minDate) {
    return false;
  }

  if (maxDate && value > maxDate) {
    return false;
  }

  return true;
}

export const DateInput = forwardRef<
  HTMLInputElement,
  DateInputProps
>(function DateInput(
  {
    value,
    defaultValue = null,
    onValueChange,
    format = 'dd/MM/yyyy',
    minDate,
    maxDate,
    invalid = false,
    size = 'md',
    disabled = false,
    readOnly = false,
    placeholder,
    className,
    id,
    onBlur,
    onKeyDown,
    ...props
  },
  ref,
) {
  const isControlled = value !== undefined;

  const [internalValue, setInternalValue] = useState<string | null>(
    defaultValue,
  );

  const currentValue = isControlled ? value : internalValue;

  const [text, setText] = useState(
    formatDate(currentValue, format),
  );

  const [open, setOpen] = useState(false);
  const [editingInvalid, setEditingInvalid] = useState(false);

  const selectedDate = parseISO(currentValue);
  const min = parseISO(minDate);
  const max = parseISO(maxDate);

  const [month, setMonth] = useState<Date>(
    selectedDate ?? new Date(),
  );

  useEffect(() => {
    setText(formatDate(currentValue, format));
  }, [currentValue, format]);

  useEffect(() => {
    if (selectedDate) {
      setMonth(selectedDate);
    }
  }, [currentValue]);

  function updateValue(nextValue: string | null) {
    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
  }

  function commitText(rawText: string) {
    const trimmed = rawText.trim();

    if (!trimmed) {
      updateValue(null);
      setText('');
      setEditingInvalid(false);
      return;
    }

    const parsed = parseDate(trimmed, format);

    if (!parsed || !isWithinRange(parsed, minDate, maxDate)) {
      setEditingInvalid(true);
      return;
    }

    updateValue(parsed);
    setText(formatDate(parsed, format));
    setEditingInvalid(false);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const nextText = event.target.value;

    setText(nextText);
    setEditingInvalid(false);

    if (!nextText.trim()) {
      updateValue(null);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      commitText(text);
    }

    if (event.key === 'ArrowDown' && !readOnly && !disabled) {
      event.preventDefault();
      setOpen(true);
    }

    onKeyDown?.(event);
  }

  function handleSelect(date: Date | undefined) {
    if (!date) {
      return;
    }

    const nextValue = toISO(date);

    if (!isWithinRange(nextValue, minDate, maxDate)) {
      return;
    }

    updateValue(nextValue);
    setText(formatDate(nextValue, format));
    setEditingInvalid(false);
    setOpen(false);
  }

  const isInvalid = invalid || editingInvalid;

  return (
    <PopoverPrimitive.Root
      open={open}
      onOpenChange={(nextOpen) => {
        if (!disabled && !readOnly) {
          setOpen(nextOpen);
        }
      }}
    >
      <div
        className={cn(
          'flex w-full min-w-0 items-center',
          'rounded-sm border border-border bg-surface',
          'transition-colors duration-150',
          'hover:border-text-secondary',
          'focus-within:border-primary',
          'data-[invalid=true]:border-error',
          'data-[invalid=true]:focus-within:border-error',
          'data-[disabled=true]:cursor-not-allowed',
          'data-[disabled=true]:opacity-50',
          className,
        )}
        data-invalid={isInvalid || undefined}
        data-disabled={disabled || undefined}
      >
        <input
          {...props}
          ref={ref}
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={text}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={
            placeholder ??
            (format === 'yyyy-MM-dd' ? 'yyyy-mm-dd' : format)
          }
          aria-invalid={isInvalid || undefined}
          onChange={handleChange}
          onBlur={(event) => {
            commitText(text);
            onBlur?.(event);
          }}
          onKeyDown={handleKeyDown}
          className={cn(
            'min-w-0 flex-1 bg-transparent',
            'text-text-primary placeholder:text-text-secondary',
            'font-body tabular-nums',
            'outline-none',
            sizeClasses[size],
          )}
        />

        <PopoverPrimitive.Trigger asChild>
          <button
            type="button"
            disabled={disabled || readOnly}
            aria-label="Abrir calendário"
            className={cn(
              'flex shrink-0 items-center justify-center',
              'text-text-secondary hover:text-primary',
              'disabled:cursor-not-allowed',
              'disabled:opacity-50',
              'focus-visible:outline-none',
              size === 'sm' ? 'h-9 w-9' : '',
              size === 'md' ? 'h-11 w-11' : '',
              size === 'lg' ? 'h-13 w-13' : '',
            )}
          >
            <CalendarDays
              aria-hidden="true"
              className="size-4"
            />
          </button>
        </PopoverPrimitive.Trigger>
      </div>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side="bottom"
          align="start"
          sideOffset={6}
          className={cn(
            'z-50 rounded-md border border-border',
            'bg-surface p-4 shadow-lg',
            'outline-none',
          )}
        >
          <DayPicker
            mode="single"
            locale={undefined}
            selected={selectedDate}
            onSelect={handleSelect}
            month={month}
            onMonthChange={setMonth}
            disabled={[
              ...(min ? [{ before: min }] : []),
              ...(max ? [{ after: max }] : []),
            ]}
            startMonth={min}
            endMonth={max}
            showOutsideDays
            components={{
              Chevron: ({ orientation }) =>
                orientation === 'left' ? (
                  <ChevronLeft className="size-4" />
                ) : (
                  <ChevronRight className="size-4" />
                ),
            }}
            classNames={{
              root: 'font-body text-text-primary',
              months: 'flex flex-col',
              month: 'space-y-3',
              month_caption:
                'flex items-center justify-center h-9',
              caption_label:
                'body-sm font-semibold text-text-primary',
              nav: 'flex items-center gap-1',
              button_previous:
                'absolute left-4 top-4 flex size-8 items-center justify-center rounded-sm hover:bg-background',
              button_next:
                'absolute right-4 top-4 flex size-8 items-center justify-center rounded-sm hover:bg-background',
              month_grid: 'w-full border-collapse',
              weekdays: 'flex',
              weekday:
                'flex size-9 items-center justify-center body-sm text-text-secondary',
              week: 'flex',
              day: 'size-9 text-center',
              day_button:
                'flex size-9 items-center justify-center rounded-sm body-sm hover:bg-background',
              selected:
                '[&>button]:bg-primary [&>button]:text-primary-contrast [&>button]:hover:bg-primary-hover',
              today:
                '[&>button]:font-semibold',
              outside:
                'text-text-secondary opacity-40',
              disabled:
                'opacity-30 pointer-events-none',
              hidden: 'invisible',
            }}
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
});
