import styled from '@emotion/styled';
import { FormControl, TextField,Button, Box } from '@mui/material'
import { object } from 'prop-types';
import React, { useEffect, useState } from 'react'
import './style.css'
// import { useDispatch ,useSelector } from 'react-redux';
// import { loadUsers } from '../Redux/actions';


export default function TimerClock() {
  // let dispatch=useDispatch( )
  const [hour,setHour]=useState(0)
  const [min,setMin]=useState(0)
  const [second,setSecond]=useState(0)
  const [mSecond,setMSecond]=useState(0)
  const [stop,setStop]=useState(false)
  const [getTimeDataApi,setGetTimeDataApi]=useState()

  const startTime=()=>{
    setStop(false)
   
    // dispatch(loadUsers())
  }

  useEffect(() => {
    getTimeDataFunction()
  }, [])
  
  
  const getTimeDataFunction=()=>{
    fetch('http://localhost:3004/timeIn')
    .then((res) => res.json())
    .then((response) => setGetTimeDataApi(response));
  }

  const stopTime=()=>{
    setStop(true)
  }
  const resetTime=()=>{
    setHour(0)
    setMin(0)
    setSecond(0)
    setMSecond(0)
  }

  useEffect(() => {
  
  }, [])
  
  useEffect(() => {
 
       var interval=null
       if(!stop){
          interval=setInterval(()=>{
              if(min > 60){
                  setHour(hour+1)
                  setMin(0)
                  clearInterval(interval)
              }
              if(second > 59){
                  setMin(min+1)
                  setSecond(0)
                  clearInterval(interval)
               }
               if(second <= 59){
                  setSecond(second+1)
               }
          },900)
       }
       else{
          clearInterval(interval )
       }
       return()=>{
          clearInterval(interval)
          const hourObject={"hours:":hour}
          const minutesObject={"minutes":min}
          const secondObject={'second':second}
          const timeObject={...hourObject,...minutesObject,...secondObject}
          const getTimeDataApidata=getTimeDataApi?.map((item)=>item.id)
          console.log("getTimeDataApi",getTimeDataApidata)
          fetch(`http://localhost:3004/timeIn/${getTimeDataApidata}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(timeObject),
          }).then((res) => {
            console.log('res', res);
            setEmployeeEditAlert(true)
          });   
        }
    
  })
  
  return (
    <div className='timer-clock'> 
      <h6>Timer Clock</h6>
      {
        getTimeDataApi?.map((item)=>{
          return(
            <h1></h1>
          )
        })
      }
                <h1>{hour}:{min}:{second}</h1>
        {/* <button onClick={startTime}>Start</button>
        <button onClick={stopTime}>Stop</button>
        <button onClick={resetTime}>Reset</button> */}
                  <Button
                    variant="contained"
                    type="submit"
                    className="time-in"
                    sx={{marginRight:"20px",backgroundColor:"#3d3dbd"}}
                    onClick={()=>startTime()}
                   >
                    <i className="fa-solid fa-hourglass-start" style={{marginRight:"5px"}}/>
                    Time In
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    className="time-out"
                    sx={{color:"white",backgroundColor:"red"}}
                    onClick={stopTime}
                  >
                    <i className="fa-solid fa-hourglass-end" style={{marginRight:"5px"}}/>
                    Time Out
                  </Button>
                {/* <BorderLinearProgress variant="determinate" value={50} /> */}
    </div>
  )
}
