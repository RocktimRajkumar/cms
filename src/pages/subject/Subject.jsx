import React, {useEffect, useState} from 'react';
import SubjectForm from './SubjectForm';
import SubjectTable from './SubjectTable';
import axios from 'axios';
import './style.css'


const Subject = (props) =>{
    const [isOpen, setOpen] = useState(false)
    const [id, setId] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [records, setRecords] = useState([]);
    const [formData, setFormData] = useState({
        sub_id: "",
        sub_name: "",
        semester_id: "",
        is_active: true,

      });

    useEffect(()=>{
        getSubjectRecords();
    },[])
    const getSubjectRecords = async () =>{
        const res = await axios.get('https://exam-manag.herokuapp.com/subject');
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
        const {sub_name, semester_id, is_active} = formData;
        
        if(!editMode){
          const rawResponse = await fetch('https://exam-manag.herokuapp.com/subject', {
              method: 'POST',
              headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  name:sub_name,
                  semester_id:semester_id              })
          });
          const content = await rawResponse.json();
          if(content && content.error){
              alert(content.error.message);
          }else{
              alert("Created successfully")
              setOpen((open)=> !open)
              getSubjectRecords();
              clearForm();
          }
        }else{
          const rawResponse = await fetch(`https://exam-manag.herokuapp.com/subject/${id}`, {
              method: 'PUT',
              headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  name:sub_name,
                  semester_id:semester_id,
                  is_active:is_active
              })
          });
          const res = await rawResponse.json();
          console.log("update", res)
          if(res){
              alert(res.message.Success)
              setOpen((open)=> !open)
              setEditMode(mode=>!mode)
              getSubjectRecords();
              clearForm();

          }
        }
    }

    const clearForm = () => {
        setFormData({
            sub_id: "",
            sub_name: "",
            semester_id: "",
            is_active:""
        })
    }
      
    const handleForm = () =>{
        setOpen((open)=> !open)
    }
    const editClickHandler = (record) =>{
        setOpen((open) => !open)
        console.log("edir",record);
        setId(record.sub_id)
        setEditMode(mode=>!mode);

        setFormData({
            sub_id:record.sub_id,
            sub_name: record.sub_name,
            semester_id:record.semester_id,
            is_active:record.is_active
        })
    }

    return(
        <div className="w-100 p-5" style={{height:"calc(100% - 64px)", overflow:"auto"}}>
            <div className='row'>
                <div className='col-6'><h5>
                    {!isOpen ? 'Subject Management':(<div><i onClick={handleForm} class="bi bi-arrow-left text-primary" style={{fontWeight:"800"}}></i> Create Subject</div>)}
                    </h5></div>
                <div className='col-6 d-flex justify-content-end'>
                    {
                        !isOpen && (<button onClick={handleForm} className='btn btn-primary'> Create Subject</button>)
                    }
                </div>
            </div>
            {
                isOpen ? (
                    <SubjectForm 
                    formData={formData}
                    handleChange={handleChange}
                    handleClick={submitHandler}
                    editMode={editMode}
                    />
                ):(
                <SubjectTable 
                editClickHandler={editClickHandler}
                records={records}/>
                )
            }
            

        </div>
    )
}

export default Subject;