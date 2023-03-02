import React, { useContext } from 'react';
import { TaskHelper } from '../store/Settings';
import '../TimeTracking.css'
import { PlayArrow, Stop } from '@mui/icons-material';
import { Fab, TableBody, TableRow } from '@mui/material';
import Moment from 'react-moment';
import moment from 'moment';
import Table from 'src/theme/overrides/Table';
import { UserListHead } from 'src/sections/@dashboard/user';
import { UserDataContext } from '../../UserDataContext';
import { useSelector } from 'react-redux';

function StopWatch(props) {
    const { 
        startRunningTask, 
        stopRunningTask, 
        getRunningTask, 
        getModelTask,dublicateValueData } = useContext(UserDataContext);
    const { classes } = props;
    const timer = getRunningTask() || getModelTask();
    const {users}=useSelector(res=>res.data)
    const startTimer = () => {
        startRunningTask({
            ...timer, 
            state: 'running', 
            totalSeconds: 0,
            start: moment().format()
        });
        sessionStorage.setItem("attendace",JSON.stringify(timer))
            const unloadCallback = (event) => {
              event.preventDefault();
              event.returnValue = "";
              return "";
            };
          
            window.addEventListener("beforeunload", unloadCallback);
            return () => window.removeEventListener("beforeunload", unloadCallback);
    }
      const stopTimer = mode => {
        stopRunningTask()
        const getData = users?.map((item) => item);
        console.log("getDAta", getData);
        const liveDate = new Date().toLocaleDateString("es-DO");
        const duplicateDate = liveDate;
        console.log("duplicateDate",duplicateDate)
        const dublicateValue = users.filter((obj) =>
          duplicateDate.includes(obj.date)
        );
        console.log("dublicateValue",dublicateValue)
        console.log("dublicateValueData",dublicateValueData)
        const getTotalWorkTime=dublicateValue?.map((item)=>{
            return item?.totalTimeWork
          })
          console.log("dublicateValueData",dublicateValue)
          console.log("getTotalWorkTime",getTotalWorkTime)
          const totalSecondsdata = sumToSeconds(getTotalWorkTime);
      const getTotalWorkDataObject=`${~~(totalSecondsdata / 60 / 60)}:${
               ~~((totalSecondsdata / 60) % 60)}:${
               ~~(totalSecondsdata % 60)}`
               console.log("totalWork",getTotalWorkDataObject)
               const totalTimeobjData={"totalWorkTime":getTotalWorkDataObject}
               console.log("totalTimeobj",totalTimeobjData)
                   sessionStorage.setItem("totalWorkTime",JSON.stringify(totalTimeobjData))
    }
    const sumToSeconds = times => {
        return times.reduce((a, e) => {
          const parts = e.trim().split(":").map(Number);
          parts.forEach((e, i) => {
            if (i < parts.length - 1) {
              parts[i+1] += e * 60;
            }
          });
          return parts.pop() + a;
        }, 0);
      };
    return(
        <div className='stop-watch'>
<React.Fragment>
            <div className="timer-container">
                <div className="timer-circle">
                    <div className="timer">
                        <div className="timer-time">
                        {`${timer.hours}:${timer.mins}`}
                        </div>
                        <div className="timer-secs">
                        {timer.secs}
                            <span className="timer-secs-span">s</span>
                        </div>
                    </div> 
                </div> 
            </div>
           <div >
           { timer.state === 'non-started' ? (
            <div>
                <Fab 
                    size="large" 
                    onClick={startTimer} 
                    color="primary" 
                    className="fab">
                        <PlayArrow/>
                </Fab>
                </div>
            ) : (
                <div>
                    {
                        timer?.totalSeconds>1?
                        <Fab 
                        size="large" 
                        onClick={stopTimer} 
                        color="secondary" 
                        className="fab">
                            <Stop/>
                    </Fab>
                    :
                    <Fab 
                        size="large" 
                        color="secondary" 
                        className="fab-disable">
                            <Stop/>
                    </Fab>
                    }
                    </div>
            )}
           </div>   
        </React.Fragment>
        </div>
    ) 
}

export default StopWatch;