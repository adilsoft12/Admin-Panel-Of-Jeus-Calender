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

export const AddORG = () => {
  const location = useLocation();
  const [id, setId] = useState(0);
  const [info, setInfo] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedcountries, setSelectedCountries] = useState('');
  const history = useHistory();

  console.log("selectedcountries",selectedcountries)

  const paperStyle = {
    padding: "40px 30px 50px 25px",
    width: 900,
    margin: "20px auto",
    align: "center",
  };

  const headerStyle = { margin: 0 };

  const validationSchema = yup.object().shape({
    organizationName: yup
      .string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    url: yup
      .string()
      .min(2, "must be more then 2 characters")
      .required("url cannot be blank"),
  });
  useEffect(() => {
    const tempArray = location.pathname?.split("/");
    setId(tempArray?.[2]);

    if (tempArray?.[2]) {
      fetchDetails(tempArray?.[2]);
    }
  }, []);

  const fetchDetails = async (data) => {
    const result = await axios.get(
      `http://zewscalender-001-site1.btempurl.com/api/Organization/Get-Organization-By-Id?Id=${data}`
    );
    setInfo(result.data);
    console.log("result.data",result.data)
    const  ctry = result.data.countryId.toString()
    console.log(">>>>>>Ctry", ctry)
    setSelectedCountries(ctry)
  };

  const AddOrganisation = async (data) => {
    const result = await axios.post(
      "http://zewscalender-001-site1.btempurl.com/api/Organization/Add-Organization",
      data
    );
    if (result.data.message === "Organization Added") {
      history.push("/organisation");
    }
  };
  const updateOrganisation = async (data) => {
    const response = await axiosInstance.put(
      `${API_ENDPOINTS_ORG.edit_org}`,
      data
    );
    if (response) {
      history.push("/organisation");
    }
  };
  useEffect(() => {
    getALLlist();
  }, []);

  const getALLlist = async () => {
    const result = await axios.post(
      `http://zewscalender-001-site1.btempurl.com/api/Country/GetAll`
    );
    setCountries(result.data);
  };

  // async function makePostRequest(queryObj) {

  //   try {
  //     const data = {
  //       id: Number(id || 0),
  //       organizationName: queryObj?.organizationName,
  //       email: queryObj?.email,
  //       country: queryObj?.country,
  //       organizationAddress: queryObj?.organizationAddress,
  //       url: queryObj?.url,
  //       contactPerson: queryObj?.contactPerson,
  //       mobileNo: queryObj?.mobileNo,

  //     };
  //     if (id) {

  //       const response = await axiosInstance.put(`${API_ENDPOINTS_ORG.edit_org}`, data);
  //       console.log(response);
  //     }
  //     else {
  //       const response = await axiosInstance.post(API_ENDPOINTS_ORG.add_org, data);
  //       console.log(response.data, "response");
  //     }

  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  console.log("infocountryName>>>", selectedcountries);

  const formik = useFormik({
    initialValues: {
      organizationName: "",
      email: "",
      country: "",
      organizationAddress: "",
      url: "",
      contactPerson: "",
      mobileNo: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const queryObj = {
        id: Number(id || 0),
        countryId: selectedcountries,
        organizationName: values.organizationName,
        organizationAddress: values.organizationAddress,
        url: values.url,
        contactPerson: values.contactPerson,
        email: values.email,
        mobileNo: values.mobileNo,
      };

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
      setFieldValue("organizationName", info.organizationName);
      setFieldValue("email", info.email);
      setFieldValue("country", info.countryName);
      setFieldValue("organizationAddress", info.organizationAddress);
      setFieldValue("url", info.url);
      setFieldValue("contactPerson", info.contactPerson);
      setFieldValue("mobileNo", info.mobileNo);
    }
  }, [info]);


  console.log("VAlues>>>",{ values,selectedcountries})
  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}>{id ? "Update" : "Add New"} Organization</h2>
        </Grid>
        <br />
        <br />
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="organizationName"
            name="organizationName"
            label="Organization Name"
            placeholder="Enter your Organization Name"
            value={values.organizationName}
            onChange={handleChange("organizationName")}
            error={touched.organizationName && Boolean(errors.organizationName)}
            helperText={touched.organizationName && errors.organizationName}
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
                onChange={(e) => setSelectedCountries( e.target.value)}
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
            onClick={() => history.push("/organisation")}
          >
            Go Back
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};
