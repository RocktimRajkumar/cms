import React from 'react'



const DepartmentForm = ({handleChange, handleClick, formData, editMode}) => {

  return (
    <div className="w-100 p-5" style={{height:"calc(100% - 64px)", overflow:"auto"}}>
        <div className='d-flex justify-content-center'>
        <form autoComplete="off" onSubmit={handleClick} style={{width:"500px"}} className="card shadow p-5">
        <div>
          <input
            placeholder="Dept Code"
            type="text"
            name="dept_code"
            disabled={editMode ? 'disabled' : ''}
            value={formData.dept_code}
            onChange={handleChange}
          />
        </div>

        <div className="mt-2">
          <input
            placeholder="Name"
            type="text"
            name="dept_name"
            value={formData.dept_name}
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

export default DepartmentForm