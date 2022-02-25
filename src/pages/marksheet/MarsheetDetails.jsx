import React from 'react'


const MarksheetDetails = (props) => {
    console.log("Marksheet detail")
    console.log(props.rowData)
    const {rowData, showdetail} = props;
    const handleDetails = record => {
      showdetail(o=>!o)
  }
  return (
    <div>
      <span className="backbutton" onClick={handleDetails}>
        <i class="bi bi-arrow-left text-primary" style={{fontWeight:"800"}}>Back</i>
      </span>
      <h5 className="text-center m-4">Marksheet Detail of {rowData?.name}</h5>
      <table className="table table-bordered table-hover">
        <thead className="bg-light">
          <tr>
            <th>Semester</th>
            <th>Course</th>
            <th>Subject Name</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {rowData.records?.map((record,index)=>{
              return (
              <tr>
                <td>{record.semester_no} Sem</td>
                <td>{record.course}</td>
                <td>{record.subjects_name}</td>
                <td>{record.mark}</td>
              </tr>
              )
          })
        }
        </tbody>
      </table>
      <h5 className="text-center p-4">CGPA : {rowData.cgpa?.toFixed(2)}</h5>
    </div>
  )
}

export default MarksheetDetails;