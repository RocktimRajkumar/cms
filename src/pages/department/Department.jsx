import React, {useEffect, useState} from 'react';
import DepartmentForm from './DepartmentForm';
import DepartmentTable from './DepartmentTable';
import axios from 'axios';
import './style.css'


const Department = (props) =>{
    const [isOpen, setOpen] = useState(false)
    const [id, setId] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [records, setRecords] = useState([]);
    const [formData, setFormData] = useState({
        dept_id: "",
        dept_name: "",
        dept_code: "",
        is_active: true,

      });

    useEffect(()=>{
        getDepartmentRecords();
    },[])
    const getDepartmentRecords = async () =>{
        const res = await axios.get('https://exam-manag.herokuapp.com/department');
        if(res){
            console.log("check res", res.data.message.records);
            setRecords(res.data.message.records);
        }
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
        const {dept_code, dept_name} = formData;
        
        if(!editMode){
          const rawResponse = await fetch('https://exam-manag.herokuapp.com/department', {
              method: 'POST',
              headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  code:dept_code,
                  name:dept_name              })
          });
          const content = await rawResponse.json();
          if(content && content.error){
              alert(content.error.message);
          }else{
              alert("Created successfully")
              setOpen((open)=> !open)
              getDepartmentRecords();
              clearForm();
          }
        }else{
          const rawResponse = await fetch(`https://exam-manag.herokuapp.com/department/${id}`, {
              method: 'PUT',
              headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  name:dept_name,
                    is_active:true
              })
          });
          const res = await rawResponse.json();
          console.log("update", res)
          if(res){
              alert(res.message.Success)
              setOpen((open)=> !open)
              setEditMode(mode=>!mode)
              getDepartmentRecords();
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
        setId(record.dept_id)
        setEditMode(mode=>!mode);

        setFormData({
            dept_id:record.dept_id,
            dept_name: record.dept_name,
            dept_code:record.dept_code,
            is_active:record.is_active
        })
    }

    return(
        <div className="w-100 p-5" style={{height:"calc(100% - 64px)", overflow:"auto"}}>
            <div className='row'>
                <div className='col-6'><h5>
                    {!isOpen ? 'Department Management':(<div><i onClick={handleForm} class="bi bi-arrow-left text-primary" style={{fontWeight:"800"}}></i> Create Department</div>)}
                    </h5></div>
                <div className='col-6 d-flex justify-content-end'>
                    {
                        !isOpen && (<button onClick={handleForm} className='btn btn-primary'> Create Department</button>)
                    }
                </div>
            </div>
            {
                isOpen ? (
                    <DepartmentForm 
                    formData={formData}
                    handleChange={handleChange}
                    handleClick={submitHandler}
                    editMode={editMode}
                    />
                ):(
                <DepartmentTable 
                editClickHandler={editClickHandler}
                records={records}/>
                )
            }
            

        </div>
    )
}

export default Department;