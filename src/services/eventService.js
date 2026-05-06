import axios from "axios";

const API = "https://zoco-events-api-production.up.railway.app/events";

export const getEvents = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const createEvent = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};

export const updateEvent = async (id, data) => {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data;
};

export const deleteEvent = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};

export const askAI = async (question) => {
  const res = await axios.post(`${API}/ask`, {
    question
  });

  return res.data.answer;
};