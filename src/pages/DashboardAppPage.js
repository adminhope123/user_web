import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography,Button,Box, Modal, FormControl, TextField} from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, getUserDataApi } from 'src/Redux/actions';
import { useEffect, useState } from 'react';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import GroupsIcon from '@mui/icons-material/Groups';
import AbsentIcon from './presentIcon.png'
import PresentIcon from './presentIcon.png'
import TimeTrackingIcon from './timeTracking.png'
import EmployeeIcon from './employeeImg.png'
import LoaderComp from 'src/loader/LoaderComp';
import { useLocation } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import styled from '@emotion/styled';
import { useChart } from 'src/components/chart';
// ----------------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "400px",
  borderRadius:"10px",
  bgcolor: 'background.paper',
  hight:"266px",
  boxShadow: 24,
  p: 4,
};
const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const StyledChartWrapper = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

export default function DashboardAppPage() {
  const theme = useTheme();
  const dispatch=useDispatch()
  const {employees}=useSelector(res=>res.data)
  const [userData,setUserData]=useState()
  const [allEmployeeData,setAllEmployeeData]=useState()
  const [totalAllTimeWork,setTotalAllTimeWork]=useState()
  const [absentData,setAbsentData]=useState()
  const [presentDataDataData,setPresentDataDataData]=useState()
  const [viewAllDataShow,setViewAllDataShow]=useState(true)
  const [closeIconShow,setCloseIconShow]=useState(true)
const [onlineData,setOnlineData]=useState()
const [getPostData,setGetPostData]=useState()
const [postCount,setPostCount]=useState()

const [chartDataSeries,setChartDataSeries]=useState()
const [chartOptionsData,setChartOptionsData]=useState()


    const getUserData=async()=>{
      await dispatch(getUserDataApi())
      const getUserData=JSON.parse(localStorage.getItem("loginData"))
      if(employees){
      
      }
      const getTotalWorkTime=JSON.parse(localStorage.getItem("totalAllTimeWork"))
      const dataTotalTimeEork=getTotalWorkTime?.totalWorkTime
      setTotalAllTimeWork(dataTotalTimeEork)
      const allEmployee=employees?.length
      setAllEmployeeData(allEmployee)
      const attendaceDataGet=JSON.parse(localStorage.getItem("attendaceData"))
      const attendaceDataGetData=attendaceDataGet&&attendaceDataGet?.map((item)=>{
        const absentDataData=item?.absentData
        setAbsentData(absentDataData)
        const presentDataData=item?.presentData
        if(presentDataData){
          setPresentDataDataData(presentDataData)
        }
      })
      const allUsersData=JSON.parse(localStorage.getItem("viewEmployee"))
      const postData=allUsersData?.map((item)=>{return item ?.role})
      const count = {};

      postData.forEach(element => {
  count[element] = (count[element] || 0) + 1;
});
setPostCount(count)
const valuDAta=Object.values(count)
console.log("valuDAtat",valuDAta)

    }
    useEffect(() => {
      getDataFunction()
    }, [])
  
    const getDataFunction=()=>{
          // access obj properties here
          if(typeof postCount !== 'undefined' && postCount !== null){
            const chartLabels =Object.keys(postCount);
            const chartSeries =Object.values(postCount);
            setChartDataSeries(chartSeries)
            const chartOptions = useChart({
              colors: chartColors,
              labels: chartLabels.toString(),
              stroke: { colors: [theme.palette.background.paper] },
              legend: { floating: true, horizontalAlign: 'center' },
              dataLabels: { enabled: true, dropShadow: { enabled: false } },
              tooltip: {
                fillSeriesColor: false,
                y: {
                  formatter: (seriesName) => fNumber(seriesName),
                  title: {
                    formatter: (seriesName) => `${seriesName}`,
                  },
                },
              },
              plotOptions: {
                pie: { donut: { labels: { show: false } } },
              },
            });
            if(chartOptions){
              setChartOptionsData(chartOptions)
            }
          }
      
    }
     
  
  useEffect(() => {
    getUserData()
  }, [])
  
  return (
    <>
      <Helmet>
        <title> Dashboard |  User Web </title>
      </Helmet>
   {
    employees?.length ?   <Container maxWidth="xl">
      <button onClick={getUserData}>Click</button>
    <Typography variant="h4" sx={{ mb: 5 }}>
      Hi, Welcome back
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary title="Employee" total={allEmployeeData}   icon={<GroupsIcon/>} />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary title="Work " total={totalAllTimeWork} color="info"  icon={<AccessTimeFilledIcon/>}  />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary title="Present" total={presentDataDataData} color="warning" imgIconPresent={PresentIcon} />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary title="Absent" total={absentData} color="error" imgIcon={AbsentIcon} setCloseIconShow={setCloseIconShow} closeIconShow={closeIconShow}/>
      </Grid>
      {/* <Grid item xs={12} md={6} lg={8}>
        <AppWebsiteVisits
          title="Website Visits"
          subheader="(+43%) than last year"
          chartLabels={[
            '01/01/2003',
            '02/01/2003',
            '03/01/2003',
            '04/01/2003',
            '05/01/2003',
            '06/01/2003',
            '07/01/2003',
            '08/01/2003',
            '09/01/2003',
            '10/01/2003',
            '11/01/2003',
          ]}
          chartData={[
            {
              name: 'Team A',
              type: 'column',
              fill: 'solid',
              data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
            },
            {
              name: 'Team B',
              type: 'area',
              fill: 'gradient',
              data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
            },
            {
              name: 'Team C',
              type: 'line',
              fill: 'solid',
              data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
            },
          ]}
        />
      </Grid> */}

      <Grid item xs={12} md={6} lg={4}>
      {
          chartDataSeries &&chartOptionsData?
          <StyledChartWrapper dir="ltr">
      <ReactApexChart type="pie" series={chartDataSeries} options={chartOptionsData} height={280} />
      </StyledChartWrapper>:""
      }
        {/* <AppCurrentVisits
          title="Current Visits"
          chartData={postCount}
          chartColors={[
            theme.palette.primary.main,
            theme.palette.info.main,
            theme.palette.warning.main,
            theme.palette.error.main,
          ]}
        /> */}
      </Grid>

      <Grid item xs={12} md={6} lg={8}>
        <AppConversionRates
          title="Conversion Rates"
          subheader="(+43%) than last year"
          chartData={[
            { label: 'Italy', value: 400 },
            { label: 'Japan', value: 430 },
            { label: 'China', value: 448 },
            { label: 'Canada', value: 470 },
            { label: 'France', value: 540 },
            { label: 'Germany', value: 580 },
            { label: 'South Korea', value: 690 },
            { label: 'Netherlands', value: 1100 },
            { label: 'United States', value: 1200 },
            { label: 'United Kingdom', value: 1380 },
          ]}
        />
      </Grid>

      {/* <Grid item xs={12} md={6} lg={4}>
        <AppCurrentSubject
          title="Current Subject"
          chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
          chartData={[
            { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
            { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
            { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
          ]}
          chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
        />
      </Grid> */}


{/* 
      <Grid item xs={12} md={6} lg={4}>
        <AppOrderTimeline
          title="Order Timeline"
          list={[...Array(5)].map((_, index) => ({
            id: faker.datatype.uuid(),
            title: [
              '1983, orders, $4220',
              '12 Invoices have been paid',
              'Order #37745 from September',
              'New order placed #XF-2356',
              'New order placed #XF-2346',
            ][index],
            type: `order${index + 1}`,
            time: faker.date.past(),
          }))}
        />
      </Grid> */}

      <Grid item sx={{width:"100% "}}>
        <AppTrafficBySite
          title="Hope Social Media"
          list={[
            {
              name: 'FaceBook',
              value: 323234,
              icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
            },
            {
              name: 'Google',
              value: 341212,
              icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
            },
            {
              name: 'Linkedin',
              value: 411213,
              icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
            },
            {
              name: 'Twitter',
              value: 443232,
              icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
            },
          ]}
        />
      </Grid>

    
    </Grid>
  </Container>:<LoaderComp/>
   }
    </>
  );
}
