import { Paper } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {getAllAdmin} from '../../redux'
import AdminForm from './AdminForm';
import AdminTable from './AdminTable';
import axios from 'axios';
import './style.css'


const Admin = (props) =>{
    const [isOpen, setOpen] = useState(false)
    const [id, setId] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
      });
    useEffect(() => {
        getData();
    }, [])
    const getData = () => {
        props.getAllAdminata()
    }
    const handleChange = (e) => {
        e.preventDefault();
        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.value;
        const newFormData = { ...formData };
        newFormData[fieldName] = fieldValue;
        setFormData(newFormData);
      };
      const submitHandler =async e =>{
          e.preventDefault();
          const {name, email, password} = formData;
          
          if(!editMode){
            const rawResponse = await fetch('https://exam-manag.herokuapp.com/admin', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                     pwd:password
                })
            });
            const content = await rawResponse.json();
            if(content && content.error){
                alert(content.error.message);
            }else{
                alert("Created successfully")
                setOpen((open)=> !open)
                getData();
                clearForm();
            }
          }else{
            const rawResponse = await fetch(`https://exam-manag.herokuapp.com/admin/${id}`, {
                method: 'PUT',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                     pwd:password,
                     is_active:true
                })
            });
            const res = await rawResponse.json();
            console.log("update", res)
            if(res){
                alert(res.message.Success)
                setOpen((open)=> !open)
                setEditMode(mode=>!mode)
                getData();
                clearForm();

            }
          }
      }

      const clearForm = () => {
          setFormData({
            name: "",
            email: "",
            password: ""
          })
      }
      
    const handleForm = () =>{
        setOpen(open=> !open)
    }
    const editClickHandler = (record) =>{
        setOpen(open => !open)
        console.log("edir",record);
        setId(record.user_id)
        setEditMode(mode=>!mode);

        setFormData({
            name:record.uname,
            email: record.email,
            password:record.password
        })
    }
    return(
        <div className="w-100 p-5" style={{height:"calc(100% - 64px)", overflow:"auto"}}>
            <div className='row'>
                <div className='col-6'><h5>
                    {!isOpen ? 'Admin Management':(<div><i onClick={handleForm} class="bi bi-arrow-left text-primary" style={{fontWeight:"800"}}></i> Create Admin</div>)}
                    </h5></div>
                <div className='col-6 d-flex justify-content-end'>
                    {
                        !isOpen && (<button onClick={handleForm} className='btn btn-primary'> Create Admin</button>)
                    }
                </div>
            </div>
            {
                isOpen ? (
                    <AdminForm 
                    formData={formData}
                    handleChange={handleChange}
                    handleClick={submitHandler}
                    editMode={editMode}
                    />
                ):(
                <AdminTable
                editClickHandler={editClickHandler} 
                records={props.admins}/>
                )
            }
            

        </div>
    )
}

const mapStateToProps = state => {
    return {
        admins: state.admin.admins
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllAdminata: ()=> dispatch(getAllAdmin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Admin);