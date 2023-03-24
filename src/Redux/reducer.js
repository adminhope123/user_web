import * as type from "./actionType";

const initialState = {
  users: [],
  user: {},
  total: [],
  TotalTimeWork:0,
  loading: true,
};
const usersReducers = (state = initialState, action) => {
  switch (action.type) {
    case type.TOTAL_TIME:{
      console.log("fenuuu",payload);
        return{...state,TotalTimeWork:payload}
    }
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
      case type.GET_USER_DATA:
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
        return {
          ...state,
          users: action.payload,
        };
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
              case type.TASK_ADD:
                return {
                  ...state,
                  loading: false,
                };
                case type.TASK_GET:
                  return {
                    ...state,
                    users: action.payload,
                    loading: false,
                  };
                  case type.TASK_EDIT:
                      return {
                        ...state,
                        users: action.payload,
                      };
                      case type.TASK_DELETE:
                        return {
                          ...state,
                          loading: false,
                        };
    default:
      return state;
  }
};
export default usersReducers;
