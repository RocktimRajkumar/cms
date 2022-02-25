import React from 'react'

const StudentDetails = (props) => {
    console.log(props.rowData)
    const {rowData} = props;
  return (
    <div className="w-100 p-5 " >
      <h1>StudentDetails</h1>
      
      <div className='card shadow  px-5 pt-3' style={{width:"800px", height:"400px"}}>
          <div className=' text-center '><span className='label'>Name:</span> <span className='value ml-2'>{rowData?.s_name}</span></div>
          <div>Email: {rowData?.email}</div>
          <div>Phone: {rowData?.phone}</div>
          <div>gender: {rowData?.gender}</div>
          <div>Department: {rowData?.dept_id}</div>
          <div>Batch: {rowData?.batch}</div>
          <div>Roll No: {rowData?.rollno}</div>
          <div className='my-2' style={{color:"#828282"}}>Address:</div>
          <div  style={{paddingLeft:"20px"}}>
          <div>State: {rowData?.state}</div>
          <div>District: {rowData?.district}</div>
          <div>City: {rowData?.city}</div>
          <div>Pincode: {rowData?.pincode}</div>
          </div>

          
         
      </div>

      
    </div>
  )
}

export default StudentDetails;