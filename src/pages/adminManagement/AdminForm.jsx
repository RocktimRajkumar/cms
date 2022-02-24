import React from 'react'
import {InputControl} from '../../utils/FormControls';


let statusTypes = ["Active", "Not Active"].map(item=>({value:item,label:item}))

const AdminForm = ({handleChange, handleClick, formData, editMode, handleStatusChange}) => {

  console.log("f", formData)


  return (
    <div className="w-100 p-5" >
        <div className='d-flex justify-content-center'>
        <form autoComplete="off" onSubmit={handleClick} style={{width:"500px"}} className="card shadow px-5 pb-5 pt-2">
        <div>
          <InputControl
            labelName="Name"
            placeholder="Enter name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange("name")}
            required
          />
        </div>

        <div className="mt-2">
          <InputControl
            labelName="Email"
            placeholder="Enter email"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange("email")}
            disabled={editMode}
            required
          />
        </div>

        <div className="mt-2">
          <InputControl
            placeholder="Password"
            labelName="Password"
            type="text"
            name="password"
            value={formData && formData.password}
            onChange={handleChange("password")}
            required
          />
        </div>
        <div className='mt-2 '>
        {
          editMode?(
            <InputControl
            type="select"
            name="status"
            labelName="Admin status"
            placeholder="Select User role"
            onChange={handleStatusChange}
            value={formData.status ? "Active" : "Not Active"}
            options={statusTypes}
            required
          />
          ):''
        }
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