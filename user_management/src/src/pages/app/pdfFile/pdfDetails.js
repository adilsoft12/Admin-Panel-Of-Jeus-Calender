import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";


export function Detail() {

  const [id, setId] = useState([]);
  const [info, setInfo] = useState([]);
  const location = useLocation()

  const headerStyle = { margin: 0 };
  const paperStyle = {
    padding: "40px 30px 50px 25px",
    width: 700,
    margin: "20px auto",
    align: "center",
    height: "500px"
  };

  useEffect(() => {
    const temp = location.pathname.split('/')
    if (temp[2]) {
      getDetail(temp[2]);
    }
  }, [])

  async function getDetail(data) {
    try {
      const result = await axios.get(`http://zewscalender-001-site1.btempurl.com/api/File/Get-File-By-Id?Id=${data}`);
      setInfo(result.data);
    } catch (error) {
    }
  }

  return (
    <Grid >
      <Paper elevation={0} style={paperStyle}>
        <Grid align="center">
          <h1 style={headerStyle}> Pdf Detail </h1>
        </Grid>
        <Typography sx={{ fontSize: 20, fontWeight: 'regular' }}>noOfPages: {info.noOfPages}</Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 'regular' }}>fileName: {info.fileName}</Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 'regular' }}>fileupload: {info.fileupload}</Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 'regular' }}>fileDescription:{info.fileDescription}</Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 'regular' }}>year: {info.year}</Typography>
      </Paper>
    </Grid>
  )
}