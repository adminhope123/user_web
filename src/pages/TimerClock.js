import styled from '@emotion/styled';
import { FormControl, TextField,Button, Box, TableBody, Table,TableRow, TableCell, Checkbox, TableContainer } from '@mui/material'
import { object } from 'prop-types';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import './style.css'
import {getTimeDataApi, timeInApipost, timeOutApiPut} from '../Redux/actions'
import { useSelector } from "react-redux";
import axios from 'axios';
import USERLIST from '../_mock/user';
import { UserListHead } from 'src/sections/@dashboard/user';
import Dashboard from './TimeComponent/Dashboard';
import { UserDataContext } from 'src/UserDataContext';
import { setHours } from 'date-fns';

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
  const [totalWorkTime,setTotalWorkTime]=useState()
  const [totalHours,setTotalHours]=useState()
  const [totalMinite,setTotalMinite]=useState()
  const [totalSecound,setTotalSecound]=useState()
  const {users}=useSelector(state=>state?.data)
  const {totalWorkTimeData}=useContext(UserDataContext)
  
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
    const userFilter=users.filter((item)=>item.date===date)
    setDateData(userFilter)
    console.log("users",users)
    const totalSecondsData = users?.reduce(
      (acc, cur) => acc + cur.totalSeconds,
      0
    );
 
  getPaddedTime(totalSecondsData)
    console.log("totalSecondsData",totalSecondsData)
    console.log("userFilter",userFilter)
    console.log("totalWorkTime",totalWorkTime)
    console.log("users",users)
    const filterData=users?.filter(
      (v, i, a) => a?.findIndex((v2) => v2.date === v.date) === i
    );
    const totalObjectCreate={"totalWork":totalWorkTimeData}
    console.log("totalObjectCreate",totalObjectCreate)

    const arrayOfObjectRemove=Object.assign({},...filterData)
    const addObject={...arrayOfObjectRemove,...totalObjectCreate}
    console.log("addObject",addObject)
    if(addObject){
      sessionStorage.setItem("totalWork",JSON.stringify(addObject))
    }
    console.log("totalWorkTime",totalWorkTime)
  }
  const getPaddedTime = totalSeconds => {
    const addPadding = value => value.toString().length === 1 ? `0${value}` : value;
    const hours = Math.floor(totalSeconds / 3600);
    const remainingSecs = totalSeconds - hours * 3600;
    const minutes = Math.floor(remainingSecs / 60);
    const seconds = remainingSecs - minutes * 60;
    updateAppTitle(hours, minutes, seconds);
    setTotalWorkTime(hours + ":" + minutes + ":" + seconds);
    setTotalHours(hours)
    setTotalMinite(minutes)
    setTotalSecound(seconds)
    return { 
        hours: addPadding(hours),
        mins: addPadding(minutes),
        secs: addPadding(seconds),
    }
} 
const updateAppTitle = (hours, mins, secs) => {
  document.title = hours > 0
                      ? `${hours} hour`
                      : mins > 0 ? `${mins} min ${secs} sec` : `${secs} sec`;
}
 
const timeTotalDataSet=()=>{
  const getData=JSON.parse(sessionStorage.getItem("totalWork"))
    if(getData){
      const getHours=getData?.totalWork
      setTotalHours(getHours)
    }
}

  useEffect(() => {
    UpdateTime()
    setInterval(UpdateTime,1000)
    dispatch(getTimeDataApi())
    timeTotalDataSet()
    hoursTotalFunction()
    }, [])
    
  return (
    <div className='timer-clock'> 
      <h6>Timer Clock</h6>
               {/* <h6>{dayToday}</h6> */}
                  {/* <h6>{liveTime }</h6> */}
                  {props.children}
                  {/* <button onClick={()=>data()}>click</button> */}
                  <div className='clock-time'>

                  <Dashboard/>
                   <div className='clock'>
                    <span className='clock-text'>Today Work Time</span>
                  <span>{totalHours}</span>:
                  <span>{totalHours}</span>:
                  <span>{totalHours?.slice(6, 19)}</span> 
                    </div>
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
                       <TableCell align="center">{user.start?.slice(12, 19)}</TableCell>
                       {
                         user.stop?
                         <TableCell align="center">{user.stop.slice(12,19)}</TableCell>: <TableCell align="center">{""}</TableCell>
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
                {/* <BorderLinearProgress variant="determinate" value={50} /> */}
    </div>
  )
}
