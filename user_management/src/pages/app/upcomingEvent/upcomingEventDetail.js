import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { AppConainer } from "../../../components";

export function UpcomingeventDetail() {
  const history = useHistory();
  const [id, setId] = useState([]);
  const [info, setInfo] = useState([]);
  const location = useLocation();

  const headerStyle = { margin: 0 };
  const paperStyle = {
    padding: "40px 30px 50px 20px",
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
        `http://jewcalendar-001-site1.btempurl.com/api/UpcomingEvent/GetBy-Id?Id=${data}`
      );
      setInfo(result.data);
    } catch (error) {}
  }

  return (
    <AppConainer>
      <Paper elevation={3} sx={{ marginLeft: "200px" }}>
        <Grid
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Grid
            style={{
              backgroundSize: "cover",
              textAlign: "start",
              paddingBottom: "20px",
              paddingLeft: "19px",
              paddingRight: "20px",
            }}
          >
            <h1 className="titr-font" style={{ textAlign: "center" }}>
              Upcoming Event Detail{" "}
            </h1>

            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                    <a style={{ fontWeight: "bold", marginRight: "20px" }}>
                      StartTime 
                    </a>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                   :
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                    {info.startTime}
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                    <a style={{ fontWeight: "bold", marginRight: "20px" }}>
                      Event Type Persian
                    </a>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                   :
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                    {info.eventTypePersian}
                  </Typography>
                </Grid>
           
              </Grid>


              <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                    <a style={{ fontWeight: "bold", marginRight: "20px" }}>
                    Event Type English:
                    </a>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                  :
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                    {info.eventTypeEnglish}
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                    <a style={{ fontWeight: "bold", marginRight: "20px" }}>
                    Address:
                    </a>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                  :
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                    {info.address}
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                    <a style={{ fontWeight: "bold", marginRight: "20px" }}>
                    Phone Number:
                    </a>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                  :
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                    {info.phoneNumber}
                  </Typography>
                </Grid>
              </Grid>
           
              <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                    <a style={{ fontWeight: "bold", marginRight: "20px" }}>
                    Email:
                    </a>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                  :
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                    {info.email}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                    <a style={{ fontWeight: "bold", marginRight: "20px" }}>
                    Website:
                    </a>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                  :
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                    {info.website}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                    <a style={{ fontWeight: "bold", marginRight: "20px" }}>
                    TicketPrice:
                    </a>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                  :
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                    {info.ticketPrice}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                    <a style={{ fontWeight: "bold", marginRight: "20px" }}>
                    OranizerName:
                    </a>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                  :
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                    {info.oraniserName}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                    <a style={{ fontWeight: "bold", marginRight: "20px" }}>
                    Flyer:
                    </a>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                  :
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                    {info.flyer}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                    <a style={{ fontWeight: "bold", marginRight: "20px" }}>
                    Event Description:
                    </a>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                  :
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                    {info.eventDescription}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                    <a style={{ fontWeight: "bold", marginRight: "20px" }}>
                    TicketWebsiteUrl:
                    </a>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                  :
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography className="BBCNassim-font" sx={{ fontSize: 20 }}>
                    {info.ticketWebsiteUrl}
                  </Typography>
                </Grid>
              </Grid>
            </Box>

        
            <Button
              sx={{
                mt: 3,
                backgroundColor: "#3945b9",
                color: "white",
                marginBottom: "20px",
              }}
              type="submit"
              variant="contained"
              align="center"
              onClick={() => history.push("/upcomingevent")}
            >
              Go Back
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </AppConainer>
  );
}
