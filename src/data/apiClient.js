import { getAuthenticatedAPIClient } from '@edx/frontend-auth-client';

const apiClient = getAuthenticatedAPIClient({
  appBaseUrl: process.env.BASE_URL,
  authServiceUrl: process.env.AUTH_SERVICE_URL,
  accessTokenCookieName: process.env.ACCESS_TOKEN_COOKIE_NAME,
  csrfCookieName: process.env.CSRF_COOKIE_NAME,
});

export default apiClient;
