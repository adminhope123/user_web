import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { TableBody,Table,TableRow, TableCell, Pagination } from '@mui/material';
import { UserListHead } from 'src/sections/@dashboard/user';
import { attendanceGetApi, attendancePostApi, getTimeDataApi} from 'src/Redux/actions';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { UserDataContext } from 'src/UserDataContext';


const TABLE_HEAD = [
    { id: 'day', label: 'Day', alignRight: false },
    { id: 'date', label: 'Date', alignRight: false },
    { id: 'present', label: 'Present', alignRight: false },
    { id: 'totalWork', label: 'Total Work', alignRight: false },
  ];
export default function AttendanceTable({movieCard}) {
    const dispatch=useDispatch()
    const {users}=useSelector(res=>res.data)
 
  const attendancePostData=()=>{
    const dataGet=JSON.parse(localStorage.getItem("timeTotal"))
    console.log("dataGet",dataGet)
    dispatch(attendancePostApi(dataGet))
  }

    useEffect(() => {
      attendancePostData()
      dispatch(attendanceGetApi())
      console.log("users",users)
    }, [])

   
  
  return (
    <div>
        <div className="attendance-table">
                  <Table>
                  <UserListHead
                     headLabel={TABLE_HEAD}
                   />
                   <TableBody >
                 {
                    movieCard&&movieCard === undefined?"":
                    movieCard&&movieCard?.map((user)=>{
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
  );
}
