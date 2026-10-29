
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import { cn } from '@/utilities/cn';

import {
  Toast,
  type ToastAction,
  type ToastAppearance,
  type ToastVariant,
} from './Toast';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'center'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ToastOptions {
  variant?: ToastVariant;
  appearance?: ToastAppearance;
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ToastAction;
  duration?: number;
  dismissible?: boolean;
  loading?: boolean;
  progress?: number;
}

export type ToastUpdateOptions = Partial<ToastOptions>;

export interface ToastRecord extends ToastOptions {
  id: string;
  revision: number;
}

export interface ToastApi {
  show: (options: ToastOptions) => string;
  info: (options: ToastOptions) => string;
  success: (options: ToastOptions) => string;
  warning: (options: ToastOptions) => string;
  danger: (options: ToastOptions) => string;
  loading: (options: ToastOptions) => string;
  update: (id: string, options: ToastUpdateOptions) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

export interface ToastProviderProps {
  children: ReactNode;
  position?: ToastPosition;
  duration?: number;
  maxToasts?: number;
}

const ToastContext = createContext<ToastApi | null>(null);

const positionClasses: Record<ToastPosition, string> = {
  'top-left': 'left-4 top-4 items-start',
  'top-center': 'left-1/2 top-4 -translate-x-1/2 items-center',
  'top-right': 'right-4 top-4 items-end',
  center:
    'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center',
  'bottom-left': 'bottom-4 left-4 items-start',
  'bottom-center':
    'bottom-4 left-1/2 -translate-x-1/2 items-center',
  'bottom-right': 'bottom-4 right-4 items-end',
};

interface ToastItemProps {
  item: ToastRecord;
  defaultDuration: number;
  onDismiss: (id: string) => void;
}

function ToastItem({
  item,
  defaultDuration,
  onDismiss,
}: ToastItemProps) {
  const duration =
    item.duration ??
    (item.loading ? 0 : defaultDuration);

  const remaining = useRef(duration);
  const startedAt = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const paused = useRef(false);

  const clearTimer = useCallback(() => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const pause = useCallback(() => {
    if (paused.current) return;

    paused.current = true;

    if (timer.current !== null) {
      remaining.current = Math.max(
        0,
        remaining.current - (Date.now() - startedAt.current),
      );
    }

    clearTimer();
  }, [clearTimer]);

  const resume = useCallback(() => {
    if (!paused.current) return;
    paused.current = false;

    if (remaining.current <= 0 || duration <= 0) {
      return;
    }

    startedAt.current = Date.now();

    timer.current = setTimeout(() => {
      onDismiss(item.id);
    }, remaining.current);
  }, [duration, item.id, onDismiss]);

  useEffect(() => {
    clearTimer();
    remaining.current = duration;

    if (duration > 0 && !paused.current) {
      startedAt.current = Date.now();

      timer.current = setTimeout(() => {
        onDismiss(item.id);
      }, remaining.current);
    }

    return clearTimer;
  }, [
    item.id,
    item.revision,
    duration,
    onDismiss,
    clearTimer,
  ]);

  return (
    <div
      className="pointer-events-auto w-full"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={(event) => {
        if (
          !event.currentTarget.contains(
            event.relatedTarget as Node | null,
          )
        ) {
          resume();
        }
      }}
    >
      <Toast
        variant={item.variant}
        appearance={item.appearance}
        title={item.title}
        description={item.description}
        icon={item.icon}
        action={item.action}
        loading={item.loading}
        progress={item.progress}
        dismissible={item.dismissible}
        onDismiss={() => onDismiss(item.id)}
      />
    </div>
  );
}

export function ToastProvider({
  children,
  position = 'bottom-right',
  duration = 5000,
  maxToasts = 5,
}: ToastProviderProps) {
  const [items, setItems] = useState<ToastRecord[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: string) => {
    setItems((current) =>
      current.filter((item) => item.id !== id),
    );
  }, []);

  const dismissAll = useCallback(() => {
    setItems([]);
  }, []);

  const show = useCallback(
    (options: ToastOptions): string => {
      const id = `toast-${++nextId.current}`;

      const record: ToastRecord = {
        ...options,
        id,
        revision: 0,
      };

      setItems((current) =>
        [...current, record].slice(-Math.max(1, maxToasts)),
      );

      return id;
    },
    [maxToasts],
  );

  const update = useCallback(
    (id: string, options: ToastUpdateOptions) => {
      setItems((current) =>
        current.map((item) =>
          item.id === id
            ? {
                ...item,
                ...options,
                id,
                revision: item.revision + 1,
              }
            : item,
        ),
      );
    },
    [],
  );

  const info = useCallback(
    (options: ToastOptions) =>
      show({ ...options, variant: 'info' }),
    [show],
  );

  const success = useCallback(
    (options: ToastOptions) =>
      show({ ...options, variant: 'success' }),
    [show],
  );

  const warning = useCallback(
    (options: ToastOptions) =>
      show({ ...options, variant: 'warning' }),
    [show],
  );

  const danger = useCallback(
    (options: ToastOptions) =>
      show({ ...options, variant: 'danger' }),
    [show],
  );

  const loading = useCallback(
    (options: ToastOptions) =>
      show({
        ...options,
        variant: options.variant ?? 'info',
        loading: true,
        duration: options.duration ?? 0,
      }),
    [show],
  );

  const api: ToastApi = {
    show,
    info,
    success,
    warning,
    danger,
    loading,
    update,
    dismiss,
    dismissAll,
  };

  return (
    <ToastContext.Provider value={api}>
      {children}

      <div
        className={cn(
          'pointer-events-none fixed z-50',
          'flex max-h-[calc(100dvh-2rem)]',
          'w-[calc(100vw-2rem)] max-w-sm',
          'flex-col gap-3 overflow-y-auto',
          positionClasses[position],
        )}
      >
        {items.map((item) => (
          <ToastItem
            key={item.id}
            item={item}
            defaultDuration={duration}
            onDismiss={dismiss}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      'useToast must be used inside ToastProvider.',
    );
  }

  return context;
}
