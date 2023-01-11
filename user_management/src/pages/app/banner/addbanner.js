import React, { useState, useEffect } from "react";
import { Grid, Paper, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { axiosInstance } from "../../../services/axiosInstance";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import * as Yup from "yup";

export const AddBanner = () => {
  const location = useLocation();
  const [id, setId] = useState(0);
  const [info, setInfo] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const history = useHistory();

  const AddBannerValidation = Yup.object().shape({
    bannerPublishedYear: Yup.number().required("Required"),
    bannerImage: Yup.string().required("Required"),
  });

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
      `http://jewcalendar-001-site1.btempurl.com/api/Banner/GetBy-Id?Id=${data}`
    );
    setInfo(result.data);
    console.log("userResponse for edit", result.data);
  };

  console.log("id------>", id);
  const paperStyle = {
    padding: "40px 30px 50px 25px",
    width: 750,
    margin: "20px auto",
    align: "center",
  };

  async function makePostRequest(queryObj) {
    setLoading(true);
    try {
      const data = {
        id: Number(id || 0),
        bannerImage: queryObj?.bannerImage,
        bannerImageURL: queryObj?.bannerImageURL || "",
        bannerPublishedYear: queryObj?.bannerPublishedYear,
      };
      if (id) {
        const response = await axiosInstance.post(
          `http://jewcalendar-001-site1.btempurl.com/api/Banner/edit`,
          data
        );
        if (response.data.message === "Banner Updated") {
          setLoading(false);
          history.push("/banner");
        }
      } else {
        const response = await axiosInstance.post(
          `http://jewcalendar-001-site1.btempurl.com/api/Banner/Add-Banner`,
          data
        );
        if (response.data.message === "BannerAddedSuccesfully") {
          setLoading(false);
          history.push("/banner");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      bannerImage: "",
      bannerImageURL: "",
      bannerPublishedYear: "",
    },
    validationSchema: AddBannerValidation,
    onSubmit: (values) => {
      const queryObj = {
        bannerImage: values.bannerImage,
        bannerImageURL: values.bannerImageURL,
        bannerPublishedYear: values.bannerPublishedYear,
      };
      makePostRequest(queryObj);
    },
  });

  const { handleChange, handleSubmit, setFieldValue, values, errors, touched } =
    formik;

  useEffect(() => {
    if (info) {
      setFieldValue("bannerPublishedYear", info.bannerPublishedYear);
      setFieldValue("filePDF", info.filePDF);
      setFieldValue("bannerImage", info.bannerImage);
    }
  }, [info]);

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {};
  };

  const onHandleUpload = (event) => {
    getBase64(event.currentTarget.files[0], (result) => {
      setFieldValue("bannerImage", result.split(",")[1]);
      setSelectedImage(result);
    });
  };

  const BaseImageURL = "http://jewcalendar-001-site1.btempurl.com/";
  const showBanner = Boolean(info.bannerImage);

  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Grid align="center" sx={{ mt: 3 }}>
          <h2>{id ? "Update" : "Add  "} Cover </h2>
        </Grid>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="eventName"
            name=" eventName"
            label="Banner Publish Year"
            placeholder="Banner Publish Year"
            value={values.bannerPublishedYear}
            onChange={handleChange("bannerPublishedYear")}
            error={
              touched.bannerPublishedYear && Boolean(errors.bannerPublishedYear)
            }
            helperText={
              Boolean(errors.bannerPublishedYear) && errors.bannerPublishedYear
            }
          />

          <div style={{ margin: "35px 0" }}>
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={onHandleUpload}
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
              showBanner && (
                <div style={{}}>
                  <img
                    src={`${BaseImageURL}/${info.bannerImage}`}
                    style={{ height: 250, width: 250 }}
                  />
                </div>
              )
            )}
            {!selectedImage && errors.imageFile && (
              <p style={{ fontSize: 12 }}>Required</p>
            )}
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            align="center"
            sx={{ mt: 3 }}
          >
            {isLoading ? (
              <CircularProgress style={{ color: "#fff" }} size={25} />
            ) : (
              "Save"
            )}
          </Button>
          <Button
            sx={{ marginLeft: 3, mt: 3 }}
            type="submit"
            variant="contained"
            color="primary"
            align="center"
            onClick={() => history.push("/banner")}
          >
            Go Back
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};
