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

const attendancePost=(attendances)=>({
    type:type.ATTENDANCE_POST_API,
    payload:attendances
})

const attendanceGet=(attendances)=>({
    type:type.ATTENDANCE_GET_API,
    payload:attendances
})

const getUserData=(employees)=>({
    type:type.GET_USER_DATA,
    payload:employees
})
const attendancePut=(attendances)=>({
    type:type.ATTENDANCE_PUT_API,
})
export const timetotal=(users)=>({
    type:type.TIME_TOTAL,
    payload:users
})

const profilePost=(profiles)=>({
    type:type.PROFILE_POST_DATA,
})

const profilePut=(profiles)=>({
    type:type.PROFILE_PUT_API,
})


const getProfileData=(profiles)=>({
    type:type.PRFILE_GET_API,
    payload:profiles
})

const taskAdd=(tasks)=>({
    type:type.TASK_ADD,
    payload:tasks
})

const taskPut=(tasks)=>({
    type:type.TASK_EDIT,
})

const taskGet=(tasks)=>({
    type:type.TASK_GET,
    payload:tasks
})

const taskDelete = () => ({
    type: type.TASK_DELETE,
  });

  const eventGet=(events)=>({
    type:type.EVENT_GET,
    payload:events
})


export const loginFormPostApi=(user)=>{
    const url="https://hopebackend.hopeinfosys.com/api/userlogin";
    return function (dispatch){
            axios.post(url,user)
            .then((resp)=>{
            dispatch(loginFormPost(resp.data))
        })
        .catch((error)=>console.log("error",error))
    }
}

export const timeStartApi=(user)=>{
    const url="https://hopebackend.hopeinfosys.com/api/usertimer";
    return function (dispatch){
            axios.post(url,user)
            .then((resp)=>{
            dispatch(timeStartPost(resp.data))
            dispatch(getTimeDataApi())
        })
        .catch((error)=>console.log("error",error))
    }
}
export const timeStopApi=(user,employeeEditIdData)=>{
    const url=`https://hopebackend.hopeinfosys.com/api/usertimerupdatesave/${employeeEditIdData}`;
    return function (dispatch){
            axios.put(url,user)
            .then((resp)=>{
            dispatch(timeStopPost(resp.data))
            dispatch(getTimeDataApi())
        })
        .catch((error)=>console.log("error",error))
    }
}

export const getTimeDataApi=()=>{
    const url="https://hopebackend.hopeinfosys.com/api/viewtimer";
    return function (dispatch){
            axios.get(url)
            .then((resp)=>{
            dispatch(getTimeData(resp.data))
        })
        .catch((error)=>console.log("error",error));
    };
}

export const attendancePostApi=(attendace)=>{
    const url="https://hopebackend.hopeinfosys.com/api/Uattendence";
    return function (dispatch){
            axios.post(url,attendace)
            .then((resp)=>{
            dispatch(attendancePost(resp.data))
            dispatch(attendanceGetApi())
        })
        .catch((error)=>console.log("error",error))
    }
}
export const attendanceGetApi=()=>{
    const url="https://hopebackend.hopeinfosys.com/api/viewUattendence";
    return function (dispatch){
            axios.get(url)
            .then((resp)=>{
            dispatch(attendanceGet(resp.data))
        })
        .catch((error)=>console.log("error",error));
    };
}
export const attendanceApiPut=(attendace,employeeEditIdData)=>{
    const url=`https://hopebackend.hopeinfosys.com/api/Uattendenceupdatesave/${employeeEditIdData}`;
    return function (dispatch){
            axios.put(url,attendace)
            .then((resp)=>{
            dispatch(attendancePut(resp.data))
            dispatch(attendanceGetApi())
        })
        .catch((error)=>console.log("error",error))
    }
}
export const profilePostApi=(profile)=>{
    const url="https://hopebackend.hopeinfosys.com/api/userprofile";
    return function (dispatch){
            axios.post(url,profile)
            .then((resp)=>{
            dispatch(profilePost(resp.data))
            dispatch(profileGetApi())
        })
        .catch((error)=>console.log("error",error))
    }
}
export const profilePutApi=(profile,employeeEditIdData)=>{
    const url=`https://hopebackend.hopeinfosys.com/api/userprofileupdatesave/${employeeEditIdData}`;
    return function (dispatch){
            axios.put(url,profile)
            .then((resp)=>{
            dispatch(profilePut(resp.data))
            dispatch(profileGetApi())
        })
        .catch((error)=>console.log("error",error))
    }
}

export const profileGetApi=()=>{
    const url="https://hopebackend.hopeinfosys.com/api/viewuserprofile";
    return function (dispatch){
            axios.get(url)
            .then((resp)=>{
            dispatch(getProfileData(resp.data))
        })
        .catch((error)=>console.log("error",error));
    };
}
export const getUserDataApi=()=>{
    const url="https://hopebackend.hopeinfosys.com/api/viewemployee";
    return function (dispatch){
            axios.get(url)
            .then((resp)=>{
            dispatch(getUserData(resp.data))
        })
        .catch((error)=>console.log("error",error));
    };
}

export const taskAddApi=(task)=>{
    const url="https://hopebackend.hopeinfosys.com/api/task";
    return function (dispatch){
            axios.post(url,task)
            .then((resp)=>{
            dispatch(taskAdd(resp.data))
            dispatch(taskgetApi())
        })
        .catch((error)=>console.log("error",error))
    }
}
export const taskEditApi=(task,employeeEditIdData)=>{
    const url=`https://hopebackend.hopeinfosys.com/api/updatesavetask/${employeeEditIdData}`;
    return function (dispatch){
            axios.put(url,task)
            .then((resp)=>{
            dispatch(taskPut(resp.data))
            dispatch(taskgetApi())
        })
        .catch((error)=>console.log("error",error))
    }
}

export const taskgetApi=()=>{
    const url="https://hopebackend.hopeinfosys.com/api/viewtask";
    return function (dispatch){
            axios.get(url)
            .then((resp)=>{
            dispatch(taskGet(resp.data))
        })
        .catch((error)=>console.log("error",error));
    };
}
export const taskDeleteApi = (employeeEditIdData) => {
    const dataaa = `https://hopebackend.hopeinfosys.com/api/deletetask/${employeeEditIdData}`;
    return function (dispatch) {
      axios
        .delete(dataaa)
        .then((resp) => {
          dispatch(taskDelete());
          dispatch(taskgetApi());
        })
        .catch((error) => console.log('error', error));
    };
  };

  export const eventGetApi=()=>{
    const url="https://hopebackend.hopeinfosys.com/api/viewcalendar";
    return function (dispatch){
            axios.get(url)
            .then((resp)=>{
            dispatch(eventGet(resp.data))
        })
        .catch((error)=>console.log("error",error));
    };
}