export default {
  BASE_URL: process.env.BASE_URL,
  LMS_BASE_URL: process.env.LMS_BASE_URL,
  AUTH_SERVICE_URL: process.env.LMS_BASE_URL,
  DATA_API_BASE_URL: process.env.DATA_API_BASE_URL,
  LMS_CLIENT_ID: process.env.LMS_CLIENT_ID,
  SECURE_COOKIES: process.env.NODE_ENV !== 'development',
  SEGMENT_KEY: process.env.SEGMENT_KEY,
  ACCESS_TOKEN_COOKIE_NAME: process.env.ACCESS_TOKEN_COOKIE_NAME,
  CSRF_COOKIE_NAME: process.env.CSRF_COOKIE_NAME,
};
