import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { TableBody,Table,TableRow, TableCell, Pagination } from '@mui/material';
import { UserListHead } from 'src/sections/@dashboard/user';
import { attendanceGetApi, attendancePostApi, getTimeDataApi} from 'src/Redux/actions';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';


const TABLE_HEAD = [
    { id: 'day', label: 'Day', alignRight: false },
    { id: 'date', label: 'Date', alignRight: false },
    { id: 'present', label: 'Present', alignRight: false },
    { id: 'totalWork', label: 'Total Work', alignRight: false },
  ];
export default function AttendanceTable() {
    const dispatch=useDispatch()
    const {users}=useSelector(res=>res.data)
    const [data,setData]=useState()
    const [attendanceGetData,setAttendanceGetData]=useState(users)

  const attendancePostData=()=>{
    const dataGet=JSON.parse(sessionStorage.getItem("totalWork"))
    let uuid = crypto.randomUUID();
    const idRemove={...dataGet,id:uuid}
    console.log("idRemove",idRemove)
    if(idRemove){
      setData(idRemove)
    }
    if(data){
      dispatch(attendancePostApi(data))
    }
    console.log("users",users)
  }

    useEffect(() => {
      dispatch(attendanceGetApi())
    }, [])

  return (
    <div>
        <div className="attendance-table">
          <button onClick={()=>attendancePostData()}>Click</button>
                  <Table>
                  <UserListHead
                     headLabel={TABLE_HEAD}
                   />
                   <TableBody >
                 {
                    attendanceGetData&&attendanceGetData === undefined?"":
                    attendanceGetData&&attendanceGetData?.map((user)=>{
                     return(
                    <TableRow  key={user?.id} >
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
