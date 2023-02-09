import styled from '@emotion/styled';
import { FormControl, TextField,Button, Box } from '@mui/material'
import  CountownClock from './Timeing/CountownClock'
import React, { useEffect, useState } from 'react'
import './style.css'


export default function TimerClock() {
  const dateLive=new Date().toLocaleDateString("en-GB")
  const [getDateData,setGetDateData]=useState(dateLive)
  const timeLive=new Date().toLocaleTimeString()
  const [liveTime,setLiveTime]=useState(timeLive)
  const [timeClockForm,setTimeClockForm]=useState({
    date:getDateData,
    time:liveTime
  })

   useEffect(() => {
   }, [])
   
   const UpdateTime=()=>{
   const  time =new Date().toLocaleTimeString();
      setLiveTime(time)
   }
   const UpdateDate=()=>{
    const  time =new Date().toLocaleDateString("en-GB");
    setGetDateData(time)
    }
  const hadnleTimeClockOnChange = (e) => {
    if (e) {
      const name = e?.target.name;
      const value = e?.target.value;
      setTimeClockForm({ ...timeClockForm, [name]: value });
    }
  };
  setInterval(UpdateTime,1000)
  setInterval(UpdateDate,1000)
  const hadnleTimeClockSubmit=(e)=>{
    e.preventDefault();
    console.log("timeClock",timeClockForm)
    console.log("liveTime",liveTime)
  }

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
                <CountownClock/>
                {/* <BorderLinearProgress variant="determinate" value={50} /> */}
    </div>
  )
}
