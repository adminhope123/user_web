import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography,IconButton, ButtonGroup, Drawer, RadioGroup, FormControlLabel, Radio, Divider } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUserDataApi, profileGetApi } from 'src/Redux/actions';
import AndroidIcon from './IconBlog/androidIcon.png'
import BidderIcon from './IconBlog/Bidder.png'
import CeoIcon from './IconBlog/CEO.png'
import HrIcon from './IconBlog/Hr.png'
import LaravelIcon from './IconBlog/laravelIcon.png'
import StaffIcon from './IconBlog/staff.png'
import ReactIconData from './IconBlog/ReactIcon.png'
import StudentsIcon from './IconBlog/Students.png'
import UIUXDesignIcon from './IconBlog/UIUXDesignIcon.png'
import Scrollbar from '../components/scrollbar/Scrollbar';


import { Box } from '@mui/system';
import { ProductFilterSidebar } from 'src/sections/@dashboard/products';
import NotFoundEmployee from './NotFoundEmployee';
import LoaderComp from 'src/loader/LoaderComp';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

const postData=[
  {id:"1",post:"CEO",icon:CeoIcon},
  {id:"2",post:"HR",icon:HrIcon},
  {id:"3",post:"Students",icon:StudentsIcon},
  {id:"4",post:"Web Developer",icon:StudentsIcon},
  {id:"5",post:"Wordpress Developer",icon:StudentsIcon},
  {id:"6",post:"Laravel Developer(PHP)",icon:LaravelIcon},
  {id:"7",post:"Bidder",icon:BidderIcon},
  {id:"8",post:"React Js",icon:ReactIconData},
  {id:"9",post:"UI/UX Design",icon:UIUXDesignIcon},
  {id:"10",post:"Android",icon:AndroidIcon}
]
export const FILTER_CATEGORY_OPTIONS = ["All Staff","CEO","HR","Student" ,"BDE","Node Js","Web Design","Web Developer","Wordpress Devloper","Wordpress Designer","Laravel Developer(PHP)","Android Devloper","React Js","Angular","UI/UX Design","Python","Designer"];
export default function BlogPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const dispatch=useDispatch()
  const {employees}=useSelector(res=>res.data)
  const [userEmployeeData,setUserEmployeeData]=useState()
  const [iconPost,setIconPost]=useState()
  const [filterDataData,setFilterDataData]=useState()
  const [showDataAll,setShowDataAll]=useState(true)
  const [allEmployeeData,setAllEmployeeData]=useState()

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const handleDataFilter=(item)=>{
   const userFilter=employees?.filter(elee=>elee?.role===item)
   if(userFilter){
     setFilterDataData(userFilter)
   }
   setShowDataAll(false)
   const dataAdd=item
   const dataCheck=item.includes("All Staff")
   setAllEmployeeData(dataCheck)
  }

  
  const getUserData=async()=>{
        await dispatch(getUserDataApi())
  }

  const onChangePost=(item)=>{
    const dataIcon=item?.icon
    setIconPost(dataIcon)
    const filterData=employees?.filter(data=>data?.post===item?.post)
    setUserEmployeeData(filterData)
  }

  useEffect(() => {
     getUserData()
  }, [])
  
  return (
    <>
      <Helmet>
        <title> Dashboard: Staff |  User Web </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Staff
          </Typography>
        </Stack>

        {/* <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={userEmployeeData} />
        </Stack> */}
  {/* {
    userEmployeeData?.length ?
  <Box sx={{display:"flex",justifyContent:"center",marginBottom:"20px"}}>
  <Box sx={{border:"1px solid #dfe2e7",width:"100px",height:"100px",borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",}}>
  <img  key={iconPost} src={iconPost} width="66px" height="66px"/>
  </Box>
</Box>:<Box sx={{display:"flex",justifyContent:"center",marginBottom:"20px"}}>
<Box sx={{border:"1px solid #dfe2e7",width:"100px",height:"100px",borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",}}>
  <img   src={StaffIcon} width="66px" height="66px"/>
  </Box>
</Box>
  } */}
  {
    employees?.length ?
    <div>
    <Box sx={{display:"flex",justifyContent:"flex-end",marginBottom:"10px"}}>  
     <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />} onClick={handleOpenFilter}>
      Filters&nbsp;
    </Button>
      </Box>
      {
        showDataAll===true ?
          <div>
          <Grid container spacing={3}>
         {
           employees?.map((postData, index) => (
             <BlogPostCard key={postData?.E_Id} postData={postData} index={index} />
           ))
         }
         </Grid>
       </div>:""
      }

  
  <div>
      
      {
          filterDataData?.length===0? 
          <div>
            {
              allEmployeeData===true ?
              <div>
                 <Grid container spacing={3}>
         {
           employees?.map((postData, index) => (
             <BlogPostCard key={postData?.E_Id} postData={postData} index={index} />
           ))
         }
         </Grid>
                </div>:    <div>
          <NotFoundEmployee/>
          </div>
            }
         
            </div>
          :
            <Grid container spacing={3}>
            {
              filterDataData?.map((postData, index) => (
                <BlogPostCard key={postData?.E_Id} postData={postData} index={index} />
              ))
            }
            </Grid>
       
         }
      </div>
     
        {/* {
        userEmployeeData?.length?
        employees?.map((postData, index) => (
          <BlogPostCard key={postData?.E_Id} postData={postData} index={index} />
        ))
        : employees?.map((postData, index) => (
          <BlogPostCard key={postData?.E_Id} postData={postData} index={index} />
        ))
      } */}
      
      </div>:<LoaderComp/>
  }
     
      </Container>
    

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={handleCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={handleCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Team Members
              </Typography>
              <RadioGroup>
                {FILTER_CATEGORY_OPTIONS.map((item,index) => (
                <Box key={item}>
                    <FormControlLabel key={item} value={item}  control={<Radio  onClick={()=>handleDataFilter(item)}/>} label={item} />
                </Box>
                ))}
              </RadioGroup>
            </div>
          </Stack>
        </Scrollbar>
        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
            onClick={handleCloseFilter}
          >
          Close Filter
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
