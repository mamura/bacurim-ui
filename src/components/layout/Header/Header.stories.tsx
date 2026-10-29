
import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Bell,
  Menu,
  Search,
  Settings,
  UserRound,
  ArrowRight,
} from "lucide-react";
import { Header } from "./Header";

function ExampleLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex size-9 items-center justify-center rounded-sm bg-white text-primary">
        <span className="text-lg font-bold">B</span>
      </div>

      <span className="font-heading text-xl font-semibold tracking-tight">
        bacurim
      </span>
    </div>
  );
}

function ExampleIconButton({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="flex size-10 items-center justify-center rounded-sm text-primary-contrast transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {children}
    </button>
  );
}

function ExampleNavigation() {
  return (
    <nav aria-label="Main navigation">
      <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        <li>
          <a
            href="#home"
            className="body-sm font-medium text-primary-contrast hover:underline"
          >
            Home
          </a>
        </li>

        <li>
          <a
            href="#product"
            className="body-sm font-medium text-primary-contrast hover:underline"
          >
            Produto
          </a>
        </li>

        <li>
          <a
            href="#plans"
            className="body-sm font-medium text-primary-contrast hover:underline"
          >
            Planos
          </a>
        </li>

        <li>
          <a
            href="#contact"
            className="body-sm font-medium text-primary-contrast hover:underline"
          >
            Contato
          </a>
        </li>
      </ul>
    </nav>
  );
}

function ExamplePrimaryAction() {
  return (
    <a
      href="#plans"
      className="body-sm flex min-h-10 items-center gap-2 rounded-sm bg-accent px-4 font-semibold text-accent-contrast transition-colors hover:bg-accent-hover"
    >
      Escolha um plano
      <ArrowRight size={16} aria-hidden="true" />
    </a>
  );
}

const meta = {
  title: "Components/Layout/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background">
        <Story />
      </div>
    ),
  ],
  args: {
    logo: <ExampleLogo />,
  },
  argTypes: {
    logo: {
      control: false,
      description: "Identidade visual fornecida pela aplicação.",
    },
    navigation: {
      control: false,
      description: "Navegação horizontal opcional.",
    },
    actions: {
      control: false,
      description: "Elementos de ação exibidos à direita.",
    },
    className: {
      control: "text",
    },
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    actions: (
      <>
        <ExampleIconButton label="Search">
          <Search size={20} />
        </ExampleIconButton>

        <ExampleIconButton label="Notifications">
          <Bell size={20} />
        </ExampleIconButton>

        <ExampleIconButton label="Account">
          <UserRound size={20} />
        </ExampleIconButton>
      </>
    ),
  },
};

export const LogoOnly: Story = {
  args: {},
};

export const WithActions: Story = {
  args: {
    actions: (
      <>
        <ExampleIconButton label="Search">
          <Search size={20} />
        </ExampleIconButton>

        <ExampleIconButton label="Notifications">
          <Bell size={20} />
        </ExampleIconButton>

        <ExampleIconButton label="Settings">
          <Settings size={20} />
        </ExampleIconButton>

        <ExampleIconButton label="Account">
          <UserRound size={20} />
        </ExampleIconButton>
      </>
    ),
  },
};

export const WithCustomLogo: Story = {
  args: {
    logo: (
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-md bg-white text-primary">
          <Menu size={20} />
        </div>

        <div className="flex flex-col">
          <span className="font-heading text-base font-semibold leading-tight">
            Example App
          </span>

          <span className="caption text-primary-contrast/80">
            Administration
          </span>
        </div>
      </div>
    ),
    actions: (
      <ExampleIconButton label="Account">
        <UserRound size={20} />
      </ExampleIconButton>
    ),
  },
};

export const WithNavigation: Story = {
  args: {
    navigation: <ExampleNavigation />,
    actions: <ExamplePrimaryAction />,
  },
};

export const WithoutNavigation: Story = {
  args: {
    actions: (
      <>
        <ExampleIconButton label="Notifications">
          <Bell size={20} />
        </ExampleIconButton>

        <ExampleIconButton label="Settings">
          <Settings size={20} />
        </ExampleIconButton>

        <ExampleIconButton label="Account">
          <UserRound size={20} />
        </ExampleIconButton>
      </>
    ),
  },
};

export const Responsive: Story = {
  args: {
    navigation: <ExampleNavigation />,
    actions: (
      <ExampleIconButton label="Account">
        <UserRound size={20} />
      </ExampleIconButton>
    ),
  },
  decorators: [
    (Story) => (
      <div className="mx-auto w-[375px] max-w-full border-x border-border">
        <Story />
      </div>
    ),
  ],
};
