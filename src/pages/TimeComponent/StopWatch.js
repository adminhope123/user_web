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
import { useDispatch, useSelector } from 'react-redux';
import { getUserDataApi, timeStopApi } from 'src/Redux/actions';

function StopWatch(props) {
    const { 
        startRunningTask, 
        stopRunningTask, 
        getRunningTask, 
        getModelTask,dublicateValueData,storedTasks,timerStartData,getEmployeeId,dataTimerStop,stopTimerIdDataData } = useContext(UserDataContext);
    const { classes } = props;
    const timer = getRunningTask() || getModelTask();
    const {users}=useSelector(res=>res.data)
    const [startAlert, setStartAlert] = useState(false);
    const [stopAlert, setStopAlert] = useState(false);
    const dispatch=useDispatch()

      
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
        const dataGetDataaa=JSON.parse(sessionStorage.getItem("userData"))
        const getEmployeeData=dataGetDataaa?.map((item)=>{return item?.userName})
        const dataRunning=users?.filter((item)=>item?.state==="running")
        //   const notification = new Notification(getEmployeeData +" is Online", {
        //     // body:getEmployeeData
        //  })
            const unloadCallback = (event) => {
              event.preventDefault();
              event.returnValue = "";
              return "";
            };
          
            window.addEventListener("beforeunload", unloadCallback);
            return () => window.removeEventListener("beforeunload", unloadCallback);
        
    }
    
      const stopTimer = mode =>{
          setStopAlert(true)
        stopTimerIdDataData?.map((item)=>{
              const employeeEditIdData=item?.id
              dispatch(timeStopApi(dataTimerStop,employeeEditIdData))
            })
        stopRunningTask() 
          const getDatadaaa=JSON.parse(sessionStorage.getItem("userData"))
          const totalTimerFilterDataaaaaa=users?.filter((ele)=>getDatadaaa?.find(item=>item?.E_Id===ele?.employeeId))
          console.log("totalTimerFilterDataaaaaa",totalTimerFilterDataaaaaa)
    }
    const sumToSeconds = times => {
      return times?.reduce((a, e) => {
        const parts = e?.trim().split(":").map(Number);
        parts?.forEach((e, i) => {
          if (i < parts.length - 1) {
            parts[i+1] += e * 60;
          }
        });
        return parts?.pop() + a;
      }, 0);
    };
      
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