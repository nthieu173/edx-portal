import qs from 'query-string';

import config from '../../config';
import httpClient from '../../httpClient';
import { getAccessToken } from '../../utils';

class EnterpriseDataApiService {
  // TODO: This should access the data-api through the gateway instead of direct
  static enterpriseBaseUrl = `${config.DATA_API_BASE_URL}/enterprise/api/v0/enterprise/`;


  static fetchData(fetchURL, options) {
    const queryParams = {
      page: 1,
      page_size: 50,
      ...options,
    };
    const apiUrl = `${this.enterpriseBaseUrl}${fetchURL}/?${qs.stringify(queryParams)}`;
    const jwtToken = getAccessToken();

    return httpClient.get(apiUrl, {
      headers: {
        Authorization: `JWT ${jwtToken}`,
      },
    });
  }

  static fetchDashboardAnalytics(enterpriseId) {
    const analyticsUrl = `${this.enterpriseBaseUrl}${enterpriseId}/enrollments/overview/`;
    const jwtToken = getAccessToken();

    return httpClient.get(analyticsUrl, {
      headers: {
        Authorization: `JWT ${jwtToken}`,
      },
    });
  }
}

export default EnterpriseDataApiService;
