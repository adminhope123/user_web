import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Fade, FormControl, Modal, TextField } from '@mui/material';
import profileImg from './avatar_default.jpg'
import './Profile.css'
import { Box } from '@mui/system';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "600px",
  height:"520px",
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius:"8px",
  p: 4,
};


export default function Profile() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='profile-page'>
        <div className='profile-content'>
<div className='profile-card'>
<Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={profileImg}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Hope Web
          </Typography>
          <Typography gutterBottom  component="div" sx={{fontWeight: 'normal',fontSize:"20px"}}>
            React Js
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
</div>
<div>
  <div className='profile-text'>
  <Card sx={{ maxWidth: '80%' }}>
        <CardContent>
        <div className='profile-lable'>
          <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px"}}>
            Employee Id
          </Typography>
          <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575"}}>
            123
          </Typography>
          </div>
          <div className='profile-lable'>
          <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px"}}>
            Full Name 
          </Typography>
          <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575"}}>
            Hope Infosys
          </Typography>
          </div>
          <div className='profile-lable'>
          <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px"}}>
            BirthDate
          </Typography>
          <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575"}}>
           11-02-2023
          </Typography>
          </div>
          <div className='profile-lable'>
          <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px"}}>
            Gender
          </Typography>
          <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575"}}>
           11-02-2023
          </Typography>
          </div>
          <div className='profile-lable'>
          <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px"}}>
            Post
          </Typography>
          <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575"}}>
            Android
          </Typography>
          </div>
          <div className='profile-lable'>
          <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px"}}>
          Email
          </Typography>
          <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575"}}>
            hope@gmail.com
          </Typography>
          </div>
          <div className='profile-lable'>
          <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px"}}>
          Mobile
          </Typography>
          <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575"}}>
            1234567890
          </Typography>
          </div>
          <div className='profile-lable'>
          <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px"}}>
          Address
          </Typography>
          <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575"}}>
           22,surat
          </Typography>
          </div>
          <div className='profile-lable'>
          <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px"}}>
          Password
          </Typography>
          <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575"}}>
           123
          </Typography>
          </div>
        </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={handleOpen}>
          Edit
        </Button>
      </CardActions>
    </Card>
    <div className='model-edit'>
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
      >
        <Fade in={open}>
          <Box sx={style}>
          <div className='model-edit-form'>
          <form>
             <div className='input-data'>
             <FormControl>
                    <TextField
                      label="Full Name"
                      name="fullName"
                      type="text"
                    />
                    <p className="employee-error-text"></p>
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="Post"
                      name="post"
                      type="text"
                    />
                    <p className="employee-error-text"></p>
                  </FormControl>
             </div>
                  <div className='input-data'>
                  <FormControl>
                    <TextField
                      label="Email"
                      name="email"
                      type="text"
                    />
                    <p className="employee-error-text"></p>
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="Mobile No."
                      name="mobile"
                      type="text"
                    />
                    <p className="employee-error-text"></p>
                  </FormControl>
                  </div>
              <div className='input-data'>
              <FormControl>
                    <TextField
                      label="Address"
                      name="address"
                      type="text"
                    />
                    <p className="employee-error-text"></p>
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="Password"
                      name="password"
                      type="text"
                    />
                    <p className="employee-error-text"></p>
                  </FormControl>
              </div>
                  <div style={{display:"flex",justifyContent:"center"}}>
                  <Button
                    variant="contained"
                    type="submit"
                    className="add-employee"
                  >
                    Edit Profile Details
                  </Button>
                    </div>
             </form>
          </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  </div>
</div>
        </div>
    </div>
  )
}
