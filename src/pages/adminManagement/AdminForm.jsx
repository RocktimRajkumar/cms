import React from 'react'



const AdminForm = ({handleChange, handleClick, formData, editMode}) => {

  return (
    <div className="w-100 p-5" style={{height:"calc(100% - 64px)", overflow:"auto"}}>
        <div className='d-flex justify-content-center'>
        <form autoComplete="off" onSubmit={handleClick} style={{width:"500px"}} className="card shadow p-5">
        <div>
          <input
            placeholder="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mt-2">
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mt-2">
          <input
            placeholder="password"
            type="text"
            name="password"

            value={formData.password}
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

export default AdminForm