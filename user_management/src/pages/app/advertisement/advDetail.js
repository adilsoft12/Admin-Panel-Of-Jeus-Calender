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
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
export function DetailAdv() {
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
        `http://zewscalender-001-site1.btempurl.com/api/Advertisement/Get-Advertisement-By-Id?Id=${data}`
      );
      setInfo(result.data);
    } catch (error) {}
  }

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        md={12}
        sx={{
          height: "100%",
          margin: { sx: "5px", lg: "0" },
          background: "black",
        }}
      >
        <Grid item>
          <Item>
       <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
       <div>
           <button 
               style={{border:'none',backgroundColor: 'transparent'}}
                type="submit" onClick={() => history.push("/pdfdetails")}>
                <KeyboardArrowLeftIcon sx={{color:'black'}}/>
              </button>
           </div>
       <div >
        <h1 style={headerStyle} className="titr-font">
              Advertisement Detail
            </h1>
            </div>
            <div></div>
         
       </div>
            <div style={{ margin: "10px 0", marginTop: 50 }}>
          
              <Typography
                className="BBCNassim-font"
                sx={{ fontSize: 25, fontWeight: "regular" }}
              >
                BusinessName: {info.businessName}
              </Typography>
              <Typography
                className="BBCNassim-font"
                sx={{ fontSize: 25, fontWeight: "regular" }}
              >
                BusinessUrl: {info.businessUrl}
              </Typography>
              <Typography
                className="BBCNassim-font"
                sx={{ fontSize: 25, fontWeight: "regular" }}
              >
                ImageDescription:{info.imageDescription}
              </Typography>
              <Typography
                className="BBCNassim-font"
                sx={{ fontSize: 25, fontWeight: "regular" }}
              >
                Year: {info.year}
              </Typography>
             
            </div>
          </Item>
        </Grid>
      </Grid>
    </Grid>
  );
}
