import React, { useState, useEffect } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import Tables from "../../components/Tables/Table";
import { loadingActions } from "../../store/loadingSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function AttendancePage() {
  const dispatch = useDispatch();
  const { cid } = useParams();
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);

  const getData = async () => {
    try {
      dispatch(loadingActions.showLoading());
      const classDataTemp = await axios.get("/api/getClass/" + cid);
      let classData = classDataTemp.data.data
      let roll_numbers = [];
      let itr = 0;
      while (classData.students[itr] != undefined) {
        let obj = {
          students: classData.students[itr].roll_number,
        };
        let j = 0;
        while (classData.attendance[j] != undefined) {
          obj[`${classData.attendance[j].date.split(" ")[0]}`] =
            classData.attendance[j].values[itr].status;
          j++;
        }
        roll_numbers.push(obj);
        itr++;
      }
      setTableData(roll_numbers);
      let column = [
        {
          Header: "Roll Number",
          accessor: "students",
        },
      ];
      let i = 0;
      while (classData.attendance[i] != undefined) {
        let obj = {
          Header: classData.attendance[i].date.split(" ")[0],
          accessor: classData.attendance[i].date.split(" ")[0],
        };
        column.push(obj);
        i++;
      }
      setColumns(column);
      dispatch(loadingActions.hideLoading());
    } catch (err) {
      dispatch(loadingActions.hideLoading());
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Dashboard>
        <Tables data={tableData} columns={columns} />
      </Dashboard>
    </>
  );
}
