import React, { useEffect, useState } from 'react'
import './AttendanceList.css'
import {getTimeDataApi} from '../../Redux/actions'
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '@mui/system';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Badge } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';


const isWeekend = (date) => {
  const day = date.day();

  return day === 0 || day === 6;
};

export default function AttendanceList() {
  const dispatch=useDispatch()
  const  time =new Date().toLocaleDateString("es-DO");
  const [toDayDate,setToDayDate]=useState(time)
  const [value, setValue] = useState(new Date());
  const [highlightedDays, setHighlightedDays] = useState([1,2,3]);
  const {users}=useSelector(state=>state?.data)
  const [getDateData,setGetDateData]=useState()
  const [filterDate,setFilterDate]=useState()
  useEffect(() => {
     dispatch(getTimeDataApi())
    findDateFunction()
  }, [])

  const findDateFunction=()=>{
    if(users){
      const findDateMap=users?.map((item)=>item.date)
      setGetDateData(findDateMap)
      console.log("getDateData",getDateData)
     const filterData=getDateData?.filter((item,
           index) => getDateData.indexOf(item) === index);
           if(filterData){
            
           }
        const stringJoin=parseInt(filterData,10)
        setFilterDate(stringJoin)
           console.log("filterDate",stringJoin)
    }
  }

  console.log("users",users)
  
  return (
    <div className='attendance-list'>
      <button onClick={()=>findDateFunction()}>a</button>
        <Container>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        // mask='____/__/__'
        variant='static'
        orientation='portrait'
        value={value}
        disableFuture
        onChange={(newValue) => setValue(newValue)}
        renderInput={(params) => {
          <TextField {...params} />;
        }}
        renderDay={(day, _value, DayComponentProps) => {
          const isSelected =
            !DayComponentProps.outsideCurrentMonth &&
            highlightedDays?.indexOf(day.getDate()) >= 0;

          return (
            <Badge
              key={day.toString()}
              overlap='circular'
              badgeContent={isSelected ?<CheckIcon sx={{color:"#2065d1"}}/>: undefined}
            >
              <PickersDay {...DayComponentProps} />
            </Badge>
          );
        }}
      />
    </LocalizationProvider>
        </Container>
    </div>
  )
}
