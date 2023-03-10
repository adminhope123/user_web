import React, { useContext, useState } from 'react';
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
        getModelTask,dublicateValueData,storedTasks,timerStartData,getEmployeeId } = useContext(UserDataContext);
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
 
    }
 
      
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
           <button onClick={stopTimer}>Click</button>
        </React.Fragment>
        </div>
    ) 
}

export default StopWatch;