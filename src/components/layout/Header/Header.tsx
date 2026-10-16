
import type { ReactNode } from "react";

export interface HeaderProps {
  logo: ReactNode;
  navigation?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function Header({
  logo,
  navigation,
  actions,
  className = "",
}: HeaderProps) {
  return (
    <header
      className={`flex min-h-16 flex-wrap items-center gap-4 bg-primary px-6 py-3 text-primary-contrast ${className}`}
    >
      <div className="flex min-w-0 shrink-0 items-center">
        {logo}
      </div>

      {navigation != null && (
        <div className="order-3 flex w-full min-w-0 items-center justify-center lg:order-none lg:w-auto lg:flex-1">
          {navigation}
        </div>
      )}

      {actions != null && (
        <div className="ml-auto flex shrink-0 items-center gap-3">
          {actions}
        </div>
      )}
    </header>
  );
}
