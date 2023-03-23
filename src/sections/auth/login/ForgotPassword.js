import { FormControl, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDataApi } from 'src/Redux/actions'
import './ForgotPassword.css'
import HopeIconLogo from './HopeIcon.png'

export default function ForgotPassword() {
    const [emailData,setEmailData]=useState()
    const dispatch=useDispatch()
    const {users}=useSelector(res=>res.data)

    const hadnleDataSubmit=(e)=>{
e.preventDefault()
  const filterData=users?.filter((item)=>item.email===emailData)
    }

    const getEmployeeData=()=>{
        dispatch(getUserDataApi())
    }

    useEffect(() => {
       getEmployeeData()
    }, [])
    
    
  return (
    <div>
        <div class="mainDiv">
  <div class="cardStyle">
    <form onSubmit={hadnleDataSubmit}>
      <div className='img-logo'>
      <img src={HopeIconLogo} />
      </div>
      
      <h2 class="formTitle">
        Forgot Password In Your Account
      </h2>
      <Box sx={{display:"flex",justifyContent:"center",marginTop:"20px"}}>
      <FormControl sx={{width:"350px"}}>
      <TextField id="outlined-basic" label="Email" variant="outlined" type="email" onChange={(e)=>{setEmailData(e.target.value)}}/>
      </FormControl>
      </Box>
    <div class="buttonWrapper">
      <button type="submit"   class="submitButton pure-button pure-button-primary">
        <span>Continue</span>
      </button>
    </div>
      
  </form>
  </div>
</div>
    </div>
  )
}
