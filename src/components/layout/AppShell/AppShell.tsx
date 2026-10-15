import type { ReactNode } from 'react';

export interface AppShellProps {
  navigation?: ReactNode;
  header?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function AppShell({
  navigation,
  header,
  children,
  className = '',
}: AppShellProps) {
  return (
    <div
      className={`flex min-h-screen bg-background text-text-primary ${className}`}
    >
      {navigation && (
        <aside className="hidden shrink-0 lg:block">
          {navigation}
        </aside>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {header && <header className="shrink-0">{header}</header>}

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}