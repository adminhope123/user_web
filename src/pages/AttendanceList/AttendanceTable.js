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

const TABLE_HEAD = [
  { id: "date", label: "Date", alignRight: false },
  { id: "day", label: "Day", alignRight: false },
  { id: "totalWork", label: "Total Work", alignRight: false },
  { id: "present", label: "Present", alignRight: false },
];

export default function AttendanceTable() {
  const dispatch = useDispatch();
  const { users } = useSelector((res) => res.data);
  const [data, setData] = useState();
  const [between, setBetween] = useState([]);
  const [updated, setUpdated] = useState([]);
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
         console.log(absentdata,"bbbbbbbbbbbbbbbb")
        between.push(absentdata);
        between.push(data);
        console.log(between,"aaaaaaa")
        // console.log(data, "ppppppp");
        // data.push(absentdata);
      }
    }
    const d1 = new Date(b.toString());
    const d2 = new Date(a.toString());

    getDatesInRange(d1, d2);
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
    for (var i = 0; i < between.length; i++) {
      if (between[i] === undefined) {
        // console.log("not valid");
      } else {
        var a = between[i];
        //  console.log(a,"bb")
        updated.push(between[i]);
      }
    }
    
  };

  // console.log(data, "old data");

  useEffect(() => {
    users.reverse();
  }, [users]);
  
  useEffect(() => {
    dispatch(attendanceGetApi());
    console.log(updated,"lllllllllll")
    
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
              ? dataaa.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : dataaa
            ).map((row, index) => (
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
                    {row?.present === true ? (
                      <div className="check-icon">
                        <CheckIcon />
                      </div>
                    ) : (
                      ""
                    )}
                  </TableCell>
                ) : (
                  <TableCell style={{ width: 160 }} align="center">
                    {row?.absent === false ? (
                      <div className="close-icon ">
                        <CloseIcon />
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
