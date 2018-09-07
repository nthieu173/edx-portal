import {
  FETCH_COURSE_ENROLLMENTS_REQUEST,
  FETCH_COURSE_ENROLLMENTS_SUCCESS,
  FETCH_COURSE_ENROLLMENTS_FAILURE,
  FETCH_LEARNER_COURSES_REQUEST,
  FETCH_LEARNER_COURSES_SUCCESS,
  FETCH_LEARNER_COURSES_FAILURE,
  FETCH_CSV_REQUEST,
  FETCH_CSV_SUCCESS,
  FETCH_CSV_FAILURE,
} from '../constants/courseEnrollments';

const initialState = {
  enrollments: null,
  loading: false,
  error: null,
  csvLoading: false,
  csvError: null,
};

const courseEnrollments = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSE_ENROLLMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_COURSE_ENROLLMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        enrollments: action.payload.enrollments,
      };
    case FETCH_COURSE_ENROLLMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        enrollments: null,
      };
    case FETCH_LEARNER_COURSES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_LEARNER_COURSES_SUCCESS:
      return {
        ...state,
        loading: false,
        enrollments: action.payload.enrollments,
      };
    case FETCH_LEARNER_COURSES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        enrollments: null,
      };
    case FETCH_CSV_REQUEST:
      return {
        ...state,
        csvLoading: true,
        csvError: null,
      };
    case FETCH_CSV_SUCCESS:
      return {
        ...state,
        csvLoading: false,
        csvError: null,
      };
    case FETCH_CSV_FAILURE:
      return {
        ...state,
        csvLoading: false,
        csvError: action.payload.error,
      };
    default:
      return state;
  }
};

export default courseEnrollments;
