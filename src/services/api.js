import axios from 'axios';

const API_BASE_URL = 'https://url-shortener-qgbo.onrender.com';

export const shortenUrl = async (originalUrl) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/shorten`, { originalUrl });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Something went wrong' };
  }
};
