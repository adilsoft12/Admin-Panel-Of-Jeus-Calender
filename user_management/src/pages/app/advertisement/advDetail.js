import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import { margin } from "@mui/system";
import { IMG_BASE_URL } from "../../../services/api_url";
import { AppConainer } from "../../../components";
import { PausePresentation } from "@material-ui/icons";
// import Paper from '@mui/material/Paper';

export function DetailAdv() {
  const [id, setId] = useState([]);
  const [info, setInfo] = useState([]);
  console.log("info", JSON.stringify(info, null, 2));
  const location = useLocation();
  const history = useHistory();
  const headerStyle = { margin: 0 };

  const paperStyle = {
    padding: "20px 10px 0px 20px",
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
        `https://localhost:44379/api/Advertisement/Get-Advertisement-By-Id?Id=${data}`
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
            Advertisement Detail{" "}
          </h1>

          <Typography className="BBCNassim-font" sx={{ fontSize: 20, }}>
            {" "}
            <a style={{fontWeight:"bold",marginRight:"40px"}}>BusinessName</a>: {info.businessName}
          </Typography>
          {/* <Typography className="BBCNassim-font" sx={{ fontSize: 20, }}>
            {" "}
           <a style={{fontWeight:"bold",marginRight:"10px"}}> ImageFile</a>: {info.imageFile}
          </Typography> */}
          <Typography className="BBCNassim-font" sx={{ fontSize: 20, }}>
            {" "}
           <a style={{fontWeight:"bold",marginRight:"10px"}}> ImageDescription</a>: {info.imageDescription}
          </Typography>
          <Typography className="BBCNassim-font" sx={{ fontSize: 20, }}>
            {" "}
            <a style={{fontWeight:"bold",marginRight:"62px"}}>BusinessUrl</a>:{info.businessUrl}
          </Typography>
          <div style={{ display: "flex" }}>
            <Typography className="BBCNassim-font" sx={{ fontSize: 20,  }}>
              {" "}
              <a style={{ fontWeight:"bold" ,marginRight:"72px"}}>ImagePath</a>:
            </Typography>
            <div>
              <img
                src={IMG_BASE_URL + info.imagePath}
                style={{ width: 200, height: 200, marginLeft: 20 }}
              />
            </div>
          </div>
          <Typography className="BBCNassim-font" sx={{ fontSize: 20,}}>
            {" "}
            <a style={{fontWeight:"bold",marginRight:"125px"}}>Year</a>: {info.year}
          </Typography>
          <Typography className="BBCNassim-font" sx={{ fontSize: 20,}}>
            {" "}
            <a style={{fontWeight:"bold",marginRight:"125px"}}>Type</a>: {info.type}
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
            onClick={() => history.push("/advertisement")}
          >
            Go Back
          </Button>
        </Grid>
      </Grid>
    </Paper>
     
    </AppConainer>
  );
}
