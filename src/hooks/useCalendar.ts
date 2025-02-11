import { useState } from "react";
import { Form } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useTodo } from "../contexts/TodoContext";

export const useCalendar = () => {
  const { todos, addTodo, deleteTodo, toggleTodo } = useTodo();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [form] = Form.useForm();
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

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

  const getTodosForDate = (date: Dayjs) => {
    const dateStr = date.format("YYYY-MM-DD");
    return todos.filter((todo) => todo.date === dateStr);
  };

  return {
    currentDate,
    setCurrentDate,
    selectedDate,
    isModalOpen,
    form,
    handleSelect,
    handleModalOk,
    handleModalCancel,
    handleFormSubmit,
    getTodosForDate,
    toggleTodo,
    deleteTodo,
  };
};
