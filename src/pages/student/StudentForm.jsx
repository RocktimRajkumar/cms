import React, {useState, useEffect} from 'react'
import Select from "react-select";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import {InputControl} from '../../utils/FormControls';
import axios from 'axios';
const options = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

const StudentForm = ({handleChange,departments,dateHandler,submitHandler, handleClick, formData, editMode, onSelectChange}) => {

 const departmentNames = departments && departments.map(dept=>({
   value:dept.dept_id,
   label:dept.dept_name
 }))

 const departmentName = id =>{
  return departmentNames?.find(obj => obj.value == id);
 }

console.log(formData)
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
              value={formData && formData.name}
              onChange={handleChange("name")}
              className="form-control price-form-data " />
          </div>
          <div className='col-md-4'>
            <label className="location-form-label" for="inputPassword4">
              Email
            </label>
            <input type="text"
              name="email"
              value={formData && formData.email}
              onChange={handleChange("email")}
              className="form-control price-form-data " 
              disabled={editMode}
              />
          </div>
          <div className='col-md-4'>
            <label className="location-form-label" for="inputPassword4">
              Phone
            </label>
            <input 
              type="text"
              name="phone"
              value={formData && formData.phone}
              onChange={handleChange("phone")}
              className="form-control price-form-data "
               disabled={editMode}
               />
          </div>
        
          <div className=" col-md-4 mt-3">
          
            <InputControl
            type="select"
            name="gender"
            labelName="Gender"
            placeholder="Select your gender"
            onChange={onSelectChange("gender")}
            value={formData && formData.gender}
            options={options}
            required
          />
        </div>
        <div className='col-md-4 mt-3'>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="DOB"
            value={formData && formData.dob}
            onChange={dateHandler}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
          </div>
          <div className=" col-md-4 mt-3">
      
           <InputControl
            type="select"
            name="dept_id"
            labelName="Department"
            placeholder="Select department"
            onChange={onSelectChange("dept_id")}
            value={formData ? departmentName(formData.dept_id):""}
            options={departmentNames}
            required
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
              value={formData && formData.batch}
              onChange={handleChange("batch")}
            />
          </div>
          <div className="col-md-4 mt-3">
          <label className="location-form-label" for="inputPassword4">
              Roll No
            </label>
            <input
              placeholder="Roll No"
              type="text"
              name="rollno"
              value={formData && formData.rollno}
              onChange={handleChange("rollno")}
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
            value={formData && formData.pwd}
            onChange={handleChange("pwd")}
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
                value={formData && formData.city}
                onChange={handleChange("city")}
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
                value={formData && formData.district}
                onChange={handleChange("district")}
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
                value={formData?.state}
                onChange={handleChange("state")}
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
                value={formData?.pincode}
                onChange={handleChange("pincode")}
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