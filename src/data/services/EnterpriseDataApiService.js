import qs from 'query-string';

import apiClient from '../apiClient';
import config from '../../config';

class EnterpriseDataApiService {
  // TODO: This should access the data-api through the gateway instead of direct
  static enterpriseBaseUrl = `${config.DATA_API_BASE_URL}/enterprise/api/v0/enterprise/`;

  static fetchCourseEnrollments(enterpriseId, options) {
    const queryParams = {
      page: 1,
      page_size: 50,
      ...options,
    };
    const enrollmentsUrl = `${this.enterpriseBaseUrl}${enterpriseId}/enrollments/?${qs.stringify(queryParams)}`;
    return apiClient.get(enrollmentsUrl);
  }

  static fetchCourseEnrollmentsCsv(enterpriseId) {
    const csvUrl = `${this.enterpriseBaseUrl}${enterpriseId}/enrollments.csv/?no_page=true`;
    return apiClient.get(csvUrl);
  }

  static fetchDashboardAnalytics(enterpriseId) {
    const analyticsUrl = `${this.enterpriseBaseUrl}${enterpriseId}/enrollments/overview/`;
    return apiClient.get(analyticsUrl);
  }
}

export default EnterpriseDataApiService;
