import qs from 'query-string';

import apiClient from '../apiClient';
import configuration from '../../config';

class LmsApiService {
  static baseUrl = configuration.LMS_BASE_URL;
  static clientId = configuration.LMS_CLIENT_ID;

  static fetchCourseOutline(courseId) {
    const options = {
      course_id: courseId,
      username: 'staff',
      depth: 'all',
      nav_depth: 3,
      block_types_filter: 'course,chapter,sequential,vertical',
    };
    const outlineUrl = `${this.baseUrl}/api/courses/v1/blocks/?${qs.stringify(options)}`;
    return apiClient.get(outlineUrl);
  }

  static fetchPortalConfiguration(enterpriseSlug) {
    const portalConfigurationUrl = `${this.baseUrl}/enterprise/api/v1/enterprise-customer-branding/${enterpriseSlug}/`;
    return apiClient.get(portalConfigurationUrl);
  }

  static fetchEnterpriseList(options) {
    const queryParams = {
      permissions: 'enterprise_data_api_access',
      page: 1,
      page_size: 50,
      ...options,
    };
    const enterpriseListUrl = `${this.baseUrl}/enterprise/api/v1/enterprise-customer/with_access_to/?${qs.stringify(queryParams)}`;
    return apiClient.get(enterpriseListUrl);
  }
}

export default LmsApiService;
