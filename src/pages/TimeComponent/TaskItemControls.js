import { Redo, Stop } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState, useContext } from 'react';
import { TaskContext } from "../store/TaskContext";
import '../TimeTracking.css'

function TaskItemControls(props) {
    const { task, classes } = props;
    const { 
        deleteTask, 
        duplicateTask, 
        startRunningTask, 
        stopRunningTask } = useContext(TaskContext);
    const [ menuAnchor, setMenu ] = useState(null);
    const handleMenu = e => setMenu(e.currentTarget);
    const handleClose  = () => setMenu(null);
    const handleReStart = () => duplicateTask(task.id);
    const handleStart = () => startRunningTask(task);
    const handleStop = () => stopRunningTask();
    const handleDelete = () => {
        deleteTask(task);
        setMenu(null);
    } 
    const formatDuration = () => {
        return task.hours === '00' && task.mins === '00' && task.secs === '00' 
                ? 'Pending' 
                : `${task.hours}:${task.mins}:${task.secs}`;
    }
    const getActionButton = () => {
        switch (task.state) {
            case 'non-started':
                return (
                <IconButton className="button"
                            onClick={handleStart} 
                            aria-label="Edit">
                    <PlayArrow className="icon"/>
                </IconButton>)
            case 'stopped':
                return (
                <IconButton className="button"
                            onClick={handleReStart} 
                            aria-label="Re-start">
                    <Redo className="icon" />
                </IconButton>)
            default:
                    break;
        }
        return (
            <IconButton className="button" 
                        onClick={handleStop} 
                        aria-label="Stop">
                <Stop className="icon" />
            </IconButton>)
    }

    return(
        <div className="controls">
            <div className="duration">
                {formatDuration()}
            </div>
            {getActionButton()}
            <IconButton className="button"
                        aria-owns={menuAnchor ? 'task-menu' : undefined}
                        aria-haspopup="true"
                        onClick={handleMenu} 
                        aria-label="Delete">
                {/* <MoreVertIcon className="icon"/> */}
            </IconButton>
            <Menu
                id="task-menu"
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
        </div>
    ) 
}

export default TaskItemControls;