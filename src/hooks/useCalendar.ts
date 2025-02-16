import { useState, useEffect } from "react";
import { Form } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import axiosInstance from "../utils/axiosInstance";

interface Todo {
  id?: number;
  title: string;
  date: string;
  completed: boolean;
}

export const useCalendar = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [form] = Form.useForm();
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

  // 모든 일정 가져오기
  const fetchTodos = async () => {
    try {
      const response = await axiosInstance.get("/api/events");
      setTodos(response.data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchTodos();
  }, []);

  // 새로운 일정 추가
  const addTodo = async (todo: Omit<Todo, "id">) => {
    try {
      const response = await axiosInstance.post("/api/events", todo);
      setTodos(prev => [...prev, response.data]);
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  // 일정 삭제
  const deleteTodo = async (id: number) => {
    try {
      await axiosInstance.delete(`/api/events/${id}`);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  // 일정 완료 상태 토글
  const toggleTodo = async (id: number, completed: boolean) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (!todoToUpdate) return;

      const response = await axiosInstance.put(`/api/events/${id}`, {
        ...todoToUpdate,
        completed: !completed
      });
      
      setTodos(prev => prev.map(todo => 
        todo.id === id ? response.data : todo
      ));
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
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

  const handleFormSubmit = async (values: { title: string }) => {
    if (selectedDate) {
      await addTodo({ 
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
    todos,
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