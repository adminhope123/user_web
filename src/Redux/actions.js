import axios from 'axios'
import * as type from './actionType'

const getTimeData=(users)=>({
    type:type.TIME_IN_API_GET_DATA,
    payload:users
})

const timeStartPost=(users)=>({
    type:type.TIME_START_POST,
    payload:users
})
const timeStopPost=(users)=>({
    type:type.TIME_STOP_PUT,
})


export const timeStartApi=(user)=>{
    const url="http://localhost:3004/timeAdd";
    return function (dispatch){
            axios.post(url,user)
            .then((resp)=>{
            console.log("resp",resp)
            dispatch(timeStartPost(resp.data))
            dispatch(getTimeDataApi())
        })
        .catch((error)=>console.log("error",error))
    }
}
export const timeStopApi=(user,timeStopId)=>{
    const url=`http://localhost:3004/timeAdd/${timeStopId}`;
    return function (dispatch){
            axios.put(url,user)
            .then((resp)=>{
            console.log("resp",resp)
            dispatch(timeStopPost(resp.data))
            dispatch(getTimeDataApi())
        })
        .catch((error)=>console.log("error",error))
    }
}

export const getTimeDataApi=()=>{
    const url="http://localhost:3004/timeAdd";
    return function (dispatch){
            axios.get(url)
            .then((resp)=>{
            console.log("resp",resp)
            dispatch(getTimeData(resp.data))
        })
        .catch((error)=>console.log("error",error));
    };
}
