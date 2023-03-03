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

const getUserData=(users)=>({
    type:type.GET_USER_DATA,
    payload:users
})
const attendancePut=(users)=>({
    type:type.ATTENDANCE_PUT_API,
})
export const timetotal=(users)=>({
    type:type.TIME_TOTAL,
    payload:users
})

const profilePost=(users)=>({
    type:type.PROFILE_POST_DATA,
})

const profilePut=(users)=>({
    type:type.PROFILE_PUT_API,
})

export const loginFormPostApi=(user)=>{
    const url="http://127.0.0.1:8000/api/userlogin";
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
    const url="http://127.0.0.1:8000/api/usertimer";
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
export const timeStopApi=(user,employeeEditIdData)=>{
    const url=`http://127.0.0.1:8000/api/usertimerupdatesave/${employeeEditIdData}`;
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
    const url="http://127.0.0.1:8000/api/viewtimer";
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
    const url="http://127.0.0.1:8000/api/Uattendence";
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
    const url="http://127.0.0.1:8000/api/viewUattendence";
    return function (dispatch){
            axios.get(url)
            .then((resp)=>{
            console.log("resp",resp)
            dispatch(attendanceGet(resp.data))
        })
        .catch((error)=>console.log("error",error));
    };
}
export const attendanceApiPut=(user,employeeEditIdData)=>{
    const url=`http://127.0.0.1:8000/api/viewUattendence/${employeeEditIdData}`;
    return function (dispatch){
            axios.put(url,user)
            .then((resp)=>{
            console.log("resp",resp)
            dispatch(attendancePut(resp.data))
            dispatch(attendanceGetApi())
        })
        .catch((error)=>console.log("error",error))
    }
}
export const profilePostApi=(user)=>{
    const url="http://127.0.0.1:8000/api/userprofile";
    return function (dispatch){
            axios.post(url,user)
            .then((resp)=>{
            console.log("resp",resp)
            dispatch(profilePost(resp.data))
        })
        .catch((error)=>console.log("error",error))
    }
}
export const profilePutApi=(user,attendanceId)=>{
    const url=`http://localhost:3004/attendance/${attendanceId}`;
    return function (dispatch){
            axios.put(url,user)
            .then((resp)=>{
            console.log("resp",resp)
            dispatch(profilePut(resp.data))
        })
        .catch((error)=>console.log("error",error))
    }
}
export const profileGetApi=()=>{
    const url="http://127.0.0.1:8000/api/viewemployee";
    return function (dispatch){
            axios.get(url)
            .then((resp)=>{
            console.log("resp",resp)
            dispatch(getTimeData(resp.data))
        })
        .catch((error)=>console.log("error",error));
    };
}
export const getUserDataApi=()=>{
    const url="http://127.0.0.1:8000/api/viewemployee";
    return function (dispatch){
            axios.get(url)
            .then((resp)=>{
            console.log("resp",resp)
            dispatch(getUserData(resp.data))
        })
        .catch((error)=>console.log("error",error));
    };
}