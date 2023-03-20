import { createContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { attendancePostApi, timeStartApi, timeStopApi } from "./Redux/actions";
import {v4} from 'uuid';
import { APP_TITLE, COLORS } from './pages/store/Settings';
import moment from 'moment';

const storedString = sessionStorage.getItem('tasks')
const storedTasks = storedString ? JSON.parse(storedString) : [];
let interval;

export const UserDataContext = createContext();
export const UserDataProvider = (props) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state?.data);
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
  const userGetDataFunction = () => {
    const getData = JSON.parse(sessionStorage.getItem("userData"));
    if(getData){
      const getUserData = Object.assign({}, ...getData);
      setUserGetData(getUserData);
    }
  };
  const employeeGetIdFucntion = () => {
    const getData = JSON.parse(sessionStorage.getItem("attendace"));
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
const liveDate=new Date().toLocaleDateString("es-DO")
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
 const dayData=days[new Date().getDay()]
 const monthNames = ["January", "February", "March", "April", "May", "June",
 "July", "August", "September", "October", "November", "December"
];
const d = new Date();
const monthData=monthNames[d.getMonth()]
 const getData=JSON.parse(sessionStorage.getItem("userData"))
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
    month:monthData,
    totalTimeWork:""
})


useEffect(() => {
  const dataGet = JSON.parse(sessionStorage.getItem('timeTotal'))
  setTotalTimeData(dataGet)
}, [])


const getRunningTask = () => tasks.find(t => t.state === 'running');
const getTask = timerId => tasks.find(t => t.timerId === timerId);
const addTask = task => {
    setTasks(prevTasks => {
        const ntask = task ? {...task } : getModelTask();
        sessionStorage.setItem('tasks', JSON.stringify([...prevTasks, ntask]))
        return [...prevTasks, ntask]
    })
} 
const editTask = task => {
    setTasks(prevTasks => {
        const index = prevTasks.findIndex(t => t.timerId === task.timerId);
        prevTasks[index] = task;
        sessionStorage.setItem('tasks', JSON.stringify(prevTasks))
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
    sessionStorage.setItem('tasks', JSON.stringify(ntasks))
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
    const seconds = running.totalSeconds +=1;
    editTask({ 
        ...running,
        totalSeconds: seconds,
        ...getPaddedTime(seconds),
    });
}

useEffect(() => {
    intervalRef.current = intervalCallback;
},[intervalRef.current])

useEffect(() => {
  findDateFunction()
}, [])

const findDateFunction = () => {
 
  };

  
const startRunningTask = task => {
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
            sessionStorage.setItem("timerData",JSON.stringify(users))
        interval = setInterval(() => { intervalRef.current() },1000)
   
    }
}

const stopRunningTask = () => {
    const runningTask = getRunningTask();
    const checkIdData=users?.filter((item)=>timerStartData?.timerId===item.timerid)
            console.log("userDAta",users)
            console.log("timerStartData",timerStartData)
            console.log("checkIdData",checkIdData)
    editTask({
        ...runningTask, 
        stop: moment().format(),
        ...getPaddedTime(runningTask?.totalSeconds),
        state: 'stopped'
    })
    document.title = APP_TITLE;
    clearInterval(interval)
    const storedString = sessionStorage.getItem('tasks')
   const storedTasks = storedString ? JSON.parse(storedString) : [];
   const data=storedTasks?.slice(-1).pop()
   if(data){
     console.log("data",data)
       const totalTimnDataAdd=data?.hours+":"+data?.mins+":"+data?.secs
       const totalTimeDataAddObject={"totalTimeWork":totalTimnDataAdd}
       const mergeObject={...data,...totalTimeDataAddObject}
       console.log("mergeData",mergeObject)
       sessionStorage.setItem("attendace",JSON.stringify(mergeObject))
        const getIdData=checkIdData?.map((item)=>{
          const employeeEditIdData=item?.id
          dispatch(timeStopApi(mergeObject,employeeEditIdData))
        })
     
   }
  // const getDatadaaa=JSON.parse(sessionStorage.getItem("userData"))
  // getDatadaaa?.map((ele)=>{
  //    ele.getEmployeeId
  //    console.log("item",  ele.E_Id)
  //    const filterdataaa=users?.filter((item)=>ele.E_Id=== item?.employeeId)
  //    console.log("filterDAta",filterdataaa)
  //    setFilterdataTotalTime(filterdataaa)
  //   })
  //     const liveDate = new Date().toLocaleDateString("es-DO");
  //     const duplicateDate = liveDate;
  //     console.log("duplicateDate",duplicateDate)
  //     const dublicateValue = filterdataTotalTime.filter((obj) =>
  //       duplicateDate.includes(obj?.date)
  //     );
  //     console.log("dublicateValue",dublicateValue)
  //     const getTotalWorkTime=dublicateValue?.map((item)=>{
  //         return item?.totalTimeWork
  //       })
  //       console.log("dublicateValueData",dublicateValue)
  //       console.log("getTotalWorkTime",getTotalWorkTime)
  //       const totalSecondsdata = sumToSeconds(getTotalWorkTime);
  //   const getTotalWorkDataObject=`${~~(totalSecondsdata / 60 / 60)}:${
  //            ~~((totalSecondsdata / 60) % 60)}:${
  //            ~~(totalSecondsdata % 60)}`
  //            console.log("totalWork",getTotalWorkDataObject)
  //            const totalTimeobjData={"totalWorkTime":getTotalWorkDataObject}
  //            console.log("totalTimeobj",totalTimeobjData)
  //                sessionStorage.setItem("totalWorkTime",JSON.stringify(totalTimeobjData))
    }
 
  
  const properties = {
    userGetData,
    tasks,
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
    totalTimeModel,
    setTotalTimeModel,
    deleteTask,
    filterdataTotalTime,
    totalWorkTimeDataData,
    timerStartData,
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
