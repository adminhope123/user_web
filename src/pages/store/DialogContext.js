import React, { useState, createContext } from "react";
import '../TimeTracking.css'

export const DialogContext = createContext();

export const DialogProvider = function(props){
  const [dialog, setDialog] = useState({ open: false, title: 'Add Task', taskId: false });
    return (
      <DialogContext.Provider value={{dialog, setDialog}}>
        {props.children}
      </DialogContext.Provider>
    )
}