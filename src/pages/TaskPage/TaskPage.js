import { Box, Button, FormControl,Typography, Modal, TextField, Stack, IconButton, Popover, Divider, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { AppTasks } from 'src/sections/@dashboard/app';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, taskAddApi, taskDeleteApi, taskgetApi } from 'src/Redux/actions';
import Iconify from 'src/components/iconify/Iconify';

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
const [open, setOpen] = useState(null);
const [getUserData,setGetUserData]=useState()
const [deletDataTask,setDeletDataTask]=useState()

const dispatch=useDispatch()
const {tasks}=useSelector(res=>res.data)

const handleOpenMenu = (item) => {
  console.log("handleOpenMenu",item)
  setDeletDataTask(item)
  // setOpen(event?.currentTarget);
  // console.log(event)
};
const handleCloseMenu = () => {
  setOpen(null);
};
const handleOnChage=(e)=>{
    const value = e.target.value;
    setTaskAdd(value); 
}
const getTaskApiData=()=>{
  dispatch(taskgetApi())
}

const dataFunction=()=>{
  const getUserDataData=JSON.parse(sessionStorage.getItem("userData"))
if(getUserDataData,tasks){
  const dataFilter=tasks?.filter((item)=>getUserDataData?.find(el=>item?.E_Id===el?.E_Id))
  if(dataFilter){
    setGetUserData(dataFilter)
  }
}
}

useEffect (() => {
  getTaskApiData()
  dataFunction()
}, [])

const handleDelete = (item) => {
  console.log("deletDataTask",item)
  console.log("deletDataTask",deletDataTask)
  handleCloseMenu();
  const employeeEditIdData=deletDataTask?.id
  if(employeeEditIdData){
    dispatch(taskDeleteApi(employeeEditIdData))
  }
};

const handleOpen = () => setTaskModel(true);
  const handleClose = (e) => {
    setTaskModel(false)
    e.preventDefault()
    const taskAddObject={"task":taskAdd}
    const getUserId=JSON.parse(sessionStorage.getItem("userData"))
    const getUserIdData=getUserId?.map((item)=>{return item?.E_Id})
    const employeeId={"E_Id":getUserIdData.toString()}
    const readData={"read":"false"}
    const dataMerge={...taskAddObject,...employeeId,...readData}
    dispatch(taskAddApi(dataMerge))
  };

  return (
    <div>
           <Box sx={{display:"flex",justifyContent:"flex-end",marginBottom:"10px"}}>
           <Button  variant="contained" onClick={() => dataFunction()} sx={{marginRight:"20px"}}>
           <span> Data Refresh</span>
          <RefreshIcon sx={{marginLeft:"10px"}}/>
          </Button>
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
      <Stack
      direction="row"
      className='task-data'
    >
{/* <button onClick={taskTableData}>taskTableData</button> */}
          {/* <FormControlLabel
            control={ <Checkbox
              // checked={isTrue}
              // value={JSON.parse(taskData?.read)}
              defaultChecked={taskData?.read ?JSON.parse(taskData?.read):null}
              onChange={checkBoxTaskOnChange}
              inputProps={{ 'aria-label': 'controlled' }}
           />}
            label={taskData?.task}
            sx={{ flexGrow: 1, m: 0 }}
          />
      */}
      <div className='task-task'>

      {
        getUserData?.map((item)=>{
          return(
            <div className='task-box'>
              <div className='task-label'>
 <h1>{item?.task}</h1>
 <IconButton size="large" color="inherit" sx={{ opacity: 0.48 }} onClick={(e)=>setOpen(e.currentTarget)}>
            <Iconify icon={'eva:more-vertical-fill'} onClick={()=>handleOpenMenu(item)}/>
          </IconButton>
              </div>
              <Popover
            open={Boolean(open)}
            anchorEl={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                p: 1,
                '& .MuiMenuItem-root': {
                  px: 1,
                  typography: 'body2',
                  borderRadius: 0.75,
                },
              },
            }}
          >
            {/* <MenuItem onClick={handleMarkComplete}>
              <Iconify icon={'eva:checkmark-circle-2-fill'} sx={{ mr: 2 }} />
              Mark Complete
            </MenuItem>
    
            <MenuItem onClick={handleEdit}>
              <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
              Edit
            </MenuItem>
    
            <MenuItem onClick={handleShare}>
              <Iconify icon={'eva:share-fill'} sx={{ mr: 2 }} />
              Share
            </MenuItem> */}
    
            <Divider sx={{ borderStyle: 'dashed' }} />
    
            <MenuItem onClick={()=>{handleDelete(item?.id)}} sx={{ color: 'error.main' }}>
              <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
              Delete
            </MenuItem>
          </Popover>
            </div>
          )
        })
      }
      </div>
            
         
    
       
    </Stack>
      {/* <AppTasks
              title="Tasks"
             list={getUserData}
              // list={[
              //   { id: '1', label: 'Create FireStone Logo' },
              //   { id: '2', label: 'Add SCSS and JS files if required' },
              //   { id: '3', label: 'Stakeholder Meeting' },
              //   { id: '4', label: 'Scoping & Estimations' },
              //   { id: '5', label: 'Sprint Showcase' },
              // ]}
            /> */}
    </div>
  )
}
