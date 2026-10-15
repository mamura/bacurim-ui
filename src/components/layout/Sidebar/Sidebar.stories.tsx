
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { Sidebar } from "./Sidebar";
import type { SidebarGroup } from "./Sidebar";

function ExampleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      focusable="false"
    >
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </svg>
  );
}

const groups: SidebarGroup[] = [
  {
    id: "workspace",
    label: "Workspace",
    items: [
      {
        id: "overview",
        label: "Overview",
        icon: <ExampleIcon />,
        href: "#overview",
      },
      {
        id: "reports",
        label: "Reports",
        icon: <ExampleIcon />,
        href: "#reports",
      },
      {
        id: "activity",
        label: "Activity without an icon",
        href: "#activity",
      },
    ],
  },
  {
    id: "management",
    label: "Management",
    items: [
      {
        id: "settings",
        label: "Settings",
        icon: <ExampleIcon />,
      },
      {
        id: "disabled-link",
        label: "Unavailable link",
        icon: <ExampleIcon />,
        href: "#unavailable",
        disabled: true,
      },
      {
        id: "disabled-action",
        label: "Unavailable action",
        disabled: true,
      },
    ],
  },
];

const meta = {
  title: "Components/Layout/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="h-screen bg-background">
        <Story />
      </div>
    ),
  ],
  args: {
    groups,
  },
  render: function SidebarStory(args) {
    const [{ collapsed }, updateArgs] = useArgs();

    return (
      <Sidebar
        {...args}
        collapsed={collapsed ?? false}
        onCollapsedChange={(nextCollapsed) => {
          updateArgs({ collapsed: nextCollapsed });
          args.onCollapsedChange?.(nextCollapsed);
        }}
      />
    );
  },
  argTypes: {
    collapsed: {
      control: "boolean",
    },
    activeItemId: {
      control: "select",
      options: ["overview", "reports", "activity", "settings"],
    },
    onCollapsedChange: {
      action: "collapsed changed",
    },
    header: {
      control: false,
    },
    footer: {
      control: false,
    },
    groups: {
      control: false,
    },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Expanded: Story = {
  args: {
    collapsed: false,
  },
};

export const Collapsed: Story = {
  args: {
    collapsed: true,
    activeItemId: "overview",
  },
};

export const ActiveItem: Story = {
  args: {
    activeItemId: "reports",
  },
};

export const Groups: Story = {};

export const WithHeaderAndFooter: Story = {
  args: {
    header: <span className="heading-sm">Workspace</span>,
    footer: (
      <span className="body-sm text-text-secondary">
        Example footer
      </span>
    ),
  },
};

export const WithoutGroupLabels: Story = {
  args: {
    groups: groups.map((group) => ({
      ...group,
      label: undefined,
    })),
  },
};

export const Interactive: Story = {
  render: function InteractiveSidebar(args) {
    const [collapsed, setCollapsed] = useState(
      args.collapsed ?? false,
    );

    const [activeItemId, setActiveItemId] = useState(
      args.activeItemId ?? "overview",
    );

    const interactiveGroups = args.groups.map((group) => ({
      ...group,
      items: group.items.map((item) => ({
        ...item,
        onClick: () => setActiveItemId(item.id),
      })),
    }));

    return (
      <Sidebar
        {...args}
        groups={interactiveGroups}
        collapsed={collapsed}
        activeItemId={activeItemId}
        onCollapsedChange={(nextCollapsed) => {
          setCollapsed(nextCollapsed);
          args.onCollapsedChange?.(nextCollapsed);
        }}
      />
    );
  },
};
