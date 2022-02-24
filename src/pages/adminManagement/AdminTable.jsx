import React, {useState, useEffect} from 'react'
import {makeStyles, Menu, MenuItem, TableBody, TableCell, TableRow,  } from '@material-ui/core';
import useTable from '../../utils/table/useTable';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import adminHeader from './tableHeader';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GetAppIcon from '@material-ui/icons/GetApp';
import { CSVLink } from "react-csv";
import Tooltip from '@material-ui/core/Tooltip';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import SearchIcon from '@material-ui/icons/Search';
import Notification from '../../utils/Notification';
import {Spin} from 'antd';

const useStyles = makeStyles(theme => ({
    pageContent:{
        // margin: theme.spacing(5),
        padding: theme.spacing(1)
    }
}))


const AdminTable = props => {
    const classes = useStyles();
    const [records, setRecords] = useState([]);
    const [filterFn, setFilterFn] = useState({fn: items => {return items}})
    const [anchorEl, setAnchorE1] = useState(null);
  

    // const data = records?.length > 0
    //     ?  records.map((user) => ({
    //         UserName: user.name,
    //         email: user.email,
    //         UserType: user.userType
    //       }))
    //     : [];

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
                                    <TableCell style={{fontWeight:"500"}}>{record.uname}</TableCell>
                                    <TableCell >{record.email}</TableCell>
                                    <TableCell >{record.password}</TableCell>
                                    <TableCell >{record.is_active ? <span className='text-success'>Active</span>:<span className='text-danger'>Not Active</span>}</TableCell>
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
{/* 
            <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
          <MenuItem onClick={handleClose}> 
          <CSVLink
                  data={data}
                  filename={"benchmarkerAdminUser.csv"}
                  className="btn bg-gray w-100"
                  target="_blank"
                >
                  <span>
                    <GetAppIcon fontSize="small"/>
                    Export
                </span> 
                </CSVLink>
          </MenuItem>
        </Menu> */}
        {/* Notification after  event  */}
        {/* <Notification
          notify={notify}
        /> */}
        </div>
    )
}

export default AdminTable
