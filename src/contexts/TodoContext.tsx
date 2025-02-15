import React, { createContext, useContext, useState, useEffect } from "react";

export interface Todo {
  id: string;
  title: string;
  date: string;
  completed: boolean;
}

interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, "id">) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  // 초기 상태를 localStorage에서 읽어옴
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  // todos가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: Omit<Todo, "id">) => {
    setTodos([...todos, { ...todo, id: Date.now().toString() }]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
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
