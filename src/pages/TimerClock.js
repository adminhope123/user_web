import styled from '@emotion/styled';
import { FormControl, TextField,Button, Box, TableBody, Table,TableRow, TableCell, Checkbox, TableContainer } from '@mui/material'
import { object } from 'prop-types';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import './style.css'
import {getTimeDataApi, timeInApipost, timeOutApiPut} from '../Redux/actions'
import { useSelector } from "react-redux";
import axios from 'axios';
import USERLIST from '../_mock/user';
import { UserListHead } from 'src/sections/@dashboard/user';
import Dashboard from './TimeComponent/Dashboard';

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
  const [dateData,setDateData]=useState()
  const {users}=useSelector(state=>state?.data)

  //   setStop(false)
  // }
 const dateFormate=()=>{
   
  }
  useEffect(() => {
  }, [])
  
  const UpdateTime=()=>{
    const  time =new Date().toLocaleTimeString();
    setLiveTime(time)
    setTimeOutLive(time)
    const  date =new Date().toLocaleDateString("es-DO");
    setDayToday(date)
  }
    
  useEffect(() => {
    UpdateTime()
    setInterval(UpdateTime,1000)
    dispatch(getTimeDataApi())
    }, [])
  return (
    <div className='timer-clock'> 
      <h6>Timer Clock</h6>
               {/* <h6>{dayToday}</h6> */}
                  {/* <h6>{liveTime }</h6> */}
                  {props.children}
                  <Dashboard/>
                <div className="employee-table">
                  <Table>
                  <UserListHead
                     order={order}
                     headLabel={TABLE_HEAD}
                     rowCount={USERLIST?.length}
                   />
                   <TableBody >
                 {
                    users&&users === undefined?"":
                    users&&users?.map((user)=>{
                     return(
                    <TableRow  key={user?.id}>
                       <TableCell align="center">{user?.date}</TableCell>
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
                         <TableCell align="center">{user?.hours+":"+user.mins+":"+user?.totalSeconds}</TableCell>
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
