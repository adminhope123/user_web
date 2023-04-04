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
  Button,
  IconButton,
  Box,
  FormControl,
  TextField,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { UserListHead } from "src/sections/@dashboard/user";
import RefreshIcon from '@mui/icons-material/Refresh';
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
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
import { UserDataContext } from "src/UserDataContext";
import moment from "moment";
import { merge, set } from "lodash";
import LoaderComp from "src/loader/LoaderComp";
import ProgressBar from "./ProgressBar";

const TABLE_HEAD = [
  { id: "date", label: "Date", alignRight: false },
  { id: "day", label: "Day", alignRight: false },
  { id: "totalWork", label: "Total Work", alignRight: false },
  // { id: "timingRange", label: "Timing Range", alignRight: false },
  { id: "present", label: "Present", alignRight: false },
  { id: "absent", label: "Absent", alignRight: false },
];

export default function AttendanceTable() {
  const dispatch = useDispatch();
  const { attendances } = useSelector((res) => res.data);
  const [between, setBetween] = useState([]);
  const [updated, setUpdated] = useState([]);
  const [attendanceGetData, setAttendanceGetData] = useState(attendances);
  const [getData, setGetData] = useState();
  const [filterdataTotalTime,setFilterdataTotalTime]=useState()
   const [allObjectData,setAllObjectData]=useState()
   const [attendaceDataStore,setAttendaceDataStore]=useState()
   const [dateSort,setDateSort]=useState()
   const [presentData,setPresentData]=useState()
   const [totalWorkTimeData,setTotalWorkTimeData]=useState()
 const {getEmployeeId,timeData,handleTotalTime}=useContext(UserDataContext)
 const [startAlert, setStartAlert] = useState(false);
 const [dataRefresh, setDataRefresh] = useState(false);
 const [buttonDisable,setButtonDisable]=useState(false)
 const [totalWorkRange,setTotalWorkRange]=useState()

 const buttonData=()=>{
  setButtonDisable(false)
 }
  const attendancePostData = () => {
    setTimeout(() => {
      buttonData()
    },2000 );
    // handleTotalTime()
    
    const dataGet = JSON.parse(sessionStorage.getItem("totalWorkTime"));
    const dataGetGet=dataGet?.totalWorkTime
    setGetData(dataGetGet);
       
    const secs = dataGet?.totalSecoundData;
    
    const formatted = moment.utc(secs*1000).format('HH:mm:ss');
    console.log("filterdataTotalTime",formatted)

    const timeone = formatted;
    const timetwo = "08:00:00"; // total time 

    var pct = (100 * totalSeconds(timeone) / totalSeconds(timetwo)).toFixed(2).concat("%");

    function totalSeconds(time){
     var parts = time.split(':');
     return parts[0] * 3600 + parts[1] * 60 + parts[2];
 }
 const dataPerTage=pct.concat("%")
 console.log("data",dataPerTage)
 setTotalWorkRange(pct)
console.log("pct ",pct )

    getUserDataFunction()
    const livedate = new Date().toLocaleDateString("es-DO");
    const dateFilter = attendances?.slice(-2)[0]?.date;
   const firstDate=attendances?.map((item)=>item.date)

 const getTodayData=JSON.parse(sessionStorage.getItem("attendace"))
 delete getTodayData?.timerId
 delete getTodayData?.totalSeconds
 delete getTodayData?.stop
 delete getTodayData?.state
 delete getTodayData?.start
 delete getTodayData?.secs
 delete getTodayData?.parent
 delete getTodayData?.mins
 delete getTodayData?.absent
 delete getTodayData?.present
 delete getTodayData?.hours
delete getTodayData?.color

 const addTime=JSON.parse(sessionStorage.getItem("totalWorkTime"))
 const totalWorkTimeData=addTime?.totalWorkTime
 if(totalWorkTimeData){
   setTotalWorkTimeData(totalWorkTimeData)
 }
 const absentData={"absent":false.toString()}
 const presentDataData={"present":true.toString()}
 const totalHorusWork={"totalworkrange":pct}
 const objectmergePresentAbsent={...absentData,...presentDataData,...getTodayData,...totalHorusWork}
 const addObjectData={...objectmergePresentAbsent,...addTime}
   const userData=attendances?.map((item)=>{
    return item
   })
   const getIdDataLocalStorage=JSON.parse(sessionStorage.getItem("userData"))
   const getIdDataLocalStorageId=getIdDataLocalStorage?.map((item)=>{return item?.E_Id})
   const liveDateDate=new Date().toLocaleDateString("es-DO");
   const lastValue=liveDateDate
   const lastFirstValue=  userData.slice(-2)[0]?.date
   console.log("lastFirstValue",userData)
   var InputData = {
    end_date:lastValue,
    start_date:lastFirstValue,
    date:"",
    day:"",
    month:"",
    totalworkrange:"0",
    employeeId:getIdDataLocalStorageId,
    totalWorkTime:"0:00:00",
    present:"false",
    absent:"true"
}

var StartDate=moment(InputData.start_date, "DD-MM-YYYY");
var EndDate=moment(InputData.end_date, "DD-MM-YYYY");
var Days=EndDate.diff(StartDate, 'days')
var OutputData=[];

var firstObj={
  employeeId: getIdDataLocalStorageId,
    date: moment(StartDate).format("DD-MM-YYYY"),
    totalWorkTime:InputData.totalWorkTime,
    present:InputData.present,
    totalworkrange:InputData.totalWorkTime,
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
    totalworkrange:InputData.totalWorkTime,
    totalWorkTime:InputData.totalWorkTime,
    day:InputData.day,
    month:mydateMonth,
    day:mydatedata
   };
   
   OutputData.push(myObj);
}
console.log("OutputData",OutputData)
 const getAbsentData=OutputData?.map((item)=>{
    return item;  
  })
const dataRemoveFirst=getAbsentData?.shift();
const dataRemoveLast=getAbsentData?.slice(0).pop();
const filterData=getAbsentData?.filter(item=>item!==dataRemoveFirst&&item!==dataRemoveLast)

const employeeIdGet=JSON.parse(sessionStorage.getItem("userData"))
const getId=employeeIdGet?.map((item)=>{
 return item?.E_Id
})
const filterDAtaattendances=attendances?.filter((item)=>employeeIdGet?.find(ele=>ele.E_Id===item?.employeeId))
const getUserCheck=filterDAtaattendances?.map((item)=>{
    const dataadataa=filterData?.map((ele)=>{
        return item?.date.includes(ele?.date)
    })
    return dataadataa.toString()
})
const chekValueGet=getUserCheck?.includes("true")
console.log("filtertDAta",filterData)
if(chekValueGet===true){
}else{
  setDataRefresh(true)
  setButtonDisable(true)
  const absetDataAdd=filterData?.map((item)=>{
   return dispatch(attendancePostApi(item))
  })
  
}
console.log("attendances",attendances)

    const datadata=filterDAtaattendances?.map((item)=>{
         return item?.date.includes(addObjectData?.date)
    })
  const dataCheckData=datadata?.includes(true)
  if(dataCheckData===true){
   }else{
    setDataRefresh(true)
    setButtonDisable(true)
       dispatch(attendancePostApi(addObjectData))
   }
   var presentData = attendaceDataStore.map(tab=>keyFilters(tab, ["present"]))
     const daatta=[...presentData]
     console.log("dataa",daatta)
     const presentDataFilter =daatta.filter((item)=>item.present==="true")
     const presentDataDataDataDAta=presentDataFilter.length
     var absentDataDataDataDAta = attendaceDataStore.map(tab=>keyFilters(tab, ["absent"]))
     const absentDataArrayOf=[...absentDataDataDataDAta]
     console.log("dataa",absentDataArrayOf)
     const absentDataFilter =absentDataArrayOf.filter((item)=>item.absent==="true")
     const absentDataData=absentDataFilter.length
     console.log("filters",absentDataData)
     const presentDataDataData={"presentData":presentDataDataDataDAta}
     const absentDataDataData={"absentData":absentDataData}
     const mergeObjectdata=[presentDataDataData,absentDataDataData]
     console.log("mergeObject",mergeObjectdata)
     sessionStorage.setItem("attendaceData",JSON.stringify(mergeObjectdata))
  };
  const attendacePutData=()=>{
    stroke:' #FD453A'
    //         }
    //         30% {
    //           stroke: '#FD453A'
    //         }
    //         50% {
    //           stroke: '#FD9E3A'
    //         }
    //         80% {
    //           stroke: '#3A69FD'
    //         }
    //         100% {
    //           stroke: "#1AD852"
    //         }



    setStartAlert(true)
    const liveDate=new Date().toLocaleDateString("es-DO");
    
    const employeeIdGet=JSON.parse(sessionStorage.getItem("userData"))
    
    const getEmployeeIdDAtaDAta=employeeIdGet?.map((item)=>{return item?.E_Id})
    const getTodayDate=attendances?.filter((item)=>{return item.date===liveDate&&getEmployeeIdDAtaDAta&&item.id})
const getTotalWorkData=JSON.parse(sessionStorage.getItem("totalWorkTime"))

const getTime={"totalWorkTime":getTotalWorkData?.totalWorkTime}
const secs = getTotalWorkData?.totalSecoundData;
    
const formatted = moment.utc(secs*1000).format('HH:mm:ss');
console.log("filterdataTotalTime",formatted)

const timeone = formatted;
const timetwo = "08:00:00"; // total time 

var pct = (100 * totalSeconds(timeone) / totalSeconds(timetwo)).toFixed(2).concat("%");

function totalSeconds(time){
 var parts = time.split(':');
 return parts[0] * 3600 + parts[1] * 60 + parts[2];
}
const dataPerTage=pct.concat("%")
console.log("data",dataPerTage)
setTotalWorkRange(pct)
console.log("pct ",pct )
const totalHorusWork={"totalworkrange":pct}
const getDataIdDataa=getTodayDate?.filter((item)=>employeeIdGet?.find(ele=>ele?.E_Id===item?.employeeId))
const dataIdEmployeeGet=getDataIdDataa?.map((item)=>{return item?.id})
const employeeEditIdData=dataIdEmployeeGet

const dataAddEdit=getTodayDate?.map((item)=>{
  const dataMerge={...item,...getTime,...totalHorusWork}
  return   dispatch(attendanceApiPut(dataMerge,employeeEditIdData))
})

getUserDataFunction()
  }
  let keyFilters = function(values, keys){
    let filteredKeys = {}
    Object.keys(values).map((key, index)=>{
      if (keys.includes(key)){
         filteredKeys[key] = values[key]
      }
    }) 
  
    return filteredKeys;
  }
const handleTotalTimeModelClose = () => {
setTotalTimeModel(false);
};



useEffect(() => {
  dispatch(attendanceGetApi());
}, []);
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
  function createData(date, day, present, totalWorkTime, totalSeconds, absent,totalworkrange) {
    return { date, day, present, absent, totalWorkTime, totalSeconds,totalworkrange };
  }
const getUserDataFunction=()=>{
  const getEmployeeIdGetData=JSON.parse(sessionStorage.getItem("userData"))
  const getEmployeeIdData=getEmployeeIdGetData?.map((item)=>{
    const employeeGetData=attendances?.filter((ele)=>{return ele.employeeId===item.E_Id})
    setAttendaceDataStore(employeeGetData)
  })
}
useEffect(() => {
  getUserDataFunction()
}, [])
var isDescending = true;
const dataaaa=attendaceDataStore?.sort((a,b) => isDescending ? new Date(b.date).getTime() - new Date(a.date).getTime() : new Date(a.date).getTime() - new Date(b.date).getTime());
console.log("attendaceDataStore",dataaaa)
const dateFormat=attendaceDataStore?.sort(sortByDate);
function sortByDate(a, b) {
  if (a.date < b.date) {
      return 1;
  }
  if (a.date > b.date) {
      return -1;
  }
  return 0;
}

console.log("dateFormat",dateFormat)
const rows =dateFormat?.map((item) => {
    return [
      createData(
        item?.date,
        item?.day,
        item?.present,
        item?.totalWorkTime,
        item?.totalSeconds,
        item?.absent,
        item?.totalworkrange
      ),
    ]?.sort((a, b) => (a?.day < b?.day ? -1 : 1));
  });
  const dataaa = rows?.map((item) => {
    return item?.shift();
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const allReadyDataAlertFunctionClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setStartAlert(false);
  };
  const dataRefreshFunction = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setDataRefresh(false);
  };
 
  return (
    <div>
           <Box>
    <Stack>
            <Snackbar open={startAlert} autoHideDuration={6000}  onClose={allReadyDataAlertFunctionClose} className="time-add-alert" >
              <Alert onClose={allReadyDataAlertFunctionClose}   variant="filled" severity="info">
                  Time Add
              </Alert>
            </Snackbar>
          </Stack>
    </Box>
    <Box>
    <Stack>
            <Snackbar open={dataRefresh} autoHideDuration={6000}  onClose={dataRefreshFunction} className="time-add-alert" >
              <Alert onClose={dataRefreshFunction}    variant="filled" severity="warning">
                  Data Refresh
              </Alert>
            </Snackbar>
          </Stack>
    </Box>
   
      <div className="attendance-table">
        {console.log("buttonDisable",buttonDisable)}
      {
      buttonDisable===true?
       <Button  disabled variant="contained"  sx={{marginBottom:"30px"}} >
      <span> Data Refresh</span>
     <RefreshIcon sx={{marginLeft:"10px"}}/>
     </Button>: <Button   variant="contained" onClick={() => attendancePostData()} sx={{marginBottom:"30px"}}>
      <span> Data Refresh</span>
     <RefreshIcon sx={{marginLeft:"10px"}}/>
     </Button>
    }
       
          
          <Box sx={{display:"flex",alignItems:"stretch",justifyContent:"flex-end"}} className="totalWorkTime-data">
          <div className="totalWorkTimeData">
            <span>Total Work</span>
          <h1 >{totalWorkTimeData}</h1>
          </div>
            <Button  variant="contained" onClick={() => attendacePutData()} sx={{marginBottom:"30px"}}>
           <span>Add Time</span>
          <QueryBuilderIcon sx={{marginLeft:"10px"}}/>
          </Button>
          </Box>
        {/* <Table>
          <UserListHead headLabel={TABLE_HEAD} />
          <TableBody>
          
              ? ""
              : attendances &&
                attendances?.map((user) => {
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
      {/* {
        dataaa?.length?  */}
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
            {row?.totalWorkTime}
          </TableCell>
          {/* <TableCell style={{ width: 160 }} align="center">
              {
                row?.totalworkrange==="0" ? <span>Not Work</span> :<ProgressBar widthData={row?.totalworkrange?.slice(0,2)} />
              }    
          </TableCell> */}
          <TableCell style={{ width: 160 }} align="center">
              {row?.present === "true" ? (
                <div className="check-icon ">
            <CheckIcon />
                </div>
              ) : (
                ""
              )}
            </TableCell>
          <TableCell style={{ width: 160 }} align="center">
              {row?.absent === "true" ? (
                <div className="close-icon">
                   <CloseIcon />
                </div>
              ) : (
                ""
              )}
            </TableCell>
          
          {/* {row?.totalSeconds ? (
            <TableCell style={{ width: 160 }} align="center">
              {row?.present === "true" ? (
                <div className="close-icon">
               
                </div>
              ) : (
                ""
              )}
            </TableCell>
          ) : (
            <TableCell style={{ width: 160 }} align="center">
              {row?.absent === "true" ? (
                <div className="check-icon ">
                   <CloseIcon />
                </div>
              ) : (
                ""
              )}
            </TableCell>
          )} */}
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
       {/* :<LoaderComp/>
      } */}
      </div>
    </div>
  );
}
