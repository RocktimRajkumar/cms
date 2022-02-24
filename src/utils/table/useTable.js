import React,{useState} from 'react';
import { makeStyles, Table, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from '@material-ui/core';
const useStyles = makeStyles(theme =>({
    table:{
        marginTop: theme.spacing(3),
        '& thead th': {
            fontWeight: '600',
            color: "white",
            backgroundColor: "#263544"
        },
        '& thead td': {
            fontWeight: '300',
            
        },
        '& tbody tr:hover': {
            backgroundColor: "#ffffff",
            curser:"pointer"
        }
    }
})) 
export default function useTable(records=[], headCells, filterFn){
    console.log("test",records)
    const classes = useStyles();

    const pages = [5,10,25];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
    const [order, setOrder] = useState();
    const [orderBy, setOrderBy] = useState();

    const TblContainer = props => (
        <Table stickyHeader 
        aria-label="sticky table" 
        className={classes.table}
        >   
            {props.children}
        </Table>
    )
    const TblHead = props =>{
        const handleSortRequest = (cellId)=>{
            const isAsc = orderBy === cellId && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc')
            setOrderBy(cellId);
        }
    
        
        return(
            <TableHead>
                <TableRow >
                    {
                        headCells.map(headCell=>(
                            <TableCell
                            // style={{color:"#636F87"}} 
                            key={headCell.id}
                            sortDirection={orderBy === headCell.id ? order:false}>
                                {
                                    headCell.disableSorting?headCell.label:
                                
                                <TableSortLabel 
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={()=>{handleSortRequest(headCell.id)}}
                                >
                                    {headCell.label}
                                </TableSortLabel>
                               }
                            </TableCell>
                        ))
                    }
                </TableRow>
            </TableHead>
        )
}

    const handleChangePage = (event, newPage) => {

        setPage(newPage)
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0)
    }
    function stableSort(arr, comparator){
        
        const stabilizedThis = arr && arr.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
              return order;
            }
            return a[1] - b[1];
          });
          return stabilizedThis.map((el) => el[0]);
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
          ? (a, b) => descendingComparator(a, b, orderBy)
          : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
    }

    const recordsAfterPagingAndSorting = ()=>{
    return stableSort(filterFn.fn(records), getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    }
    const TblPagination = () =>(
        <TablePagination
        component="div"
        page={page}
        rowsPerPageOptions={pages}
        rowsPerPage={rowsPerPage}
        count={records.length}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        />

    )
    return{
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    }
}