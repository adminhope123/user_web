import React, { useContext } from 'react';
import { UserDataContext } from 'src/UserDataContext';
import '../TimeTracking.css'

function AgendaHeader(props) {
  const { classes } = props;
  const { addTask } = useContext(UserDataContext);
  return (
    <div className="agentHea">
        
    </div>
  );
}

export default AgendaHeader;