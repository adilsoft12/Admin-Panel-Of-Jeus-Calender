import React, { useState, useEffect } from "react";
import { Grid, Paper, TextField, Button } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { API_ENDPOINTS_ORG } from "../../../services/api_url";
import { axiosInstance } from "../../../services/axiosInstance";
import axios from "axios";
import { useLocation } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import { validationSchema } from "./validate";

export const AddORG = () => {
  const location = useLocation();
  const [id, setId] = useState(0);
  const [info, setInfo] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedcountries, setSelectedCountries] = useState("");
  const history = useHistory();

  console.log("countries--->", countries);

  console.log("valuu----->", info.countryId);

  console.log("selectedcountries", { selectedcountries, info });

  const paperStyle = {
    padding: "40px 30px 50px 25px",
    width: 900,
    margin: "20px auto",
    align: "center",
  };

  console.log("info.countryId", typeof info.countryId);
  const headerStyle = { margin: 0 };

  useEffect(() => {
    const tempArray = location.pathname?.split("/");
    setId(tempArray?.[2]);

    if (tempArray?.[2]) {
      fetchDetails(tempArray?.[2]);
    }
  }, []);

  const fetchDetails = async (data) => {
    const result = await axios.get(
      `http://jewcalendar-001-site1.btempurl.com/api/Organization/Get-Organization-By-Id?Id=${data}`
    );
    setInfo(result.data);
    console.log("result.data", result.data);
    const ctry = result.data.countryId.toString();
    console.log(">>>>>>Ctry", ctry);
    setSelectedCountries(ctry);
  };

  const AddOrganisation = async (data) => {
    const result = await axios.post(
      "http://jewcalendar-001-site1.btempurl.com/api/Organization/Add-Organization",
      data
    );
    console.log("lisTdataSheowww", result);
    if (result.data.message === "Organization Added") {
      history.push("/organization");
    }
  };
  const updateOrganisation = async (data) => {
    console.log("data------->", data);
    const response = await axios.put(
      `http://jewcalendar-001-site1.btempurl.com/api/Organization/Update-Organization`,
      data
    );
    // const response = await axiosInstance.put(
    //   `${API_ENDPOINTS_ORG.edit_org}`,
    //   data
    // );
    console.log("ListUPdatedData", response);
    if (response) {
      history.push("/organization");
    }
  };

  useEffect(() => {
    getALLlist();
  }, []);

  const getALLlist = async () => {
    const result = await axios.get(
      `http://jewcalendar-001-site1.btempurl.com/api/Organization/Get-All-Organization-with-Country`
    );

    console.log("listDsata", result);
    setCountries(result.data);
  };

  console.log("infocountryName>>>", selectedcountries);

  const formik = useFormik({
    initialValues: {
      organizationNameEnglish: "",
      organizationNamePersian: "",
      email: "",
      countryId:null,
      organizationAddress: "",
      url: "",
      contactPerson: "",
      mobileNo: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      const queryObj = {
        id: Number(id || 0),
        countryId: Number(selectedcountries || info.countryId),
        organizationNameEnglish: values.organizationNameEnglish,
        organizationNamePersian: values.organizationNamePersian,
        organizationAddress: values.organizationAddress,
        url: values.url,
        contactPerson: values.contactPerson,
        email: values.email,
        mobileNo: values.mobileNo,
      };

      console.log("DataShow>>>>", queryObj);
      if (id) {
        updateOrganisation(queryObj);
      } else {
        AddOrganisation(queryObj);
      }
    },
  });

  const { handleChange, handleSubmit, setFieldValue, values, errors, touched } =
    formik;
  
  useEffect(() => {
    if (info) {
      setFieldValue("organizationNameEnglish", info.organizationNameEnglish);
      setFieldValue("organizationNamePersian", info.organizationNamePersian);
      setFieldValue("email", info.email);
      setFieldValue("country", info.countryName);
      setFieldValue("organizationAddress", info.organizationAddress);
      setFieldValue("url", info.url);
      setFieldValue("contactPerson", info.contactPerson);
      setFieldValue("mobileNo", info.mobileNo);
    }
  }, [info]);

  console.log("VAlues>>>", { values, selectedcountries });
  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Grid align="center" sx={{ mt: 3 }}>
          <h2 style={headerStyle}>{id ? "Update" : "Add New"} Organization</h2>
        </Grid>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="organizationNameEnglish"
            name="organizationNameEnglish"
            label="Organization Name"
            placeholder="Enter your Organization Name"
            value={values.organizationNameEnglish}
            onChange={handleChange("organizationNameEnglish")}
            error={
              touched.organizationNameEnglish &&
              Boolean(errors.organizationNameEnglish)
            }
            helperText={
              touched.organizationNameEnglish && errors.organizationNameEnglish
            }
          />

          <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="organizationNamePersian"
            name="organizationNamePersian"
            label="Organization Name Persian"
            placeholder="Enter your Organization Name Persian"
            value={values.organizationNamePersian}
            onChange={handleChange("organizationNamePersian")}
            error={
              touched.organizationNamePersian &&
              Boolean(errors.organizationNamePersian)
            }
            helperText={
              touched.organizationNamePersian && errors.organizationNamePersian
            }
          />

          <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="email"
            name="email"
            label="Email Address"
            placeholder="Enter your email address"
            value={values.email}
            onChange={handleChange("email")}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <Box sx={{ minWidth: 120, mt: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedcountries}
                label="Country"
                onChange={(e) => setSelectedCountries(e.target.value)}
              >
                {countries &&
                  countries.map((item) => {
                    return (
                      <MenuItem value={item.id}>{item.countryName}</MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </Box>

          <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="organizationAddress"
            name="organizationAddress"
            label="Organization Address"
            placeholder="Enter your Organization Address"
            value={values.organizationAddress}
            onChange={handleChange("organizationAddress")}
          />

          <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="url"
            name="url"
            label="url"
            placeholder="Enter your url"
            value={values.url}
            onChange={handleChange("url")}
            error={touched.url && Boolean(errors.url)}
            helperText={touched.url && errors.url}
          />
          <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="contactPerson"
            name="contactPerson"
            label="Contact Person"
            placeholder="Enter your Contact Person"
            value={values.contactPerson}
            onChange={handleChange("contactPerson")}
            error={touched.contactPerson && Boolean(errors.contactPerson)}
            helperText={touched.contactPerson && errors.contactPerson}
          />
          <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="mobileNo"
            name="mobileNo"
            label="Mobile Number"
            placeholder="Enter your Mobile Number"
            value={values.mobileNo}
            onChange={handleChange("mobileNo")}
            error={touched.mobileNo && Boolean(errors.mobileNo)}
            helperText={touched.mobileNo && errors.mobileNo}
          />

          <Button
            sx={{ mt: 3 }}
            type="submit"
            variant="contained"
            color="primary"
            align="center"
          >
            Save
          </Button>

          <Button
            sx={{ ml: 1, mt: 3 }}
            type="submit"
            variant="contained"
            color="primary"
            align="center"
            onClick={() => history.push("/organization")}
          >
            Go Back
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};
