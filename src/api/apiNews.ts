import axios from "axios"


const BASE_URL = import.meta.env.VITE_NEWS_BASE_API_URL
const API_KEY = import.meta.env.VITE_NEWS_API_KEY

const CACHE_KEY = "cached_news_data";
const CACHE_TIME_KEY = "cached_news_timestamp";
const TEN_MINUTES_MS = 10 * 60 * 1000;

export const getNews = async () => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
  const now = Date.now();

  if (cachedData && cachedTime && now - Number(cachedTime) < TEN_MINUTES_MS) {
    const minutesLeft = Math.ceil((TEN_MINUTES_MS - (now - Number(cachedTime))) / 60000);
    console.log(`[API Cache] Взято из кеша. До сетевого запроса: ~${minutesLeft} мин.`);
    
    return JSON.parse(cachedData);
  }

  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        apiKey: API_KEY,
      },
    });

    localStorage.setItem(CACHE_KEY, JSON.stringify(response.data));
    localStorage.setItem(CACHE_TIME_KEY, now.toString());

    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе к API:", error);
    
    if (cachedData) {
      console.warn("[API Cache] Запрос не удался, отдаем старый кеш");
      return JSON.parse(cachedData);
    }
  }
};