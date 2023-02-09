import styled from '@emotion/styled';
import { FormControl, TextField,Button, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './style.css'


export default function TimerClock() {
  const [hour,setHour]=useState(0)
  const [min,setMin]=useState(0)
  const [second,setSecond]=useState(0)
  const [mSecond,setMSecond]=useState(0)
  const [stop,setStop]=useState(false)
  
  const startTime=()=>{
    setStop(false)
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
       var interval=null
       if(!stop){
          interval=setInterval(()=>{
              if(min > 60){
                  setHour(hour+1)
                  setMin(0)
                  clearInterval(interval)
              }
              if(second > 60){
                  setMin(min+1)
                  setSecond(0)
                  clearInterval(interval)
               }
               if(second <= 60){
                  setSecond(second+1)
               }
          },600)
       }
       else{
          clearInterval(interval )
       }
       return()=>{
          clearInterval(interval)
       }
  })
  
  return (
    <div className='timer-clock'> 
      <h6>Timer Clock</h6>
       <form onSubmit={hadnleTimeClockSubmit}>
                  <FormControl>
                    <TextField
                      label="Date"
                      name="date"
                      type="text"
                      disabled
                      value={getDateData}
                      onChange={hadnleTimeClockOnChange}
                    />
                  <FormControl>
                    <TextField
                      label="Time"
                      type="text"
                      name="time"
                      disabled
                      value={liveTime}
                      onChange={hadnleTimeClockOnChange}
                    />
                  </FormControl>
                  </FormControl>
                  <Box sx={{marginTop:"10px"}}>
                  <Button
                    variant="contained"
                    type="submit"
                    className="time-in"
                    sx={{marginRight:"20px",backgroundColor:"#3d3dbd"}}
                   >
                    <i className="fa-solid fa-hourglass-start" style={{marginRight:"5px"}}/>
                    Time In
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    className="time-out"
                    sx={{color:"white",backgroundColor:"red"}}
                  >
                    <i className="fa-solid fa-hourglass-end" style={{marginRight:"5px"}}/>
                    Time Out
                  </Button>
                  </Box>
                </form>
                <h1>{hour}:{min}:{second}</h1>
        <button onClick={startTime}>Start</button>
        <button onClick={stopTime}>Stop</button>
        <button onClick={resetTime}>Reset</button>
                {/* <BorderLinearProgress variant="determinate" value={50} /> */}
    </div>
  )
}
