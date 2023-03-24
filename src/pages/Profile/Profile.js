import React, { useContext, useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Country, State, City } from "country-state-city";
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Select from "react-select";
import { Button, CardActionArea, CardActions,FormLabel, Fade, FormControl, FormControlLabel, Modal, Radio, RadioGroup, TextField, Stack } from '@mui/material';
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
import uploadImgIcon from './uploadImg.png'
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
  const [myimage, setMyImage] =useState(null);
  const [imgShow,setImgShow]=useState()
  const [imageUpload,setImageUpload]=useState([])

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
const imageObject={"image":getUserDataDataData?.image}
  const cityObject={"city":data}
  const fullnameObject={"fullname":getUserDataDataData?.userName}
  const CountruesObject={"countries":countriesName}
  const mobileObject={"mobile":getUserDataDataData?.mobileNumber}
  const role={"post":getUserDataDataData?.role}
  const stateObject={"state":stateName}
  const birthDateDataData={"birthDate":sliceDate}
  const dataBirthDate=sliceDate
  console.log("dataBirthDate",dataBirthDate)
  const gender={"gender":value}
  const getEmployeeIdGet=JSON.parse(sessionStorage.getItem("userData"))
 const getIdDataDataData=getEmployeeIdGet?.map((item)=>{return item?.E_Id})
 const employeeIdDataString=getIdDataDataData.toString()
  const employeeIdData={"E_Id":employeeIdDataString}
  const mergeObject={...editFormData,...employeeIdData,...fullnameObject,...mobileObject,...imageObject,...role,...birthDateDataData,...cityObject,...gender,...emailDataGet,...CountruesObject,...stateObject}
  console.log("imageUpload",imageUpload?.image)
  var formEditData=new FormData()
  formEditData.append('image',imageUpload?.image)
  formEditData.append('birthDate',sliceDate)
  formEditData.append('email',getUserDataDataData?.email)
  formEditData.append('city',data)
  formEditData.append('fullname',getUserDataDataData?.userName)
  formEditData.append('countries',countriesName)
  formEditData.append('gender',value)
  formEditData.append('post',getUserDataDataData?.role)
  formEditData.append('mobile',getUserDataDataData?.mobileNumber)
  formEditData.append('state',stateName)
  formEditData.append('E_Id',employeeIdDataString)
  formEditData.append('address',editFormData?.address)
// console.log("data",countriesName,getUserDataDataData?.userName,data,getUserDataDataData?.email,sliceDate,imageUpload?.image,editFormData?.address,employeeIdDataString,stateName,getUserDataDataData?.mobileNumber,getUserDataDataData?.role,value)
  if(formEditData){
 
   
    const checkData=users?.filter((item)=>{return item?.E_Id===getUserDataDataData?.E_Id})
    if(checkData.length){
      console.log("data add")
    }else{
      dispatch(profilePostApi(formEditData))
      setOpen(false)
    }
    
   
    // if(checkData===false){
    // }else{
      // dispatch(profilePostApi(mergeObject))

    // }
  
   }
   const getIdData=users?.filter((item)=>{return item?.E_Id===getUserDataDataData?.E_Id})
   console.log("getIdData",getIdData)
   var formData=new FormData()
   formData.append('image',imageUpload?.image)
  //  formData.append('birthDate',sliceDate)
  //  formData.append('email',getUserDataDataData?.email)
  //  formData.append('city',data)
  //  formData.append('fullname',getUserDataDataData?.userName)
  //  formData.append('countries',countriesName)
  //  formData.append('gender',value)
  //  formData.append('post',getUserDataDataData?.role)
  //  formData.append('mobile',getUserDataDataData?.mobileNumber)
  //  formData.append('state',stateName)
  //  formData.append('E_Id',employeeIdDataString)
  //  formData.append('address',editFormData?.address)
   console.log("address",editFormData?.address)
   const mergeObjectdaaa={...editFormData,...imageObject,...employeeIdData,...fullnameObject,...mobileObject,...role,...birthDateDataData,...cityObject,...gender,...emailDataGet,...CountruesObject,...stateObject}
 console.log("mergeObjectdaaa",mergeObjectdaaa)
   if(mergeObjectdaaa){
  const getIdDataData=getIdData?.map((item)=>{return item?.id})
  const employeeEditIdData=getIdDataData
  console.log("formDAta",mergeObjectdaaa)
  dispatch(profilePutApi(mergeObjectdaaa,employeeEditIdData))
  setOpen(false)
 }
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
    const dataUserGetData=JSON.parse(sessionStorage.getItem("userData"))
    const checkDataDataa=users?.some((item)=>dataUserGetData?.find(ele=>item?.E_Id===ele?.E_Id ))
    setImgShow(checkDataDataa)
}

useEffect(() => {
  getApiFunction()
}, []);

const userProfileDataFunction=()=>{
   dispatch(profileGetApi())
 
}
const handleImgChange=(e)=>{
  setImageUpload({image:e.target.files[0]})
  setMyImage(URL.createObjectURL(e.target.files[0]));
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
                 <div className='employee-img-upload'>
                  {
                    imgShow===false ?"": <Stack direction="row" alignItems="center" spacing={2}>
                    {
                     imageUpload?.length===0?
                     <div>
                     <CardContent variant="contained" component="label" className='upload-img'>   <img src={uploadImgIcon} />
                   <input hidden   type="file" accept="image/png , image/jepg,.txt,.doc" id='image' name='image'  onChange={handleImgChange} />
                    </CardContent>
                  </div>:<div>
                       <CardContent variant="contained" component="label"  className='upload-img'><img src={myimage} width="80px" height="80px" />   
                             <input hidden   type="file" accept="image/png , image/jepg,.txt,.doc" id='image' name='image'  onChange={handleImgChange} />
                           </CardContent> 
                      </div>
                    }
                   
               
                         
                     </Stack>
                  }
               {console.log("imgShow",imgShow)}  
                  </div>
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
