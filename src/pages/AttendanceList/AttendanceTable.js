import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { TableBody,Table,TableRow, TableCell } from '@mui/material';
import { UserListHead } from 'src/sections/@dashboard/user';
import { attendancePostApi, getTimeDataApi} from 'src/Redux/actions';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { UserDataContext } from 'src/UserDataContext';


const TABLE_HEAD = [
    { id: 'day', label: 'Day', alignRight: false },
    { id: 'date', label: 'Date', alignRight: false },
    { id: 'present', label: 'Present', alignRight: false },
    { id: 'totalWork', label: 'Total Work', alignRight: false },
  ];
export default function AttendanceTable() {
    const dispatch=useDispatch()
    const {users}=useSelector(res=>res.data)
    const [totalWorkTime, setTotalWorkTime] = useState();
    const [attendanceData, setAttendanceData] = useState();
    const [attendanceGetData,setAttendanceGetData]=useState()


    useEffect(() => {
       dispatch(getTimeDataApi())
       attendanceGetDataFunction()
    }, [])

    const attendanceGetDataFunction=()=>{
      fetch('http://localhost:3004/attendance')
      .then((response)=>response.json())
      .then((res)=>setAttendanceGetData(res))
   }
   const findDateFunction = () => {
    const getData = users?.map((item) => item);
    console.log("getDAta", getData);
    const liveDate = new Date().toLocaleDateString("es-DO");
    const duplicateDate = liveDate;
    const dublicateValue = users.filter((obj) =>
      duplicateDate.includes(obj.date)
    );
    const totalSecondsData = dublicateValue?.reduce(
      (acc, cur) => acc + cur.totalSeconds,
      0
    );
    getPaddedTime(totalSecondsData);

    const filterData = dublicateValue?.filter(
      (v, i, a) => a?.findIndex((v2) => v2.date === v.date) === i
    );
    const attendanceObject = Object.assign({}, ...filterData);
    const totalWorkObject = { totalWorkTime: totalWorkTime };
    const totalWorkDataAdd = { ...attendanceObject, ...totalWorkObject };
    console.log(totalWorkDataAdd, "aaaaa");
    dispatch(attendancePostApi(totalWorkDataAdd));
    // console.log("totalWorkDataAdd", totalWorkDataAdd);
    // console.log("attendanceObject", attendanceObject);
    // console.log("filterData", filterData);
    // console.log("dublicateData", dublicateValue);
    // console.log("totalSecondsData", totalSecondsData);
  };
    const updateAppTitle = (hours, mins, secs) => {
      document.title =
        hours > 0
          ? `${hours} hour`
          : mins > 0
          ? `${mins} min ${secs} sec`
          : `${secs} sec`;
    };
    const getPaddedTime = (totalSecondsData) => {
      const addPadding = (value) =>
        value.toString().length === 1 ? `0${value}` : value;
      const hours = Math.floor(totalSecondsData / 3600);
      const remainingSecs = totalSecondsData - hours * 3600;
      const minutes = Math.floor(remainingSecs / 60);
      const seconds = remainingSecs - minutes * 60;
      updateAppTitle(hours, minutes, seconds);
      setTotalWorkTime(hours + ":" + minutes + ":" + seconds);
      return {
        hours: addPadding(hours),
        mins: addPadding(minutes),
        secs: addPadding(seconds),
      };
    };
  return (
    <div>
        <div className="employee-table">
            <button onClick={()=>findDateFunction()}>Click</button>
                  <Table>
                  <UserListHead
                     headLabel={TABLE_HEAD}
                   />
                   <TableBody >
                 {
                    users&&users === undefined?"":
                    users&&users?.map((user)=>{
                     return(
                    <TableRow  key={user?.id}>
                       <TableCell align="center">{user?.date}</TableCell>
                       <TableCell align="center">{user?.day}</TableCell>
                       {
                        user.totalSeconds?  <TableCell align="center">{user.present===true?<div className='check-icon'><CheckIcon/></div>:""}</TableCell>:
                        <TableCell align="center">{user.absent===false?<div className='close-icon '><CloseIcon/></div>:""}</TableCell>
                       }
                       <TableCell align="center">{user?.totalWorkTime}</TableCell>
                    </TableRow>
                     )
                    })
                  }
                  </TableBody>
                  </Table>
                </div>
    </div>
  )
}
