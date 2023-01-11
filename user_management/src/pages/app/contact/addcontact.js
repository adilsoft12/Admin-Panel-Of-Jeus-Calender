import React, { useState, useEffect } from "react";
import { Grid, Paper, TextField, Button } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import {API_ENDPOINTS_Contact} from '../../../services/api_url';
import { axiosInstance } from "../../../services/axiosInstance";
import axios from "axios";
import { useLocation } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import {validationSchema} from '../contact/validate';

export const Addcontact = () => {
  const location = useLocation();
  const [id, setId] = useState(0);
  const [info, setInfo] = useState([]);
  const history = useHistory();

 

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
      console.log("id------->",id)
    }
  }, []);

  const fetchDetails = async (data) => {
    const result = await axios.post(
      `http://jewcalendar-001-site1.btempurl.com/api/Contact/GetBy-ID?Id=${data}`
    );
    setInfo(result.data);
    console.log("result.data",result.data)
    
  };

  const AddCnt = async (data) => {
    // console.log({data})
    const result = await axios.post(
      "http://jewcalendar-001-site1.btempurl.com/api/Contact/Add",
      data    
    );
    console.log("result.data",result.data);
    if (result.data.message === "Added") {
      history.push("/contact");
    }
  };
  const updateContact = async (data) => {
    const response = await axiosInstance.post(
      `${API_ENDPOINTS_Contact.update_file}`,
      data
    );
    if (response) {
      history.push("/contact");
    }
  };


 

  const formik = useFormik({
    initialValues: {
      productName: "",
      website1: "",
      website2: "",
      website3: "",
      address: "",
      mobileNo: "",
      phone: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const queryObj = {
        id: Number(id || 0),
        productName: values.productName,
        website1: values.website1,
        website2: values.website2,
        website3: values.website3,
        address: values.address,
        mobileNo:parseInt(values.mobileNo)   ,
        phone: parseInt(values.phone) ,
        email: values.email,
      };
      
      console.log("queryObj",queryObj)
      if (id) {
        updateContact(queryObj);
      } else {
        AddCnt(queryObj);
      }
    },
  });

  const { handleChange, handleSubmit, setFieldValue, values, errors, touched } =
  formik;
  console.log({errors})
  useEffect(() => {
    if (info) {
      setFieldValue("productName", info.productName);
      setFieldValue("website1", info.website1);
      setFieldValue("website2", info.website2);
      setFieldValue("website3", info.website3);
      setFieldValue("address", info.address);
      setFieldValue("mobileNo", info.mobileNo);
      setFieldValue("phone", info.phone);
      setFieldValue("email", info.email);
    }
  }, [info]);




  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Grid align="center" sx={{mt : 3}}>
          <h2 style={headerStyle}>{id ? "Update" : "Add New"} Contact</h2>
        </Grid>
       
        <form onSubmit={handleSubmit}>
           <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="productName"
            name="productName"
            label="Product Name"
            placeholder="Enter your Product Name"
            value={values.productName}
            onChange={handleChange("productName")}
            error={touched.productName && Boolean(errors.productName)}
            helperText={Boolean(errors.productName) && errors.productName}
           />

            <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="website1"
            name="website1"
            label="website1"
            placeholder="Enter your Website1"
            value={values.website1}
            onChange={handleChange("website1")}
            // error={touched.website1 && Boolean(errors.website1)}
            // helperText={Boolean(errors.website1) && errors.website1}
          />

            <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="website2"
            name="website2"
            label="Website2"
            placeholder="Enter your Website2"
            value={values.website2}
            onChange={handleChange("website2")}
            // error={touched.website2 && Boolean(errors.website2)}
            // helperText={touched.website2 && errors.website2}
          />
           <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="website3"
            name="website3"
            label="Website3"
            placeholder="Enter your Website3"
            value={values.website3}
            onChange={handleChange("website3")}
            // error={touched.website3 && Boolean(errors.website3)}
            // helperText={touched.website3 && errors.website3}
          />

        
          <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="address"
            name="address"
            label=" Address"
            placeholder="Enter your Contact Address"
            value={values.address}
            onChange={handleChange("address")}
            error={touched.address && Boolean(errors.address)}
            helperText={ Boolean(errors.address) && errors.address}
          />

          <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="mobileNo"
            name="mobileNo"
            label="Mobile No"
            placeholder="Enter your Mobile No"
            value={values.mobileNo}
            onChange={handleChange("mobileNo")}
            error={touched.mobileNo && Boolean(errors.mobileNo)}
            helperText={ Boolean(errors.mobileNo) && errors.mobileNo}
          />
          <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="phone"
            name="phone"
            label="Phone"
            placeholder="Enter your Phone"
            value={values.phone}
            onChange={handleChange("phone")}
            error={touched.phone && Boolean(errors.phone)}
            helperText={Boolean(errors.phone) && errors.phone}
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
            helperText={Boolean(errors.email) && errors.email}
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
            onClick={() => history.push("/contact")}
          >
            Go Back
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

