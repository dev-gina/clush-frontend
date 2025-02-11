import axios from 'axios';

const API_URL = 'http://localhost:8080/api/calendar';

// 모든 이벤트 조회
export const fetchCalendars = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching calendars:', error);
    throw error;
  }
};

// 특정 이벤트 조회
export const fetchCalendarById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching calendar by id:', error);
    throw error;
  }
};

// 새로운 이벤트 추가
export const addCalendar = async (calendar: { title: string; date: string }) => {
  try {
    await axios.post(API_URL, calendar);
  } catch (error) {
    console.error('Error adding calendar:', error);
    throw error;
  }
};

// 이벤트 수정
export const updateCalendar = async (id: number, calendar: { title: string; date: string }) => {
  try {
    await axios.put(`${API_URL}/${id}`, calendar);
  } catch (error) {
    console.error('Error updating calendar:', error);
    throw error;
  }
};

// 이벤트 삭제
export const deleteCalendar = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting calendar:', error);
    throw error;
  }
};
