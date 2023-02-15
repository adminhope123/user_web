import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { TableBody,Table,TableRow, TableCell } from '@mui/material';
import { UserListHead } from 'src/sections/@dashboard/user';
import { attendanceGetApi} from 'src/Redux/actions';
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
    const {findDateFunction}=useContext(UserDataContext)
    const{attendance}=useSelector(res=>res.data)

    useEffect(() => {
       dispatch(attendanceGetApi())
       findDateFunction()
       console.log("attendance",attendance)
    }, [])
    
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
                    attendance&&attendance === undefined?"":
                    attendance&&attendance?.map((user)=>{
                     return(
                    <TableRow  key={user?.id}>
                       <TableCell align="center">{user?.date}</TableCell>
                       <TableCell align="center">{user?.day}</TableCell>
                       {
                        user.totalSeconds?  <TableCell align="center">{user.present===true?<div className='check-icon'><CheckIcon/></div>:""}</TableCell>:
                        <TableCell align="center">{user.absent===false?<div className='close-icon '><CloseIcon/></div>:""}</TableCell>
                       }
                     
                 
                       <TableCell align="center">{user?.totalWork}</TableCell>
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
