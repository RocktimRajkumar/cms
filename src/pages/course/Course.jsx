import React, {useEffect, useState} from 'react';
import CourseForm from './CourseForm';
import CourseTable from './CourseTable';
import axios from 'axios';
import './style.css'


const Course = (props) =>{
    const [isOpen, setOpen] = useState(false)
    const [id, setId] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [records, setRecords] = useState([]);
    const [formData, setFormData] = useState({
        course_id: "",
        course_name: "",
        course_code: "",
        course_code: "",
        course_duration: "",
        dept_id: "",
        is_active: true,

      });

    useEffect(()=>{
        getCourseRecords();
    },[])
    const getCourseRecords = async () =>{
        const res = await axios.get('https://exam-manag.herokuapp.com/course');
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
        const {course_code, course_name, course_duration, dept_id, is_active} = formData;
        
        if(!editMode){
          const rawResponse = await fetch('https://exam-manag.herokuapp.com/course', {
              method: 'POST',
              headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  name:course_name,
                  code:course_code,
                  dept_id:dept_id,
                  duration:course_duration
                })
          });
          const content = await rawResponse.json();
          if(content && content.error){
              alert(content.error.message);
          }else{
              alert("Created successfully")
              setOpen((open)=> !open)
              getCourseRecords();
              clearForm();
          }
        }else{
          const rawResponse = await fetch(`https://exam-manag.herokuapp.com/course/${id}`, {
              method: 'PUT',
              headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  name:course_name,
                  dept_id:dept_id,
                  duration:course_duration,
                  is_active:is_active
              })
          });
          const res = await rawResponse.json();
          console.log("update", res)
          if(res){
              alert(res.message.Success)
              setOpen((open)=> !open)
              setEditMode(mode=>!mode)
              getCourseRecords();
              clearForm();

          }
        }
    }

    const clearForm = () => {
        setFormData({
            course_code:"", course_name:"", course_duration:"", dept_id:"", is_active:""
        })
    }
      
    const handleForm = () =>{
        setOpen(open=> !open)
    }
    const editClickHandler = (record) =>{
        setOpen(open => !open)
        console.log("edir",record);
        setId(record.course_id)
        setEditMode(mode=>!mode);

        setFormData({
            course_id:record.course_id,
            course_name: record.course_name,
            course_code:record.course_code,
            course_duration:record.course_duration,
            dept_id:record.dept_id,
            is_active:record.is_active
        })
    }

    return(
        <div className="w-100 p-5" style={{height:"calc(100% - 64px)", overflow:"auto"}}>
            <div className='row'>
                <div className='col-6'><h5>
                    {!isOpen ? 'Course Management':(<div><i onClick={handleForm} class="bi bi-arrow-left text-primary" style={{fontWeight:"800"}}></i> Create Course</div>)}
                    </h5></div>
                <div className='col-6 d-flex justify-content-end'>
                    {
                        !isOpen && (<button onClick={handleForm} className='btn btn-primary'> Create Course</button>)
                    }
                </div>
            </div>
            {
                isOpen ? (
                    <CourseForm 
                    formData={formData}
                    handleChange={handleChange}
                    handleClick={submitHandler}
                    editMode={editMode}
                    />
                ):(
                <CourseTable 
                editClickHandler={editClickHandler}
                records={records}/>
                )
            }
            

        </div>
    )
}

export default Course;