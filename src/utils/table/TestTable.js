import React, {useState, useEffect} from 'react'
import {makeStyles, Paper, TableBody, TableCell, TableRow,  } from '@material-ui/core';
import useTable from './useTable'
import axios from 'axios';
const useStyles = makeStyles(theme => ({
    pageContent:{
        // margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

const headCells = [
    {id:'name', label:'User Name'},
    {id:'email', label:'Email Address'},
    {id:'phone', label:'Phone Number'},
    {id:'website', label:'Website', disableSorting:true},
]

function TestTable() {
    const classes = useStyles();
    const [records, setRecords] = useState([]);
    const [filterFn, setFilterFn] = useState({fn: items => {return items}})
    const fetchData = async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        if(response.status === 200){
            
            setRecords(response.data);
            console.log("test", records)
        } 
    }
    useEffect(() => {
        fetchData();
    },[]);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if(target.value == "")
                    return items;
                else
                return items.filter(value => value.name.toLowerCase().includes(target.value.toLowerCase()));
            }
        })
    }

    const {TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting}  = useTable(records, headCells, filterFn);
    return (
        <div>
            <Paper className={classes.pageContent} style={{marginBottom:"20px"}}>
                <div>
                    <input
                        type="text"
                        placeholder="Search"
                        onChange={handleSearch}
                    />
                </div>
                <TblContainer>
                <TblHead/>
                    <TableBody>
                            {
                                recordsAfterPagingAndSorting().map(record =>(
                                    <TableRow key={record.id}>
                                    <TableCell >{record.name}</TableCell>
                                    <TableCell >{record.email}</TableCell>
                                    <TableCell >{record.phone}</TableCell>
                                    <TableCell >{record.website}</TableCell>
                                    </TableRow>
                                ))
                            }
                        
                    </TableBody>
                </TblContainer>
                <TblPagination/>
            </Paper>
        </div>
    )
}

export default TestTable
