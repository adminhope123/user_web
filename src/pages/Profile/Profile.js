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
import EditIcon from '@mui/icons-material/Edit';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

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
const styleEdit = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "300px",
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
  const [dataProfile,setDataProfile]=useState()
  const [editFormData,setEditFormData]=useState({
    address:"",
  })
  const [myimage, setMyImage] =useState(null);
  const [imgShow,setImgShow]=useState()
  const [imageUpload,setImageUpload]=useState([])
  const [getDataUserData,setGetDataUserData]=useState()
  const [errorForm, setErrorForm] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [showData,setShowData]=useState()
  const [imgChangeModel, setImgChangeModel] = useState(false);

  const {profiles}=useSelector(res=>res.data)

  const dispatch=useDispatch()

  const imgChangeModelClose = () => setImgChangeModel(false)

const handleDateChange=(newValue)=>{
  setBirthDate(newValue);
}
  const handleChange = (event) => {
    setValue(event.target.value);
   
  };
const validate = (values) => {
    console.log('welcome to validation');
    const error = {};
    const emailRegex = '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$';
    if (!values.address) {
      error.address = 'user Name is required';
    } else if (values.address.length < 3) {
      error.address = 'user Name  more than 3 characters';
    } else if (values.address.length > 10) {
      error.address = 'user Name cannot exceed more than 10 characters';
    } 
    if (!values.birthDate) {
      error.birthDate = 'password is required';
    } else if (values.birthDate.length < 3) {
      error.birthDate = 'password  more than 3 characters';
    }
    if (values.value?.length >10) {
      error.gender = 'user Name cannot exceed more than 10 characters';
    }
    if (!values.selectedCountry) {
      error.selectedCountry = 'role is required';
    } else if (values.selectedCountry.length < 3) {
      error.role = 'role  more than 3 characters';
    } else if (values.selectedCountry.length >10) {
      error.role = 'role cannot exceed more than 10 characters';
    }
    if (!values.selectedState) {
      error.selectedState = 'role is required';
    } else if (values.selectedState.length < 3) {
      error.role = 'role  more than 3 characters';
    } else if (values.selectedState.length >10) {
      error.role = 'role cannot exceed more than 10 characters';
    }
    if (!values.selectedCity) {
      error.selectedCity = 'role is required';
    } else if (values.selectedCity.length < 3) {
      error.role = 'role  more than 3 characters';
    } else if (values.selectedCity.length >10) {
      error.role = 'role cannot exceed more than 10 characters';
    }
  };

const hadnleOnChange=(e)=>{
  if (e) {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  }
}

const handleImgChangeFunction=()=>{

}

const handleOpen = () => {
  setOpen(true)
};
const handleClose = () => setOpen(false);

const handleSubmitData=(e)=>{
  e.preventDefault();
  
  console.log("getDataUser",getDataUserData)
  const data=selectedCity?.name
  const countriesName=selectedCountry?.name
  const stateName=selectedState?.name
  const birthDateData=birthDate?.$d
  const dataaaa={"birthdate":`${birthDateData}`}
  const sliceDate=dataaaa?.birthdate?.slice(4,15)
  const emailDataGet={"email":getDataUserData?.email}
const imageObject={"image":getDataUserData?.image}
  const cityObject={"city":data}
  const fullnameObject={"fullname":getDataUserData?.userName}
  const CountruesObject={"countries":countriesName}
  const mobileObject={"mobile":getDataUserData?.mobileNumber}
  const role={"post":getDataUserData?.role}
  const stateObject={"state":stateName}
  const birthDateDataData={"birthDate":sliceDate}
  const dataBirthDate=sliceDate
  console.log("dataBirthDate",dataBirthDate)
  const gender={"gender":value}
  const dataUserGet=JSON.parse(localStorage.getItem("userData"))
 const getIdDataDataData=dataUserGet?.map((item)=>{return item?.E_Id})
 const employeeIdDataString=getIdDataDataData.toString()
  const employeeIdData={"E_Id":employeeIdDataString}
  const mergeObject={...editFormData,...employeeIdData,...fullnameObject,...mobileObject,...imageObject,...role,...birthDateDataData,...cityObject,...gender,...emailDataGet,...CountruesObject,...stateObject}
  console.log("imageUpload",imageUpload?.image)
  console.log("getDataUserData?.mobileNumbergetDataUserData?.mobileNumber",getDataUserData?.mobileNumber)
// console.log("data",countriesName,getUserDataDataData?.userName,data,getUserDataDataData?.email,sliceDate,imageUpload?.image,editFormData?.address,employeeIdDataString,stateName,getUserDataDataData?.mobileNumber,getUserDataDataData?.role,value)
  if(mergeObject){
 
   
    const checkData=profiles?.filter((item)=>{return item?.E_Id===getUserDataDataData?.E_Id})
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
   putApiDAta()
    // dispatch(profilePutApi())
}

const putApiDAta=()=>{
  const data=selectedCity?.name
  const countriesName=selectedCountry?.name
  const stateName=selectedState?.name
  const birthDateData=birthDate?.$d
  const dataaaa={"birthdate":`${birthDateData}`}
  const sliceDate=dataaaa?.birthdate?.slice(4,15)
  const emailDataGet={"email":getDataUserData?.email}
const imageObject={"image":getDataUserData?.image}
  const cityObject={"city":data}
  const fullnameObject={"fullname":getDataUserData?.userName}
  const CountruesObject={"countries":countriesName}
  const mobileObject={"mobile":getDataUserData?.mobileNumber}
  const role={"post":getDataUserData?.role}
  const stateObject={"state":stateName}
  const birthDateDataData={"birthDate":sliceDate}
  const dataBirthDate=sliceDate
  console.log("dataBirthDate",dataBirthDate)
  const gender={"gender":value}
  const dataUserGet=JSON.parse(localStorage.getItem("userData"))
 const getIdDataDataData=dataUserGet?.map((item)=>{return item?.E_Id})
 const employeeIdDataString=getIdDataDataData.toString()
  const employeeIdData={"E_Id":employeeIdDataString}
  console.log("imageUpload.image",imageUpload.image)
  var formData=new FormData()
    formData.append("birthdate",sliceDate)
    formData.append("email",emailDataGet)
    formData.append("image",imageUpload.image)
    formData.append("city",data)
    formData.append("fullname",getDataUserData?.userName)
    formData.append("countries",countriesName)
    formData.append("mobile",getDataUserData?.mobileNumber)
    formData.append("post",getDataUserData?.role)
    formData.append("state",stateName)
    formData.append("gender",value)

     const mergeObject={...editFormData,...employeeIdData,...imageObject,...fullnameObject,...mobileObject,...role,...birthDateDataData,...cityObject,...gender,...emailDataGet,...CountruesObject,...stateObject}


  const getIdData=profiles?.filter((item)=>{return item?.E_Id===getUserDataDataData?.E_Id})
  console.log("editFormDataeditFormDataeditFormData",editFormData?.address)
  if(formData){
      const getIdDataData=getIdData?.map((item)=>{return item?.id})
     const employeeEditIdData=getIdDataData
     dispatch(profilePutApi(formData,employeeEditIdData))
     setOpen(false)
   }
}
const getApiFunction=async()=>{
  const dataUserGet=JSON.parse(localStorage.getItem("userData"))
  const dataGEtGEtGEt=dataUserGet?.map((item)=>{return setGetUserDataDataData(item)})
  const getUserDeflutData=profiles?.filter((item)=>dataUserGet?.find(ele=>ele?.E_Id===item?.E_Id))
  const dataProfileget=getUserDeflutData?.map((item)=>{return setDataProfile(item)})
  
  console.log("dataGEtGEtGEt",dataProfileget)
  // setGetUserDataDataData(dataGEtGEtGEt)
  const checkData=profiles?.map((item)=>{
    const dataCheck= item?.E_Id===getUserDataDataData?.E_Id
    console.log("dataCheck",dataCheck)
    return  dataCheck
    })
    console.log("olda",checkData)
    const trueDataCheckData=checkData?.includes(true)
    console.log("ture",trueDataCheckData)
    setOldUsersData(trueDataCheckData)
    if(profiles){
      const filterData=profiles?.filter((item)=>{return item?.E_Id===getUserDataDataData?.E_Id})
      setUserProfileData(filterData)
    }
    console.log("profiles",profiles)
    const dataUserGetData=JSON.parse(localStorage.getItem("userData"))
    const checkDataDataa=profiles?.some((item)=>dataUserGetData?.find(ele=>item?.E_Id===ele?.E_Id ))
    setImgShow(checkDataDataa)
}

useEffect(() => {
  getApiFunction()
}, [oldUserData,profiles]);
useEffect(() => {
  const dataUserGetData=JSON.parse(localStorage.getItem("userData"))
  const filterData=profiles?.filter((item)=>{return item?.E_Id===dataUserGetData?.find(ele=>ele?.E_Id===item?.E_Id)})
  console.log("filterData",filterData)
  setShowData(filterData)
}, [])

const userProfileDataFunction=()=>{
   dispatch(profileGetApi())
   const getEmployeeIdGet=JSON.parse(localStorage.getItem("userData"))
  const getDataUser=getEmployeeIdGet?.map((item)=>{return setGetDataUserData(item)})
}
const handleImgChange=(e)=>{
  setImageUpload({image:e.target.files[0]})
  setMyImage(URL.createObjectURL(e.target.files[0]));

}
const handleImgChangeSubmit=(e)=>{
  e.preventDefault()
  console.log("DataDataDataDataDataData",imageUpload?.image)
  var formData=new FormData()
   formData.append("image",imageUpload?.image)
   formData.append("city","surat")
   console.log("aa")
   const getIdData=profiles?.filter((item)=>{return item?.E_Id===getUserDataDataData?.E_Id})
  if(formData){
      const getIdDataData=getIdData?.map((item)=>{return item?.id})
     const employeeEditIdData=getIdDataData
    //  dispatch(profilePutApi(formData,employeeEditIdData))
     axios.put(`https://hopebackend.hopeinfosys.com/api/userprofileupdatesave/${employeeEditIdData}`,formData).then(res=>{
      if(res.data.status===200){
         console.log("res",res.data.message)
      }else if(res.data.status===400){
        console.log("error",res.data.message)
      }
     })
   setImgChangeModel(false)
    }
}

const imgChangeModelOpen=()=>{
  setImgChangeModel(true)
}
  useEffect(() => {

    userProfileDataFunction()
  }, [selectedCountry]);
  
  return (
    <div className='profile-page'>
         <Helmet>
        <title> Dashboard: Employee Profile |  User Web </title>
      </Helmet>
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
    <Button sx={{marginLeft:"10px"}} onClick={imgChangeModelOpen}><EditIcon/></Button>
    <Modal
  open={imgChangeModel}
  onClose={imgChangeModelClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={styleEdit}>
    <form onSubmit={handleImgChangeSubmit}>
     <div className='employee-img-upload'>
                  {
                    imgShow===false ?"": <Stack direction="row" alignItems="center" spacing={2}>
                    {
                     imageUpload?.length===0?
                     <div>
                     <CardContent variant="contained" component="label" className='upload-img'>   <img src={`https://hopebackend.hopeinfosys.com/${getDataUserData?.image&&getDataUserData?.image}`} />
                   <input hidden   type="file" accept="image/png , image/jepg,.txt,.doc"  name='image'  onChange={handleImgChange} />
                    </CardContent>
                  </div>:<div>
                       <CardContent variant="contained" component="label"  className='upload-img'><img src={myimage} width="80px" height="80px" />   
                             <input hidden   type="file" accept="image/png , image/jepg,.txt,.doc"  name='image'  onChange={handleImgChange} />
                           </CardContent> 
                      </div>
                    }
                     </Stack>
                  }
                     <Button  variant="outlined" type='submit'>Change Image</Button>
                  </div>
    </form>
  </Box>
</Modal>
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
           {imgShow===false? "Add":"Edit"}
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
           >{imgShow===false? " Add Employee Profile":" Edit Employee Profile"}
           </Typography>
          <form onSubmit={handleSubmitData} key={getUserDataDataData}>
         <div className='address-input'>
         <div className='employee-img-upload'>
                  {
                    imgShow===false ?"": <Stack direction="row" alignItems="center" spacing={2}>
                    {
                     imageUpload?.length===0?
                     <div>
                     <CardContent variant="contained" component="label" className='upload-img'>   <img src={`https://hopebackend.hopeinfosys.com/${getDataUserData?.image&&getDataUserData?.image}`} />
                   <input hidden   type="file" accept="image/png , image/jepg,.txt,.doc"  name='image'  onChange={handleImgChange} />
                    </CardContent>
                  </div>:<div>
                       <CardContent variant="contained" component="label"  className='upload-img'><img src={myimage} width="80px" height="80px" />   
                             <input hidden   type="file" accept="image/png , image/jepg,.txt,.doc"  name='image'  onChange={handleImgChange} />
                           </CardContent> 
                      </div>
                    }
                     </Stack>
                  }
                  </div>
         <TextField
                      label="Address"
                      name="address"
                      type="text"
                      value={editFormData?.address}
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
                    {  imgShow===false?"Add Profile Details":"Edit Profile Details" }
                    
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
