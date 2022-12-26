
/* eslint-disable */
import DataTable from 'react-data-table-component';
import axios from "axios";
import { useState,useEffect } from "react";
import { FaTrashAlt  } from "react-icons/fa";
import { Button } from 'react-bootstrap';
import Swal from "sweetalert2";
import "../styles.css";
import { DeleteSwal } from '../utils/Swal';
import { getToken,getUserId } from "../utils/Authorize";
import { userDataTablecolumn } from '../utils/Columns';

const UserDatatable = (props)=>{
  const columns = userDataTablecolumn()
  columns.push({
    name: "ลบ",
    cell: row => (
        <Button variant="outline-danger" raised primary onClick={()=>{removeUser(row.fullname,row.userID)}} > 
          <FaTrashAlt />
        </Button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    maxWidth: "30px",
    center: true
  })
  useEffect(()=>{
    fetchData()
  },[props.update])
  
  const [User,setUser] = useState([])
  const fetchData=()=>{
    axios.get(`${process.env.REACT_APP_API}/userlistnoself/${getUserId()}`,
    { headers:{ authorization:`Bearer ${getToken()}` }})
    .then(response=>{
      props.returnstatus(false)
      setUser(response.data)
    })
    .catch(err=>{
      if(err.response.statusText == "Unauthorized"){
        window.location = "/login"
      }
      else{ Swal.fire('Errors',err.response.data.error,'error') }
    })
  }

  const removeUser=(userName,userID)=>{
    DeleteSwal().then((result) => {
      if(result.isConfirmed){
        axios.delete(`${process.env.REACT_APP_API}/removeuser/${userID}`,
        { headers: {authorization:`Bearer ${getToken()}`} })
        .then(response=>{ fetchData() })
        .catch(err=>{
          if(err.response.statusText == "Unauthorized"){
            window.location = "/login"
          }
          else{ Swal.fire('Errors',err.response.data.error,'error') }
        })
      }
    })
  }
  return(
    <>
    <DataTable columns={columns} data={User} theme='dark' pagination defaultSortAsc={false} /> 
    </>
  )
}

export default UserDatatable;