import React, { useEffect, useState } from 'react'
import { AppConainer } from '../../../components'
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core'
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { API_ENDPOINTS_Files } from '../../../services/api_url';
import { axiosInstance } from '../../../services/axiosInstance';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useHistory } from 'react-router-dom';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#3945B9',
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0
    }
}));





export const PdfList = () => {
    const history = useHistory()
    const [getDetails, setGetDetails] = useState([])
    const [isloading, setIsloading,open, setOpen] = useState(false)


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, getDetails.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    useEffect(() => {
        getAllPDFDetails();
    }, [])

    const getAllPDFDetails = async () => {
        setIsloading(true)
        const result = await axiosInstance.get(`${API_ENDPOINTS_Files.get_all_files}`)
        if (result.data) {
            setIsloading(false)
            setGetDetails(result.data)
        }
    }
    const handleEdit = (id) => {
        history.push(`/Addpdf/${id}`)
    }
    const handleDetail = (id) => {
        history.push(`/detail/${id}`);
      };
    const onDelete = (id) => {
        setIsloading(true)
        try {
            axiosInstance.delete(`http://zewscalender-001-site1.btempurl.com/api/File/Get-File-By-Id?Id=${id}`)
                .then(res => {
                    if (res.data.message === "File Deleted") {
                        setIsloading(false)
                        handleClose();
                    }

                })
        } catch (error) {
            console.log("error", error)
        }
    }
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }


    function TablePaginationActions(props) {
        const classes = useStyles1();
        const theme = useTheme();
        const { count, page, rowsPerPage, onPageChange } = props;

        const handleFirstPageButtonClick = (event) => {
            onPageChange(event, 0);
        };

        const handleBackButtonClick = (event) => {
            onPageChange(event, page - 1);
        };

        const handleNextButtonClick = (event) => {
            onPageChange(event, page + 1);
        };

        const handleLastPageButtonClick = (event) => {
            onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
        };

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </div>
        );
    }

    TablePaginationActions.propTypes = {
        count: PropTypes.number.isRequired,
        onPageChange: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
        rowsPerPage: PropTypes.number.isRequired,
    };

    return (
        <AppConainer>
            <div style={{ margin: 5, marginTop: 30,marginLeft:'0px' }}>
                <Button
                    style={{ marginLeft: 20 }}
                    variant="contained"
                    color="primary"
                    sx={{ fontSize: 20, color: "#000000", padding: '15px 15px', margin: '5px 10px' }}
                    onClick={() => history.push('/addpdf')}
                >
                    ADD PDF 
                </Button>
            </div>
            <div style={{ marginLeft: 20 }}>
                <TableContainer component={Paper} >
                    <Table sx={{ width: '1100px', }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Id</StyledTableCell>
                                <StyledTableCell >Description </StyledTableCell>
                                <StyledTableCell >File Name</StyledTableCell>
                                <StyledTableCell align="center" colSpan="3">
                                    Actions
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                (rowsPerPage > 0 ? getDetails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : getDetails).map((item, index) => {
                                    return (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell component="th" scope="row">  {++index} </StyledTableCell>
                                            <StyledTableCell component="th" scope="row"> {item.fileDescription}</StyledTableCell>
                                            <StyledTableCell component="th" scope="row" >{item.filePath}</StyledTableCell>
                                            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10 }}>
                                                
                                                <ButtonGroup
                                                    variant="contained"
                                                    aria-label="outlined  button group"
                                                >
                                                    <Button
                                                        sx={{
                                                            color: "white",
                                                            backgroundColor: "orange",
                                                            borderColor: "green",
                                                        }}
                                                        onClick={() => handleEdit(item.id)}
                                                    >
                                                        Edit 
                                                    </Button>
                                                    <Button
                                                        sx={{
                                                            color: "white",
                                                            backgroundColor: "lightblue",
                                                            borderColor: "green",
                                                        }}
                                                    onClick={() => handleDetail(item.id)}
                                                    >
                                                        Detail
                                                    </Button>
                                                    <Button
                                                        open={open}
                                                        id={item.id}
                                                        onClick={() => onDelete(item.id)}
                                                        handleClose={handleClose}
                                                        handleClickOpen={handleClickOpen}> Delete
                                                    </Button>
                                                </ButtonGroup>


                                            </div>

                                        </StyledTableRow>

                                    )
                                })
                            }

                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>

                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={3}
                                    count={getDetails.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'rows per page' },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>

            </div>

        </AppConainer>

    )
}

