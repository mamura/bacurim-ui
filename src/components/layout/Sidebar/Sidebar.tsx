import { useId } from "react";
import type { MouseEventHandler, ReactNode } from "react";

export interface SidebarItem {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  disabled?: boolean;
}

export interface SidebarGroup {
  id: string;
  label?: string;
  items: SidebarItem[];
}

export interface SidebarProps {
  groups: SidebarGroup[];
  activeItemId?: string;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function Sidebar({
  groups,
  activeItemId,
  collapsed = false,
  onCollapsedChange,
  header,
  footer,
  className = "",
}: SidebarProps) {
  const navigationId = useId();

  return (
    <div
      className={`flex h-full shrink-0 flex-col border-r border-border bg-surface text-text-primary ${collapsed ? "w-18" : "w-64"} ${className}`}
    >
      {header != null && (
        <div className="shrink-0 overflow-hidden border-b border-border p-4">
          {header}
        </div>
      )}

      {onCollapsedChange && (
        <button
          type="button"
          aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
          aria-expanded={!collapsed}
          aria-controls={navigationId}
          onClick={() => onCollapsedChange(!collapsed)}
          className="body-sm m-3 flex min-h-12 items-center justify-center gap-3 rounded-md hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <span aria-hidden="true">{collapsed ? "»" : "«"}</span>
          {!collapsed && <span>Collapse navigation</span>}
        </button>
      )}

      <nav
        id={navigationId}
        aria-label="Main navigation"
        className="min-h-0 flex-1 space-y-6 overflow-y-auto p-3"
      >
        {groups.map((group, index) => {
          const labelId = `${navigationId}-group-${index}`;

          return (
            <div
              key={group.id}
              role="group"
              aria-labelledby={group.label ? labelId : undefined}
            >
              {group.label && (
                <div
                  id={labelId}
                  className={
                    collapsed
                      ? "sr-only"
                      : "caption mb-2 px-3 text-text-secondary"
                  }
                >
                  {group.label}
                </div>
              )}
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const active = item.id === activeItemId;
                  const itemClassName = `body-sm flex min-h-12 w-full items-center rounded-md font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${collapsed ? "justify-center px-1" : "gap-3 px-3 text-left"} ${active ? "bg-primary text-primary-contrast" : "text-text-primary"} ${item.disabled ? "cursor-not-allowed opacity-50" : active ? "hover:bg-primary-hover" : "hover:bg-background"}`;
                  const content = (
                    <>
                      {item.icon != null && (
                        <span
                          aria-hidden="true"
                          className="flex size-6 shrink-0 items-center justify-center"
                        >
                          {item.icon}
                        </span>
                      )}
                      {collapsed && item.icon == null && (
                        <span aria-hidden="true">{item.label.slice(0, 1)}</span>
                      )}
                      <span
                        className={
                          collapsed ? "sr-only" : "min-w-0 break-words"
                        }
                      >
                        {item.label}
                      </span>
                    </>
                  );

                  return (
                    <li key={item.id}>
                      {item.href !== undefined ? (
                        <a
                          href={item.disabled ? undefined : item.href}
                          role={item.disabled ? "link" : undefined}
                          aria-disabled={item.disabled || undefined}
                          aria-current={active ? "page" : undefined}
                          tabIndex={item.disabled ? -1 : undefined}
                          title={collapsed ? item.label : undefined}
                          onClick={
                            item.disabled
                              ? (event) => event.preventDefault()
                              : item.onClick
                          }
                          className={itemClassName}
                        >
                          {content}
                        </a>
                      ) : (
                        <button
                          type="button"
                          disabled={item.disabled}
                          aria-current={active ? "page" : undefined}
                          title={collapsed ? item.label : undefined}
                          onClick={item.onClick}
                          className={itemClassName}
                        >
                          {content}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>

      {footer != null && (
        <div className="shrink-0 overflow-hidden border-t border-border p-4">
          {footer}
        </div>
      )}
    </div>
  );
}