
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { cn } from '@/utilities/cn';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type AvatarRadius = 'sm' | 'md' | 'lg' | 'full';

export interface AvatarProps
  extends ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  size?: AvatarSize;
  radius?: AvatarRadius;
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'size-7',
  sm: 'size-9',
  md: 'size-11',
  lg: 'size-14',
  xl: 'size-[4.5rem]',
};

const radiusClasses: Record<AvatarRadius, string> = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

export const Avatar = forwardRef<
  ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(function Avatar(
  {
    size = 'md',
    radius = 'full',
    className,
    children,
    ...props
  },
  ref,
) {
  return (
    <AvatarPrimitive.Root
      {...props}
      ref={ref}
      data-size={size}
      data-radius={radius}
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center',
        'overflow-hidden bg-primary-soft',
        sizeClasses[size],
        radiusClasses[radius],
        className,
      )}
    >
      {children}
    </AvatarPrimitive.Root>
  );
});

/* -------------------------------------------------------------------------- */
/* AvatarImage                                                                */
/* -------------------------------------------------------------------------- */

export type AvatarImageProps = ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Image
>;

export const AvatarImage = forwardRef<
  ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(function AvatarImage({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Image
      {...props}
      ref={ref}
      className={cn(
        'aspect-square size-full object-cover',
        className,
      )}
    />
  );
});

/* -------------------------------------------------------------------------- */
/* AvatarFallback                                                             */
/* -------------------------------------------------------------------------- */

export type AvatarFallbackProps = ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Fallback
>;

export const AvatarFallback = forwardRef<
  ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(function AvatarFallback(
  {
    className,
    children,
    delayMs = 300,
    ...props
  },
  ref,
) {
  return (
    <AvatarPrimitive.Fallback
      {...props}
      ref={ref}
      delayMs={delayMs}
      className={cn(
        'flex size-full items-center justify-center',
        'bg-primary-soft text-primary',
        'font-semibold select-none',
        'text-body-sm',
        className,
      )}
    >
      {children}
    </AvatarPrimitive.Fallback>
  );
});
