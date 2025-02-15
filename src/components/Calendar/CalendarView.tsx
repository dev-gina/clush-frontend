import { Calendar } from "antd";
import type { Dayjs } from "dayjs";
import { useCalendar } from "../../hooks/useCalendar";
import { CalendarHeader } from "./CalendarHeader";
import { calendarStyles } from "./styles";
import locale from "antd/es/date-picker/locale/ko_KR";
import { TodoItem } from "./TodoItem";
import { AddTodoModal } from "./AddTodoModal";

export function CalendarView() {
  console.log("useCalendar Hook is running!");
  const {
    currentDate,
    setCurrentDate,
    selectedDate,
    isModalOpen,
    handleSelect,
    handleModalOk,     
    handleModalCancel,
    getTodosForDate,
    toggleTodo,
    deleteTodo,
  } = useCalendar();

  const dateCellRender = (value: Dayjs) => {
    const dayTodos = getTodosForDate(value);

    return (
      <ul style={calendarStyles.todoList.list} onClick={(e) => e.stopPropagation()}>
        {dayTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id.toString()}  
            title={todo.title}
            completed={todo.completed}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    );
  };

  return (
    <div style={calendarStyles.container}>
      <CalendarHeader value={currentDate} onChange={setCurrentDate} />
      <Calendar
        value={currentDate}
        cellRender={dateCellRender}
        onSelect={handleSelect}
        mode="month"
        headerRender={() => null}
        locale={locale}
      />

      <AddTodoModal
        isOpen={isModalOpen}
        selectedDate={selectedDate}
        onOk={handleModalOk}        // handleModalOk를 전달
        onCancel={handleModalCancel}
      />
    </div>
  );
}

export default CalendarView;
