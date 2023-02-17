import React, { useContext, useEffect, useState } from 'react'
import './AttendanceList.css'
import {attendanceGetApi, attendancePostApi, getTimeDataApi} from '../../Redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import CheckIcon from '@mui/icons-material/Check';
import { Container } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import Pagination from './Pagination'
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
  const {users}=useSelector(res=>res.data)
  const {findDateFunction}=useContext(UserDataContext)
  const [cardsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    let [movieCard, setmovieCard] = useState([]);
   
    useEffect(() => {
      setmovieCard(users)
    }, [currentPage])
    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = movieCard.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <div className='attendance-list'>
        <AttendanceTable movieCard={movieCard}/>
        <Pagination count={10} page={currentPage} onChange={handleChange} />
    </div>
  )
}
