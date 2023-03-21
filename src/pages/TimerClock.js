import styled from '@emotion/styled';
import { FormControl, TextField,Button, Box, TableBody, Table,TableRow, TableCell, Checkbox, TableContainer, DialogContent, DialogTitle, Dialog, Slide, DialogContentText, DialogActions } from '@mui/material'
import { object } from 'prop-types';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import './style.css'
import {getTimeDataApi, timeInApipost, timeOutApiPut,timetotal} from '../Redux/actions'
import { useSelector } from "react-redux";
import axios from 'axios';
import USERLIST from '../_mock/user';
import { UserListHead } from 'src/sections/@dashboard/user';
import Dashboard from './TimeComponent/Dashboard';
import { UserDataContext } from 'src/UserDataContext';
import { setHours } from 'date-fns';
import LoaderComp from 'src/loader/LoaderComp';

const TABLE_HEAD = [
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'day', label: 'Day', alignRight: false },
  { id: 'timeIn', label: 'Time In', alignRight: false },
  { id: 'timeOut', label: 'Time Out', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'totalWorked', label: 'Total Worked', alignRight: false },
];

export default function TimerClock(props) {
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const timeLive=new Date().toLocaleTimeString()
  const [liveTime,setLiveTime]=useState(timeLive)
  const [timeOutLive,setTimeOutLive]=useState(timeLive)
  const liveDate=new Date().toLocaleDateString("es-DO")
  const [dayToday,setDayToday]=useState(liveDate)
  const [getdataaa,setGetdataaa]=useState()
  const dispatch=useDispatch()
  const [dateData,setDateData]=useState([])
  const [totalHours,setTotalHours]=useState()
  const [totalMinite,setTotalMinite]=useState()
  const [totalSecound,setTotalSecound]=useState()
  const [filterdataTotalTime,setFilterdataTotalTime]=useState()
  const [totalWorkTimeDataData,setTotalWorkTimeDataData]=useState()
  const {users}=useSelector(state=>state?.data)
  const {totalWorkTimeData,findDateFunction,getEmployeeId,totalTimeModel,setTotalTimeModel}=useContext(UserDataContext)
  const {total}=useSelector(res=>res.data)
 
  const [totalWorkData,setTotalWorkData]=useState()
  


  const UpdateTime=()=>{
    const  time =new Date().toLocaleTimeString();
    setLiveTime(time)
    setTimeOutLive(time)
    const  date =new Date().toLocaleDateString("es-DO");
    setDayToday(date)
  }
  
  useEffect(()=>{
    hoursTotalFunction()
  },[users])
  
  const hoursTotalFunction=()=>{
    const  date =new Date().toLocaleDateString("es-DO");
    const userFilter=users?.filter((item)=>item.date===date)
    const getUserDataGet=JSON.parse(sessionStorage.getItem("userData"))
    const getUserDataTime=getUserDataGet?.map((item)=>{
        const filterData=userFilter?.filter((ele)=>{return ele.employeeId===item.E_Id})
        setDateData(filterData)
    })
  }
  const handleTotalTimeModelClose = () => {
    setTotalTimeModel(false);
  };
  const handleTotalTime = () => {
    setTotalTimeModel(true)
    const getDatadaaa=JSON.parse(sessionStorage.getItem("userData"))
    getDatadaaa?.map((ele)=>{
       ele?.getEmployeeId
       const filterdataaa=users?.filter((item)=>ele?.E_Id=== item?.employeeId)
       if(filterdataaa){
         setFilterdataTotalTime(filterdataaa)
       }
      })
    const liveDate = new Date().toLocaleDateString("es-DO");
    const duplicateDate = liveDate;
    const dublicateValue = filterdataTotalTime?.filter((obj) =>
      duplicateDate?.includes(obj?.date)
    );
    const getTotalWorkTime=dublicateValue?.map((item)=>{
        return item?.totalTimeWork
      })
    
      const totalSecondsdata = sumToSeconds(getTotalWorkTime);
      
  const getTotalWorkDataObject=`${~~(totalSecondsdata / 60 / 60)}:${
           ~~((totalSecondsdata / 60) % 60)}:${
           ~~(totalSecondsdata % 60)}`
           
           setTotalWorkTimeDataData(getTotalWorkDataObject)
           const totalTimeobjData={"totalWorkTime":getTotalWorkDataObject}
               sessionStorage.setItem("totalWorkTime",JSON.stringify(totalTimeobjData))

               const getTotalWorkTimeTime=filterdataTotalTime?.map((item)=>{
                 return item?.totalTimeWork
               })
               const totalSecondsdataData = sumToSeconds(getTotalWorkTimeTime);
               const getTotalWorkDataObjectData=`${~~(totalSecondsdataData / 60 / 60)}:${
                ~~((totalSecondsdataData / 60) % 60)}:${
                ~~(totalSecondsdataData % 60)}`
                const totalTimeobjDataData={"totalWorkTime":getTotalWorkDataObjectData}
                localStorage.setItem("totalAllTimeWork",JSON.stringify(totalTimeobjDataData))
              };
 


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

// const getTotalWorkTime=()=>{
//    const data=JSON.parse(sessionStorage.getItem("totalWorkTime"))
//    const getData=data?.totalWorkTime
//    setTotalWorkTime(getData)
// }
  useEffect(() => {
    UpdateTime()
    setInterval(UpdateTime,1000)
    dispatch(getTimeDataApi())
    hoursTotalFunction()
  }, [])
  useEffect(() => {
    dateData?.reverse();
  }, [dateData])
  return (
    <div className='timer-clock'> 
      <h6>Timer Clock</h6>
       {/* {
        !users.length ?    */}
        <div>
                 {props.children}
                 <div className='clock-time'>
                 <Dialog
       open={totalTimeModel}
       onClose={handleTotalTimeModelClose}
       aria-describedby="alert-dialog-slide-description"
     >
       <DialogTitle>{"Today Work"}</DialogTitle>
       <DialogContent>
         <DialogContentText id="alert-dialog-slide-description">
         <FormControl>
         <TextField
         id="outlined-read-only-input"
         defaultValue={totalWorkTimeDataData}
         disabled
       />
         </FormControl>
         </DialogContentText>
       </DialogContent>
       <DialogActions>
         <Button onClick={handleTotalTimeModelClose}>Agree</Button>
       </DialogActions>
     </Dialog>
                 <Dashboard/>
                 <Button variant="contained" onClick={handleTotalTime}>
           Total Time
         </Button>
                  {/* <div className='clock'>
                   <span className='clock-text'>Today Work Time</span>
                 <span>{totalWorkTime}</span>
                   </div> */}
                 </div>
               <div className="employee-table">
                 <Table id="table-1">
                 <UserListHead
                    order={order}
                    headLabel={TABLE_HEAD}
                    rowCount={USERLIST?.length}
                  />
                  <TableBody >
                {
                   dateData&&dateData === undefined?"":
                   dateData&&dateData?.map((user)=>{
                    return(
                     
                   <TableRow  key={user?.id}>
                   
                      <TableCell align="center">  <div id="Table1" className='bg-employee-table' style={{backgroundColor:`${user?.color}`}}>s</div>{user?.date}</TableCell>
                         <TableCell align="center">{user?.day}</TableCell>
                      <TableCell align="center">{user.start?.slice(11, 19)}</TableCell>
                      {
                        user.stop?
                        <TableCell align="center">{user?.stop.slice(11,19)}</TableCell>: <TableCell align="center">{""}</TableCell>
                       }
                       <TableCell align="center" className={user.state==="stopped"?"stopped-bg":"running-bg"}>
                         {
                           user.state==='running'?
                           <div class="online-indicator">
                             <span class="blink"></span>
                             <table id="header-fixed"></table>
                             
                           </div>
                       :""
                         }
                         {
                           user.state==='stopped'?
                           <div class="online-indicator-stopped">
                           <span class="blink-stopped"></span>
                         </div>
                         :""
                         }
                       </TableCell>
                        <TableCell align="center">{user?.hours+":"+user.mins+":"+user?.secs}</TableCell>
                   </TableRow>
                    )
                   })
                 }
                 </TableBody>
                 </Table>
               </div>
        </div>
        {/* :<LoaderComp/>
       } */}
                {/* <BorderLinearProgress variant="determinate" value={50} /> */}
    </div>
  )
}
