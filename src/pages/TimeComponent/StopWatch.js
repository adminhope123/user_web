import React, { useContext, useState } from 'react';
import { TaskHelper } from '../store/Settings';
import '../TimeTracking.css'
import { PlayArrow, Stop } from '@mui/icons-material';
import { Alert, Box, Fab, Snackbar, Stack, TableBody, TableRow } from '@mui/material';
import Moment from 'react-moment';
import moment from 'moment';
import Table from 'src/theme/overrides/Table';
import { UserListHead } from 'src/sections/@dashboard/user';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
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
    const [startAlert, setStartAlert] = useState(false);
    const [stopAlert, setStopAlert] = useState(false);

      
  const allReadyDataAlertFunctionClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setStartAlert(false);
  };
  const stopTrackerFunction = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setStopAlert(false);
  };
    const startTimer = () => {
        setStartAlert(true)
        startRunningTask({
            ...timer, 
            state: 'running', 
            totalSeconds: 0,
            start: moment().format()
        });
        const dataRunning=users?.filter((item)=>item?.state==="running")
          sessionStorage.setItem("online",JSON.stringify(dataRunning))
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
        setStopAlert(true)
    }
 
      
    return(
        <div className='stop-watch'>
              <Box>
    <Stack>
            <Snackbar open={startAlert} autoHideDuration={6000}  onClose={allReadyDataAlertFunctionClose} className="start-alert" >
              <Alert onClose={allReadyDataAlertFunctionClose}   variant="filled" severity="success">
                  Tracker Start
              </Alert>
            </Snackbar>
          </Stack>
    </Box>
    <Box>
    <Stack>
            <Snackbar open={stopAlert}  autoHideDuration={6000} onClose={stopTrackerFunction} className="stop-alert" >
              <Alert onClose={stopTrackerFunction}   variant="filled" severity="error">
                  Tracker Stop
              </Alert>
            </Snackbar>
          </Stack>
    </Box>
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