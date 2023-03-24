import { createContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { attendancePostApi, getTimeDataApi, timeStartApi, timeStopApi } from "./Redux/actions";
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
  const [dataTimerStop,setDataTimerStop]=useState()
  const [stopTimerIdDataData,setStopTimerIdDataData]=useState()
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

 const activeData=()=>{
  const dataFilter=users?.filter(ele=>{return ele.state==="running"})
  const dataDataData=JSON.parse(sessionStorage.getItem("viewEmployee"))
  const getUserDAtaDAtaa=JSON.parse(sessionStorage?.getItem("userData"))
  const getEmployeeDAtaData=getUserDAtaDAtaa?.map((item)=>{return item?.userName})
  const dataFilterDAta=dataDataData?.filter((item)=>dataFilter?.find(ele=>ele?.employeeId===item?.E_Id))
  if(dataFilterDAta?.length===0){
    const notification = new Notification(getEmployeeDAtaData + " is Online", {
    })
  }else{
    dataFilterDAta?.map((item)=>{
      const notification = new Notification(item?.userName + " is Online", {
      })
   })
  }

 } 
const startRunningTask = task => {
  activeData()
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
            sessionStorage.setItem("attendace",JSON.stringify(task))
        interval = setInterval(() => { intervalRef.current() },1000)
   
    }
}

const stopRunningTask = () => {
    const runningTask = getRunningTask();
    const checkIdData=users?.filter((item)=>timerStartData?.timerId===item.timerid)
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
   if(checkIdData){
     const totalTimnDataAdd=data?.hours+":"+data?.mins+":"+data?.secs
         const totalTimeDataAddObject={"totalTimeWork":totalTimnDataAdd}
     const dataState=data
     const stateDataDelete=delete dataState?.state
     const dataaaaaaaa=delete dataState?.totalTimeWork
     const stopTimeDelete=delete dataState?.stop
     const mergeData={"state":"stopped"}
 const dateGet=new Date()
 const dataGetSting=dateGet?.toString()
     const dataaDataaaa={"stop":dataGetSting}
     const mergeDAtaDAtaDAta={...mergeData,...dataState,...totalTimeDataAddObject,...dataaDataaaa}
     const dataaaaaaaaaaaaaa=users?.filter((item)=>data?.timerId===item.timerid)
     const getIdDatadata=dataaaaaaaaaaaaaa?.map((item)=>{return item?.id})
     const dataIdString=getIdDatadata?.toString()
        const employeeEditIdData=dataIdString
            dispatch(timeStopApi(mergeDAtaDAtaDAta,employeeEditIdData))
   }
    }
 
  
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
