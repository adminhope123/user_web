import React, { useEffect, useState } from 'react'

export default function StopWatch() {
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
    <div>
        <h1>{hour}:{min}:{second}</h1>
        <button onClick={startTime}>Start</button>
        <button onClick={stopTime}>Stop</button>
        <button onClick={resetTime}>Reset</button>
    </div>
  )
}
