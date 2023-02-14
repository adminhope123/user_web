import React,{ useState, createContext, useRef, useEffect } from 'react';
import {v4} from 'uuid';
import { APP_TITLE, COLORS } from './Settings';
import moment from 'moment';
import '../TimeTracking.css'
import { useDispatch } from 'react-redux';
import { timeAddpost, timeOutApiPut, timeStartApi, timeStopApi } from 'src/Redux/actions';

const storedString = localStorage.getItem('tasks')
const storedTasks = storedString ? JSON.parse(storedString) : [];
let interval;


export const TaskContext = createContext();
export const TaskProvider = props => {
    const intervalRef = useRef();
    const [ tasks, setTasks ] = useState(storedTasks);
    const [timeStart,setTimeStart]=useState()
    const [timeStop,setTimeStop]=useState()

    const getColor = () => {
        const random = Math.ceil(Math.random() * 7);
        return COLORS[random];
    }
    const getModelTask = () => ({
        id: v4(),
        state: 'non-started',
        parent: false,
        start: false,
        stop: false,
        color: getColor(),
        hours: '00',
        mins: '00',
        secs: '00',
        description: '',
        category: '',
        totalSeconds: 0
    })
    const dispatch=useDispatch();
    const getRunningTask = () => tasks.find(t => t.state === 'running');
    const getTask = id => tasks.find(t => t.id === id);
    const addTask = task => {
        setTasks(prevTasks => {
            const ntask = task ? {...task } : getModelTask();
            localStorage.setItem('tasks', JSON.stringify([...prevTasks, ntask]))
            return [...prevTasks, ntask]
        })
    } 
    const editTask = task => {
        setTasks(prevTasks => {
  
            const index = prevTasks.findIndex(t => t.id === task.id);
            prevTasks[index] = task;
            localStorage.setItem('tasks', JSON.stringify(prevTasks))
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
    })

 
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
            ...getPaddedTime(runningTask.totalSeconds),
            state: 'stopped'
        })
        document.title = APP_TITLE;
        clearInterval(interval)
        const storedString = localStorage.getItem('tasks')
       const storedTasks = storedString ? JSON.parse(storedString) : [];
       const data=storedTasks?.slice(-1).pop()
        const runningTaskId=data?.id
        dispatch(timeStopApi(data,runningTaskId))
        console.log("stoptask",runningTaskId)
    }
    const properties = {
        tasks,
        getTask,
        addTask,
        editTask,
        getModelTask,
        duplicateTask,
        getRunningTask,
        startRunningTask,
        stopRunningTask,
        deleteTask,
    }

    return(
        <TaskContext.Provider value={properties}>
            {props.children}
        </TaskContext.Provider>
    )
}