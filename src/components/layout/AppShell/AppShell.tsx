
import { useEffect, useId, useRef } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';

export interface AppShellProps {
  navigation?: ReactNode;
  header?: ReactNode;
  children: ReactNode;
  className?: string;
  mobileNavigationOpen?: boolean;
  onMobileNavigationOpenChange?: (open: boolean) => void;
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export function AppShell({
  navigation,
  header,
  children,
  className = '',
  mobileNavigationOpen = false,
  onMobileNavigationOpenChange,
}: AppShellProps) {
  const navigationId = useId();
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const isMobileNavigationOpen =
    navigation != null && mobileNavigationOpen;

  useEffect(() => {
    if (!isMobileNavigationOpen) return;

    const previousOverflow = document.body.style.overflow;
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    document.body.style.overflow = 'hidden';

    const panel = mobilePanelRef.current;

    const firstFocusable =
      panel?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);

    (firstFocusable ?? panel)?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [isMobileNavigationOpen]);

  useEffect(() => {
    if (!isMobileNavigationOpen) return;

    const mediaQuery = window.matchMedia('(min-width: 64rem)');

    const handleViewportChange = (
      event: MediaQueryListEvent,
    ) => {
      if (event.matches) {
        onMobileNavigationOpenChange?.(false);
      }
    };

    mediaQuery.addEventListener(
      'change',
      handleViewportChange,
    );

    return () => {
      mediaQuery.removeEventListener(
        'change',
        handleViewportChange,
      );
    };
  }, [
    isMobileNavigationOpen,
    onMobileNavigationOpenChange,
  ]);

  function handleMobileNavigationKeyDown(
    event: KeyboardEvent<HTMLDivElement>,
  ) {
    if (event.key === 'Escape') {
      event.preventDefault();
      onMobileNavigationOpenChange?.(false);
      return;
    }

    if (event.key !== 'Tab') return;

    const panel = mobilePanelRef.current;
    if (!panel) return;

    const focusableElements = Array.from(
      panel.querySelectorAll<HTMLElement>(
        FOCUSABLE_SELECTOR,
      ),
    ).filter(
      (element) =>
        element.getClientRects().length > 0,
    );

    if (focusableElements.length === 0) {
      event.preventDefault();
      panel.focus();
      return;
    }

    const first = focusableElements[0];
    const last =
      focusableElements[focusableElements.length - 1];

    if (
      event.shiftKey &&
      (document.activeElement === first ||
        document.activeElement === panel)
    ) {
      event.preventDefault();
      last.focus();
    } else if (
      !event.shiftKey &&
      document.activeElement === last
    ) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div
      className={`flex min-h-screen flex-col bg-background text-text-primary ${className}`}
    >
      {header != null && (
        <div className="shrink-0" inert={isMobileNavigationOpen}>{header}</div>
      )}

      <div className="flex min-h-0 flex-1">
        {navigation != null && (
          <aside
            aria-label="Desktop navigation"
            className="hidden shrink-0 lg:block"
          >
            {navigation}
          </aside>
        )}

        <main className="min-w-0 flex-1" inert={isMobileNavigationOpen}>
          {children}
        </main>
      </div>

      {navigation != null && (
        <div
          className={`fixed inset-0 z-50 lg:hidden ${
            isMobileNavigationOpen ? '' : 'hidden'
          }`}
          aria-hidden={
            isMobileNavigationOpen ? undefined : true
          }
        >
          <button
            type="button"
            aria-label="Close navigation"
            tabIndex={
              isMobileNavigationOpen ? 0 : -1
            }
            className="absolute inset-0 bg-black/50"
            onClick={() =>
              onMobileNavigationOpenChange?.(false)
            }
          />

          {isMobileNavigationOpen && (
            <div
              id={navigationId}
              ref={mobilePanelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              tabIndex={-1}
              onKeyDown={
                handleMobileNavigationKeyDown
              }
              className="absolute inset-y-0 left-0 flex h-full max-w-[calc(100vw-3rem)] flex-col overflow-y-auto bg-surface shadow-lg"
            >
              <div className="flex min-h-14 shrink-0 items-center justify-end border-b border-border px-3">
                <button
                  type="button"
                  aria-label="Close navigation"
                  onClick={() =>
                    onMobileNavigationOpenChange?.(
                      false,
                    )
                  }
                  className="flex size-10 items-center justify-center rounded-sm hover:bg-background focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <span
                    aria-hidden="true"
                    className="text-xl"
                  >
                    ×
                  </span>
                </button>
              </div>

              <div className="min-h-0 flex-1">
                {navigation}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
