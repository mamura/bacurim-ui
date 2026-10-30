
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  type ChangeEvent,
} from 'react';

import { Search, X } from 'lucide-react';

import { cn } from '@/utilities/cn';

import {
  Input,
  type InputProps,
} from '../Input';

export interface SearchInputProps
  extends Omit<
    InputProps,
    'type' | 'startIcon' | 'endIcon' | 'endAdornment'
  > {
  clearable?: boolean;
  onClear?: () => void;
  clearLabel?: string;
}

export const SearchInput = forwardRef<
  HTMLInputElement,
  SearchInputProps
>(function SearchInput(
  {
    value,
    defaultValue,
    onChange,
    onClear,
    clearable = true,
    clearLabel = 'Limpar busca',
    disabled = false,
    readOnly = false,
    placeholder = 'Pesquisar...',
    size = 'md',
    className,
    ...props
  },
  forwardedRef,
) {
  const internalRef = useRef<HTMLInputElement>(null);

  const [internalValue, setInternalValue] = useState(
    String(defaultValue ?? ''),
  );

  const isControlled = value !== undefined;

  const currentValue = isControlled
    ? String(value ?? '')
    : internalValue;

  const canClear =
    clearable &&
    !disabled &&
    !readOnly &&
    currentValue.length > 0;

  useImperativeHandle(
    forwardedRef,
    () => internalRef.current!,
  );

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    if (!isControlled) {
      setInternalValue(event.target.value);
    }

    onChange?.(event);
  };

  const handleClear = () => {
    if (disabled || readOnly) {
      return;
    }

    if (!isControlled) {
      setInternalValue('');
    }

    onClear?.();

    internalRef.current?.focus();
  };

  return (
    <Input
      {...props}
      ref={internalRef}
      type="text"
      inputMode="search"
      value={currentValue}
      onChange={handleChange}
      disabled={disabled}
      readOnly={readOnly}
      placeholder={placeholder}
      size={size}
      className={className}
      startIcon={
        <Search aria-hidden="true" />
      }
      endAdornment={
        canClear ? (
          <button
            type="button"
            aria-label={clearLabel}
            onClick={handleClear}
            className={cn(
              'inline-flex size-7 shrink-0',
              'items-center justify-center',
              'rounded-sm text-text-secondary',
              'transition-colors',
              'hover:bg-background',
              'hover:text-text-primary',
              'focus-visible:outline-2',
              'focus-visible:outline-offset-2',
              'focus-visible:outline-primary',
              'motion-reduce:transition-none',
            )}
          >
            <X
              size={16}
              aria-hidden="true"
            />
          </button>
        ) : undefined
      }
    />
  );
});
