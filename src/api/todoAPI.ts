import axios from 'axios';

const API_URL = 'http://localhost:8080/api/todos';

// 모든 할 일 조회
export const fetchTodos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

// 특정 할 일 조회
export const fetchTodoById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching todo by id:', error);
    throw error;
  }
};

// 새로운 할 일 추가
export const addTodo = async (todo: { title: string; completed: boolean }) => {
  try {
    await axios.post(API_URL, todo);
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

// 할 일 수정
export const updateTodo = async (id: number, todo: { title: string; completed: boolean }) => {
  try {
    await axios.put(`${API_URL}/${id}`, todo);
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

// 할 일 삭제
export const deleteTodo = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};
