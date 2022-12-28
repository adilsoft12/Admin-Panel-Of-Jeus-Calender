import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";

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
    } catch (error) {}
  }

  return (
    <Grid
      style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}
    >
      <Grid
        style={{
          backgroundColor: "#C3C6E2",
          backgroundSize: "cover",
          textAlign: "start",
          paddingTop: "50px",
          paddingBottom: "50px",
          paddingLeft: "19px",
          paddingRight: "10px",
        }}
      >
        <h1 style={{ headerStyle, marginLeft: "10px" }}>
          {" "}
          Organization Detail{" "}
        </h1>

        <Typography sx={{ fontSize: 20, fontWeight: "regular" }}>
          OrganizationName: {info.organizationName}
        </Typography>
        <Typography sx={{ fontSize: 20, fontWeight: "regular" }}>
          Email: {info.email}
        </Typography>
        <Typography sx={{ fontSize: 20, fontWeight: "regular" }}>
          Country: {info.countryName}
        </Typography>
        <Typography sx={{ fontSize: 20, fontWeight: "regular" }}>
          OrganizationAddress:{info.organizationAddress}
        </Typography>
        <Typography sx={{ fontSize: 20, fontWeight: "regular" }}>
          Url: {info.url}
        </Typography>
        <Typography sx={{ fontSize: 20, fontWeight: "regular" }}>
          ContactPerson: {info.contactPerson}
        </Typography>
        <Typography sx={{ fontSize: 20, fontWeight: "regular" }}>
          MobileNo: {info.mobileNo}
        </Typography>

        <Button
          sx={{
            ml: 1,
            mt: 3,
            backgroundColor: "#3945b9",
            color: "white",
            marginLeft: "90px",
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
  );
}
