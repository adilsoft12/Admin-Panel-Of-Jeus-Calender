import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import { AppConainer } from "../../../components";

export function DetailOrg() {
  const history = useHistory();
  const [id, setId] = useState([]);
  const [info, setInfo] = useState([]);
  const location = useLocation();

  const headerStyle = { margin: 0 };
  const paperStyle = {
    padding: "40px 30px 50px 25px",
    width: 700,
    margin: "20px auto",
    align: "center",
    height: "500px",
  };

  useEffect(() => {
    const temp = location.pathname.split("/");
    if (temp[2]) {
      getDetail(temp[2]);
    }
  }, []);

  async function getDetail(data) {
    try {
      const result = await axios.get(
        `http://jewcalendar-001-site1.btempurl.com/api/Organization/Get-Organization-By-Id?Id=${data}`
      );
      setInfo(result.data);
    } catch (error) {}
  }

  return (
    <AppConainer>
    <Paper elevation={3} sx={{marginLeft:"250px"}}>
    <Grid
        style={{ display: "flex", justifyContent: "center", marginTop: "30px",alignItems:"center" }}
      >
        <Grid
          style={{
            // backgroundColor: "rgb(63 81 181)",
            backgroundSize: "cover",
            textAlign: "start",
            paddingTop: "5px",
            paddingBottom: "13px",
            paddingLeft: "78px",
            paddingRight: "78px",
          }}
        >
          <h1  className="titr-font" style={{ headerStyle, textAlign: "center",fontWeight:"bold" }}>
            {" "}
            Organization Detail{" "}
          </h1>

          <Typography className="BBCNassim-font" sx={{ fontSize: 20, }}>
            {" "}
            <a style={{fontWeight:"bold",marginRight:"40px"}}>OrganizationName</a>: {info.organizationNameEnglish}
          </Typography>
         
          <Typography className="BBCNassim-font" sx={{ fontSize: 20, }}>
            {" "}
           <a style={{fontWeight:"bold",marginRight:"10px"}}> OrganizationNamePersian</a>: {info.organizationNamePersian}
          </Typography>
          <Typography className="BBCNassim-font" sx={{ fontSize: 20, }}>
            {" "}
            <a style={{fontWeight:"bold",marginRight:"62px"}}>OrganizationAddress</a>:{info.organizationAddress}
          </Typography>
         
          <Typography className="BBCNassim-font" sx={{ fontSize: 20,}}>
            {" "}
            <a style={{fontWeight:"bold",marginRight:"125px"}}>Country</a>: {info.countryName}
          </Typography>
          <Typography className="BBCNassim-font" sx={{ fontSize: 20,}}>
            {" "}
            <a style={{fontWeight:"bold",marginRight:"125px"}}>Email</a>: {info.email}
          </Typography>
          <Typography className="BBCNassim-font" sx={{ fontSize: 20,}}>
            {" "}
            <a style={{fontWeight:"bold",marginRight:"125px"}}>URL</a>: {info.url}
          </Typography>
          <Typography className="BBCNassim-font" sx={{ fontSize: 20,}}>
            {" "}
            <a style={{fontWeight:"bold",marginRight:"125px"}}>ContactPerson</a>: {info.contactPerson}
          </Typography>
          <Typography className="BBCNassim-font" sx={{ fontSize: 20,}}>
            {" "}
            <a style={{fontWeight:"bold",marginRight:"125px"}}>MobileNo</a>: {info.mobileNo}
          </Typography>

          <Button
            sx={{
              ml: 1,
              mt: 3,
              backgroundColor: "#3945b9",
              color: "white",
              marginLeft: "0px",
              marginBottom: "20px",
            }}
            type="submit"
            variant="contained"
            align="center"
            onClick={() => history.push("/Organization")}
          >
            Go Back
          </Button>
        </Grid>
      </Grid>
    </Paper>
     
    </AppConainer>
  );
}
