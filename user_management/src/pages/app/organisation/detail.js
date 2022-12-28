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
        `http://zewscalender-001-site1.btempurl.com/api/Organization/Get-Organization-By-Id?Id=${data}`
      );
      setInfo(result.data);
    console.log("result-------------->",result.data)
    } catch (error) {}
  }

  return (
    <AppConainer>
      <Paper  elevation={3} sx={{marginLeft:"250px"}}>
      <Grid
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <Grid
        style={{
          // backgroundColor: "#C3C6E2",
          backgroundSize: "cover",
          textAlign: "start",
          paddingTop: "50px",
          paddingBottom: "50px",
          paddingLeft: "40px",
          paddingRight: "40px",
        }}
      >
        <h1 className="titr-font" style={{ headerStyle, marginLeft: "10px" ,textAlign:"center"}}>
          {" "}
          Organization Detail{" "}
        </h1>

        <Typography className="BBCNassim-font" sx={{ fontSize: 20, }}>
        <a style={{fontWeight:"bold",marginRight:"29px"}}>OrganizationName</a>: {info.organizationName}
        </Typography>
        <Typography className="BBCNassim-font" sx={{ fontSize: 20, }}>
        <a style={{fontWeight:"bold",marginRight:"143px"}}>Email</a>: {info.email}
        </Typography>
        <Typography className="BBCNassim-font" sx={{ fontSize: 20, }}>
          <a style={{fontWeight:"bold",marginRight:"123px"}}>Country</a>: {info.countryName}
        </Typography>
        <Typography className="BBCNassim-font" sx={{ fontSize: 20,  }}>
        <a style={{fontWeight:"bold",marginRight:"10px"}}>OrganizationAddress</a>:{info.organizationAddress}
        </Typography>
        <Typography className="BBCNassim-font" sx={{ fontSize: 20, }}>
        <a style={{fontWeight:"bold",marginRight:"168px"}}>Url</a>: {info.url}
        </Typography>
        <Typography className="BBCNassim-font" sx={{ fontSize: 20, }}>
        <a style={{fontWeight:"bold",marginRight:"68px"}}>ContactPerson</a>: {info.contactPerson}
        </Typography>
        <Typography className="BBCNassim-font" sx={{ fontSize: 20, }}>
        <a style={{fontWeight:"bold",marginRight:"110px"}}>MobileNo</a>: {info.mobileNo}
        </Typography>

        <Button
          sx={{
            ml: 1,
            mt: 3,
            backgroundColor: "#3945b9",
            color: "white",
            marginLeft: "-2px",
            marginBottom: "20px",
          }}
          type="submit"
          variant="contained"
          align="center"
          onClick={() => history.push("/organisation")}
        >
          Go Back
        </Button>
      </Grid>
    </Grid>
      </Paper>
    
    </AppConainer>
    
  );
}
