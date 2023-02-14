import React, { useContext } from 'react';
import TaskItem from './TaskItem';
import AgendaHeader from './AgendaHeader';
import { TaskContext } from "../store/TaskContext";
import { Grid } from '@mui/material';
import '../TimeTracking.css'

function Agenda({ classes }) {
    const { tasks } = useContext(TaskContext);

    return(
       <div className='agent-cmp'>
         <Grid item xs={9} className="content">
            <AgendaHeader/>
            <div className="tasks-container">
                <div>
                { tasks.map(task => <TaskItem task={task} key={task.id}/>) }
                </div>
            </div>
        </Grid>
        </div>
    ) 
}

export default Agenda;