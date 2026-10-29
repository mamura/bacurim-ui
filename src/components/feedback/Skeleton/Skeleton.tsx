
import {
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
} from 'react';

import { cn } from '@/utilities/cn';

import './skeleton.css';

export type SkeletonVariant =
  | 'text'
  | 'rectangle'
  | 'rounded'
  | 'circle';

export type SkeletonAnimation = 'pulse' | 'wave' | 'none';

export interface SkeletonProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  variant?: SkeletonVariant;
  animation?: SkeletonAnimation;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
}

const variantClasses: Record<SkeletonVariant, string> = {
  text: 'rounded-sm',
  rectangle: 'rounded-none',
  rounded: 'rounded-md',
  circle: 'rounded-full',
};

const animationClasses: Record<SkeletonAnimation, string> = {
  pulse: 'animate-pulse motion-reduce:animate-none',
  wave: 'bacurim-skeleton-wave',
  none: '',
};

const defaultHeights: Record<SkeletonVariant, string> = {
  text: '1em',
  rectangle: '1rem',
  rounded: '1rem',
  circle: '2.5rem',
};

export const Skeleton = forwardRef<
  HTMLSpanElement,
  SkeletonProps
>(function Skeleton(
  {
    variant = 'rounded',
    animation = 'pulse',
    width,
    height,
    className,
    style,
    ...props
  },
  ref,
) {
  const dimensions: CSSProperties = {
    width:
      width ??
      (variant === 'circle' ? '2.5rem' : '100%'),
    height: height ?? defaultHeights[variant],
  };

  return (
    <span
      {...props}
      ref={ref}
      aria-hidden="true"
      className={cn(
        'relative block shrink-0 overflow-hidden',
        'bg-border',
        variantClasses[variant],
        animationClasses[animation],
        className,
      )}
      style={{
        ...dimensions,
        ...style,
      }}
    />
  );
});
