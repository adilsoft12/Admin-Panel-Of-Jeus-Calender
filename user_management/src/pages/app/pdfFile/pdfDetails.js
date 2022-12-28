import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box, height } from "@mui/system";
import { AppConainer } from "../../../components";

export function Detail() {
  const history = useHistory();
  const [id, setId] = useState([]);
  const [info, setInfo] = useState([]);
  const location = useLocation();

  const headerStyle = { margin: "0", textAlign: "center", color: "Black", };
  const Item = styled(Paper)(({ theme }) => ({
    padding: "40px 30px 50px 25px",
    width: 700,
    margin: "20px auto",
    align: "center",
    height: 500,
    position:'relative',
    backgroundColor:'#fff'
    //
  }));
  console.log("info", info);
  useEffect(() => {
    const temp = location.pathname.split("/");
    if (temp[2]) {
      getDetail(temp[2]);
    }
  }, []);

  async function getDetail(data) {
    try {
      const result = await axios.get(
        `http://zewscalender-001-site1.btempurl.com/api/File/Get-File-By-Id?Id=${data}`
      );
      setInfo(result.data);
    } catch (error) {}
  }

  return (
    <AppConainer>
    <Paper elevation={3} sx={{marginLeft:"200px"}}>
    <Grid
    style={{ display: "flex", justifyContent: "center", marginTop: "60px" }}
  >
    <Grid
      style={{
        // backgroundColor: "#C3C6E2",
        backgroundSize: "cover",
        textAlign: "start",
        // paddingTop: "20px",
        paddingBottom: "20px",
        paddingLeft: "19px",
        paddingRight: "10px",
      }}
    >
      <h1  className="titr-font" style={{ textAlign: "center" }}> PDF Detail</h1>
     
      <Typography className="BBCNassim-font" sx={{ fontSize: 20,  }}>
      <a style={{fontWeight:"bold",marginRight:"45px"}}>NoOfPages</a>: {info.noOfPages}
      </Typography>
      <Typography
      className="BBCNassim-font"
        sx={{ fontSize: 20,  marginTop: "5px" }}
      >
         <a style={{fontWeight:"bold",marginRight:"10px"}}>FileDescription</a>: {info.fileDescription}
      </Typography>
      <Typography
      className="BBCNassim-font"
        sx={{ fontSize: 20,  marginTop: "5px" }}
      >
         <a style={{fontWeight:"bold",marginRight:"69px"}}>FilePath</a>: {info.filePath}
      </Typography>
      <Typography
      className="BBCNassim-font"
        sx={{ fontSize: 20,  marginTop: "5px" }}
      >
         <a style={{fontWeight:"bold",marginRight:"17px"}}>PublishedYear</a>: {info.publishedYear}
      </Typography>
      {/* <Typography sx={{ fontSize: 20, fontWeight: 'regular' }}>fileupload: {info.fileupload}</Typography> */}

      <Button
        sx={{
          mt: 3,
          backgroundColor: "#3945b9",
          color: "white",
          marginLeft: "0px",
          marginBottom: "20px",
        }}
        type="submit"
        variant="contained"
        align="center"
        onClick={() => history.push("/pdfdetails")}
      >
        Go Back
      </Button>
    </Grid>
  </Grid>
    </Paper>
   
  </AppConainer>
  );
}
   
