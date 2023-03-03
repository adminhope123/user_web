import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TableBody,
  Table,
  TableRow,
  TableCell,
  Pagination,
  TableHead,
  TablePagination,
  IconButton,
  Box,
} from "@mui/material";
import { UserListHead } from "src/sections/@dashboard/user";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import {
  attendanceGetApi,
  attendancePostApi,
  getTimeDataApi,
  attendanceApiPut,
} from "src/Redux/actions";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import Paper from "src/theme/overrides/Paper";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Update,
} from "@mui/icons-material";
import users from "src/_mock/user";
import { UserDataContext } from "src/UserDataContext";
import moment from "moment";
import { merge } from "lodash";

const TABLE_HEAD = [
  { id: "date", label: "Date", alignRight: false },
  { id: "day", label: "Day", alignRight: false },
  { id: "totalWork", label: "Total Work", alignRight: false },
  { id: "present", label: "Present", alignRight: false },
];

export default function AttendanceTable() {
  const dispatch = useDispatch();
  const { users } = useSelector((res) => res.data);
  const [between, setBetween] = useState([]);
  const [updated, setUpdated] = useState([]);
  const [attendanceGetData, setAttendanceGetData] = useState(users);
  const [getData, setGetData] = useState();
   const [allObjectData,setAllObjectData]=useState()
 const {getEmployeeId}=useContext(UserDataContext)

  const attendancePostData = () => {
    const dataGet = JSON.parse(sessionStorage.getItem("totalWorkTime"));
    const dataGetGet=dataGet?.totalWorkTime
    setGetData(dataGetGet);
    const livedate = new Date().toLocaleDateString("es-DO");
    const dateFilter = users?.slice(-2)[0]?.date;
   const firstDate=users?.map((item)=>item.date)
 
 const getTodayData=JSON.parse(sessionStorage.getItem("attendace"))
 delete getTodayData.timerId
 delete getTodayData.totalSeconds
 delete getTodayData.stop
 delete getTodayData.state
 delete getTodayData.start
 delete getTodayData.secs
 delete getTodayData.parent
 delete getTodayData.mins
 delete getTodayData.hours
delete getTodayData.color


 const addTime=JSON.parse(sessionStorage.getItem("totalWorkTime"))
 const addObjectData={...getTodayData,...addTime}
 console.log("addObjectData",addObjectData)
 console.log("users",users)

   const userData=users?.map((item)=>{
    return item
   })
   const lastValue=userData.slice(-1)[0]?.date
   const lastFirstValue=  userData.slice(-2)[0]?.date
   console.log("lastValue",lastValue)
   console.log("lastFirstValue",lastFirstValue)
   console.log("userData",getEmployeeId)
   var InputData = {
    end_date:lastValue,
    start_date:lastFirstValue,
    date:"",
    day:"",
    month:"",
    employeeId:getEmployeeId,
    totalwork:"0:00:00",
    present:"false",
    absent:"true"
}

var StartDate=moment(InputData.start_date, "DD-MM-YYYY");
var EndDate=moment(InputData.end_date, "DD-MM-YYYY");
var Days=EndDate.diff(StartDate, 'days')
var OutputData=[];

var firstObj={
  employeeId: getEmployeeId,
    date: moment(StartDate).format("DD-MM-YYYY"),
    totalwork:InputData.totalwork,
    present:InputData.present,
    absent:InputData.absent,
    month:moment(StartDate).format("MMMM"),
    day:moment(StartDate).format("dddd"),
}

OutputData.push(firstObj);

for(var i=1;i<Days+1;i++){
   var mydate=moment(StartDate).add(i, 'day').format("DD-MM-YYYY");
   var mydatedata=moment(StartDate).add(i, 'day').format("dddd");
   var mydateMonth=moment(StartDate).add(i, 'day').format("MMMM");
   var myObj={
    employeeId: getEmployeeId,
    date: mydate,
    present:InputData.present,
    absent:InputData.absent,
    totalwork:InputData.totalwork,
    day:InputData.day,
    month:mydateMonth,
    day:mydatedata
   };
   
   OutputData.push(myObj);
}

const getAbsentData=OutputData?.map((item)=>{
  return item;  
})
const absentFisrtValue=getAbsentData?.shift();
const absentSecondValue=getAbsentData?.slice(0).pop();
const filterData=getAbsentData?.filter(item=>item!==absentFisrtValue&&item!==absentSecondValue)
console.log("filterData",filterData)
console.log("addObjectData",addObjectData)
const mergeData= [...filterData,addObjectData];
const mergeArrayOfObject= [ ...users, ...mergeData ]


const dublicateValue=mergeArrayOfObject.filter((v,i,a)=>a.findLastIndex(v2=>(v2.date === v.date))===i)
console.log("dublicateValue",dublicateValue) 
const dublicateValueDataRemove=dublicateValue.filter(({ date: id1 }) => !users.some(({ date: id2 }) => id2 === id1));
console.log("dublicateValueDataRemove",dublicateValueDataRemove)
const dataaa=dublicateValueDataRemove?.map((item)=>{
  dispatch(attendancePostApi(item))
})
//  dispatch(attendancePostApi(addObjectData))
    // if (data) {
    //   // dispatch(attendanceApiPut(data))
    //   console.log("data", data);
    //   if (data?.date) {
    //     const employeeEditIdData = getData?.id;
    //     if (employeeEditIdData) {
    //       dispatch(attendanceApiPut(data, employeeEditIdData));
    //     }
    //   }
    //   users?.length
    //   ? console.log("data added")
    //   : dispatch(attendancePostApi(data));
    //   {
    //     users?.map((item) => {
    //       if (item.date === livedate) {
    //         console.log("data allredy");
    //       } else {
    //         dispatch(attendancePostApi(data));
    //       }
    //     });
    //   }
    // }
    console.log("users", users);
  };
  // console.log(data, "old data");
  useEffect(() => {
    dispatch(attendanceGetApi());
  }, [between]);

  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };
  function createData(date, day, present, totalWork, totalSeconds, absent) {
    return { date, day, present, absent, totalWork, totalSeconds };
  }
  const rows = users?.map((item) => {
    return [
      createData(
        item?.date,
        item?.day,
        item?.present,
        item?.totalWork,
        item?.totalSeconds,
        item?.absent
      ),
    ]?.sort((a, b) => (a?.day < b?.day ? -1 : 1));
  });
  const dataaa = rows?.map((item) => {
    return item?.shift();
  });
  // console.log("row", rows);
  // console.log("dataaa", dataaa);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <div className="attendance-table">
        <button onClick={() => attendancePostData()}>Click</button>
        {/* <Table>
          <UserListHead headLabel={TABLE_HEAD} />
          <TableBody>
          
              ? ""
              : users &&
                users?.map((user) => {
                  return (
                    <TableRow key={user?.id}>
                      <TableCell align="center">{user?.date}</TableCell>
                      <TableCell align="center">{user?.day}</TableCell>
                      {user.totalSeconds ? (
                        <TableCell align="center">
                          {user.present === true ? (
                            <div className="check-icon">
                              <CheckIcon />
                            </div>
                          ) : (
                            ""
                          )}
                        </TableCell>
                      ) : (
                        <TableCell align="center">
                          {user.absent === false ? (
                            <div className="close-icon ">
                              <CloseIcon />
                            </div>
                          ) : (
                            ""
                          )}
                        </TableCell>
                      )}
                      <TableCell align="center">{user?.totalWork}</TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table> */}
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <UserListHead headLabel={TABLE_HEAD} />
          <TableBody>
            {(rowsPerPage > 0
              ? dataaa?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : dataaa
            )?.map((row, index) => (
              <TableRow key={row?.index}>
                <TableCell style={{ width: 160 }} align="center" scope="row">
                  {row?.date}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row?.day}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row?.totalWork}
                </TableCell>
                {row?.totalSeconds ? (
                  <TableCell style={{ width: 160 }} align="center">
                    {row?.present === "true" ? (
                      <div className="close-icon">
                        <CloseIcon />
                       
                      </div>
                    ) : (
                      ""
                    )}
                  </TableCell>
                ) : (
                  <TableCell style={{ width: 160 }} align="center">
                    {row?.absent === "false" ? (
                      <div className="check-icon ">
                         <CheckIcon />
                      </div>
                    ) : (
                      ""
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={dataaa?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </Table>
      </div>
    </div>
  );
}
