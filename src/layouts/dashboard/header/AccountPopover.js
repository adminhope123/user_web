import { useContext, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_
import account from '../../../_mock/account';
import { UserDataContext } from 'src/UserDataContext';
import users from 'src/_mock/user';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
    link:'/dashboard/app'
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    link:'/dashboard/profile'
  },
  {
    label: 'TimerClock',
    icon: 'eva:person-fill',
    link:'/dashboard/timerClock'
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const navigate=useNavigate()
  const {userGetData}=useContext(UserDataContext)

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (option) => {
    setOpen(null);
    navigate(option?.link)
  };
 
  const logOutFunction=()=>{
    setOpen(null);
    location.reload()
     const logOut=localStorage.removeItem("loginData")
      navigate('/login')

  }
  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        {userGetData?  <Avatar  src={`https://hopebackend.hopeinfosys.com/${userGetData&&userGetData?.image}`} alt={userGetData?.userName} />:""}
      
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap textTransform="capitalize">
            {userGetData?.userName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap> 
            {userGetData?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={()=>handleClose(option)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={()=>logOutFunction()} sx={{ m: 1 }}>
          Log Out
        </MenuItem>
      </Popover>
    </>
  );
}
