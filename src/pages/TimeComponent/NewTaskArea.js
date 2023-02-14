import React from 'react';
import StopWatch from './StopWatch';
import { Grid } from '@mui/material';
import '../TimeTracking.css'


function NewTaskArea({ classes }) {

    return(
       <div className='new-task-area'>
         <Grid item xs={3} className="content">
            <StopWatch/>
        </Grid>
       </div>
    ) 
}

export default NewTaskArea;