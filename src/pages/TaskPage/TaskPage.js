import { Box, Button, FormControl,Typography, Modal, TextField } from '@mui/material';
import React, { useState } from 'react'
import { AppTasks } from 'src/sections/@dashboard/app';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { addTask } from 'src/Redux/actions';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "400px",
    borderRadius:"10px",
    bgcolor: 'background.paper',
    hight:"266px",
    boxShadow: 24,
    p: 4,
  };

export default function TaskPage() {
    const [taskModel,setTaskModel]=useState(false)
const [taskAdd,setTaskAdd]=useState({
    E_Id:"",
    task:"",
    read:""

})
const dispatch=useDispatch()

const handleOnChage=(e)=>{
    const value = e.target.value;
    setTaskAdd(value); 
}
const handleOpen = () => setTaskModel(true);
  const handleClose = (e) => {
    setTaskModel(false)
    e.preventDefault()
    console.log("taskAdd",taskAdd)
    const taskAddObject={"task":taskAdd}
    const getUserId=JSON.parse(sessionStorage.getItem("userData"))
    const getUserIdData=getUserId?.map((item)=>{return item?.E_Id})
    const employeeId={"E_Id":getUserIdData.toString()}
    const readData={"readTask":false}
    const dataMerge={...taskAddObject,...employeeId,...readData}
    console.log("taskAddObject",dataMerge)
  };

  return (
    <div>
           <Box sx={{display:"flex",justifyContent:"flex-end",marginBottom:"10px"}}>
         <Button onClick={handleOpen}> <span> Add Task</span><AddTaskIcon sx={{marginLeft:"5px"}}/></Button>
         </Box>
            <Modal
        open={taskModel}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
     
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginTop:"-22px",fontWeight:"600",marginBottom:"20px"}}> 
            Add Task
          </Typography>
        
          <form onSubmit={handleClose}>
            <FormControl sx={{width:"100%"}}>
            <TextField id="outlined-basic" label="Add Task" variant="outlined" sx={{width:"100%"}} value={taskAdd?.task}  onChange={handleOnChage}/>
            </FormControl>
            <Box sx={{display:"flex",justifyContent:"space-between",marginTop:"10px"}}>
            <Button sx={{marginTop:"10px"}} onClick={()=>handleClose()}><span>Close</span></Button>
            <Button sx={{marginTop:"10px"}} type="submit"><span>Add Task</span><AddIcon sx={{marginLeft:"5px"}}/></Button>
            </Box>
          </form>
        </Box>
      </Modal>
      <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
    </div>
  )
}
