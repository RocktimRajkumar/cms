import React from 'react'



const CourseForm = ({handleChange, handleClick, formData, editMode}) => {

  return (
    <div className="w-100 p-5" style={{height:"calc(100% - 64px)", overflow:"auto"}}>
        <div className='d-flex justify-content-center'>
        <form autoComplete="off" onSubmit={handleClick} style={{width:"500px"}} className="card shadow p-5">
        <div>
          <input
            placeholder="Course Code"
            type="text"
            name="course_code"
            disabled={editMode ? 'disabled' : ''}
            value={formData.course_code}
            onChange={handleChange}
          />
        </div>

        <div className="mt-2">
          <input
            placeholder="Name"
            type="text"
            name="course_name"
            value={formData.course_name}
            onChange={handleChange}
          />
        </div>

        <div className="mt-2">
          <input
            placeholder="Duration"
            type="number"
            name="course_duration"
            value={formData.course_duration}
            onChange={handleChange}
          />
        </div>
        <div className="mt-2">
          <input
            placeholder="Department"
            type="number"
            name="dept_id"
            value={formData.dept_id}
            onChange={handleChange}
          />
        </div>

        <div className="mt-2">
          <input
            placeholder="status"
            type="text"
            name="is_active"
            value={formData.is_active}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <input
            type="submit"
            className="btn btn-primary  mt-3 w-100"
            onClick={handleClick}
          />
        </div>
      </form>
        </div>
    </div>
  )
}

export default CourseForm