import React from 'react'



const SemesterForm = ({handleChange, handleClick, formData, editMode}) => {

  return (
    <div className="w-100 p-5" style={{height:"calc(100% - 64px)", overflow:"auto"}}>
        <div className='d-flex justify-content-center'>
        <form autoComplete="off" onSubmit={handleClick} style={{width:"500px"}} className="card shadow p-5">
        <div>
          <input
            placeholder="Sem No"
            type="number"
            name="sem_no"
            disabled={editMode ? 'disabled' : ''}
            value={formData.sem_no}
            onChange={handleChange}
          />
        </div>

        <div className="mt-2">
          <input
            placeholder="Course ID"
            type="number"
            name="course_id"
            value={formData.course_id}
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

export default SemesterForm