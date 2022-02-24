import React, {useState, useEffect} from 'react'
import {makeStyles, Menu, MenuItem, TableBody, TableCell, TableRow,  } from '@material-ui/core';
import useTable from '../../utils/table/useTable';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import userHeader from './userHeader';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GetAppIcon from '@material-ui/icons/GetApp';
import { CSVLink } from "react-csv";
import Tooltip from '@material-ui/core/Tooltip';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import SearchIcon from '@material-ui/icons/Search';
import Notification from '../../utils/Notification';
const useStyles = makeStyles(theme => ({
    pageContent:{
        // margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))


function UsersTable(props) {
    const classes = useStyles();
    const {notify,editClickHandler} = props;
    const [records, setRecords] = useState([]);
    const [filterFn, setFilterFn] = useState({fn: items => {return items}})
    const [anchorEl, setAnchorE1] = useState(null);
    useEffect(() => {
        setRecords(props.usersData);
    },[]);

    const data = records?.length > 0
        ?  records.map((user) => ({
            UserName: user.name,
            email: user.email,
            UserType: user.userType
          }))
        : [];

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if(target.value == "")
                    return items;
                else
                return items.filter(value => value.name.toLowerCase().includes(target.value.toLowerCase())
                || value.email.includes(target.value.toLowerCase()) 
                || value && value.userType.includes(target.value.toLowerCase())
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
        }  = useTable(records, userHeader, filterFn);

    const getRole = (role) =>{
        if(role === "Admin") 
        return <div >
                <span style={{color:"#FF4B6C", fontWeight:"500", background:"#FFE8EC", borderRadius:"5px"}} className="px-3 py-1">{role} </span>
             </div>
        else if(role === "Imports Reports Mail User")
        return <div>
                    <span style={{color:"#e23bff", background:"#f0e4f2", borderRadius:"5px", fontWeight:"500"}} className="px-3 py-1">{role}</span>
               </div>
        else if(role === "FNV Reports Mail User")
        return <div>
                <span style={{color:"#FFA928", background:"#FEF5E7", borderRadius:"5px", fontWeight:"500"}} className="px-3 py-1">{role}</span>
            </div>
        else if (role === "User") 
            return <div>
                <span style={{color:"#3BC4FF", background:"#EAF9FF", borderRadius:"5px", fontWeight:"500"}} className="px-3 py-1">{role}</span>
            </div>

    } 
    return (
        <div>
            <div className={classes.pageContent} style={{marginBottom:"10px"}}>
                <div className="row px-2  ">
                {/* <div className=" col-1 d-flex justify-content-end align-items-center bg-gray"><SearchIcon/></div> */}
                    <div className="col-11 px-0">
                        <input
                        className="search-input py-1"
                        type="text"
                        placeholder="Search by name or email..."
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
                                recordsAfterPagingAndSorting().map(record =>(
                                    <TableRow key={record.id}>
                                    <TableCell style={{fontWeight:"500"}}>{record.name}</TableCell>
                                    <TableCell >{record.email}</TableCell>
                                    <TableCell >{getRole(record.userType)}</TableCell>
                                    <TableCell >
                                        <div className="d-flex  ">
                                            <Tooltip title="Edit User" placement="bottom">
                                                <button 
                                                onClick={()=>editClickHandler(record)}
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
                            }
                        
                    </TableBody>
                </TblContainer>
                <TblPagination/>
            </div>

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
        </Menu>
        {/* Notification after  event  */}
        {/* <Notification
          notify={notify}
        /> */}
        </div>
    )
}

export default UsersTable
