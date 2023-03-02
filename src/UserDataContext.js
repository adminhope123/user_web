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
  const userGetDataFunction = () => {
    const getData = JSON.parse(sessionStorage.getItem("userData"));
    if(getData){
      const getUserData = Object.assign({}, ...getData);
      setUserGetData(getUserData);
    }
  };
  useEffect(() => {
    userGetDataFunction()
  }, [])
  
  const getColor = () => {
    const random = Math.ceil(Math.random() * 7);
    return COLORS[random];
}
const liveDate=new Date().toLocaleDateString("es-DO")
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
 const dayData=days[new Date().getDay()]

 useEffect(() => {
  const getData=JSON.parse(sessionStorage.getItem("userData"))
  const dataaa=getData?.map(item=>item?.E_Id)
  const arrayRemove=` ${dataaa}`
  console.log("data",arrayRemove)
  setGetEmployeeId(arrayRemove)
}, [])

const getModelTask = () => ({
    employeeId:getEmployeeId,
    id: v4(),
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
    description: '',
    category: '',
    present:true,
    absent:false,
    totalSeconds: 0,
})


useEffect(() => {
  const dataGet = JSON.parse(sessionStorage.getItem('timeTotal'))
  console.log("dataGet",dataGet)
  setTotalTimeData(dataGet)
}, [])


const getRunningTask = () => tasks.find(t => t.state === 'running');
const getTask = id => tasks.find(t => t.id === id);
const addTask = task => {
    setTasks(prevTasks => {
        const ntask = task ? {...task } : getModelTask();
        sessionStorage.setItem('tasks', JSON.stringify([...prevTasks, ntask]))
        return [...prevTasks, ntask]
    })
} 
const editTask = task => {
    setTasks(prevTasks => {
        const index = prevTasks.findIndex(t => t.id === task.id);
        prevTasks[index] = task;
        sessionStorage.setItem('tasks', JSON.stringify(prevTasks))
        const data=prevTasks.slice(-1).pop()
        return [...prevTasks];
    })
}
const duplicateTask = id => {
    const parent = getTask(id);
    addTask({
        ...getModelTask(), 
        description: parent.description,
        category: parent.category,
        parent: parent.id || id,
    })
}
const deleteTask = task => {
    let ntasks = tasks.filter(t => t.id !== task.id)
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
        getTask(task.id) 
            ? editTask({ 
                    ...task,
                    state: 'running',
                    totalSeconds: 0,
                    start: moment().format(),
                    ...getPaddedTime(task),
                })
            : addTask(task)
            dispatch(timeStartApi(task))
            console.log("taskStart",task)
        interval = setInterval(() => { intervalRef.current() },1000)
    }
}

const stopRunningTask = () => {
    const runningTask = getRunningTask();
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
    const runningTaskId=data?.id
    console.log("data",data)
      const totalTimnDataAdd=data?.hours+":"+data?.mins+":"+data?.secs
      const totalTimeDataAddObject={"totalTimeWork":totalTimnDataAdd}
      console.log("totalTimeDataAddObject",totalTimeDataAddObject)
      const mergeObject={...data,...totalTimeDataAddObject}
      dispatch(timeStopApi(mergeObject,runningTaskId))

    
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
    getEmployeeId,
    stopRunningTask,
    deleteTask,
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
