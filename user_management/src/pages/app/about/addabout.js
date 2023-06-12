
import React, { useState, useEffect } from "react";
import { Grid, Paper, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { axiosInstance } from "../../../services/axiosInstance";
import { API_ENDPOINTS_About  } from "../../../services/api_url";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import * as Yup from "yup";

export const AddAbout = () => {
  const location = useLocation();
  const [id, setId] = useState(0);
  const [info, setInfo] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  const SignupSchema = Yup.object().shape({
    aboutUsPersian: Yup.string().required("Please  upload only aboutUsPersian"),
    aboutUsEnglish: Yup.string().required("Please  upload only aboutUsEnglish"),
  });

  const paperStyle = {
    padding: "40px 30px 50px 25px",
    width: 900,
    margin: "20px auto",
    align: "center",
  };

  const headerStyle = { margin: 0 };

  useEffect(() => {
    const tempArray = location.pathname?.split("/");
    setId(tempArray?.[2]);

    if (tempArray?.[2]) {
      fetchDetails(tempArray?.[2]);
    }
  }, []);

  const fetchDetails = async (id) => {
    const result = await axios.get(
      `https://localhost:44379/api/AboutUs/getbyid?Id=${id}`
    );
    setInfo(result.data);
    console.log("userResponseforedit", result.data);
  };

  async function makePostRequest(queryObj) {
    setLoading(true);
    try {
      const data = {
        id: Number(id || 0),
        aboutUsPersian: queryObj.aboutUsPersian,
        aboutUsEnglish: queryObj.aboutUsEnglish,
      
      };

      if (id) {
        const response = await axiosInstance.put(
          `${API_ENDPOINTS_About .update_about}`,
          data
        );

        if (response?.data === "Updated") {
          setLoading(false);
          history.push("/about");
        }
      } else {
        const response = await axiosInstance.post(
          `${API_ENDPOINTS_About .upload_about}`,
          data
        );
        if (response?.data === "Add AboutUs") {
          setLoading(false);
          history.push("/about");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      
      aboutUsPersian: "",
      aboutUsEnglish: "",
      
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      const queryObj = {
        aboutUsPersian: values.aboutUsPersian,
        aboutUsEnglish: values.aboutUsEnglish,

      };
      makePostRequest(queryObj);
    },
  });

  const { handleChange, handleSubmit, setFieldValue, values, errors, touched } =
    formik;

  useEffect(() => {
    if (info) {
      setFieldValue("aboutUsPersian", info?.data?.aboutUsPersian);
      setFieldValue("aboutUsEnglish", info?.data?.aboutUsEnglish);
    }
      
  }, [info,id]);

  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}>
            {id ? "Update" : "Add New"} AboutUs
          </h2>
        </Grid>
        <br />
        <br />
        <form onSubmit={handleSubmit}>
          <br />
          <br />
          <TextField
            fullWidth
            id="aboutUsPersian"
            name=" aboutUsPersian"
            label=" AboutUsPersian"
            placeholder="AboutUsPersian"
            value={values.aboutUsPersian}
            onChange={handleChange("aboutUsPersian")}
            error={touched.aboutUsPersian && Boolean(errors.aboutUsPersian)}
            helperText={
              Boolean(errors.aboutUsPersian) && errors.aboutUsPersian
            }
          />
           <TextField
            fullWidth
            id="aboutUsEnglish"
            name=" aboutUsEnglish"
            label=" AboutUsEnglish"
            placeholder="AboutUsEnglish"
            value={values.aboutUsEnglish}
            onChange={handleChange("aboutUsEnglish")}
            error={touched.aboutUsEnglish && Boolean(errors.aboutUsEnglish)}
            helperText={
              Boolean(errors.aboutUsEnglish) && errors.aboutUsEnglish
            }
          />
          <br />
          <br />
         
          <Button
            type="submit"
            variant="contained"
            color="primary"
            align="center"
          >
            {isLoading ? (
              <CircularProgress style={{ color: "#fff" }} size={25} />
            ) : (
              "Save"
            )}
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            type="submit"
            variant="contained"
            color="primary"
            align="center"
            onClick={() => history.push("/about")}
          >
            Go Back
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};
