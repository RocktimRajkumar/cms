import React, {useEffect, useState} from 'react';
import axios from 'axios';
import MarksheetForm from './MarksheetForm';
import MarksheetTable from './MarksheetTable';

const Marksheet = (props) =>{
    const [isOpen, setOpen] = useState(false)
    const [id, setId] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [students, setStudents] = useState([]);
    const [marksheets, setMarksheets] = useState([]);
    const [formData, setFormData] = useState({
        student_id: "",
        sub_id: "",
        mark: ""
      });
    useEffect(() => {
        getSubjects();
        getStudentRecords();
        getMarksheetRecords();
        getSubjectRecords();
    }, [])

    const getSubjectRecords = async () =>{
        const res = await axios.get('https://exam-manag.herokuapp.com/subject');
        if(res){
            console.log("check res new", res.data.message.records);
            setSubjects(res.data.message.records);
        }
    }
    const getSubjects = async () => {
        const res = await axios.get('https://exam-manag.herokuapp.com/subject');
        if(res){
            console.log("check res sub", res);
            // setSubjects(res.data.message.records);
        }
        
    }
    const getStudentRecords = async () =>{
        const res = await axios.get('https://exam-manag.herokuapp.com/student');
        if(res){
            console.log("check res", res.data.message.records);
            setStudents(res.data.message.records);
        }
    }
    const getMarksheetRecords = async () =>{
        const res = await axios.get('https://exam-manag.herokuapp.com/marksheet');
        if(res){
            console.log("check res", res.data.message.records);
            setMarksheets(res.data.message.records);
        }
    }
    
      
      const onSelectChange = (name) => (e) => {
        if(name==="student"){
            setFormData({
                ...formData, ["stu_id"]: e.value
            })
        }
        else if(name==="mark"){
            setFormData({
                ...formData, ["mark"]: e.target.value
            })
        }
        else if(name=="subject"){
            setFormData({
                ...formData, ["sub_id"]: e.value
            })
        }

    }

      const clearForm = () => {
          setFormData({
            student_id: "",
            sub_id: "",
            mark: ""
          })
      }
      
    const handleForm = () =>{
        setOpen(open=> !open)
    }
   
    return(
        <div className="w-100 p-5" style={{height:"calc(100% - 64px)", overflow:"auto"}}>
            <div className='row'>
                <div className='col-6'><h5>
                    {!isOpen ? 'Marksheet':(<div><i onClick={handleForm} class="bi bi-arrow-left text-primary" style={{fontWeight:"800"}}></i> Create Marksheet</div>)}
                    </h5></div>
                <div className='col-6 d-flex justify-content-end'>
                    {
                        !isOpen && (<button onClick={handleForm} className='btn btn-primary'> Create Marksheet</button>)
                    }
                </div>
            </div>
            {
                isOpen ? (
                    <MarksheetForm 
                    students={students}
                    subjects={subjects}
                    formData={formData}
                    onSelectChange={onSelectChange}
                    />
                ):(
                <MarksheetTable
                students={students}
                subjects={subjects}
                records={marksheets}
               />
                )
            }
            

        </div>
    )
}

export default Marksheet;
