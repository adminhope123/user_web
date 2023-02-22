import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TableBody,
  Table,
  TableRow,
  TableCell,
  Pagination,
} from "@mui/material";
import { UserListHead } from "src/sections/@dashboard/user";
import {
  attendanceGetApi,
  attendancePostApi,
  getTimeDataApi,
  attendanceApiPut,
} from "src/Redux/actions";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

const TABLE_HEAD = [
  { id: "day", label: "Day", alignRight: false },
  { id: "date", label: "Date", alignRight: false },
  { id: "present", label: "Present", alignRight: false },
  { id: "totalWork", label: "Total Work", alignRight: false },
];
export default function AttendanceTable() {
  const dispatch = useDispatch();
  const { users } = useSelector((res) => res.data);
  const [data, setData] = useState();
  const [between, setBetween] = useState([]);
  const [updated,setUpdated]=useState()
  const [attendanceGetData, setAttendanceGetData] = useState(users);
  const [getData, setGetData] = useState();
  const attendancePostData = () => {
    const dataGet = JSON.parse(sessionStorage.getItem("totalWork"));
    setGetData(dataGet);
    const idRemove = { ...dataGet };
    console.log("idRemove", idRemove);
    console.log("data", data);
    const livedate = new Date().toLocaleDateString("es-DO");
    const dateFilter = users?.slice(-2)[0]?.date;
    console.log("dateFilter", dateFilter);
    console.log("livedate", livedate);

    // var date = dateFilter;
    // var datearray = date.split("/");
    // var newdate1 = datearray[1] + "/" + datearray[0] + "/" + datearray[2];

    // var date2 = livedate;
    // var datearray2 = date2.split("/");
    // var newdate2 = datearray2[1] + "/" + datearray2[0] + "/" + datearray2[2];

    // var date1 = new Date(newdate1.toString());
    // var date2 = new Date(newdate2.toString());

    // var Difference_In_Time = date2.getTime() - date1.getTime();

    // var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    // console.log(Difference_In_Days, "diffrent of the days");

    // between to dates start

    var b = dateFilter.split(/\D/);
    b = b.reverse().join("-");

    var a = livedate.split(/\D/);
    a = a.reverse().join("-");
    function getDatesInRange(startDate, endDate) {
      const date = new Date(startDate.getTime());

      const dates = [];

      while (date <= endDate) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }

      for (var i = 1; i < dates.length - 1; i++) {
        var absentdata = {
          date: dates[i].toString().slice(0, 15),
          absent: true,
          totalWork: 0,
        };
        // console.log(absentdata,"bbbbbbbbbbbbbbbb")
        between.push(absentdata);
       console.log(data,"ppppppp")
        // data.push(absentdata);
      }
    }
    const d1 = new Date(b.toString());
    const d2 = new Date(a.toString());
    
    getDatesInRange(d1, d2)
    // between to dates end
    
    
    if (dataGet) {
      setData(dataGet);
    }
    if (data) {
      console.log("date", data);
      
      // const attendancePutApiData=
      // dispatch(attendanceApiPut(data))
      console.log("data", data?.date);
      if (data?.date) {
        const attendanceId = getData?.id;
        if (attendanceId) {
          dispatch(attendanceApiPut(data, attendanceId));
        }
      }
      users?.length
      ? console.log("data added")
      : dispatch(attendancePostApi(data));
      {
        users?.map((item) => {
          if (item.date === livedate) {
            console.log("data allredy");
          } else {
            dispatch(attendancePostApi(data));
          }
        });
      }
    }
    console.log("users", users);
   
        
  };
  
  console.log(data,"old data")
  between.push(data)
  
  console.log(between, "between dates");
  for(var i=0;i<between.length;i++){
    if(between[i]===undefined){
      console.log("not valid") 
    }else{
      var a=between[i]
      console.log(a,"remove array")
      setUpdated(between[i])
    }
  }
  useEffect(() => {
    dispatch(attendanceGetApi());
   
   
  }, []);
  useEffect(() => {
    users.reverse();
  }, [users]);
 
  return (
    <div>
      <div className="attendance-table">
        <button onClick={() => attendancePostData()}>Click</button>
        <Table>
          <UserListHead headLabel={TABLE_HEAD} />
          <TableBody>
            {users && users === undefined
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
        </Table>
      </div>
    </div>
  );
}
