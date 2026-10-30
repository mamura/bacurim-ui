
import {
  forwardRef,
  type HTMLAttributes,
} from 'react';

import { cn } from '@/utilities/cn';

import {
  formatNumber,
  formatCurrency,
  formatPercentage,
  formatDate,
  type NullableNumber,
  type DateValue,
  type NumberFormatOptions,
  type CurrencyFormatOptions,
  type PercentageFormatOptions,
  type DateFormatOptions,
} from '@/utilities/formatters';

type BaseProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  'children'
>;

export type FormattedValueProps =
  | (BaseProps & {
      type: 'number';
      value: NullableNumber;
      options?: NumberFormatOptions;
    })
  | (BaseProps & {
      type: 'currency';
      value: NullableNumber;
      options?: CurrencyFormatOptions;
    })
  | (BaseProps & {
      type: 'percentage';
      value: NullableNumber;
      options?: PercentageFormatOptions;
    })
  | (BaseProps & {
      type: 'date';
      value: DateValue;
      options?: DateFormatOptions;
    });

export const FormattedValue = forwardRef<
  HTMLSpanElement,
  FormattedValueProps
>(function FormattedValue(
  props,
  ref,
) {
  const {
    className,
    ...rest
  } = props;

  let formattedValue: string;

  switch (rest.type) {
    case 'number':
      formattedValue = formatNumber(
        rest.value,
        rest.options,
      );
      break;

    case 'currency':
      formattedValue = formatCurrency(
        rest.value,
        rest.options,
      );
      break;

    case 'percentage':
      formattedValue = formatPercentage(
        rest.value,
        rest.options,
      );
      break;

    case 'date':
      formattedValue = formatDate(
        rest.value,
        rest.options,
      );
      break;
  }

  const {
    type: _type,
    value: _value,
    options: _options,
    ...spanProps
  } = rest;

  void _type;
  void _value;
  void _options;

  return (
    <span
      {...spanProps}
      ref={ref}
      className={cn(
        'tabular-nums',
        className,
      )}
    >
      {formattedValue}
    </span>
  );
});
