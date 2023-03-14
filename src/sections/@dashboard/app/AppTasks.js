import PropTypes from 'prop-types';
import { useState } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
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
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Controller
        name="taskCompleted"
        control={control}
        render={({ field }) => {
          const onSelected = (taskData) =>
         field.value.includes(taskData) ? field.value.filter((value) => value !== taskData) : [...field.value, taskData];
            const dataId=field.value.shift()
            const readData=list?.filter((item)=>item.id===dataId)
            const dataGet=readData?.map((item)=>{
              const dataRead={"read":true}
              const datadata={...item,...dataRead}
                 return datadata
            })
            console.log("read",readData)
           const dataDataData=dataGet?.map((item)=>{
                const employeeEditIdData=item?.id
                dispatch(taskEditApi(item,employeeEditIdData))
           })
            return (
            <>
              {list.map((taskData) => (
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
  const dispatch=useDispatch()

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleMarkComplete = () => {
    handleCloseMenu();
    console.log('MARK COMPLETE', taskData.id);
  };

  const handleShare = () => {
    handleCloseMenu();
    console.log('SHARE', taskData.id);
  };

  const handleEdit = () => {
    handleCloseMenu();
    console.log('EDIT', taskData.id);
  };

  const handleDelete = () => {
    handleCloseMenu();
    console.log('DELETE', taskData.id);
    const employeeEditIdData=taskData?.id
    if(employeeEditIdData){
      dispatch(taskDeleteApi(employeeEditIdData))
    }
  };

  return (
    <Stack
      direction="row"
      sx={{
        px: 2,
        py: 0.75,
        ...(checked && {
          color: 'text.disabled',
          textDecoration: 'line-through',
        }),
      }}
    >
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={onChange} />}
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
        <MenuItem onClick={handleMarkComplete}>
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
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </Stack>
  );
}
