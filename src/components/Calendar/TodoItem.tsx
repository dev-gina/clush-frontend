import { Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import type { TodoItemProps } from "./types";
import { calendarStyles } from "./styles";

export const TodoItem = ({
  id,
  title,
  completed,
  onToggle,
  onDelete,
}: TodoItemProps) => (
  <li
    style={calendarStyles.todoList.item.wrapper}
    onClick={(e) => e.stopPropagation()}
  >
    <div style={calendarStyles.todoList.item.content}>
      <label htmlFor={`checkbox-${id}`}>
        <Checkbox
          id={`checkbox-${id}`}  // id 속성 추가
          name={`todo-${id}`}     // name 속성 추가
          checked={completed}
          onChange={(e) => {
            e.stopPropagation();
            onToggle(id);
          }}
        />
        <span
          style={{
            textDecoration: completed ? "line-through" : "none",
            color: completed ? "#888" : "inherit",
          }}
        >
          {title}
        </span>
      </label>
    </div>
    <DeleteOutlined
      onClick={(e) => {
        e.stopPropagation();
        onDelete(id);
      }}
      style={calendarStyles.todoList.item.deleteIcon}
    />
  </li>
);
