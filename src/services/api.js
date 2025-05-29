import axios from 'axios';

const API_BASE_URL = 'https://url-shortener-qgbo.onrender.com';

export const shortenUrl = async (originalUrl) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/shorten`, { originalUrl });
    // URL에서 shortId만 추출
    const shortId = response.data.shortUrl.split('/').pop();
    // 현재 호스트가 localhost인 경우에만 짧은 URL 사용
    const isLocalhost = window.location.hostname === 'localhost';
    return { 
      ...response.data,
      displayUrl: isLocalhost ? `url-shortener/${shortId}` : response.data.shortUrl,  // 로컬에서는 짧게, 배포환경에서는 전체 URL
      shortUrl: response.data.shortUrl  // 실제 리다이렉트용 URL
    };
  } catch (error) {
    throw error.response?.data || { message: 'Something went wrong' };
  }
};
