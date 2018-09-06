import qs from 'query-string';

import config from '../../config';
import httpClient from '../../httpClient';
import { getAccessToken } from '../../utils';

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
    const jwtToken = getAccessToken();

    return httpClient.get(enrollmentsUrl, {
      headers: {
        Authorization: `JWT ${jwtToken}`,
      },
    });
  }

  static fetchCourseEnrollmentsCsv(enterpriseId) {
    const csvUrl = `${this.enterpriseBaseUrl}${enterpriseId}/enrollments.csv/?no_page=true`;
    const jwtToken = getAccessToken();
    return httpClient.get(csvUrl, {
      headers: {
        Authorization: `JWT ${jwtToken}`,
      },
    });
  }

  static fetchLearnerCompletedCourseEnrollments(enterpriseId, options) {
    const queryParams = {
      page: 1,
      page_size: 50,
      ...options,
    };
    const enrollmentsUrl = `${this.enterpriseBaseUrl}${enterpriseId}/learner_completed_course_enrollments/?${qs.stringify(queryParams)}`;
    const jwtToken = getAccessToken();

    return httpClient.get(enrollmentsUrl, {
      headers: {
        Authorization: `JWT ${jwtToken}`,
      },
    });
  }

  static fetchLearnerCompletedCourseEnrollmentsCsv(enterpriseId) {
    const csvUrl = `${this.enterpriseBaseUrl}${enterpriseId}/learner_completed_course_enrollments.csv?no_page=true`;
    const jwtToken = getAccessToken();
    return httpClient.get(csvUrl, {
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
