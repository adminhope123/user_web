import axios from 'axios'
import * as type from './actionType'

const loginFormPost=(users)=>({
    type:type.LOGIN_USER,
    payload:users
})

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

const attendancePost=(users)=>({
    type:type.ATTENDANCE_POST_API,
    payload:users
})

const attendanceGet=(users)=>({
    type:type.ATTENDANCE_GET_API,
    payload:users
})

export const loginFormPostApi=(user)=>{
    const url="http://localhost:3004/login";
    return function (dispatch){
            axios.post(url,user)
            .then((resp)=>{
            console.log("resp",resp)
            dispatch(loginFormPost(resp.data))
        })
        .catch((error)=>console.log("error",error))
    }
}

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

export const attendancePostApi=(user)=>{
    const url="http://localhost:3004/attendance";
    return function (dispatch){
            axios.post(url,user)
            .then((resp)=>{
            console.log("resp",resp)
            dispatch(attendancePost(resp.data))
            dispatch(attendanceGetApi())
        })
        .catch((error)=>console.log("error",error))
    }
}
export const attendanceGetApi=()=>{
    const url="http://localhost:3004/attendance";
    return function (dispatch){
            axios.get(url)
            .then((resp)=>{
            console.log("resp",resp)
            dispatch(attendanceGet(resp.data))
        })
        .catch((error)=>console.log("error",error));
    };
}