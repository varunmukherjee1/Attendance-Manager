import React, { useState, useEffect } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import Tables from "../../components/Tables/Table";
import { loadingActions } from "../../store/loadingSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { CSVLink} from "react-csv";
// import {URL} from "../../constants/backend"

import classes from "./AttendancePage.module.css"

export default function AttendancePage() {
  const dispatch = useDispatch();
  const { cid } = useParams();
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [csvData,setCSVData] = useState([]);

  const getData = async () => {
    try {
      dispatch(loadingActions.showLoading());
      const classDataTemp = await axios.get("/api/getClass/" + cid);
      let classData = classDataTemp.data.data
      let roll_numbers = [];
      let itr = 0;
      while (classData.students[itr] !== undefined) {
        let obj = {
          students: classData.students[itr].roll_number,
        };
        let j = 0;
        while (classData.attendance[j] !== undefined) {
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
      while (classData.attendance[i] !== undefined) {
        let obj = {
          Header: classData.attendance[i].date.split(" ")[0],
          accessor: classData.attendance[i].date.split(" ")[0],
        };
        column.push(obj);
        i++;
      }
      setColumns(column);

      const cData = [[...column.map((c) => c.Header)]]

      const helper = [...column.map((c) => c.accessor)]

      roll_numbers.forEach((rl) => {
        let tArr = []

        helper.forEach((d) => {
          tArr.push(rl[d])
        })

        cData.push(tArr)
      })

      setCSVData(cData)

      dispatch(loadingActions.hideLoading());
    } catch (err) {
      dispatch(loadingActions.hideLoading());
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log(columns);
  // console.log(tableData);
  // console.log(csvData);

  return (
    <>
      <Dashboard>
        <CSVLink data = {csvData} className = {classes.link}>Download CSV</CSVLink>
        <Tables data={tableData} columns={columns} />
      </Dashboard>
    </>
  );
}
