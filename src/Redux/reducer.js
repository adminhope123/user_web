import * as type from './actionType'

const  initialState={
    users:[],
    user:{},
    loading:true
}

const usersReducers=(state=initialState,action)=>{
    switch(action.type){

        case type.TIME_IN_API_GET_DATA  :
            return{
                ...state,
                users:action.payload,
                loading:false
            };
            case type.TIME_IN_API_ADD:
                return{
                    ...state,
                    loading:false
                };
                case type.TIME_START_POST:
                return{
                    ...state,
                    loading:false
                };
                case type.TIME_OUT_API_PUT:
                return{
                    ...state,
                    loading:false
                };
                case type.TIME_STOP_PUT:
                return{
                    ...state,
                    loading:false
                };
        default:
            return state;
    }
}
export default usersReducers;