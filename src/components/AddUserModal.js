/* eslint-disable */
import Swal from "sweetalert2";
import axios from "axios";
import { FaUserPlus } from "react-icons/fa"
import { Row,Col,Form,Modal,Button } from 'react-bootstrap'
import { useState } from "react";
import { getToken } from "../utils/Authorize";
import { Toast } from '../utils/Swal';
import '../index.css'
import "../styles.css";

const AddUserModal = (props)=>{
  const [User,setUser] = useState({
    userID:"",username:"",password:"",firstname:"",lastname:"",
    job:"Programmer",department:"IT Programmer",status:"admin",nickname:""
  })
  const {userID,username,password,firstname,lastname,job,
        department,status,nickname} = User;
  const inputValue = name=>event=>{
    setUser({...User,[name]:event.target.value});
  }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const submitForm=(e)=>{
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API}/createuser`,
    {userID,username,password,firstname,lastname,job,department,status,nickname},
    { headers:{ authorization:`Bearer ${getToken()}` } })
    .then(response=>{
      Toast().fire({ icon: 'success',title: 'เพิ่มผู้ใช้งานสำเร็จ' })
      props.updateadd(true)
      setUser({...User,userID:"",username:"",password:"",firstname:"",lastname:"",
        job:"Programmer",department:"IT Programmer",status:"admin",nickname:""});
    }).catch(err=>{
      if(err.response.statusText == "Unauthorized"){
        window.location = "/login"
      }
      else{ Swal.fire('Errors',err.response.statusText,'error') }
    })
  }

  return(
    <>
    <Button className="btn-create" onClick={handleShow}> <FaUserPlus size={24} /> เพิ่มผู้ใช้งาน</Button>
    <Modal size="lg" show={show} onHide={handleClose}>
      <Form onSubmit={submitForm}>
      <Modal.Header closeButton className='bg-cardheader text-white'>
        <Modal.Title><FaUserPlus size={28} /> เพิ่มผู้ใช้งาน</Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-incard text-white'>
        <Form> 
        <Row>
          <Col md={4}>
            <Form.Label className="text-white"> User ID : </Form.Label>
            <Form.Control type="text" placeholder="User ID" value={userID} onChange={inputValue("userID")} required />
            <Form.Label className="text-white"> Username : </Form.Label>  
            <Form.Control type="text" placeholder="Username" value={username} onChange={inputValue("username")} required />
            <Form.Label className="text-white"> Password : </Form.Label>  
            <Form.Control type="password" placeholder="Password" value={password} onChange={inputValue("password")} required />
          </Col>
          <Col md={4}>
            <Form.Label className="text-white"> ชื่อ : </Form.Label>
            <Form.Control type="text" placeholder="ชื่อ" value={firstname} onChange={inputValue("firstname")} required />
            <Form.Label className="text-white"> นามสกุล : </Form.Label>  
            <Form.Control type="text" placeholder="นามสกุล" value={lastname} onChange={inputValue("lastname")} required />
            <Form.Label className="text-white"> ชื่อเล่น : </Form.Label>  
            <Form.Control type="text" placeholder="ชื่อเล่น" value={nickname} onChange={inputValue("nickname")} required />
          </Col>
          <Col md={4}>
            <Form.Label className="text-white"> ตำแหน่ง : </Form.Label>
            <Form.Select className="custom-select" onChange={inputValue("job")} value={job}>
              <option value="Programmer" >Programmer</option>
              <option value="IT Support" >IT Support</option>
            </Form.Select>
            <Form.Label className="text-white"> แผนก : </Form.Label>  
            <Form.Select className="custom-select" onChange={inputValue("department")} value={department}>
              <option value="IT Programmer" >IT Programmer</option>
            </Form.Select>
          </Col>
        </Row> 
        </Form>
      </Modal.Body>
      <Modal.Footer className='bg-cardheader text-white'>
        <Button type="submit" className='btn-create' onClick={handleClose}>
        <FaUserPlus size={24} /> เพิ่มผู้ใช้งาน
        </Button>
      </Modal.Footer>
      </Form>
    </Modal>
    </>
  )
}

export default AddUserModal;