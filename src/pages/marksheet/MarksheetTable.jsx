import React, {useState, useEffect} from 'react'
import {makeStyles, Menu, MenuItem, TableBody, TableCell, TableRow,  } from '@material-ui/core';
import useTable from '../../utils/table/useTable';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import marksheetHeader from './tableHeader';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GetAppIcon from '@material-ui/icons/GetApp';
import { CSVLink } from "react-csv";
import Tooltip from '@material-ui/core/Tooltip';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import SearchIcon from '@material-ui/icons/Search';
import Notification from '../../utils/Notification';
import {Spin} from 'antd';
import MarksheetDetails from './MarsheetDetails';

const useStyles = makeStyles(theme => ({
    pageContent:{
        padding: theme.spacing(1)
    }
}))


const MarksheetTable = props => {
    const classes = useStyles();
    const [filterFn, setFilterFn] = useState({fn: items => {return items}})
    const [anchorEl, setAnchorE1] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

  
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if(target.value == "")
                    return items;
                else
                return items.filter(value => value && value.email.toLowerCase().includes(target.value.toLowerCase()) 
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


      const handleDetails = record => {
        setShowDetails(o=>!o)
        props.marksheetDetailHandler(record)
    }

    const {
        TblContainer,
        TblHead, 
        TblPagination, 
        recordsAfterPagingAndSorting
        }  = useTable(props.records, marksheetHeader, filterFn);

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
                                    <TableRow key={index}>
                                    <TableCell style={{fontWeight:"500"}}>{record?._id.student_id}</TableCell>
                                    <TableCell >{record?._id.student_name}</TableCell>
                                    <TableCell >{record?.total}</TableCell>
                                    <TableCell >{record?.count}</TableCell>
                                    <TableCell >{record?.percentage.toFixed(2)}%</TableCell>
                                    <TableCell >{record?.cgpa.toFixed(2)}</TableCell>
                                    <TableCell >{record?._id.status ? <span className='text-success'>Active</span>:<span className='text-danger'>Not Active</span>}</TableCell>
                                    <TableCell >
                                        <div className="d-flex  ">
                                        <Tooltip title="View Details" placement="bottom">
                                            <button
                                            onClick={()=>handleDetails(record)}
                                                className={`border-0 p-1 action-btn`} >
                                                <i class=" bi bi-eye"></i>
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
                    <MarksheetDetails rowData={props.marksheetsDetail} showdetail={setShowDetails}/>
                </div>
            )
        }
        </div>
    )
}

export default MarksheetTable
