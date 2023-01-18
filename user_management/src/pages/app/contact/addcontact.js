import React, { useState, useEffect } from "react";
import { Grid, Paper, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { API_ENDPOINTS_Contact } from "../../../services/api_url";
import { axiosInstance } from "../../../services/axiosInstance";
import axios from "axios";
import { useLocation } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useHistory } from "react-router-dom";
import { validationSchema } from "../contact/validate";

export const Addcontact = () => {
  const location = useLocation();
  const [ids, setId] = useState(0);
  const [info, setInfo] = useState([]);
  const [inputField, setInputfield] = useState([
    { type: "", number: "", status:"", id:crypto.randomUUID()},
  ]);

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
    }
  }, []);

  const fetchDetails = async (data) => {
    const result = await axios.post(
      `http://jewcalendar-001-site1.btempurl.com/api/Contact/GetBy-ID?Id=${data}`
    );
    setInfo(result.data);
  };

  const AddCnt = async (data) => {
    const result = await axios.post(
      "http://jewcalendar-001-site1.btempurl.com/api/Contact/Add",
      data
    );
    console.log("result.data", result);
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
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const listInputfield = inputField.map((i) => ({
          id: 0,
          contactId: 0,
          type: i.type,
          number: i.number,
          status: ""
      }))
      const queryObj = {
        id: Number(ids || 0),
        productName: values.productName,
        website1: values.website1,
        website2: values.website2,
        website3: values.website3,
        address: values.address,
        number: listInputfield,
        email: values.email,
      };
      if (ids) {
        updateContact(queryObj);
      } else {
        AddCnt(queryObj);
      }
    },
  });

  const onHandleClick = () => {
    setInputfield([
      ...inputField,
      { type: "", number: "",status:"", id: crypto.randomUUID() },
    ]);
  };

  console.log("inputField>>>", inputField);

  const { handleChange, handleSubmit, setFieldValue, values, errors, touched } =
    formik;
  console.log({ errors });
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

  const onHandleNumber = (id) => (e) => {
    console.log("IDLIst", id)
    const { value, name } = e.target;
    const inputFieldList = inputField.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [name]: value,
        };
      }
      return item;
    });
    setInputfield(inputFieldList);
  };

  const onHandleRemove = (id)=>{
    const list =[...inputField]  
    list.splice(id,1)
    setInputfield(list)
  }
  console.log("ListInputFiled", inputField);

  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Grid align="center" sx={{ mt: 3 }}>
          <h2 style={headerStyle}>{ids ? "Update" : "Add New"} Contact</h2>
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
            helperText={Boolean(errors.address) && errors.address}
          />

          {/* <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="mobileNo"
            name="mobileNo"
            label="Mobile No"
            placeholder="Enter your Mobile No"
            value={values.mobileNo}
            onChange={handleChange("mobileNo")}
            error={touched.mobileNo && Boolean(errors.mobileNo)}
            helperText={Boolean(errors.mobileNo) && errors.mobileNo}
          /> */}
         
          {inputField &&
            inputField?.map((item, Index) => {
              return (
                <>
                  <Grid container>
                    <Select
                      style={{
                        width: "49%",
                        marginRight: "8px",
                        marginTop: "25px",
                        height: "fit-content",
                      }}
                      labelId="demo-simple-select-helper-label"
                      label="Age"
                      name="type"
                      value={item.type}
                      id={item.id}
                      onChange={onHandleNumber(item.id)}
                    >
                      <MenuItem value="Home">Home</MenuItem>
                      <MenuItem value="Fax">Fax</MenuItem>
                      <MenuItem value="Mobile">Mobile</MenuItem>
                    </Select>

                    <TextField
                      disabled={item.id ? false : true}
                      fullWidth
                      sx={{ mt: 3, width: "50%" }}
                      name="number"
                      label="Number"
                      placeholder="Enter your Phone"
                      value={item.number}
                      onChange={onHandleNumber(item.id)}
                      id={item.id}
                    />
                    <div
                      style={{
                        paddingTop: 10,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <div>
                        {inputField.length - 1 === Index  && (
                          <Button variant="contained" onClick={onHandleClick}>
                            Add More
                          </Button>
                        )}
                      </div>

                      <div style={{ marginLeft: 10 }}>
                        {inputField.length!== 1 && (
                          <Button
                            variant="contained"
                            onClick={() => onHandleRemove(item.id)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  </Grid>
                </>
              );
            })}

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
