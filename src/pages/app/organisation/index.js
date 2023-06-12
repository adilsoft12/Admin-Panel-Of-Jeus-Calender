import React, { useEffect, useState } from "react";
import { AppConainer } from "../../../components";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { API_ENDPOINTS_ORG } from "../../../services/api_url";
import { axiosInstance } from "../../../services/axiosInstance";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useHistory } from "react-router-dom";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@mui/material/TextField";
import swal from "sweetalert";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#3945B9",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const Organization = () => {
  const history = useHistory();
  const [getDetails, setGetDetails] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = getDetails.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(getDetails);
    }
  };

  console.log("filteredResults", filteredResults);

  const filteredData = getDetails.filter((item) => {
    return Object.values(item)
      .join("")
      .toLowerCase()
      .includes(searchInput.toLowerCase());
  });

  const handleOpen = () => {
    history.push("/addorg");
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, getDetails.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getAllOrganization();
  }, []);

  const getAllOrganization = async () => {
    setIsloading(true);
    const result = await axiosInstance.get(`${API_ENDPOINTS_ORG.get_all_org}`);
    if (result.data) {
      setIsloading(false);
      setGetDetails(result.data);
    }
  };
  const handleEdit = (id) => {
    history.push(`/AddORG/${id}`);
  };
  const handleDetail = (id) => {
    history.push(`/DetailOrg/${id}`);
  };
  const sweetalrt = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
        onDelete(id);
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };
  const onDelete = (id) => {
    setIsloading(true);
    try {
      axiosInstance
        .delete(
          `http://jewcalendar-001-site1.btempurl.com/api/Organization/Delete-Organization?Id=${id}`
        )
        .then((res) => {
          if (res.data.message === "Organization Deleted") {
            getAllOrganization();
            setIsloading(false);
            handleClose();
          }
        });
    } catch (error) {}
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
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
      <div style={{ margin: 5, marginTop: 30, marginLeft: "0px" }}>
        <Button
          style={{ marginLeft: 20 }}
          variant="contained"
          color="primary"
          sx={{
            fontSize: 20,
            color: "#000000",
            padding: "15px 15px",
            margin: "5px 10px",
          }}
          onClick={handleOpen}
        >
          ADD ORGANIZATION
        </Button>
        <TextField
          id="search-bar"
          className="text"
          onChange={(e) => searchItems(e.target.value)}
          label="Enter a Business name"
          variant="outlined"
          placeholder="Search..."
          size="small"
          sx={{ ml: "620px" }}
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
      </div>
      <div style={{ marginLeft: 20 }}>
        <TableContainer component={Paper}>
          <Table sx={{ width: "1250px" }} aria-label="customized table">
            <TableHead>
              <TableRow>
              <StyledTableCell>id</StyledTableCell>
                <StyledTableCell>Organization Name</StyledTableCell>
                <StyledTableCell>Organization Name Persian</StyledTableCell>
                <StyledTableCell>Organization Address </StyledTableCell>
                <StyledTableCell>Url</StyledTableCell>
                <StyledTableCell>ContactPerson</StyledTableCell>
                <StyledTableCell>Mobile Number</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell align="center" colSpan="3">
                  Actions
                </StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredResults.length > 0
                ? (rowsPerPage > 0
                    ? filteredResults.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : filteredResults
                  ).map((item, index) => {
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">
                          {" "}
                          {++index}{" "}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {" "}
                          {item.organizationNameEnglish}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {" "}
                          {item.organizationNamePersian}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {item.organizationAddress}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {item.url}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {item.contactPerson}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {item.mobileNo}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {item.email}
                        </StyledTableCell>
                        <div
                          style={{
                            display: "flex",
                            margin: 5,
                            marginTop: "18px",
                          }}
                          aria-label="outlined  button group"
                        >
                          <Button
                            onClick={() => handleEdit(item.id)}
                            style={{
                              margin: 5,
                              backgroundColor: "#3945b9",
                              color: "white",
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            sx={{ marginLeft: "8px" }}
                            onClick={() => handleDetail(item.id)}
                            style={{
                              margin: 5,
                              backgroundColor: "#3945b9",
                              color: "white",
                            }}
                          >
                            Detail
                          </Button>

                          <Button
                            open={open}
                            id={item.id}
                            onClick={() => sweetalrt(item.id)}
                            handleClose={handleClose}
                            handleClickOpen={handleClickOpen}
                            style={{
                              margin: 5,
                              backgroundColor: "#3945b9",
                              color: "white",
                            }}
                          >
                            {" "}
                            Delete
                          </Button>
                        </div>
                      </StyledTableRow>
                    );
                  })
                : (rowsPerPage > 0
                    ? getDetails.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : getDetails
                  ).map((item, index) => {  
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">
                          {" "}
                          {++index}{" "}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {" "}
                          {item.organizationNameEnglish}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {" "}
                          {item.organizationNamePersian}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {item.organizationAddress}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {item.url}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {item.contactPerson}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {item.mobileNo}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {item.email}
                        </StyledTableCell>
                        <div
                          style={{
                            display: "flex",
                            margin: 5,
                            marginTop: "18px",
                          }}
                          aria-label="outlined  button group"
                        >
                          <Button
                            onClick={() => handleEdit(item.id)}
                            style={{
                              margin: 5,
                              backgroundColor: "#3945b9",
                              color: "white",
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            sx={{ marginLeft: "8px" }}
                            onClick={() => handleDetail(item.id)}
                            style={{
                              margin: 5,
                              backgroundColor: "#3945b9",
                              color: "white",
                            }}
                          >
                            Detail
                          </Button>

                          <Button
                            open={open}
                            id={item.id}
                            onClick={() => sweetalrt(item.id)}
                            handleClose={handleClose}
                            handleClickOpen={handleClickOpen}
                            style={{
                              margin: 5,
                              backgroundColor: "#3945b9",
                              color: "white",
                            }}
                          >
                            {" "}
                            Delete
                          </Button>
                        </div>
                      </StyledTableRow>
                    );
                  })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={3} />
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={9}
                  count={getDetails.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
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
  );
};
