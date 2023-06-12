import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import { AppConainer } from "../../../components";

export const ContactDetail = () => {
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
      const result = await axios.post(
        `http://jewcalendar-001-site1.btempurl.com/api/Contact/GetBy-ID?Id=${data}`
      );
      setInfo(result.data);
    } catch (error) {}
  }

  return (
    <AppConainer>
      <Paper  elevation={3} sx={{marginLeft:"250px"}}>
      <Grid
      style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
    >
      <Grid
        style={{
          // backgroundColor: "#C3C6E2",
          backgroundSize: "cover",
          textAlign: "start",
          paddingTop: "50px",
          paddingBottom: "50px",
          paddingLeft: "19px",
          paddingRight: "10px",
        }}
      >
        <h1 className="titr-font" style={{ headerStyle, textAlign:"center" ,fontWeight:"bold"}}>
          {" "}
          Contact Detail{" "}
        </h1>
       
        <Typography className="BBCNassim-font" sx={{ fontSize: 20,  }}>
      <a style={{fontWeight:"bold",marginRight:"10px"}}> Product Name</a>: {info.productName}
        </Typography>
        <Typography className="BBCNassim-font" sx={{ fontSize: 20,  }}>
        <a style={{fontWeight:"bold",marginRight:"56px"}}>Website1</a>: {info.website1}
        </Typography>
        <Typography className="BBCNassim-font" sx={{ fontSize: 20,  }}>
        <a style={{fontWeight:"bold",marginRight:"56px"}}>Website2</a>: {info.website2}
        </Typography>
        <Typography className="BBCNassim-font" sx={{ fontSize: 20,  }}>
        <a style={{fontWeight:"bold",marginRight:"56px"}}>Website3</a>:{info.website3}
        </Typography>
        <Typography className="BBCNassim-font" sx={{ fontSize: 20,  }}>
        <a style={{fontWeight:"bold",marginRight:"65px"}}>Address</a>: {info.address}
        </Typography>
        <Typography className="BBCNassim-font" sx={{ fontSize: 20,  }}>
        <a style={{fontWeight:"bold",marginRight:"45px"}}>Mobile No</a>: {info.mobileNo}
        </Typography>
        <Typography className="BBCNassim-font" sx={{ fontSize: 20,  }}>
        <a style={{fontWeight:"bold",marginRight:"82px"}}>Phone</a>: {info.phone}
        </Typography>
        <Typography className="BBCNassim-font" sx={{ fontSize: 20,  }}>
        <a style={{fontWeight:"bold",marginRight:"84px"}}>Email</a>: {info.email}
        </Typography>
        <Button
          sx={{
            ml: 1,
            mt: 3,
            backgroundColor: "#3945b9",
            color: "white",
            marginLeft: "-3px",
            marginBottom: "20px",

          }}
          type="submit"
          variant="contained"
          align="center"
          onClick={() => history.push("/contact")}
        >
          Go Back
        </Button>
      </Grid>
    </Grid>
      </Paper>
    
    </AppConainer>
    
  );
}
