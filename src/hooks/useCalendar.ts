import { useState, useEffect } from "react";
import { Form } from "antd";
import dayjs, { Dayjs } from "dayjs";
import axiosInstance from "../utils/axiosInstance";
import { useTodo } from "../contexts/TodoContext";

// Todo 인터페이스 정의
export interface Todo {
  id: number;
  title: string;
  date: string;
  completed: boolean;
}

export const useCalendar = () => {
  const { todos, addTodo, deleteTodo, toggleTodo } = useTodo();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [form] = Form.useForm();
  const [currentDate, setCurrentDate] = useState(dayjs());

  // 1️⃣ 새로 고침 시 localStorage에서 todos 상태 초기화
  useEffect(() => {
    const storedTodosStr = localStorage.getItem("todos");
    console.log("Loaded stored todos (string):", storedTodosStr);
    const storedTodos = storedTodosStr ? JSON.parse(storedTodosStr) : [];
    console.log("Parsed stored todos:", storedTodos);
    if (Array.isArray(storedTodos) && storedTodos.length > 0) {
      storedTodos.forEach((event: Todo) => {
        console.log("Adding stored event to state:", event);
        addTodo(event);
      });
    }
  }, [addTodo]);

  // 2️⃣ 백엔드에서 일정 가져오기 (마운트 시 1회 실행)
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axiosInstance.get<Todo[]>("/api/events");
        const events = response.data;
        console.log("Fetched events from backend:", events);
        if (Array.isArray(events)) {
          events.forEach((event) => {
            console.log("Adding fetched event to state:", event);
            addTodo(event);
          });
          localStorage.setItem("todos", JSON.stringify(events));
          console.log("LocalStorage set with fetched events:", JSON.stringify(events));
        }
      } catch (error) {
        console.error("Error fetching events from backend:", error);
      }
    };

    fetchTodos();
  }, [addTodo]);

  // 3️⃣ 일정 등록 (엔터 입력 방지 + DB 저장)
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 엔터 입력 시 새로고침 방지
    const values = form.getFieldsValue();
    if (selectedDate && values.title) {
      const newTodo = {
        title: values.title,
        date: selectedDate.format("YYYY-MM-DD"),
        completed: false,
      };

      try {
        const response = await axiosInstance.post("/api/events", newTodo);
        if (response.status === 201 && response.data) {
          const createdEvent = response.data;
          console.log("Event created (from POST):", createdEvent);
          addTodo(createdEvent);
          const updatedTodos = [...todos, createdEvent];
          localStorage.setItem("todos", JSON.stringify(updatedTodos));
          console.log("LocalStorage updated with new event:", updatedTodos);
          setIsModalOpen(false);
          form.resetFields();
        } else {
          console.error("Failed to save event:", response);
        }
      } catch (error) {
        console.error("Error adding event:", error);
      }
    } else {
      console.warn("Title is empty or date is not selected.");
    }
  };

  const handleSelect = (date: Dayjs) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleModalOk = () => form.submit();
  const handleModalCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  // getTodosForDate 함수에 반환 타입을 Todo[]로 명시
  const getTodosForDate = (date: Dayjs): Todo[] => {
    const dateStr = date.format("YYYY-MM-DD");
    const storedTodos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
    return storedTodos.filter((todo: Todo) => todo.date === dateStr);
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
