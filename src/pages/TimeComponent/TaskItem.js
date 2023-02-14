import React, { useContext } from 'react';
import moment from 'moment';
import { TaskContext } from '../store/TaskContext';
import _ from 'lodash';
import { TextField } from '@mui/material';
import '../TimeTracking.css'


function TaskItem(props) {
    const { task, classes } = props;
    const { editTask } = useContext(TaskContext);
    const startTime = task.start ? moment(task.start).format('HH:mm') : '00:00';
    const stopTime = task.stop ? moment(task.stop).format('HH:mm') : '00:00';
    const debouncedEdit = _.debounce((key, value) => editTask({ ...task, [key]: value }), 1000)
    const handleCategory = event => {
        const { value } = event.currentTarget
        debouncedEdit('category', value);
    }

    const handleDescription = event => {
        const { value } = event.currentTarget
        debouncedEdit('description', value);
    }
 
    
    return(
        <div className="task-item-component" >
            <div className="task-time">
                <div className="start-stime">{startTime}</div>
                <div className="stop-time">{stopTime}</div>
            </div>
            <div className="divider" style={{ backgroundColor: task.color }}></div>
        </div>
    ) 
}

export default TaskItem;