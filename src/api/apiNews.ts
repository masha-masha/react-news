import axios from "axios";

const BASE_URL = import.meta.env.VITE_NEWS_BASE_API_URL;
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const TEN_MINUTES_MS = 10 * 60 * 1000;

export const getNews = async (page_number = 1, page_size = 10) => {

  const pageCacheKey = `cached_news_page_${page_number}_size_${page_size}`;
  const pageCacheTimeKey = `cached_news_timestamp_page_${page_number}`;

  const cachedData = localStorage.getItem(pageCacheKey);
  const cachedTime = localStorage.getItem(pageCacheTimeKey);
  const now = Date.now();

  if (cachedData && cachedTime && now - Number(cachedTime) < TEN_MINUTES_MS) {
    const minutesLeft = Math.ceil((TEN_MINUTES_MS - (now - Number(cachedTime))) / 60000);
    console.log(`[API Cache] Страница ${page_number} из кэша. Осталось: ~${minutesLeft} мин.`);
    
    return JSON.parse(cachedData);
  }

  try {
    const response = await axios.get(`${BASE_URL}search`, {
      params: {
        apiKey: API_KEY,
        page_number,
        page_size
      },
    });

    localStorage.setItem(pageCacheKey, JSON.stringify(response.data));
    localStorage.setItem(pageCacheTimeKey, now.toString());

    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе к API:", error);
    
    if (cachedData) {
      console.warn("[API Cache] Запрос не удался, отдаем старый кэш страницы", page_number);
      return JSON.parse(cachedData);
    }
  }
};