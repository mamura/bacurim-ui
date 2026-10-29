
import type { ReactNode } from 'react';

export type ContentLayoutWidth = 'constrained' | 'wide' | 'fluid';

export interface ContentLayoutProps {
  children: ReactNode;
  width?: ContentLayoutWidth;
  className?: string;
}

const widthClasses: Record<ContentLayoutWidth, string> = {
  constrained: 'max-w-5xl',
  wide: 'max-w-7xl',
  fluid: 'max-w-none',
};

export function ContentLayout({
  children,
  width = 'constrained',
  className = '',
}: ContentLayoutProps) {
  return (
    <div className="w-full min-w-0 px-4 py-6 sm:px-6 lg:px-8">
      <div
        className={`mx-auto w-full min-w-0 ${widthClasses[width]} ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
