import React, {useState} from 'react'
import {makeStyles, TableBody, TableCell, TableRow,  } from '@material-ui/core';
import useTable from '../../utils/table/useTable';
import adminHeader from './subjectHeader';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tooltip from '@material-ui/core/Tooltip';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles(theme => ({
    pageContent:{
        padding: theme.spacing(1)
    }
}))


const SubjectTable = props => {
    const classes = useStyles();
    const [records, setRecords] = useState([]);
    const [filterFn, setFilterFn] = useState({fn: items => {return items}})
    const [anchorEl, setAnchorE1] = useState(null);

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

    const {
        TblContainer,
        TblHead, 
        TblPagination, 
        recordsAfterPagingAndSorting
        }  = useTable(props.records, adminHeader, filterFn);
 
    return (
        <div>
            <div className={classes.pageContent} style={{marginBottom:"10px"}}>
                <div className="row px-2  ">
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
                                    <TableCell style={{fontWeight:"500"}}>{record.sub_id}</TableCell>
                                    <TableCell >{record.sub_name}</TableCell>
                                    <TableCell >{record.semester_no}</TableCell>
                                    <TableCell >{record.course_code}</TableCell>
                                    <TableCell >{record.is_active ? 'Active':'Not Active'}</TableCell>
                                    <TableCell >
                                        <div className="d-flex  ">
                                            <Tooltip title="Edit User" placement="bottom">
                                                <button 
                                                onClick={()=>props.editClickHandler(record)}
                                                className={`border-0 p-1 action-btn`} 
                                                style={{marginRight:"10px"}}>
                                                    <OpenInNewIcon/>
                                                </button>    
                                            </Tooltip>
                                            <Tooltip title="Delete User" placement="bottom">
                                                <button className={`border-0 p-1 action-btn`} >
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
        </div>
    )
}

export default SubjectTable
