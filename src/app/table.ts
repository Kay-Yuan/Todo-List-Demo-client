export interface Column {
  key: string;
  type: string;
  label: string;
  required?: boolean;
}

export const COLUMNS_SCHEMA: Column[] = [
  {
    key: 'status',
    type: 'boolean',
    label: 'Status',
  },
  {
    key: 'title',
    type: 'text',
    label: 'Title',
    required: true,
  },
  {
    key: 'urgentLevel',
    type: 'number',
    label: 'Urgent Level',
  },
  {
    key: 'description',
    type: 'text',
    label: 'Description',
  },
  {
    key: 'operation',
    type: 'boolean',
    label: 'Operation',
  },
];
