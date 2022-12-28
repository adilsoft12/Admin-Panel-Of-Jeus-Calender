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

export function DetailAdv() {
  const [id, setId] = useState([]);
  const [info, setInfo] = useState([]);
  console.log('info',JSON.stringify(info,null,2))
  const location = useLocation();
  const history = useHistory();
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
        `http://zewscalender-001-site1.btempurl.com/api/Advertisement/Get-Advertisement-By-Id?Id=${data}`
      );
      setInfo(result.data);
    } catch (error) {}
  }

  return (
   <Grid style={{display:"flex", justifyContent:"center",marginTop:"100px"}}>
     <Grid
      style={{
        backgroundColor: "#C3C6E2",
        backgroundSize: "cover",
        textAlign: "start",
        paddingTop:"50px",
        paddingBottom:"50px",
        paddingLeft:"20px",
        paddingRight:"10px"
      }}
    >
     
        <h1 style={{headerStyle,marginLeft:"105px"}}> Advertisement Detail </h1>
     
      <Typography sx={{ fontSize: 20, fontWeight: "regular" }}>
        {" "}
        BusinessName: {info.businessName}
      </Typography>
      <Typography sx={{ fontSize: 20, fontWeight: "regular" }}>
        {" "}
        ImageFile: {info.imageFile}
      </Typography>
      <Typography sx={{ fontSize: 20, fontWeight: "regular" }}>
        {" "}
        ImageDescription: {info.imageDescription}
      </Typography>
      <Typography sx={{ fontSize: 20, fontWeight: "regular" }}>
        {" "}
        BusinessUrl:{info.businessUrl}
      </Typography>
     <div style={{display:'flex'}}>
     <Typography sx={{ fontSize: 20, fontWeight: "regular" }}>
        {" "}
        ImagePath: 
      </Typography>
<div>
<img src={IMG_BASE_URL + info.imagePath}  style={{width:200,height:200,marginLeft:20}}/>

</div>
     </div>
      <Typography sx={{ fontSize: 20, fontWeight: "regular" }}>
        {" "}
        Year: {info.year}
      </Typography>

      <Button
        sx={{ ml: 1, mt: 3 ,backgroundColor: "#3945b9",
        color: "white",
        marginLeft:"200px",
        marginBottom:"20px"
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
  );
  
}
