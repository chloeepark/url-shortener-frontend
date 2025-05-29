import axios from 'axios';

const API_BASE_URL = 'https://url-shortener-qgbo.onrender.com';

export const shortenUrl = async (originalUrl) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/shorten`, { originalUrl });
    // URL에서 shortId만 추출
    const shortId = response.data.shortUrl.split('/').pop();
    return { 
      ...response.data,
      displayUrl: `url-shortener/${shortId}`,  // 표시용 URL
      shortUrl: response.data.shortUrl  // 실제 리다이렉트용 URL
    };
  } catch (error) {
    throw error.response?.data || { message: 'Something went wrong' };
  }
};
