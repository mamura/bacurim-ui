
import {
  forwardRef,
  type HTMLAttributes,
  type ImgHTMLAttributes,
} from 'react';

import { cn } from '@/utilities/cn';

export type CardVariant = 'outlined' | 'elevated' | 'filled';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;
export type CardTitleProps = HTMLAttributes<HTMLHeadingElement>;
export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
export type CardContentProps = HTMLAttributes<HTMLDivElement>;
export type CardFooterProps = HTMLAttributes<HTMLDivElement>;

export interface CardMediaProps
  extends ImgHTMLAttributes<HTMLImageElement> {}


const variantClasses: Record<CardVariant, string> = {
  outlined: 'border border-border',
  elevated: 'border border-border shadow-md',
  filled: 'bg-background',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  function Card(
    { variant = 'outlined', className, children, ...props },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col overflow-hidden rounded-md bg-surface text-text-primary',
          variantClasses[variant],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

export const CardHeader = forwardRef<
  HTMLDivElement,
  CardHeaderProps
>(function CardHeader({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col gap-1 p-6', className)}
      {...props}
    >
      {children}
    </div>
  );
});

export const CardTitle = forwardRef<
  HTMLHeadingElement,
  CardTitleProps
>(function CardTitle({ className, children, ...props }, ref) {
  return (
    <h3
      ref={ref}
      className={cn('heading-sm text-text-primary', className)}
      {...props}
    >
      {children}
    </h3>
  );
});

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(function CardDescription(
  { className, children, ...props },
  ref,
) {
  return (
    <p
      ref={ref}
      className={cn('body-sm text-text-secondary', className)}
      {...props}
    >
      {children}
    </p>
  );
});

export const CardContent = forwardRef<
  HTMLDivElement,
  CardContentProps
>(function CardContent({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn('p-6', className)}
      {...props}
    >
      {children}
    </div>
  );
});

export const CardFooter = forwardRef<
  HTMLDivElement,
  CardFooterProps
>(function CardFooter({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn('flex items-center gap-3 p-6', className)}
      {...props}
    >
      {children}
    </div>
  );
});

export const CardMedia = forwardRef<
  HTMLImageElement,
  CardMediaProps
>(function CardMedia({ className, alt, ...props }, ref) {
  return (
    <img
      ref={ref}
      alt={alt ?? ''}
      className={cn('block w-full object-cover', className)}
      {...props}
    />
  );
});
