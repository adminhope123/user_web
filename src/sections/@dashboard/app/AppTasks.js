import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import'../../../pages/style.css';
// @mui
import {
  Card,
  Stack,
  Divider,
  Popover,
  Checkbox,
  MenuItem,
  IconButton,
  CardHeader,
  FormControlLabel,
} from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import { taskDeleteApi, taskEditApi } from 'src/Redux/actions';
import { useDispatch } from 'react-redux';
import users from 'src/_mock/user';

// ----------------------------------------------------------------------

AppTasks.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppTasks({ title, subheader, list, ...other }) {
 const dispatch=useDispatch()
  const { control } = useForm({
    defaultValues: {
      taskCompleted: ['2'],
    },
  });

  return (
    <Card {...other} sx={{padding:"0px 24px"}}>
      <CardHeader title={title} subheader={subheader} sx={{paddingLeft:"0px"}}/>
      <Controller
        name="taskCompleted"
        sx={{padding:"0px"}}
        control={control}
        render={({ field }) => {
          const onSelected = (taskData) =>
         field.value.includes(taskData) ? field.value.filter((value) => value !== taskData) : [...field.value, taskData];
            return (
            <>
              {list?.map((taskData) => (
                <TaskItem
                  key={taskData.id}
                  taskData={taskData}
                  checked={field.value.includes(taskData.id)}
                  onChange={() => field.onChange(onSelected(taskData.id))}
                />
              ))}
            </>
          );
        }}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

TaskItem.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  taskData: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  }),
};
function TaskItem({ taskData, checked, onChange }) {
  const [open, setOpen] = useState(null);
  const [isTrue, setIsTrue] =useState(false);
  const dispatch=useDispatch()

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleMarkComplete = () => {
    handleCloseMenu();
  };

  const handleShare = () => {
    handleCloseMenu();
  };

  const handleEdit = () => {
    handleCloseMenu();
    const data=taskData?.read?JSON.parse(taskData?.read):null
  };

  const handleDelete = () => {
    handleCloseMenu();
    const employeeEditIdData=taskData?.id
    if(employeeEditIdData){
      dispatch(taskDeleteApi(employeeEditIdData))
    }
  };
const checkBoxTaskOnChange=(event)=>{
  setIsTrue(event.target.checked);
  const data=event.target.checked
  taskTableData(data)
}

const taskTableData=(data)=>{
  const trueData=isTrue===true
  if(trueData){
    const readData={"read":JSON.stringify(trueData)}
    const employeeEditIdData=taskData?.id
    const dataMergemerge={...taskData,...readData}
    dispatch(taskEditApi(dataMergemerge,employeeEditIdData))
  }
 const falseData=isTrue===false
 if(falseData,data){
   const readData={"read":JSON.stringify(data)}
   const employeeEditIdData=taskData?.id
   const dataMergemerge={...taskData,...readData}
   dispatch(taskEditApi(dataMergemerge,employeeEditIdData))
 }
 
}
  return (
    <Stack
      direction="row"
      className='task-data'
      sx={{
        py: 0.75,
        // borderStyle: 'dashed',
        ...(taskData?.read==="true"&& {
          color: 'text.disabled',
          textDecoration: 'line-through',
        }),
      }}
    >

      <FormControlLabel
        control={ <Checkbox
          checked={taskData?.read ?JSON.parse(taskData?.read):null}
          // value={JSON.parse(taskData?.read)}
          defaultChecked={taskData?.read ?JSON.parse(taskData?.read):null}
          onChange={checkBoxTaskOnChange}
          inputProps={{ 'aria-label': 'controlled' }}
       />}
        label={taskData?.task}
        sx={{ flexGrow: 1, m: 0 }}
      />
 
      <IconButton size="large" color="inherit" sx={{ opacity: 0.48 }} onClick={handleOpenMenu}>
        <Iconify icon={'eva:more-vertical-fill'} />
      </IconButton>

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

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </Stack>
  );
}
