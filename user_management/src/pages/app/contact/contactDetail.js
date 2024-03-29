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
        `https://localhost:44379/api/Contact/GetBy-ID?Id=${data}`
      );
      setInfo(result.data);
    } catch (error) {}
  }

  console.log("LIstData>>", info);

  return (
    <AppConainer>
      <Paper elevation={3} sx={{ marginLeft: "250px" }}>
        <Grid
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
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
            <h1
              className="titr-font"
              style={{ headerStyle, textAlign: "center", fontWeight: "bold" }}
            >
              {" "}
              Contact Detail{" "}
            </h1>

            {info?.map((listData) => {
              return (
                <>
                  <Grid container>
                    <Grid xs={2} sm={6} md={6}>
                      <Typography
                        variant="h1"
                        sx={{ fontSize: 20, width: 200 }}
                      >
                        Product Name
                      </Typography>
                    </Grid>
                    <Grid xs={2} sm={6} md={6}>
                      <Typography
                        sx={{ fontSize: 14, width: 250 }}
                        variant="h1"
                      >
                        {" "}
                        : {listData.productName}
                      </Typography>
                    </Grid>
                  </Grid>
                  {listData.website1 && (
                    <Grid container>
                      <Grid xs={2} sm={6} md={6}>
                        <Typography
                          variant="h1"
                          sx={{ fontSize: 20, width: 200 }}
                        >
                          Website One
                        </Typography>
                      </Grid>
                      <Grid xs={2} sm={6} md={6}>
                        <Typography
                          sx={{ fontSize: 14, width: 200 }}
                          variant="h1"
                        >
                          {" "}
                          : {listData.website1}
                        </Typography>
                      </Grid>
                    </Grid>
                  )}

                  {listData.website2 && (
                    <Grid container>
                      <Grid xs={2} sm={6} md={6}>
                        <Typography
                          variant="h1"
                          sx={{ fontSize: 20, width: 200 }}
                        >
                          Website Second
                        </Typography>
                      </Grid>
                      <Grid xs={2} sm={6} md={6}>
                        <Typography
                          sx={{ fontSize: 14, width: 200 }}
                          variant="h1"
                        >
                          {" "}
                          : {listData.website2}
                        </Typography>
                      </Grid>
                    </Grid>
                  )}

                  {listData.website3 && (
                    <Grid container>
                      <Grid xs={2} sm={6} md={6}>
                        <Typography
                          variant="h1"
                          sx={{ fontSize: 20, width: 200 }}
                        >
                          Website Three
                        </Typography>
                      </Grid>
                      <Grid xs={2} sm={6} md={6}>
                        <Typography
                          sx={{ fontSize: 14, width: 200 }}
                          variant="h1"
                        >
                          {" "}
                          : {listData.website3}
                        </Typography>
                      </Grid>
                    </Grid>
                  )}

                  <Grid container>
                    <Grid xs={2} sm={6} md={6}>
                      <Typography
                        variant="h1"
                        sx={{ fontSize: 20, width: 200 }}
                      >
                        Address
                      </Typography>
                    </Grid>
                    <Grid xs={2} sm={6} md={6}>
                      <Typography
                        sx={{ fontSize: 14, width: 200 }}
                        variant="h1"
                      >
                        {" "}
                        : {listData.address}
                      </Typography>
                    </Grid>
                  </Grid>

                  {listData.number && listData.number?.map((itm) => {
                    return (
                      <>
                        <Grid container>
                          <Grid xs={2} sm={6} md={6}>
                            <Typography
                              variant="h1"
                              sx={{ fontSize: 20, width: 200 }}
                            >
                              {itm.type}
                            </Typography>
                          </Grid>
                          <Grid xs={2} sm={6} md={6}>
                            <Typography
                              sx={{ fontSize: 14, width: 200 }}
                              variant="h1"
                            >
                              {" "}
                              : {itm.number}
                            </Typography>
                          </Grid>
                        </Grid>
                      </>
                    );
                  })}

                  <Grid container>
                    <Grid xs={2} sm={6} md={6}>
                      <Typography
                        variant="h1"
                        sx={{ fontSize: 20, width: 200 }}
                      >
                        Email
                      </Typography>
                    </Grid>
                    <Grid xs={2} sm={6} md={6}>
                      <Typography
                        sx={{ fontSize: 14, width: 250 }}
                        variant="h1"
                      >
                        {" "}
                        : {listData.email}
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              );
            })}

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
};
