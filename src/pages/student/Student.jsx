import { Paper } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './style.css'
import StudentForm from './StudentForm';
import StudentTable from './StudentTable'


const Student = (props) =>{
    const [isOpen, setOpen] = useState(false)
    const [id, setId] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [records, setRecords] = useState([]);
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
    },[])
    const getStudentRecords = async () =>{
        const res = await axios.get('https://exam-manag.herokuapp.com/student');
        if(res){
            console.log("check res", res.data.message.records);
            setRecords(res.data.message.records);
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
            dept_id: 1,
            batch: "",
            rollno: 2,
            pwd: ""
        })
    }
    const handleChange = (e) => {
        e.preventDefault();
        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.value;
        const newFormData = { ...formData };
        newFormData[fieldName] = fieldValue;
        setFormData(newFormData);
      };

    const handleForm = () =>{
        setOpen(open=> !open)
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
            axios.post('https://exam-manag.herokuapp.com/student', formData)
            .then(function (response) {
                console.log(response)
              alert("Student created");
              clearForm();
              handleForm();

            })
            .catch(function (error) {
              console.log("err",error);
            });
        }
        
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
                    dateHandler={dateHandler}
                    submitHandler={submitHandler}
                    onSelectChange={onSelectChange}
                    handleChange={handleChange} 
                    formData={formData}
                    />
                ):
                (
                    <StudentTable
                    records={records}/>
                )
            }
        </div>
    )
}

export default Student;