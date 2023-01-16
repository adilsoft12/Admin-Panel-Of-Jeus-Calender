/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { Grid,  TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { axiosInstance } from "../../../services/axiosInstance";
import { API_ENDPOINTS_ADV } from "../../../services/api_url";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { validationSchema } from "./validate";
import FormHelperText from "@mui/material/FormHelperText";
import "./index.css";

export const AddADV = () => {
  const location = useLocation();
  const [id, setId] = useState(0);
  const [info, setInfo] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  

  useEffect(() => {
    const tempArray = location.pathname?.split("/");
    console.log("tempArray");
    setId(tempArray?.[2]);

    if (tempArray?.[2]) {
      console.log("api");
      fetchDetails(tempArray?.[2]);
    }
  }, []);

  const fetchDetails = async (data) => {
    const result = await axios.get(
      `http://jewcalendar-001-site1.btempurl.com/api/Advertisement/Get-Advertisement-By-Id?Id=${data}`
    );
    setInfo(result.data);
    console.log("userResponse for edit", result.data);
  };

  async function makePostRequest(queryObj) {
    setLoading(true);
   
    try {
      const data = {
        id: Number(id || 0),
        businessName: queryObj?.businessName,
        imageFile: queryObj?.imageFile,
        imageDescription: queryObj?.imageDescription,
        businessUrl: queryObj?.businessUrl,
        imagePath: queryObj?.imagePath,
        year: Number(queryObj?.year),
      };

      if (id) {
        const response = await axiosInstance.put(
          `${API_ENDPOINTS_ADV.edit_adv}`,
          data
        );

        if (response.data.message === "Advertisement Updated") {
          setLoading(false);
          history.push("/advertisement");
        }
      } else {
        const response = await axiosInstance.post(
          API_ENDPOINTS_ADV.add_adv,
          data
        );
        if (response.data.message === "AdvertisementAddedSuccesfully") {
          setLoading(false);
          history.push("/advertisement");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      businessName: "",
      imageFile: "",
      imageDescription: "",
      businessUrl: "",
      imagePath: "",
      year: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const queryObj = {
        businessName: values.businessName,
        imageFile: values.imageFile,
        imageDescription: values.imageDescription,
        businessUrl: values.businessUrl,
        imagePath: "https://base64.guru/converter/encode/image",
        year: values.year,
      };
      makePostRequest(queryObj);
    },
  });
  
  const { handleChange, handleSubmit, setFieldValue, values, errors, touched , handleBlur} = formik;
  useEffect(() => {
    if (info) {
      setFieldValue("businessName", info.businessName);
      setFieldValue("imageFile", info.imageFile);
      setFieldValue("imageDescription", info.imageDescription);
      setFieldValue("businessUrl", info.businessUrl);
      setFieldValue("imagePath", info.imagePath);
      setFieldValue("year", info.year);
    }
  }, [info]);

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const handleImage = (event) => {
    getBase64(event.currentTarget.files[0], (result) => {
      setFieldValue("imageFile", result.split(",")[1]);
      setSelectedImage(result);
    });
  };

  console.log("infoData", info);
  console.log("LIstData>>>", { errors, touched });

 
  const BaseImageURL = "http://jewcalendar-001-site1.btempurl.com/";
  const showImagepatrh = Boolean(info.imagePath);
 

  return (
    <Grid>
      <div
        className="add-theme"
        style={{ width: "900px", marginLeft: "270px", paddingTop: "5px" }}
      >
        <Grid align="center" sx={{ mt: 3 }}>
          <h2>{id ? "Update" : "Add New"} Advertisement</h2>
        </Grid>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="businessName"
            name=" businessName"
            label=" business Name"
            placeholder="Enter your  business Name"
            value={values.businessName}
            onBlur={handleBlur}
            onChange={handleChange("businessName")}
            error={touched.businessName && Boolean(errors.businessName)}
            helperText={ Boolean(errors.businessName) && errors.businessName }
          />
        

          <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="businessUrl"
            name=" businessUrl"
            label=" businessUrl"
            onBlur={handleBlur}
            placeholder="Enter your  businessUrl"
            value={values.businessUrl}
            onChange={handleChange("businessUrl")}
            error={touched.businessUrl && Boolean(errors.businessUrl)}
            helperText={Boolean(errors.businessUrl) &&  errors.businessUrl}
          />
          <div style={{ margin: "35px 0" }}>
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={handleImage}
            />{" "}
            <div style={{ margin: "5px 0" }}>
              <label
                for="fileUpload"
                class="file-upload btn btn-primary btn-block rounded-pill shadow"
              >
                <i class="fa fa-upload mr-2"></i>
              </label>
            </div>
            {selectedImage ? (
              <div style={{}}>
                <img src={selectedImage} style={{ height: 250, width: 250 }} />
              </div>
            ) : (
              showImagepatrh && (
                <div style={{}}>
                  <img
                    src={`${BaseImageURL}/${info.imagePath}`}
                    style={{ height: 250, width: 250 }}
                  />
                </div>
              )
            )}
           
            {errors.imageFile && <p style={{ fontSize: 12 }}>Required</p>}
          </div>

          <TextField
            fullWidth
            sx={{ mt: 3 }}
            id=" imageDescription"
            name="imageDescription"
            label="image Description"
            placeholder="Enter your image Description"
            value={values.imageDescription}
            onBlur={handleBlur}
            onChange={handleChange("imageDescription")}
            error={touched.imageDescription && Boolean(errors.imageDescription)}
            helperText={
              Boolean(errors.imageDescription) && errors.imageDescription
            }
          />

          <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="year"
            name="year"
            label="year"
            placeholder="Enter year"
            onBlur={handleBlur}
            value={values.year}
            onChange={handleChange("year")}
            error={touched.year && Boolean(errors.year)}
            helperText={Boolean(errors.year) && errors.year}
          />

          <Button
            sx={{ mt: 3 }}
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
            sx={{ ml: 1, mt: 3 }}
            type="submit"
            variant="contained"
            color="primary"
            align="center"
            onClick={() => history.push("/advertisement")}
          >
            Go Back
          </Button>
        </form>
      </div>
    </Grid>
  );
};
