import { Paper } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './style.css'
import StudentForm from './StudentForm';
import StudentTable from './StudentTable'
import Password from 'antd/lib/input/Password';


const Student = (props) =>{
    const [isOpen, setOpen] = useState(false)
    const [id, setId] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [rowData, setRowData] = useState({});
    const [records, setRecords] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        state: "",
        pincode: "",
        district: "",
        city: "",
        phone: "",
        email: "",
        gender: "",
        dob: "",
        dept_id: 1,
        batch: "",
        rollno: 2,
        pwd: ""
    })

    useEffect(()=>{
        getStudentRecords();
        getDepartments();
    },[])
    const getStudentRecords = async () =>{
        const res = await axios.get('https://exam-manag.herokuapp.com/student');
        if(res){
            console.log("check res", res.data.message.records);
            setRecords(res.data.message.records);
        }
    }
    const getDepartments = async () =>{
        const res = await axios.get('https://exam-manag.herokuapp.com/department');
        if(res){
            console.log("check res", res);
            setDepartments(res.data.message.records);
        }
    }

    const clearForm = () => {
        setFormData({
            name: "",
            state: "",
            pincode: "",
            district: "",
            city: "",
            phone: "",
            email: "",
            gender: "",
            dob: "",
            dept_id: "",
            batch: "",
            rollno: "",
            pwd: ""
        })
    }
    const handleChange = name => (e) => {
        e.preventDefault();
        const fieldName = name;
        const fieldValue = e.target.value;
        const newFormData = { ...formData };
        newFormData[fieldName] = fieldValue;
        setFormData(newFormData);
      };

    const handleForm = () =>{
        setOpen(open=> !open)
        setEditMode(false)
        clearForm();
    }
    
    const onSelectChange = (name) => (e) => {
        if(name==="gender"){
            setFormData({
                ...formData, ["gender"]: e.value
            })
        }
        else if(name==="dept_id"){
            setFormData({
                ...formData, ["dept_id"]: e.value
            })
        }
    }
    const dateHandler = (newValue) =>{
        setFormData({
            ...formData, ["dob"]: newValue
        })
    }
    const isValidated = () =>{
        return true
    }
    const submitHandler = (e) =>{
        e.preventDefault();
        console.log(formData);
        const validated = isValidated();
        if(validated){
            if(!editMode){
                axios.post('https://exam-manag.herokuapp.com/student', formData)
                .then(function (response) {
                    console.log(response)
                  alert("Student created");
                  clearForm();
                  handleForm();
                  getStudentRecords();
    
                })
                .catch(function (error) {
                  console.log("err",error);
                });
            }else{
            let updatedData = formData;
            updatedData["is_active"]=true;
            axios.put(`https://exam-manag.herokuapp.com/student/${rowData.student_id}`, updatedData)
            .then(function (response) {
                console.log(response)
                alert("Student Updated");
                clearForm();
                handleForm();
                getStudentRecords();

            })
            .catch(function (error) {
              console.log("err",error);
            });
            }
        }
        
    }

    const updatehandler = (record) =>{
        handleForm();
        setRowData(record);
        const {
            s_name,
            state,
            pincode,
            district,
            city,
            phone,
            email,
            gender,
            dob,
            dept_id,
            batch,
            rollno,
            password} = record;
        setFormData({
            name:s_name,
            state,
            pincode,
            district,
            city,
            phone,
            email,
            gender,
            dob,
            dept_id,
            batch,
            rollno,
            pwd: password
        });
        setEditMode(true)

    }

    return (
        <div className="w-100 p-5" style={{height:"calc(100% - 64px)", overflow:"auto"}}>
            <div className='row'>
                <div className='col-6'><h5>
                    {!isOpen ? 'Student Management':(<div><i onClick={handleForm} class="bi bi-arrow-left text-primary" style={{fontWeight:"800"}}></i> Create Student</div>)}
                    </h5></div>
                <div className='col-6 d-flex justify-content-end'>
                    {
                        !isOpen && (<button onClick={handleForm} className='btn btn-primary'> Create Student</button>)
                    }
                </div>
            </div>
            
            
            {
                isOpen ? (
                    <StudentForm 
                    departments={departments}
                    dateHandler={dateHandler}
                    submitHandler={submitHandler}
                    onSelectChange={onSelectChange}
                    handleChange={handleChange} 
                    formData={formData}
                    editMode={editMode}
                    />
                ):
                (
                    <StudentTable
                    updatehandler={updatehandler}
                    records={records}/>
                )
            }
        </div>
    )
}

export default Student;