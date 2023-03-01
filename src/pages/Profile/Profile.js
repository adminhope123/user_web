import React, { useContext, useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Country, State, City } from "country-state-city";
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Select from "react-select";
import { Button, CardActionArea, CardActions,FormLabel, Fade, FormControl, FormControlLabel, Modal, Radio, RadioGroup, TextField } from '@mui/material';
import profileImg from './avatar_default.jpg'
import './Profile.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box } from '@mui/system';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { UserDataContext } from 'src/UserDataContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { useDispatch, useSelector } from 'react-redux';
import { profileGetApi, profilePostApi } from 'src/Redux/actions';

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
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [value, setValue] = React.useState('');
  const [birthDate, setBirthDate] =useState("");
  const [editFormData,setEditFormData]=useState({
    fullname:"",
    post:"",
    mobile:"",
    address:"",
  })
  const {userGetData}=useContext(UserDataContext)
  const {users}=useSelector(res=>res.data)

  const dispatch=useDispatch()

const handleDateChange=(newValue)=>{
  setBirthDate(newValue);
}
  const handleChange = (event) => {
    setValue(event.target.value);
   
  };

const hadnleOnChange=(e)=>{
  if (e) {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  }
}

const handleSubmitData=(e)=>{
  e.preventDefault();
  const data=selectedCity.name
  const birthDateData=birthDate?.$d
  const dataaaa={"birthdate":`${birthDateData}`}
  const sliceDate=dataaaa?.birthdate?.slice(4,15)
  const emailDataGet={"email":userGetData?.email}

  const cityObject={"city":data}
  const birthDateDataData={"birthDate":sliceDate}
  const gender={"gender":value}
  const mergeObject={...editFormData,...birthDateDataData,...cityObject,...gender,...emailDataGet}
  console.log("mergeObject",mergeObject)
   if(mergeObject){
    dispatch(profilePostApi(mergeObject))
   }

}
  useEffect(() => {
    console.log("",selectedCountry);
    console.log(selectedCountry?.isoCode);
    dispatch(profileGetApi())
    console.log(State?.getStatesOfCountry(selectedCountry?.isoCode));
  }, [selectedCountry]);
  
const data=(e)=>{
  const data=selectedCity.name
  console.log("userGetData",userGetData)
}
  return (
    <div className='profile-page'>
        <div className='profile-content'>
<div className='profile-card'>
<Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <img    src={`http://127.0.0.1:8000/${userGetData&&userGetData?.image}`}/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {userGetData?.userName}
          </Typography>
          <Typography gutterBottom  component="div" sx={{fontWeight: 'normal',fontSize:"20px"}}>
            {userGetData?.role}
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
          <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px",textTransform:"capitalize"}}>
            Employee Id
          </Typography>
          <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575",textTransform:"capitalize"}}>
            {userGetData?.E_Id}
          </Typography>
          </div>
          <div className='profile-lable'>
          <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px",textTransform:"capitalize"}}>
            Full Name 
          </Typography>
          <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575",textTransform:"capitalize"}}>
          {userGetData?.userName}
          </Typography>
          </div>
          <div className='profile-lable'>
          <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px",textTransform:"capitalize"}}>
            BirthDate
          </Typography>
          <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575",textTransform:"capitalize"}}>
           11-02-2023
          </Typography>
          </div>
          <div className='profile-lable'>
          <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px",textTransform:"capitalize"}}>
            Gender
          </Typography>
          <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575",textTransform:"capitalize"}}>
            Male
          </Typography>
          </div>
          <div className='profile-lable'>
          <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px",textTransform:"capitalize"}}>
            Post
          </Typography>
          <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575",textTransform:"capitalize"}}>
            {userGetData?.role}
          </Typography>
          </div>
          <div className='profile-lable'>
          <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px",textTransform:"capitalize"}}>
          Email
          </Typography>
          <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575"}}>
           {userGetData?.email}
          </Typography>
          </div>
          <div className='profile-lable'>
          <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px",textTransform:"capitalize"}}>
          Mobile
          </Typography>
          <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575",textTransform:"capitalize"}}>
            {userGetData?.mobileNumber}
          </Typography>
          </div>
          <div className='profile-lable'>
          <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px",textTransform:"capitalize"}}>
          Address
          </Typography>
          <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575",textTransform:"capitalize"}}>
           22,surat
          </Typography>
          </div>
          {/* <div className='profile-lable'>
          <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px",textTransform:"capitalize"}}>
          Password
          </Typography>
          <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575",textTransform:"capitalize"}}>
           {userGetData?.password}
          </Typography>
          </div> */}
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
            <button onClick={()=>data()}>Click</button>
          <div className='model-edit-form'>
          <form onSubmit={handleSubmitData}>
             <div className='input-data'>
             <FormControl>
                    <TextField
                      label="Full Name"
                      name="fullname"
                      type="text"
                      defaultValue={userGetData?.userName}
                      onChange={hadnleOnChange}
                    />
                    <p className="employee-error-text"></p>
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="Post"
                      name="post"
                      type="text"
                      defaultValue={userGetData?.role}
                      onChange={hadnleOnChange}
                    />
                    <p className="employee-error-text"></p>
                  </FormControl>
             </div>
         
                  <div className='input-data'>
                 
                  <FormControl>
                    <TextField
                      label="Mobile No."
                      name="mobile"
                      type="text"
                      defaultValue={userGetData?.mobileNumber}
                      onChange={hadnleOnChange}
                    />
                    <p className="employee-error-text"></p>
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="Address"
                      name="address"
                      type="text"
                      defaultValue={userGetData?.address}
                      onChange={hadnleOnChange}
                    />
                    <p className="employee-error-text"></p>
                  </FormControl>
                  </div>
              <div className='input-data'>
             <FormControl>
             <LocalizationProvider dateAdapter={AdapterDayjs}>

             <DesktopDatePicker
          label="Date desktop"
          inputFormat="MM/DD/YYYY"
          name="birthDate"
          value={birthDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
               </LocalizationProvider>
                   
                    <p className="employee-error-text"></p>
                  </FormControl>
                  <FormControl>
  <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
  <RadioGroup
    aria-labelledby="demo-controlled-radio-buttons-group"
    name="controlled-radio-buttons-group"
    value={value}
    onChange={handleChange}
  >
    <FormControlLabel value="female" control={<Radio />} label="Female" name='female' />
    <FormControlLabel value="male" control={<Radio />} label="Male" name='male'/>
  </RadioGroup>
</FormControl>
               </div>
          <div>
        <div className='react-select-city'>
        <Select
        name='countries'
        options={Country.getAllCountries()}
        getOptionLabel={(options) => {
          return options["name"];
        }}
        getOptionValue={(options) => {
          return options["name"];
        }}
        value={selectedCountry}
        onChange={(item) => {
          setSelectedCountry(item);
        }}
      />
        </div>
      <div className='react-select-city'>
      <Select
         name='state'
        options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
        getOptionLabel={(options) => {
          return options["name"];
        }}
        getOptionValue={(options) => {
          return options["name"];
        }}
        value={selectedState}
        onChange={(item) => {
          setSelectedState(item);
        }}
      />
      </div>
    <div className='react-select-city'>
    <Select
          name='city'
        options={City.getCitiesOfState(
          selectedState?.countryCode,
          selectedState?.isoCode
        )}
        getOptionLabel={(options) => {
          return options["name"];
        }}
        getOptionValue={(options) => {
          return options["name"];
        }}
        value={selectedCity}
        onChange={(item) => {
          setSelectedCity(item);
        }}
      />
    </div>
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
