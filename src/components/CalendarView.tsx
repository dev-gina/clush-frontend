import { useState } from "react";
import { Calendar, Modal, Form, Input, Checkbox } from "antd";
import { LeftOutlined, RightOutlined, DeleteOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";
import { useTodo } from "../contexts/TodoContext";
import locale from "antd/es/date-picker/locale/ko_KR";
import dayjs from "dayjs";

const CalendarHeader = ({
  value,
  onChange,
}: {
  value: Dayjs;
  onChange: (date: Dayjs) => void;
}) => {
  const handleMonthChange = (num: number) => {
    const newValue = value.clone().add(num, "month");
    onChange(newValue);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "40px 0 60px",
        alignItems: "center",
        userSelect: "none",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <LeftOutlined
        style={{ fontSize: "16px", cursor: "pointer" }}
        onClick={(e) => {
          e.stopPropagation();
          handleMonthChange(-1);
        }}
      />
      <div
        style={{ fontSize: "16px", fontWeight: "bold" }}
        onClick={(e) => e.stopPropagation()}
      >
        {value.format("YYYY년 MM월")}
      </div>
      <RightOutlined
        style={{ fontSize: "16px", cursor: "pointer" }}
        onClick={(e) => {
          e.stopPropagation();
          handleMonthChange(1);
        }}
      />
    </div>
  );
};

function CalendarView() {
  const { todos, addTodo, deleteTodo, toggleTodo } = useTodo();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [form] = Form.useForm();
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

  const dateCellRender = (value: Dayjs) => {
    const dateStr = value.format("YYYY-MM-DD");
    const dayTodos = todos.filter((todo) => todo.date === dateStr);

    return (
      <ul
        style={{ listStyle: "none", padding: 0 }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {dayTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "4px",
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Checkbox
                checked={todo.completed}
                onChange={(e) => {
                  e.stopPropagation();
                  toggleTodo(todo.id);
                }}
              />
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "#888" : "inherit",
                }}
              >
                {todo.title}
              </span>
            </div>
            <DeleteOutlined
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(todo.id);
              }}
              style={{ cursor: "pointer", color: "#ff4d4f" }}
            />
          </li>
        ))}
      </ul>
    );
  };

  const handleSelect = (date: Dayjs) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    form.submit();
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleFormSubmit = (values: { title: string }) => {
    if (selectedDate) {
      addTodo({
        title: values.title,
        date: selectedDate.format("YYYY-MM-DD"),
        completed: false,
      });
      setIsModalOpen(false);
      form.resetFields();
    }
  };

  return (
    <div style={{ flex: 2, background: "#fff", padding: "20px" }}>
      <CalendarHeader value={currentDate} onChange={setCurrentDate} />
      <Calendar
        value={currentDate}
        cellRender={dateCellRender}
        onSelect={handleSelect}
        mode="month"
        headerRender={() => null}
        locale={locale}
      />

      <Modal
        title={`일정 추가 - ${selectedDate?.format("YYYY년 MM월 DD일")}`}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="추가"
        cancelText="취소"
      >
        <Form form={form} onFinish={handleFormSubmit}>
          <Form.Item
            name="title"
            rules={[{ required: true, message: "일정 내용을 입력해주세요" }]}
          >
            <Input placeholder="일정 내용을 입력하세요" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default CalendarView;
