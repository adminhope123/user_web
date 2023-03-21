import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography, ButtonGroup } from '@mui/material';
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


import { Box } from '@mui/system';
import { ProductFilterSidebar } from './products';

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
export default function BlogPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const dispatch=useDispatch()
  const {users}=useSelector(res=>res.data)
  const [userEmployeeData,setUserEmployeeData]=useState()
  const [iconPost,setIconPost]=useState()

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const getUserData=async()=>{
        await dispatch(getUserDataApi())
        console.log("users",users)
  }

  const onChangePost=(item)=>{
    console.log("item",item)
    const dataIcon=item?.icon
    setIconPost(dataIcon)
    console.log("dataIcon",dataIcon)
    const filterData=users?.filter(data=>data?.post===item?.post)
    setUserEmployeeData(filterData)
    console.log("filterData",filterData)
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
  {
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
  }
    
        <Grid container spacing={3}>
          {
          userEmployeeData?.length?
          users?.map((postData, index) => (
            <BlogPostCard key={postData?.E_Id} postData={postData} index={index} />
          ))
          : users?.map((postData, index) => (
            <BlogPostCard key={postData?.E_Id} postData={postData} index={index} />
          ))
        }
         
        </Grid>
      </Container>
    </>
  );
}
