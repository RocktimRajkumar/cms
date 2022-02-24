import React from 'react'
import Select from "react-select";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';


const options = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];
const departmentOptions = [
  { value: 1, label: "Department1" },
  { value: 2, label: "Department2" },
  { value: 3, label: "Department3" },
];
const StudentForm = ({handleChange,dateHandler,submitHandler, handleClick, formData, editMode, onSelectChange}) => {
  
  
 
  return (
    <div className="w-100 p-5" >
        <div className='d-flex justify-content-center'>
        <form autoComplete="off" onSubmit={handleClick} style={{width:"900px"}} className="card shadow p-5">
        <div className='row '>
          <div className='col-md-4'>
            <label className="location-form-label" for="inputPassword4">
              Name
            </label>
            <input type="text"
              name="name"
              onChange={handleChange}
              className="form-control price-form-data " />
          </div>
          <div className='col-md-4'>
            <label className="location-form-label" for="inputPassword4">
              Email
            </label>
            <input type="text"
              name="email"
              onChange={handleChange}
              className="form-control price-form-data " />
          </div>
          <div className='col-md-4'>
            <label className="location-form-label" for="inputPassword4">
              Phone
            </label>
            <input 
              type="text"
              name="phone"
              onChange={handleChange}
              className="form-control price-form-data " />
          </div>
        
          <div className=" col-md-4 mt-3">
          <label className="location-form-label" for="inputEmail4">
            Gender
          </label>
            <Select
                options={options}
                className="price-form-data "
                onChange={onSelectChange("gender")}
            />
        </div>
        <div className='col-md-4 mt-3'>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="DOB"
            value={formData.dob}
            onChange={dateHandler}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
          </div>
          <div className=" col-md-4 mt-3">
          <label className="location-form-label" for="inputEmail4">
            Department
          </label>
            <Select
                options={departmentOptions}
                className="price-form-data "
                onChange={onSelectChange("dept_id")}
            />
        </div>
        
        <div className='col-md-4 mt-3'>
        <label className="location-form-label" for="inputPassword4">
              Batch
            </label>
            <input
              placeholder="Batch"
              type="text"
              name="batch"
              value={formData.batch}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mt-3">
          <label className="location-form-label" for="inputPassword4">
              Role
            </label>
            <input
              placeholder="Role"
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
            />
        </div>
        <div className=" col-md-4 mt-3">
        <label className="location-form-label" for="inputPassword4">
              Password
            </label>
          <input
            placeholder="password"
            type="text"
            name="pwd"
            value={formData.pwd}
            onChange={handleChange}
          />
        </div>
        </div>
        <div className='row mt-3'>
          <h5>Address</h5>
            <div className=" col-md-4 ">
            <label className="location-form-label" for="inputPassword4">
              City
            </label>
              <input
                placeholder="City"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className=" col-md-4 ">
            <label className="location-form-label" for="inputPassword4">
              District
            </label>
              <input
                placeholder="District"
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
              />
            </div>
            <div className=" col-md-4 ">
            <label className="location-form-label" for="inputPassword4">
              State
            </label>
              <input
                placeholder="State"
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div className=" col-md-4 mt-3">
            <label className="location-form-label" for="inputPassword4">
              Pincode
            </label>
              <input
                placeholder="Pincode"
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>
            <div className=" col-12 mt-3  d-flex justify-content-end">
              
            <div>
                <button className='btn btn-outline-primary mr-5'>Cancel</button>
              </div>
              <div style={{marginLeft:"30px"}}>
                <button onClick={submitHandler} type='submit' className='btn btn-primary '>Submit</button>
              </div>
            </div>
        </div>
        
        
      </form>
        </div>
    </div>
  )
}

export default StudentForm