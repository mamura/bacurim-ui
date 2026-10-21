
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from '@/utilities/cn';

export type SeparatorOrientation = 'horizontal' | 'vertical';

export interface SeparatorProps
  extends ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {}

export const Separator = forwardRef<
  ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(function Separator(
  {
    orientation = 'horizontal',
    decorative = true,
    className,
    ...props
  },
  ref,
) {
  return (
    <SeparatorPrimitive.Root
      {...props}
      ref={ref}
      orientation={orientation}
      decorative={decorative}
      className={cn(
        'shrink-0 bg-border',
        'data-[orientation=horizontal]:h-px',
        'data-[orientation=horizontal]:w-full',
        'data-[orientation=vertical]:h-full',
        'data-[orientation=vertical]:w-px',
        className,
      )}
    />
  );
});
