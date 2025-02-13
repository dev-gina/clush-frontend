import { useState, useEffect } from "react";
import { Form } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useTodo } from "../contexts/TodoContext";
import axiosInstance from "../utils/axiosInstance";

export const useCalendar = () => {
  const { todos, addTodo, deleteTodo, toggleTodo } = useTodo();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [form] = Form.useForm();
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

  const fetchTodosFromBackend = async () => {
    try {
      const response = await axiosInstance.get("/api/calendar/events");
      const events = response.data;

      events.forEach((event: { title: string; date: string }) => {
        addTodo({
          title: event.title,
          date: event.date,
          completed: false,
        });
      });
    } catch (error) {
      console.error("Error fetching calendar events", error);
    }
  };

  useEffect(() => {
    fetchTodosFromBackend();
  }, []);

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

  const handleFormSubmit = async (values: { title: string }) => {
    if (selectedDate) {
      const newTodo = {
        title: values.title,
        date: selectedDate.format("YYYY-MM-DD"),
        completed: false,
      };


      try {
        await axiosInstance.post("/api/calendar/events", newTodo);
        addTodo(newTodo); 
        setIsModalOpen(false);
        form.resetFields();
      } catch (error) {
        console.error("Error adding todo", error);
      }
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
