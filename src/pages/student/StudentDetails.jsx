import React from 'react'

const StudentDetails = (props) => {
    console.log(props.rowData)
    const {rowData} = props;
  return (
    <div>
      <h1>StudentDetails</h1>
      <span>name: {rowData.s_name}</span>
    </div>
  )
}

export default StudentDetails;