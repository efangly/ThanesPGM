/* eslint-disable */
import { FaUser } from "react-icons/fa"
import { Container,Row,Col,Card } from 'react-bootstrap'
import { useState } from "react";
import { Helmet } from "react-helmet";
import { getUserInfo } from "../utils/Authorize";
import UserDatatableComponent from '../components/UserDatatable';
import NavbarComponent from '../components/Navbar';
import AddUserModal from '../components/AddUserModal'
import '../index.css'
import "../styles.css";

const User = ()=>{
  const [update,setUpdate] = useState(false)
  const updateUser=(params)=>{
    setUpdate(params)
  }

  return(
    <>
    <Helmet>
      <title>จัดการผู้ใช้งาน | {' '+getUserInfo().split(",",1)}</title>
    </Helmet>
    <NavbarComponent />
    <Container style={{ padding: 5, marginTop: 5}}>
    <Row>  
      <Col md={2}>
      </Col>
      <Col md={8}>
        <Card className='bg-incard'>
          <Card.Header className='bg-cardheader text-white'>
            <Row>
              <Col md={5}>
                <h4 style={{ textAlign: 'left'}}><FaUser /> จัดการผู้ใช้งาน</h4>
              </Col>
              <Col md={7} align="right">
                <AddUserModal adduser={updateUser} />
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Row>
              <UserDatatableComponent update={update} returnstatus={updateUser} />
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    </Container>
    </>
  )
}

export default User;