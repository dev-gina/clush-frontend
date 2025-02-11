import type { Dayjs } from "dayjs";

export interface CalendarHeaderProps {
  value: Dayjs;
  onChange: (date: Dayjs) => void;
}

export interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface TodoListProps {
  todos: Array<{
    id: string;
    title: string;
    completed: boolean;
  }>;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface AddTodoModalProps {
  isOpen: boolean;
  selectedDate: Dayjs | null;
  onOk: (values: { title: string }) => void;
  onCancel: () => void;
}
