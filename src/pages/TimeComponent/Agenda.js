import React, { useContext } from 'react';
import TaskItem from './TaskItem';
import AgendaHeader from './AgendaHeader';
import { Grid } from '@mui/material';
import '../TimeTracking.css'
import { UserDataContext } from 'src/UserDataContext';

function Agenda({ classes }) {
    const { tasks } = useContext(UserDataContext);

    return(
       <div className='agent-cmp'>
         <Grid item xs={9} className="content">
            <AgendaHeader/>
            <div className="tasks-container">
                <div>
                { tasks.map(task => <TaskItem task={task} key={task.timerId}/>) }
                </div>
            </div>
        </Grid>
        </div>
    ) 
}

export default Agenda;