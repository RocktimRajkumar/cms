import React, {useState, useEffect} from 'react'
import {makeStyles, Menu, MenuItem, TableBody, TableCell, TableRow,  } from '@material-ui/core';
import useTable from '../../utils/table/useTable';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import studentHeader from './studentHeader';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GetAppIcon from '@material-ui/icons/GetApp';
import { CSVLink } from "react-csv";
import Tooltip from '@material-ui/core/Tooltip';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import SearchIcon from '@material-ui/icons/Search';
import Notification from '../../utils/Notification';
import {Spin} from 'antd';
import StudentDetails from './StudentDetails';

const useStyles = makeStyles(theme => ({
    pageContent:{
        // margin: theme.spacing(5),
        padding: theme.spacing(1)
    }
}))


const StudentTable = props => {
    const classes = useStyles();
    const [filterFn, setFilterFn] = useState({fn: items => {return items}})
    const [anchorEl, setAnchorE1] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [rowData, setRowData] = useState({})

console.log(props.records)
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if(target.value == "")
                    return items;
                else
                return items.filter(value => value && value.s_name.toLowerCase().includes(target.value.toLowerCase()) 
                );
            }
        })
    }

    const handleClick = (event) => {
        setAnchorE1(event.currentTarget);
      };
    
     const  handleClose = () => {
        setAnchorE1(null)
      };

    const {
        TblContainer,
        TblHead, 
        TblPagination, 
        recordsAfterPagingAndSorting
        }  = useTable(props.records, studentHeader, filterFn);

    const handleDetails = record => {
        setShowDetails(o=>!o)
        setRowData(record);
    }

    
 
    return (
        <div>
            {
                !showDetails ? (
                    <div className={classes.pageContent} style={{marginBottom:"10px"}}>
                        <div className="row px-2  ">
                        {/* <div className=" col-1 d-flex justify-content-end align-items-center bg-gray"><SearchIcon/></div> */}
                            <div className="col-11 px-0">
                                <input
                                className="search-input py-1"
                                type="text"
                                placeholder="Search by email..."
                                onChange={handleSearch}
                                />
                            </div>
                            
                            <div className="col-1  d-flex justify-content-end align-items-center">
                            <Tooltip title="Download" placement="bottom">
                                <MoreVertIcon onClick={handleClick} className="download" />
                            </Tooltip>    
                            </div>
                        </div>
                        <TblContainer>
                        <TblHead/>
                            <TableBody>
                                {
                                    recordsAfterPagingAndSorting().length > 0 ? (
                                        recordsAfterPagingAndSorting().map((record, index) =>(
                                            <TableRow key={index} onClick={()=>handleDetails(record)}>
                                            <TableCell style={{fontWeight:"500"}}>{record.s_name}</TableCell>
                                            <TableCell >{record.email}</TableCell>
                                            <TableCell >{record.phone}</TableCell>
                                            <TableCell >{record.is_active ? 'Active':'Not Active'}</TableCell>
                                            <TableCell >{record.dept_id}</TableCell>
                                            <TableCell >{record.batch}</TableCell>
                                            <TableCell >
                                                <div className="d-flex  ">
                                                    <Tooltip title="Edit User" placement="bottom">
                                                        <button 
                                                        
                                                        onClick={()=>props.updatehandler(record)}
                                                        className={`border-0 p-1 action-btn`} 
                                                        style={{marginRight:"10px"}}>
                                                            <OpenInNewIcon/>
                                                        </button>    
                                                    </Tooltip>
                                                    <Tooltip title="Delete User" placement="bottom">
                                                        <button
                                                        onClick={()=>props.editClickHandler(record)}
                                                         className={`border-0 p-1 action-btn`} >
                                                            <DeleteOutlineIcon/>
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            </TableCell>
                                            </TableRow>
                                        ))
                                    ):(
                                        <div>
                                            Loading...
                                        </div>
                                    )
                                }  
                            </TableBody>
                        </TblContainer>
                        <TblPagination/>
                    </div>
                ):(
                    <div className='border mt-3 card shadow' style={{height:'400px'}}>
                        <StudentDetails rowData={rowData}/>
                    </div>
                )
            }

        </div>
    )
}

export default StudentTable
