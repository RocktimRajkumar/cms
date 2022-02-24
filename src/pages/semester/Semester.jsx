import React, {useEffect, useState} from 'react';
import SemesterForm from './SemesterForm';
import SemesterTable from './SemesterTable';
import axios from 'axios';
import './style.css'


const Semester = (props) =>{
    const [isOpen, setOpen] = useState(false)
    const [id, setId] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [records, setRecords] = useState([]);
    const [formData, setFormData] = useState({
        sem_id: "",
        sem_no: "",
        course_id: "",
        is_active: true,

      });

    useEffect(()=>{
        getSemesterRecords();
    },[])
    const getSemesterRecords = async () =>{
        const res = await axios.get('https://exam-manag.herokuapp.com/semester');
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
        const {sem_no, course_id, is_active} = formData;
        
        if(!editMode){
          const rawResponse = await fetch('https://exam-manag.herokuapp.com/semester', {
              method: 'POST',
              headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  no:sem_no,
                  course_id:course_id              })
          });
          const content = await rawResponse.json();
          if(content && content.error){
              alert(content.error.message);
          }else{
              alert("Created successfully")
              setOpen((open)=> !open)
              getSemesterRecords();
              clearForm();
          }
        }else{
          const rawResponse = await fetch(`https://exam-manag.herokuapp.com/semester/${id}`, {
              method: 'PUT',
              headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  no:sem_no,
                  course_id:course_id,
                  is_active:is_active
              })
          });
          const res = await rawResponse.json();
          console.log("update", res)
          if(res){
              alert(res.message.Success)
              setOpen((open)=> !open)
              setEditMode(mode=>!mode)
              getSemesterRecords();
              clearForm();

          }
        }
    }

    const clearForm = () => {
        setFormData({
            sem_id: "",
            sem_no: "",
            course_id: "",
            is_active:""
        })
    }
      
    const handleForm = () =>{
        setOpen((open)=> !open)
    }
    const editClickHandler = (record) =>{
        setOpen((open) => !open)
        console.log("edir",record);
        setId(record.sem_id)
        setEditMode(mode=>!mode);

        setFormData({
            sem_id:record.sem_id,
            sem_no: record.sem_no,
            course_id:record.course_id,
            is_active:record.is_active
        })
    }

    return(
        <div className="w-100 p-5" style={{height:"calc(100% - 64px)", overflow:"auto"}}>
            <div className='row'>
                <div className='col-6'><h5>
                    {!isOpen ? 'Semester Management':(<div><i onClick={handleForm} class="bi bi-arrow-left text-primary" style={{fontWeight:"800"}}></i> Create Semester</div>)}
                    </h5></div>
                <div className='col-6 d-flex justify-content-end'>
                    {
                        !isOpen && (<button onClick={handleForm} className='btn btn-primary'> Create Semester</button>)
                    }
                </div>
            </div>
            {
                isOpen ? (
                    <SemesterForm 
                    formData={formData}
                    handleChange={handleChange}
                    handleClick={submitHandler}
                    editMode={editMode}
                    />
                ):(
                <SemesterTable 
                editClickHandler={editClickHandler}
                records={records}/>
                )
            }
            

        </div>
    )
}

export default Semester;