import React from 'react'
import {InputControl} from '../../utils/FormControls';


let statusTypes = ["Active", "Not Active"].map(item=>({value:item,label:item}))

const MarksheetForm = ({onSelectChange, formData, editMode, students,subjects}) => {

  console.log("f", formData)
  const subjectList = subjects?.map(sub=>({
    value:sub.sub_id,
    label:sub.sub_name
  }))
  console.log(subjects);
  const studentList = students?.map(student=>({
    value:student.student_id,
    label:student.s_name
  }))

  const studentName = id =>{
    return studentList?.find(obj => obj.value == id);
   }
   const subjectName = id =>{
    return subjectList?.find(obj => obj.value == id);
   }
  return (
    <div className="w-100 p-5" >
        <div className='d-flex justify-content-center'>
        <form autoComplete="off"  style={{width:"500px"}} className="card shadow px-5 pb-5 pt-2">
        
        <div className='mt-2 '>
          <InputControl
              type="select"
              name="stu_id"
              labelName="Student"
              placeholder="Select Student"
              onChange={onSelectChange("student")}
              value={formData && studentName(formData.stu_id)}
              options={studentList}
              required
            />
        </div>
        <div className='mt-2 '>
          <InputControl
              type="select"
              name="sub_id"
              labelName="Subject"
              placeholder="Select subject"
              onChange={onSelectChange("subject")}
              value={formData && subjectName(formData.sub_id)}
              options={subjectList}
              required
            />
        </div>
        <div className='mt-2'>
          <InputControl
            labelName="Marks"
            placeholder="Enter marks"
            type="text"
            name="mark"
            value={formData?.mark}
            onChange={onSelectChange("mark")}
            required
          />
        </div>
        
        <div className='mt-2'>
          <input
            type="submit"
            className="btn btn-primary  mt-3 w-100"
            // onClick={handleClick}
          />
        </div>
      </form>
        </div>
    </div>
  )
}

export default MarksheetForm