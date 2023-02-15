import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { attendancePostApi, getTimeDataApi } from "./Redux/actions";

export const UserDataContext = createContext();
export const UserDataProvider = (props) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state?.data);
  const [userGetData, setUserGetData] = useState();
  const [totalWorkTime, setTotalWorkTime] = useState();
  const [attendanceData, setAttendanceData] = useState();

  const userGetDataFunction = () => {
    const getData = JSON.parse(sessionStorage.getItem("userData"));
    setUserGetData(getData);
    console.log("getData", getData);
  };
  useEffect(() => {
    dispatch(getTimeDataApi());
  }, []);

  const findDateFunction = () => {
    console.log("users", users);
    const filterData = users?.filter(
      (v, i, a) => a?.findIndex((v2) => v2.date === v.date) === i
    );
    const liveDate = new Date().toLocaleDateString("es-DO");
    const totaHours = users?.filter((item) => liveDate === item.date);
    const timeFilter = filterData?.filter((item) => liveDate === item.date);
    const totalWork = { "totalWork": totalWorkTime };
    console.log("totalWork", totalWork);
    const totalSecondsData = totaHours?.reduce(
      (acc, cur) => acc + cur.totalSeconds,
      0
    );
    getPaddedTime(totalSecondsData);
    if(totalWork){
      const addObjectTime = timeFilter?.map((item) => {
        return { ...item, ...totalWork };
      });
      setAttendanceData(addObjectTime);
      console.log("addObjectTime", addObjectTime);
      const attendanceObject = Object.assign({}, ...addObjectTime);
      console.log(attendanceObject, "aaa");
  
      if (attendanceObject === null && attendanceObject === undefined) {
        console.log("lodaing data");
      } else {
        attendanceObject?.date === liveDate
          ? dispatch(attendancePostApi(attendanceObject))
          : "";
      }

    }
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
    console.log("hoursTotal", hours + ":" + minutes + ":" + seconds);
    return {
      hours: addPadding(hours),
      mins: addPadding(minutes),
      secs: addPadding(seconds),
    };
  };
  useEffect(() => {
    userGetDataFunction();
    findDateFunction();
  }, []);
  const properties = {
    userGetData,
    attendanceData,
    findDateFunction,
  };

  return (
    <UserDataContext.Provider value={properties}>
      {props.children}
    </UserDataContext.Provider>
  );
};
