import React, { useContext, useEffect, useState } from 'react'
import './AttendanceList.css'
import {attendanceGetApi, attendancePostApi, getTimeDataApi} from '../../Redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import CheckIcon from '@mui/icons-material/Check';
import { Container } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { UserListHead } from 'src/sections/@dashboard/user';
import { TableBody,Table,TableRow, TableCell } from '@mui/material';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import AttendanceTable from './AttendanceTable';
import { UserDataContext } from 'src/UserDataContext';


const TABLE_HEAD = [
  { id: 'day', label: 'Day', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'present', label: 'Present', alignRight: false },
  { id: 'totalWork', label: 'Total Work', alignRight: false },
];

export default function AttendanceList() {
  const dispatch=useDispatch()
  const {findDateFunction}=useContext(UserDataContext)

  return (
    <div className='attendance-list'>
      <button onClick={()=>findDateFunction()}>a</button>
        <AttendanceTable/>
    </div>
  )
}
