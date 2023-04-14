import { createContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { attendancePostApi, getTimeDataApi, timeStartApi, timeStopApi } from "./Redux/actions";
import {v4} from 'uuid';
import { APP_TITLE, COLORS } from './pages/store/Settings';
import moment from 'moment';
import { Navigate, useNavigate } from "react-router-dom";

const storedString = localStorage.getItem('tasks')
const storedTasks = storedString ? JSON.parse(storedString) : [];
let interval;

export const UserDataContext = createContext();
export const UserDataProvider = (props) => {
  const dispatch = useDispatch();
  // const { users } = useSelector((state) => state?.data);
  const [userGetData, setUserGetData] = useState();
  const intervalRef = useRef();
  const [ tasks, setTasks ] = useState(storedTasks);
  const [totalWorkTimeData, setTotalWorkTimeData] = useState();
  const [attendanceData, setAttendanceData] = useState();
  const [attendanceGetData,setAttendanceGetData]=useState()
  const [totalTimeData,setTotalTimeData]=useState()
  const [dublicateValueData,setDublicateValueData]=useState()
  const [getEmployeeId,setGetEmployeeId]=useState()
  const [filterdataTotalTime,setFilterdataTotalTime]=useState()
  const [timerStartData,setTimerStartData]=useState()
  const [totalWorkTimeDataData,setTotalWorkTimeDataData]=useState()
  const [totalTimeModel, setTotalTimeModel] = useState(false);
  const [timeData,setTimeData]=useState()
  const [dataTimerStop,setDataTimerStop]=useState()
  const [stopTimerIdDataData,setStopTimerIdDataData]=useState()
  const [timeStart,setTimeStart]=useState()
  const {users}=useSelector(res=>res.data)
  const navigate=useNavigate()
  const userGetDataFunction = () => {
    const getData = JSON.parse(localStorage.getItem("userData"));
    if(getData){
      const getUserData = Object.assign({}, ...getData);
      setUserGetData(getUserData);
    }
  };
  const employeeGetIdFucntion = () => {
    const getData = JSON.parse(localStorage.getItem("attendace"));
    const getId=getData?.employeeId
    setGetEmployeeId(getId)
  };
  useEffect(() => {
    userGetDataFunction()
    employeeGetIdFucntion()
  }, [])
  
  const getColor = () => {
    const random = Math.ceil(Math.random() * 7);
    return COLORS[random];
}
const liveDate=new Date().toLocaleDateString("en-FI")
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
 const dayData=days[new Date().getDay()]
 const monthNames = ["January", "February", "March", "April", "May", "June",
 "July", "August", "September", "October", "November", "December"
];
const d = new Date();
const monthData=monthNames[d.getMonth()]
const getYear=d.getFullYear()
console.log("getYear",getYear)
 const getData=JSON.parse(localStorage.getItem("userData"))
 const dataaa=getData?.map(item=>item?.E_Id)
 const arrayRemove=` ${dataaa}`

const getModelTask = () => ({
  employeeId :arrayRemove,
    id:"",
    timerId: v4(),
    state: 'non-started',
    parent: false,
    date:liveDate,
    start: false,
    stop: false,
    color: getColor(),
    hours: '00',
    day:dayData,
    mins: '00',
    secs: '00',
    present:true,
    absent:false,
    totalSeconds: 0,
    year:getYear,
    month:monthData,
    totalTimeWork:""
})


useEffect(() => {
  const dataGet = JSON.parse(localStorage.getItem('timeTotal'))
  setTotalTimeData(dataGet)
}, [])


const getRunningTask = () => tasks.find(t => t.state === 'running');
const getTask = timerId => tasks.find(t => t.timerId === timerId);
const addTask = task => {
    setTasks(prevTasks => {
        const ntask = task ? {...task } : getModelTask();
        localStorage.setItem('tasks', JSON.stringify([...prevTasks, ntask]))
        return [...prevTasks, ntask]
    })
} 
const editTask = task => {
    setTasks(prevTasks => {
        const index = prevTasks.findIndex(t => t.timerId === task.timerId);
        prevTasks[index] = task;
        localStorage.setItem('tasks', JSON.stringify(prevTasks))
        const data=prevTasks.slice(-1).pop()
        return [...prevTasks];
    })
}
const duplicateTask = timerId => {
    const parent = getTask(timerId);
    addTask({
        ...getModelTask(), 
        description: parent.description,
        category: parent.category,
        parent: parent.timerId || timerId,
    })
}
const deleteTask = task => {
    let ntasks = tasks.filter(t => t.timerId !== task.timerId)
    setTasks(ntasks);
    localStorage.setItem('tasks', JSON.stringify(ntasks))
    if(task.state === 'running') {
        clearInterval(interval)
    } 
}

const updateAppTitle = (hours, mins, secs) => {
    document.title = hours > 0
                        ? `${hours} hour`
                        : mins > 0 ? `${mins} min ${secs} sec` : `${secs} sec`;
}

const getPaddedTime = totalSeconds => {
    const addPadding = value => value.toString().length === 1 ? `0${value}` : value;
    const hours = Math.floor(totalSeconds / 3600);
    const remainingSecs = totalSeconds - hours * 3600;
    const minutes = Math.floor(remainingSecs / 60);
    const seconds = remainingSecs - minutes * 60;
    updateAppTitle(hours, minutes, seconds);
    setTotalWorkTimeData(hours + ":" + minutes + ":" + seconds);
    return { 
        hours: addPadding(hours),
        mins: addPadding(minutes),
        secs: addPadding(seconds),
    }
} 
const intervalCallback = () => {
    const running = getRunningTask()
    if(running){
      const seconds = running.totalSeconds +=1;
      editTask({ 
          ...running,
          totalSeconds: seconds,
          ...getPaddedTime(seconds),
      });
    }
}

useEffect(() => {
    intervalRef.current = intervalCallback;
},[intervalRef.current])

useEffect(() => {
  findDateFunction()
}, [])

const findDateFunction = () => {
 
  };

//  const activeData=()=>{
//   const dataFilter=users?.filter(ele=>{return ele.state==="running"})
//   const dataDataData=JSON.parse(localStorage.getItem("viewEmployee"))
//   const getUserDAtaDAtaa=JSON.parse(localStorage?.getItem("userData"))
//   const getEmployeeDAtaData=getUserDAtaDAtaa?.map((item)=>{return item?.userName})
//   const dataFilterDAta=dataDataData?.filter((item)=>dataFilter?.find(ele=>ele?.employeeId===item?.E_Id))
//   if(dataFilterDAta?.length===0){
//     const notification = new Notification(getEmployeeDAtaData + " is Online", {
//     })
//   }else{
//     dataFilterDAta?.map((item)=>{
//       const notification = new Notification(item?.userName + " is Online", {
//       })
//    })
//   }

//  } 
const startRunningTask = task => {
  // activeData()
    const running = getRunningTask();
    if (!running) {
        getTask(task.timerId) 
            ? editTask({ 
                    ...task,
                    state: 'running',
                    totalSeconds: 0,
                    start: moment().format(),
                    ...getPaddedTime(task),
                })
            : addTask(task)
            dispatch(timeStartApi(task))
            setTimerStartData(task)
            localStorage.setItem("attendace",JSON.stringify(task))
   interval = setInterval(() => { intervalRef.current() },1000)
   const dataGEt=task?.start?.slice(11,19)
   localStorage.setItem("timeData",JSON.stringify(dataGEt))
   const getUSerDAta=JSON.parse(localStorage.getItem("timerData"))
   setTimeStart(dataGEt)
   console.log("dataGet",dataGEt)
   console.log("task",task)
    }
}


const stopRunningTask = () => {
    const runningTask = getRunningTask();
    // const checkIdData=users?.filter((item)=>timerStartData?.timerId===item.timerid)
    editTask({
        ...runningTask, 
        stop: moment().format(),
        ...getPaddedTime(runningTask?.totalSeconds),
        state: 'stopped'
    })
    document.title = APP_TITLE;
    clearInterval(interval)
    const storedString = localStorage.getItem('tasks')
   const storedTasks = storedString ? JSON.parse(storedString) : [];
   const data=storedTasks?.slice(-1).pop()
//    if(checkIdData){
//      const totalTimnDataAdd=data?.hours+":"+data?.mins+":"+data?.secs
//          const totalTimeDataAddObject={"totalTimeWork":totalTimnDataAdd}
//      const dataState=data
//      const stateDataDelete=delete dataState?.state
//      const dataaaaaaaa=delete dataState?.totalTimeWork
//      const stopTimeDelete=delete dataState?.stop
//      const mergeData={"state":"stopped"}
//  const dateGet=new Date()
//  const dataGetSting=dateGet?.toString()
//      const dataaDataaaa={"stop":dataGetSting}
//      const mergeDAtaDAtaDAta={...mergeData,...dataState,...totalTimeDataAddObject,...dataaDataaaa}
//      const dataaaaaaaaaaaaaa=users?.filter((item)=>data?.timerId===item.timerid)
//      const getIdDatadata=dataaaaaaaaaaaaaa?.map((item)=>{return item?.id})
//      const dataIdString=getIdDatadata?.toString()
//         const employeeEditIdData=dataIdString
//             dispatch(timeStopApi(mergeDAtaDAtaDAta,employeeEditIdData))
//    }
stopTimerIdDataData?.map((item) => {
  const employeeEditIdData = item?.id
  dispatch(timeStopApi(dataTimerStop, employeeEditIdData))
})
console.log("dataTimerStop", stopTimerIdDataData)

const checkIdData = users?.filter((item) => timerStartData?.timerId === item.timerid)
if (checkIdData) {
  const getStartData = data?.start?.slice(11, 19)
  const getStopData = new Date()
  const dateGEtDAta=getStopData?.toString()?.slice(16,24)
  console.log("aaa", getStopData)
  console.log("aaa", dateGEtDAta)

  var a = dateGEtDAta;
  var b = getStartData;

  const dataTotal = secondsToHMS(hmsToSeconds(a) - hmsToSeconds(b)) // -10:39:18
  console.log("aaa", dataTotal)
  const totalTimnDataAdd = data?.hours + ":" + data?.mins + ":" + data?.secs
  const totalTimeDataAddObject = { "totalTimeWork": dataTotal }


  console.log("totrl", dataTotal)

  const dataState = data
  const stateDataDelete = delete dataState?.state
  const dataaaaaaaa = delete dataState?.totalTimeWork
  const stopTimeDelete = delete dataState?.stop
  const mergeData = { "state": "stopped" }
  const dateGet = new Date()
  const dataGetSting = dateGet?.toString()
  const dataaDataaaa = { "stop": dataGetSting }
  const mergeDAtaDAtaDAta = { ...mergeData, ...dataState, ...totalTimeDataAddObject, ...dataaDataaaa }
  const dataaaaaaaaaaaaaa = users?.filter((item) => data?.timerId === item.timerid)
  const getIdDatadata = dataaaaaaaaaaaaaa?.map((item) => { return item?.id })
  const dataIdString = getIdDatadata?.toString()
  const employeeEditIdData = dataIdString
  dispatch(timeStopApi(mergeDAtaDAtaDAta, employeeEditIdData))
}
  // const localStorageCheckData=JSON.parse(localStorage.getItem("userData"))
  // const checkDatalocalStorage=localStorageCheckData?.length
  //   if(checkDatalocalStorage){
  //     dispatch(timeStopApi(mergeDAtaDAtaDAta, employeeEditIdData))
  //   }
}

// const stopDataFunction=()=>{
//   const storedString = localStorage.getItem('tasks')
//   const storedTasks = storedString ? JSON.parse(storedString) : [];
//   const data=storedTasks?.slice(-1).pop()
//       console.log("data",data)
//       stopTimerIdDataData?.map((item) => {
//         const employeeEditIdData = item?.id
//         // dispatch(timeStopApi(dataTimerStop, employeeEditIdData))
//       })
//       console.log("dataTimerStop", stopTimerIdDataData)
      
//       const checkIdData = users?.filter((item) => timerStartData?.timerId === item.timerid)
//       if (checkIdData) {
//         const getStartData = data?.start?.slice(11, 19)
//         const getStopData = new Date()
//         const dateGEtDAta=getStopData?.toString()?.slice(16,24)
      
//         var a = dateGEtDAta;
//         var b = getStartData;
      
//         const dataTotal = secondsToHMS(hmsToSeconds(a) - hmsToSeconds(b)) // -10:39:18
//         const totalTimnDataAdd = data?.hours + ":" + data?.mins + ":" + data?.secs
//         const totalTimeDataAddObject = { "totalTimeWork": dataTotal }
      
      
      
//         const dataState = data
//         const stateDataDelete = delete dataState?.state
//         const dataaaaaaaa = delete dataState?.totalTimeWork
//         const stopTimeDelete = delete dataState?.stop
//         const mergeData = { "state": "stopped" }
//         const dateGet = new Date()
//         const dataGetSting = dateGet?.toString()
//         const dataaDataaaa = { "stop": dataGetSting }
//         const mergeDAtaDAtaDAta = { ...mergeData, ...dataState, ...totalTimeDataAddObject, ...dataaDataaaa }
//         const dataaaaaaaaaaaaaa = users?.filter((item) => data?.timerId === item.timerid)
//         const getIdDatadata = dataaaaaaaaaaaaaa?.map((item) => { return item?.id })
//         const dataIdString = getIdDatadata?.toString()
//         const employeeEditIdData = dataIdString
//         const localStorageCheckData=JSON.parse(localStorage.getItem("userData"))
//         const checkDatalocalStorage=localStorageCheckData?.length
//             dispatch(timeStopApi(mergeDAtaDAtaDAta, employeeEditIdData))
//       }
// }

// useEffect(() => {
//   const dataGet=localStorage.getItem("userData") 
//   if(dataGet===null){
//     stopDataFunction()
//   }
// }, [])


function secondsToHMS(secs) {
  function z(n) { return (n < 10 ? '0' : '') + n; }
  var sign = secs < 0 ? '-' : '';
  secs = Math.abs(secs);
  return sign + z(secs / 3600 | 0) + ':' + z((secs % 3600) / 60 | 0) + ':' + z(secs % 60);
}

function hmsToSeconds(s) {
  var b = s.split(':');
  return b[0] * 3600 + b[1] * 60 + (+b[2] || 0);
}

const sumToSeconds = times => {
  return times?.reduce((a, e) => {
    const parts = e?.trim().split(":").map(Number);
    parts?.forEach((e, i) => {
      if (i < parts.length - 1) {
        parts[i + 1] += e * 60;
      }
    });
    return parts?.pop() + a;
  }, 0);
};
    
 
  
  const properties = {
    userGetData,
    tasks,
    dataTimerStop,
    setDataTimerStop,
    getTask,
    addTask,
    editTask,
    getModelTask,
    duplicateTask,
    getRunningTask,
    findDateFunction,
    startRunningTask,
    timeData,
    getEmployeeId,
    stopRunningTask,
    stopTimerIdDataData,
    totalTimeModel,
    setTotalTimeModel,
    deleteTask,
    setTimeStart,
    filterdataTotalTime,
    totalWorkTimeDataData,
    timerStartData,
    timeStart,
    dublicateValueData,
    totalWorkTimeData,
    totalTimeData
  };

  return (
    <UserDataContext.Provider value={properties}>
      {props.children}
    </UserDataContext.Provider>
  );
};
