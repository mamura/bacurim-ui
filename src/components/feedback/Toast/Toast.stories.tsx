
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bell, UploadCloud } from 'lucide-react';

import { Button } from '@/components/actions/Button';

import {
  Toast,
  type ToastAppearance,
  type ToastVariant,
} from './Toast';

import {
  ToastProvider,
  useToast,
  type ToastPosition,
} from './ToastProvider';

const meta = {
  title: 'Components/Feedback/Toast',
  component: Toast,
  parameters: {
    layout: 'padded',
  },
  args: {
    variant: 'info',
    appearance: 'default',
    title: 'Notification',
    description: 'This is a toast message.',
    dismissible: true,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
    },
    appearance: {
      control: 'select',
      options: ['default', 'soft', 'solid'],
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

const variants: ToastVariant[] = [
  'info',
  'success',
  'warning',
  'danger',
];

const appearances: ToastAppearance[] = [
  'default',
  'soft',
  'solid',
];

const positions: ToastPosition[] = [
  'top-left',
  'top-center',
  'top-right',
  'center',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

function TriggerExample() {
  const toast = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      {variants.map((variant) => (
        <Button
          key={variant}
          variant="outline"
          color={
            variant === 'danger' ? 'error' : variant
          }
          onClick={() =>
            toast.show({
              variant,
              title: `${variant} notification`,
              description:
                'This notification will close automatically.',
            })
          }
        >
          {variant}
        </Button>
      ))}
    </div>
  );
}

export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-sm">
      <Toast {...args} />
    </div>
  ),
};

export const Basic: Story = {
  render: () => (
    <div className="flex w-full max-w-xl flex-col gap-3">
      {variants.map((variant) => (
        <Toast
          key={variant}
          variant={variant}
          description={`This is a ${variant} message.`}
          dismissible={false}
        />
      ))}
    </div>
  ),
};

export const Appearances: Story = {
  render: () => (
    <div className="flex w-full max-w-xl flex-col gap-6">
      {appearances.map((appearance) => (
        <section
          key={appearance}
          className="flex flex-col gap-3"
        >
          <h3 className="heading-sm capitalize">
            {appearance}
          </h3>

          {variants.map((variant) => (
            <Toast
              key={variant}
              appearance={appearance}
              variant={variant}
              description={`This is a ${variant} message.`}
            />
          ))}
        </section>
      ))}
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <Toast
        variant="info"
        icon={<Bell size={20} />}
        title="App notifications"
        description="Choose whether to allow notifications."
        action={{
          label: 'Allow notifications',
          onClick: () => window.alert('Allowed'),
        }}
      />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <Toast
        loading
        title="Action in progress"
        description="Please wait while we process your request."
      />
    </div>
  ),
};

export const Progress: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <Toast
        icon={<UploadCloud size={20} />}
        title="Uploading 3 files"
        description="The upload is in progress."
        progress={57}
      />
    </div>
  ),
};

export const Programmatic: Story = {
  render: () => (
    <ToastProvider>
      <TriggerExample />
    </ToastProvider>
  ),
};

function StackExample() {
  const toast = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={() => {
          toast.info({
            title: 'Information',
            description: 'Your data is being processed.',
          });

          toast.success({
            title: 'Success',
            description: 'Your preferences were updated.',
          });

          toast.warning({
            title: 'Warning',
            description: 'Please review your information.',
          });
        }}
      >
        Show stack
      </Button>

      <Button
        variant="outline"
        onClick={toast.dismissAll}
      >
        Dismiss all
      </Button>
    </div>
  );
}

export const Stack: Story = {
  render: () => (
    <ToastProvider duration={10000}>
      <StackExample />
    </ToastProvider>
  ),
};

function AsyncExample() {
  const toast = useToast();

  function simulateUpload() {
    const id = toast.loading({
      title: 'Uploading files',
      description: 'Preparing upload...',
      icon: <UploadCloud size={20} />,
    });

    let progress = 0;

    const interval = window.setInterval(() => {
      progress = Math.min(progress + 20, 100);

      if (progress < 100) {
        toast.update(id, {
          title: 'Uploading files',
          description: 'Upload in progress.',
          progress,
        });

        return;
      }

      window.clearInterval(interval);

      toast.update(id, {
        variant: 'success',
        title: 'Upload completed',
        description: 'All files were uploaded.',
        loading: false,
        progress: undefined,
        duration: 5000,
      });
    }, 700);
  }

  return (
    <Button onClick={simulateUpload}>
      Simulate upload
    </Button>
  );
}

export const AsyncProgress: Story = {
  render: () => (
    <ToastProvider>
      <AsyncExample />
    </ToastProvider>
  ),
};

function PositionTrigger() {
  const toast = useToast();

  return (
    <Button
      variant="outline"
      onClick={() =>
        toast.info({
          title: 'Position example',
          description: 'Toast displayed at the selected position.',
        })
      }
    >
      Show toast
    </Button>
  );
}

function PositionExample() {
  const [position, setPosition] =
    useState<ToastPosition>('bottom-right');

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {positions.map((option) => (
          <Button
            key={option}
            size="sm"
            variant={
              position === option ? 'solid' : 'outline'
            }
            onClick={() => setPosition(option)}
          >
            {option}
          </Button>
        ))}
      </div>

      <ToastProvider
        key={position}
        position={position}
      >
        <PositionTrigger />
      </ToastProvider>
    </div>
  );
}

export const Placement: Story = {
  render: () => <PositionExample />,
};
