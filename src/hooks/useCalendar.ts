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
      console.log("Fetching events from the backend...");
      const response = await axiosInstance.get("/api/events");
      console.log("Fetched events successfully:", response.data);
  
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
        console.log("Sending new event to backend:", newTodo);
        const response = await axiosInstance.post("/api/events", newTodo);
        console.log("Event created successfully:", response.data);
  
        const createdEvent = response.data;
  
        addTodo({
          title: createdEvent.title,
          date: createdEvent.date,
          completed: createdEvent.completed,
        });
  
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
