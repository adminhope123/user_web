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
import RefreshIcon from '@mui/icons-material/Refresh';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box } from '@mui/system';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { UserDataContext } from 'src/UserDataContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { useDispatch, useSelector } from 'react-redux';
import { profileGetApi, profilePostApi, profilePutApi } from 'src/Redux/actions';
import { TextFields } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "600px",
  height:"auto",
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius:"8px",
  p: 4,
};


export default function Profile() {
  const [open, setOpen] = React.useState(false);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [value, setValue] = React.useState('');
  const [birthDate, setBirthDate] =useState("");
  const [userProfileData,setUserProfileData]=useState()
  const [oldUserData,setOldUsersData]=useState()
  const [getUserDataDataData,setGetUserDataDataData]=useState()
  const [editFormData,setEditFormData]=useState({
    address:"",
  })

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


const handleOpen = () => {
  setOpen(true)
};
const handleClose = () => setOpen(false);

const handleSubmitData=(e)=>{
  e.preventDefault();
  const data=selectedCity?.name
  const countriesName=selectedCountry?.name
  const stateName=selectedState?.name
  const birthDateData=birthDate?.$d
  const dataaaa={"birthdate":`${birthDateData}`}
  const sliceDate=dataaaa?.birthdate?.slice(4,15)
  const emailDataGet={"email":getUserDataDataData?.email}
  const name={"email":getUserDataDataData?.userName}
const imageObject={"image":getUserDataDataData?.image}
  const cityObject={"city":data}
  const fullnameObject={"fullname":getUserDataDataData?.userName}
  const CountruesObject={"countries":countriesName}
  const mobileObject={"mobile":getUserDataDataData?.mobileNumber}
  const role={"post":getUserDataDataData?.role}
  const stateObject={"state":stateName}
  const birthDateDataData={"birthDate":sliceDate}
  const gender={"gender":value}
  const getEmployeeIdGet=JSON.parse(sessionStorage.getItem("userData"))
 const getIdDataDataData=getEmployeeIdGet?.map((item)=>{return item?.E_Id})
 const employeeIdDataString=getIdDataDataData.toString()
  const employeeIdData={"E_Id":employeeIdDataString}
  const mergeObject={...editFormData,...employeeIdData,...fullnameObject,...mobileObject,...imageObject,...role,...birthDateDataData,...cityObject,...gender,...emailDataGet,...CountruesObject,...stateObject}
   if(mergeObject){
    const checkData=users?.filter((item)=>{return item?.E_Id===getUserDataDataData?.E_Id})

    if(checkData.length){
      console.log("data add")
    }else{
      dispatch(profilePostApi(mergeObject))
      setOpen(false)
    }
   
    // if(checkData===false){
    // }else{
      // dispatch(profilePostApi(mergeObject))

    // }
   }
   const getIdData=users?.filter((item)=>{return item?.E_Id===getUserDataDataData?.E_Id})
   const getIdDataData=getIdData?.map((item)=>{
     const employeeEditIdData=item?.id
     dispatch(profilePutApi(mergeObject,employeeEditIdData))
     setOpen(false)

   })
    // dispatch(profilePutApi())
}

const getApiFunction=async()=>{
  const dataUserGet=JSON.parse(sessionStorage.getItem("userData"))
  const dataGEtGEtGEt=dataUserGet?.map((item)=>{return setGetUserDataDataData(item)})
  console.log("dataGEtGEtGEt",getUserDataDataData)
  // setGetUserDataDataData(dataGEtGEtGEt)
  const checkData=users?.map((item)=>{
    const dataCheck= item?.E_Id===getUserDataDataData?.E_Id
    console.log("dataCheck",dataCheck)
    return  dataCheck
    })
    console.log("olda",checkData)
    const trueDataCheckData=checkData?.includes(true)
    console.log("ture",trueDataCheckData)
    setOldUsersData(trueDataCheckData)
    if(users){
      const filterData=users?.filter((item)=>{return item?.E_Id===getUserDataDataData?.E_Id})
      setUserProfileData(filterData)
    }
    console.log("users",users)
}

useEffect(() => {
  getApiFunction()
}, []);

const userProfileDataFunction=()=>{
   dispatch(profileGetApi())
 
}
  useEffect(() => {

    userProfileDataFunction()
  }, [selectedCountry]);
  
  return (
    <div className='profile-page'>
         <Helmet>
        <title> Dashboard: Employee Profile |  User Web </title>
      </Helmet>
        <Button  variant="contained" onClick={() => getApiFunction()} sx={{marginBottom:"30px"}}>
           <span> Data Refresh</span>
          <RefreshIcon sx={{marginLeft:"10px"}}/>
          </Button>
        <div className='profile-content'>
<div className='profile-card'>
<Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        {
          getUserDataDataData?<img    src={`https://hopebackend.hopeinfosys.com/${getUserDataDataData&&getUserDataDataData?.image}`}/>:""
        }
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {getUserDataDataData?.userName}
          </Typography>
          <Typography gutterBottom  component="div" sx={{fontWeight: 'normal',fontSize:"20px"}}>
            {getUserDataDataData?.role}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
</div>
<div>
  <div className='profile-text'>
  <Card sx={{ maxWidth: '80%' }}>
    {  oldUserData===false &&((
<CardContent>
      <div className='profile-lable'>
        <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px",textTransform:"capitalize"}}>
          Employee Id
        </Typography>
        <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575",textTransform:"capitalize"}}>
          {getUserDataDataData?.E_Id}
        </Typography>
        </div>
        <div className='profile-lable'>
        <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px",textTransform:"capitalize"}}>
          Full Name 
        </Typography>
        <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575",textTransform:"capitalize"}}>
        {getUserDataDataData?.userName}
        </Typography>
        </div>
        <div className='profile-lable'>
        <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px",textTransform:"capitalize"}}>
          Post
        </Typography>
        <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575",textTransform:"capitalize"}}>
          {getUserDataDataData?.role}
        </Typography>
        </div>
        <div className='profile-lable'>
        <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px",textTransform:"capitalize"}}>
        Email
        </Typography>
        <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575"}}>
         {getUserDataDataData?.email}
        </Typography>
        </div>
        <div className='profile-lable'>
        <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px",textTransform:"capitalize"}}>
        Mobile
        </Typography>
        <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575",textTransform:"capitalize"}}>
          {getUserDataDataData?.mobileNumber}
        </Typography>
        </div>
      </CardContent>
      ))
      
    }
    {
      oldUserData===true&&((
        <div>
        {
         userProfileData&&userProfileData?.map((item)=>{
        return(
         <div>
      
         <CardContent>
    <div className='profile-lable'>
      <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px",textTransform:"capitalize"}}>
        Employee Id
      </Typography>
      <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575",textTransform:"capitalize"}}>
        {getUserDataDataData?.E_Id}
      </Typography>
      </div>
      <div className='profile-lable'>
      <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px",textTransform:"capitalize"}}>
        Full Name 
      </Typography>
      <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575",textTransform:"capitalize"}}>
      {getUserDataDataData?.userName}
      </Typography>
      </div>
      <div className='profile-lable'>
      <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px",textTransform:"capitalize"}}>
        BirthDate
      </Typography>
      <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575",textTransform:"capitalize"}}>
       {item?.birthDate}
      </Typography>
      </div>
      <div className='profile-lable'>
      <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px",textTransform:"capitalize"}}>
        Gender
      </Typography>
      <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575",textTransform:"capitalize"}}>
      {item?.gender}
      </Typography>
      </div>
      <div className='profile-lable'>
      <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px",textTransform:"capitalize"}}>
        Post
      </Typography>
      <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575",textTransform:"capitalize"}}>
        {getUserDataDataData?.role}
      </Typography>
      </div>
      <div className='profile-lable'>
      <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px",textTransform:"capitalize"}}>
      Email
      </Typography>
      <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575"}}>
       {getUserDataDataData?.email}
      </Typography>
      </div>
      <div className='profile-lable'>
      <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px",textTransform:"capitalize"}}>
      Mobile
      </Typography>
      <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575",textTransform:"capitalize"}}>
        {getUserDataDataData?.mobileNumber}
      </Typography>
      </div>
      <div className='profile-lable'>
      <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px",textTransform:"capitalize"}}>
      Address
      </Typography>
      <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575",textTransform:"capitalize"}}>
      {item?.address}
      </Typography>
      </div>
      <div className='profile-lable'>
      <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px",textTransform:"capitalize"}}>
      State
      </Typography>
      <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575",textTransform:"capitalize"}}>
      {item?.state}
      </Typography>
      </div>
      <div className='profile-lable'>
      <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px",textTransform:"capitalize"}}>
      City
      </Typography>
      <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575",textTransform:"capitalize"}}>
      {item?.city}
      </Typography>
      </div>
      {/* <div className='profile-lable'>
      <Typography gutterBottom  component="div" sx={{fontWeight:"600",fontSize:"16px",color:"#4f4f4f",width:"150px",textTransform:"capitalize"}}>
      Password
      </Typography>
      <Typography gutterBottom  component="div" sx={{fontWeight:"normal",fontSize:"16px",color:"#757575",textTransform:"capitalize"}}>
       {getUserDataDataData?.password}
      </Typography>
      </div> */}
    </CardContent>
      </div>
        )
         })
        }
        </div>
      ))
    }
      
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
          <Box sx={style} >
          <div className='model-edit-form'>
          <Typography 
           variant='h3'
           sx={{color:"#465767",marginBottom:"10px",marginTop:"-16px",fontSize:"17px"}}
           >Edit Employee Profile</Typography>
          <form onSubmit={handleSubmitData} key={getUserDataDataData}>
             {/* <div className='input-data'>
             <FormControl>
                    <TextField
                      label="Full Name"
                      name="fullname"
                      type="text"
                      defaultValue={getUserDataDataData?.userName}
                      onChange={hadnleOnChange}
                    />
                    <p className="employee-error-text"></p>
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="Post"
                      name="post"
                      type="text"
                      defaultValue={getUserDataDataData?.role}
                      onChange={hadnleOnChange}
                    />
                    <p className="employee-error-text"></p>
                  </FormControl>
             </div> */}
         <div className='address-input'>

         <TextField
                      label="Address"
                      name="address"
                      type="text"
                      defaultValue={getUserDataDataData?.address}
                      onChange={hadnleOnChange}
                      sx={{paddingBottom:"10px",width:"100%"}}
                    />
                    <p className="employee-error-text"></p>
                  <div className='input-data'>
         </div>
                  </div>
              <div className='input-data'>
             <FormControl>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
             <DesktopDatePicker
          label="Birth Date"
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
