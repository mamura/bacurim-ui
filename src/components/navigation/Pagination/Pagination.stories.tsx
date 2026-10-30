
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Pagination } from './Pagination';

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/data-display/Table';

const meta = {
  title: 'Components/Navigation/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
  },
  args: {
    page: 5,
    totalPages: 20,
    onPageChange: () => {},
    siblingCount: 1,
    boundaryCount: 1,
    showFirstLast: true,
    showPreviousNext: true,
    size: 'md',
    variant: 'default',
    disabled: false,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'outline'],
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

function PaginationExample({
  totalPages = 20,
  initialPage = 5,
  size = 'md',
  variant = 'default',
  siblingCount = 1,
  boundaryCount = 1,
  showFirstLast = true,
  showPreviousNext = true,
}: {
  totalPages?: number;
  initialPage?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline';
  siblingCount?: number;
  boundaryCount?: number;
  showFirstLast?: boolean;
  showPreviousNext?: boolean;
}) {
  const [page, setPage] = useState(initialPage);

  return (
    <div className="flex flex-col items-center gap-4">
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        size={size}
        variant={variant}
        siblingCount={siblingCount}
        boundaryCount={boundaryCount}
        showFirstLast={showFirstLast}
        showPreviousNext={showPreviousNext}
      />

      <span className="text-body-sm text-text-secondary">
        Página {page} de {totalPages}
      </span>
    </div>
  );
}

export const Default: Story = {
  render: (args) => {
    return <ControlledPagination {...args} />;
  },
};

function ControlledPagination(
  props: React.ComponentProps<typeof Pagination>,
) {
  const [page, setPage] = useState(props.page);

  return (
    <div className="flex flex-col items-center gap-4">
      <Pagination
        {...props}
        page={page}
        onPageChange={setPage}
      />

      <span className="text-body-sm text-text-secondary">
        Página {page} de {props.totalPages}
      </span>
    </div>
  );
}

export const FewPages: Story = {
  render: () => (
    <PaginationExample
      totalPages={5}
      initialPage={1}
    />
  ),
};

export const ManyPages: Story = {
  render: () => (
    <PaginationExample
      totalPages={100}
      initialPage={50}
    />
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} className="flex flex-col gap-3">
          <span className="text-body-sm text-text-secondary">
            {size}
          </span>

          <PaginationExample
            totalPages={20}
            initialPage={5}
            size={size}
          />
        </div>
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(['default', 'outline'] as const).map(
        (variant) => (
          <div
            key={variant}
            className="flex flex-col gap-3"
          >
            <span className="text-body-sm text-text-secondary">
              {variant}
            </span>

            <PaginationExample variant={variant} />
          </div>
        ),
      )}
    </div>
  ),
};

export const WithoutFirstLast: Story = {
  render: () => (
    <PaginationExample showFirstLast={false} />
  ),
};

export const WithoutPreviousNext: Story = {
  render: () => (
    <PaginationExample showPreviousNext={false} />
  ),
};

export const CustomRange: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <PaginationExample
        totalPages={50}
        initialPage={25}
        siblingCount={2}
        boundaryCount={1}
      />

      <PaginationExample
        totalPages={50}
        initialPage={25}
        siblingCount={1}
        boundaryCount={2}
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Pagination
      page={5}
      totalPages={20}
      onPageChange={() => {}}
      disabled
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <Pagination
      page={1}
      totalPages={0}
      onPageChange={() => {}}
    />
  ),
};

const records = Array.from({ length: 42 }, (_, index) => ({
  id: index + 1,
  name: `Registro ${index + 1}`,
  category:
    index % 2 === 0 ? 'Serviços' : 'Infraestrutura',
}));

export const WithTable: Story = {
  render: function TablePaginationExample() {
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const totalPages = Math.ceil(
      records.length / pageSize,
    );

    const visibleRecords = records.slice(
      (page - 1) * pageSize,
      page * pageSize,
    );

    return (
      <div className="flex max-w-3xl flex-col gap-4">
        <div className="overflow-x-auto rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Categoria</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {visibleRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.id}</TableCell>
                  <TableCell>{record.name}</TableCell>
                  <TableCell>{record.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-body-sm text-text-secondary">
            Exibindo{' '}
            {(page - 1) * pageSize + 1}–
            {Math.min(
              page * pageSize,
              records.length,
            )}{' '}
            de {records.length} registros
          </span>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            size="sm"
            showFirstLast={false}
          />
        </div>
      </div>
    );
  },
};
