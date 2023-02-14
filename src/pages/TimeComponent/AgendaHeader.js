import React, { useContext } from 'react';
import { TaskContext } from '../store/TaskContext';
import '../TimeTracking.css'

function AgendaHeader(props) {
  const { classes } = props;
  const { addTask } = useContext(TaskContext);
  return (
    <div className="agentHea">
        
    </div>
  );
}

export default AgendaHeader;