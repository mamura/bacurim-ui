
import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
  type LabelHTMLAttributes,
  type ReactNode,
} from 'react';

import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/utilities/cn';

interface FormFieldContextValue {
  controlId: string;
  descriptionId: string;
  errorId: string;
  invalid: boolean;
  required: boolean;
  hasDescription: boolean;
  hasError: boolean;
}

const FormFieldContext =
  createContext<FormFieldContextValue | null>(null);

function useFormFieldContext() {
  const context = useContext(FormFieldContext);

  if (!context) {
    throw new Error(
      'FormField components must be used within FormField.',
    );
  }

  return context;
}

/* -------------------------------------------------------------------------- */
/* FormField                                                                  */
/* -------------------------------------------------------------------------- */

export interface FormFieldProps
  extends HTMLAttributes<HTMLDivElement> {
  invalid?: boolean;
  required?: boolean;
  children: ReactNode;
}

export const FormField = forwardRef<
  HTMLDivElement,
  FormFieldProps
>(function FormField(
  {
    invalid = false,
    required = false,
    className,
    children,
    ...props
  },
  ref,
) {
  const id = useId();

  const controlId = `${id}-control`;
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;

  const contextValue: FormFieldContextValue = {
    controlId,
    descriptionId,
    errorId,
    invalid,
    required,
    hasDescription: true,
    hasError: invalid,
  };

  return (
    <FormFieldContext.Provider value={contextValue}>
      <div
        {...props}
        ref={ref}
        data-invalid={invalid || undefined}
        data-required={required || undefined}
        className={cn(
          'flex w-full flex-col gap-2',
          className,
        )}
      >
        {children}
      </div>
    </FormFieldContext.Provider>
  );
});

/* -------------------------------------------------------------------------- */
/* FormFieldLabel                                                             */
/* -------------------------------------------------------------------------- */

export interface FormFieldLabelProps
  extends LabelHTMLAttributes<HTMLLabelElement> {}

export const FormFieldLabel = forwardRef<
  HTMLLabelElement,
  FormFieldLabelProps
>(function FormFieldLabel(
  {
    className,
    children,
    htmlFor,
    ...props
  },
  ref,
) {
  const { controlId, required } = useFormFieldContext();

  return (
    <label
      {...props}
      ref={ref}
      htmlFor={htmlFor ?? controlId}
      className={cn(
        'inline-flex items-center gap-1.5',
        'body-sm font-medium text-text-primary',
        'cursor-pointer',
        className,
      )}
    >
      {children}

      {required && (
        <span
          aria-hidden="true"
          className="text-error"
        >
          *
        </span>
      )}
    </label>
  );
});

/* -------------------------------------------------------------------------- */
/* FormFieldControl                                                           */
/* -------------------------------------------------------------------------- */

export interface FormFieldControlProps
  extends ComponentPropsWithoutRef<typeof Slot> {}

export const FormFieldControl = forwardRef<
  ElementRef<typeof Slot>,
  FormFieldControlProps
>(function FormFieldControl(
  {
    children,
    ...props
  },
  ref,
) {
  const {
    controlId,
    descriptionId,
    errorId,
    invalid,
    required,
    hasDescription,
    hasError,
  } = useFormFieldContext();

  const describedBy = [
    hasDescription ? descriptionId : null,
    hasError ? errorId : null,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Slot
      {...props}
      ref={ref}
      id={controlId}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy || undefined}
      aria-required={required || undefined}
      required={required}
    >
      {children}
    </Slot>
  );
});

/* -------------------------------------------------------------------------- */
/* FormFieldDescription                                                       */
/* -------------------------------------------------------------------------- */

export interface FormFieldDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {}

export const FormFieldDescription = forwardRef<
  HTMLParagraphElement,
  FormFieldDescriptionProps
>(function FormFieldDescription(
  {
    className,
    children,
    ...props
  },
  ref,
) {
  const { descriptionId } = useFormFieldContext();

  return (
    <p
      {...props}
      ref={ref}
      id={descriptionId}
      className={cn(
        'body-sm text-text-secondary',
        className,
      )}
    >
      {children}
    </p>
  );
});

/* -------------------------------------------------------------------------- */
/* FormFieldError                                                             */
/* -------------------------------------------------------------------------- */

export interface FormFieldErrorProps
  extends HTMLAttributes<HTMLParagraphElement> {}

export const FormFieldError = forwardRef<
  HTMLParagraphElement,
  FormFieldErrorProps
>(function FormFieldError(
  {
    className,
    children,
    ...props
  },
  ref,
) {
  const { errorId, invalid } = useFormFieldContext();

  if (!invalid || !children) {
    return null;
  }

  return (
    <p
      {...props}
      ref={ref}
      id={errorId}
      className={cn(
        'body-sm text-error',
        className,
      )}
    >
      {children}
    </p>
  );
});
