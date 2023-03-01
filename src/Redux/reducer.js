import * as type from "./actionType";

const initialState = {
  users: [],
  user: {},
  total: [],
  loading: true,
};
const usersReducers = (state = initialState, action) => {
  switch (action.type) {
    case type.LOGIN_USER:
      return {
        ...state,
        loading: false,
      };
    case type.TIME_IN_API_GET_DATA:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case type.TIME_START_POST:
      return {
        ...state,
        loading: false,
      };
    case type.ATTENDANCE_GET_API:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case type.ATTENDANCE_POST_API:
      return {
        ...state,
        loading: false,
      };
    case type.TIME_OUT_API_PUT:
      return {
        ...state,
        loading: false,
      };
    case type.TIME_STOP_PUT:
    case type.TIME_TOTAL:
      return {
        ...state,
        total: action.payload,
      };
      case type.PROFILE_POST_DATA:
        return {
          ...state,
          loading: false,
        };
        case type.PRFILE_GET_API:
          return {
            ...state,
            users: action.payload,
            loading: false,
          };
          case type.PROFILE_PUT_API:
              return {
                ...state,
                users: action.payload,
              };
    default:
      return state;
  }
};
export default usersReducers;
