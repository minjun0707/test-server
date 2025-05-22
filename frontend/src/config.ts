// 환경 변수에서 API URL 가져오기
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// API 엔드포인트 설정
const API_ENDPOINTS = {
  ENTRIES: `${API_URL}/entries`,
};

// 환경 설정
const config = {
  API_URL,
  API_ENDPOINTS,
  // 현재 환경 (개발/운영)
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
};

export default config; 