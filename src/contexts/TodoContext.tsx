import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

export interface Todo {
  id: string;
  title: string;
  date: string;
  completed: boolean;
}

interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, "id">) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);

  // 초기 데이터 로드
  useEffect(() => {
    fetchTodos();
  }, []);

  // 모든 일정 가져오기
  const fetchTodos = async () => {
    try {
      const response = await axiosInstance.get("/api/events");
      setTodos(response.data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  // 새 일정 추가
  const addTodo = async (todo: Omit<Todo, "id">) => {
    try {
      const response = await axiosInstance.post("/api/events", todo);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Failed to add todo:", error);
      // 에러 발생 시 사용자에게 알림을 주는 것도 좋습니다
    }
  };

  // 일정 상태 토글
  const toggleTodo = async (id: string) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (!todoToUpdate) return;

      const response = await axiosInstance.put(`/api/events/${id}`, {
        ...todoToUpdate,
        completed: !todoToUpdate.completed
      });
      
      setTodos(todos.map((todo) =>
        todo.id === id ? response.data : todo
      ));
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  };

  // 일정 삭제
  const deleteTodo = async (id: string) => {
    try {
      await axiosInstance.delete(`/api/events/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
}
