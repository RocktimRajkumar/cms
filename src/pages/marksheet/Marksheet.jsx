import React, {useEffect, useState} from 'react';
import axios from 'axios';
import MarksheetForm from './MarksheetForm';
import MarksheetTable from './MarksheetTable';
import './style.css'


const Marksheet = (props) =>{
    const [isOpen, setOpen] = useState(false)
    const [id, setId] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [rowData, setRowData] = useState({});
    const [students, setStudents] = useState([]);
    const [marksheets, setMarksheets] = useState([]);
    const [marksheetsDetail, setMarksheetsDetails] = useState([]);
    const [formData, setFormData] = useState({
        student_id: "",
        sub_id: "",
        mark: ""
      });

    useEffect(() => {
        getStudentRecords();
        getMarksheetRecords();
        getSubjectRecords();
    }, [])

    const getSubjectRecords = async () =>{
        const res = await axios.get('https://exam-manag.herokuapp.com/subject');
        if(res){
            console.log("check subject res", res.data.message.records);
            setSubjects(res.data.message.records);
        }
    }
    const getStudentRecords = async () =>{
        const res = await axios.get('https://exam-manag.herokuapp.com/student');
        if(res){
            console.log("check student res", res.data.message.records);
            setStudents(res.data.message.records);
        }
    }
    const getMarksheetRecords = async () =>{
        const res = await axios.get('https://exam-manag.herokuapp.com/marksheet');
        if(res){
            console.log("check marsheet res", res.data.message.records);
            var data = res.data.message.records;
            setMarksheets(data);
        }
    }

    const getStudentMarks = async (id) =>{
        console.log("student marks, ",id)
        const res = await axios.get(`https://exam-manag.herokuapp.com/marksheet/${id}/report`);
        if(res){
            console.log("check res new", res.data.message.records);
            setMarksheetsDetails(res.data.message);
        }
    }
    
      
      const onSelectChange = (name) => (e) => {
        if(name==="student"){
            setFormData({
                ...formData, ["student_id"]: e.value
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

    const submitHandler =async e =>{
        e.preventDefault();
        const {student_id, sub_id, mark, is_active} = formData;
        if(!editMode){
          const rawResponse = await fetch('https://exam-manag.herokuapp.com/marksheet', {
              method: 'POST',
              headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                sub_id,
                student_id,
                mark
            })
          });
          const content = await rawResponse.json();
          if(content && content.error){
              alert(content.error.message);
          }else{
              alert("Created successfully")
              setOpen((open)=> !open)
              getMarksheetRecords();
              clearForm();
          }
        }else{
          const rawResponse = await fetch(`https://exam-manag.herokuapp.com/marksheet/${id}`, {
              method: 'PUT',
              headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  mark:mark,
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
            student_id: "",
            sub_id: "",
            mark: ""
          })
      }
      
    const handleForm = () =>{
        setOpen(open=> !open)
    }

    const marksheetDetailHandler = (record) =>{
        getStudentMarks(record._id.student_id);
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
                    handleClick={submitHandler}
                    onSelectChange={onSelectChange}
                    />
                ):(
                <MarksheetTable
                students={students}
                subjects={subjects}
                records={marksheets}
                marksheetDetailHandler={marksheetDetailHandler}
                marksheetsDetail={marksheetsDetail}
               />
                )
            }
            

        </div>
    )
}

export default Marksheet;
