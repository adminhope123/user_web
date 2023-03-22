import { FormControl, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import './ForgotPassword.css'
import HopeIconLogo from './HopeIcon.png'

export default function ForgotPassword() {
  return (
    <div>
        <div class="mainDiv">
  <div class="cardStyle">
    <form>
      <div className='img-logo'>
      <img src={HopeIconLogo} />
      </div>
      
      <h2 class="formTitle">
        Forgot Password In Your Account
      </h2>
      <Box sx={{display:"flex",justifyContent:"center",marginTop:"20px"}}>
      <FormControl sx={{width:"350px"}}>
      <TextField id="outlined-basic" label="Email" variant="outlined" />
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
