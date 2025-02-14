
import axiosInstance from './axiosInstance';

export const fetchCalendarEvents = async () => {
  const response = await axiosInstance.get('/api/events');
  return response.data;
};

export const addCalendarEvent = async (eventData) => {
  const response = await axiosInstance.post('/api/events', eventData);
  return response.data;
};
