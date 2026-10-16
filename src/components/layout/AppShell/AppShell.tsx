import type { ReactNode } from "react";

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
  className = "",
}: AppShellProps) {
  return (
    <div
      className={`flex min-h-screen flex-col bg-background text-text-primary ${className}`}
    >
      {header != null && (
        <div className="shrink-0">
          {header}
        </div>
      )}

      <div className="flex min-h-0 flex-1">
        {navigation != null && (
          <aside className="hidden shrink-0 lg:block">
            {navigation}
          </aside>
        )}

        <main className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}