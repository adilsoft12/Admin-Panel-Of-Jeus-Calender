import React, { useState, useEffect } from "react";
import { Grid, Paper, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { axiosInstance } from "../../../services/axiosInstance";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import * as Yup from "yup";
import { API_ENDPOINTS_UpcomingEvent } from "../../../services/api_url";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment from "moment";
import axios from "axios";
import dayjs from "dayjs";

export const AddUpcomingEvent = () => {
  const location = useLocation();
  const [id, setId] = useState(0);
  const [info, setInfo] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  const [selectedImage, setSelectedImage] = useState("");
  const [value, setValue] = React.useState(dayjs(id ? info.startTime : "2023-01-01T21:11:54"));

  // const [date, setDate] = useState(new Date());
  // useEffect(() => {
  //   setDate(moment().add(1, "h").format(" YYYY-MM-DDTHH:mm:ss"));
  // }, []);

  const finalValue = new Date(value?.$d).toISOString();

  const handleChangeDate = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const tempArray = location.pathname?.split("/");
    setId(tempArray?.[2]);

    if (tempArray?.[2]) {
      fetchDetails(tempArray?.[2]);
    }
  }, []);

  const fetchDetails = async (data) => {
    const result = await axios.get(
      `http://jewcalendar-001-site1.btempurl.com/api/UpcomingEvent/GetBy-Id?Id=${data}`
    );
    setInfo(result.data);
    console.log("userResponseforedit", result.data);
  };

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
        startTime: finalValue,
        eventTypePersian: queryObj?.eventTypePersian,
        eventTypeEnglish: queryObj?.eventTypeEnglish,
        eventNamePersian: queryObj?.eventNamePersian,
        eventNameEnglish: queryObj?.eventTypeEnglish,
        address: queryObj?.address,
        phoneNumber: Number(queryObj?.phoneNumber),
        email: queryObj?.email,
        website: queryObj?.website,
        ticketPrice: Number(queryObj?.ticketPrice),
        oraniserName: queryObj?.oraniserName,
        flyer: queryObj?.flyer,
        flyerPath: queryObj?.flyerPath,
        eventDescription: queryObj?.eventDescription,
        ticketWebsiteUrl: queryObj?.ticketWebsiteUrl,
      };

      if (id) {
        const response = await axiosInstance.post(
          `${API_ENDPOINTS_UpcomingEvent.Edit_Upcoming_Event}`,
          data
        );

        if (response.data.message === "UpcomingEvent Updated") {
          setLoading(false);
          history.push("/upcomingevent");
        }
      } else {
        const response = await axiosInstance.post(
          `${API_ENDPOINTS_UpcomingEvent.Add_Upcoming_Event}`,
          data
        );
        console.log("listData>>",response)
        if (response.data.message === "UpcomingEvent Added") {
          setLoading(false);
          history.push("/upcomingevent");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      startTime: "",
      eventTypePersian: "",
      eventTypeEnglish: "",
      eventNamePersian: "",
      eventNameEnglish: "",
      address: "",
      phoneNumber: "",
      email: "",
      website: "",
      ticketPrice: "",
      oraniserName: "",
      flyer: "",
      flyerPath: "",
      eventDescription: "",
      ticketWebsiteUrl: "",
    },

    // validationSchema: SignupSchema,
    onSubmit: (values) => {
      console.log("VAlueData", values);
      const queryObj = {
        eventTypePersian: values.eventTypePersian,
        eventTypeEnglish: values.eventTypeEnglish,
        eventNamePersian: values.eventNamePersian,
        eventNameEnglish: values.eventNameEnglish,
        address: values.address,
        phoneNumber: values.phoneNumber,
        email: values.email,
        website: values.website,
        ticketPrice: values.ticketPrice,
        oraniserName: values.oraniserName,
        flyer: values.flyer,
        flyerPath: "",
        eventDescription: values.eventDescription,
        ticketWebsiteUrl: values.ticketWebsiteUrl,
      };
      console.log("DataShowList", queryObj);
      makePostRequest(queryObj);
    },
  });

  const { handleChange, handleSubmit, setFieldValue, values, errors, touched } =
    formik;

  useEffect(() => {
    if (info) {
      setFieldValue("startTime", info.startTime);
      setFieldValue("eventTypePersian", info.eventTypePersian);
      setFieldValue("eventTypeEnglish", info.eventTypeEnglish);
      setFieldValue("eventNamePersian", info.eventNamePersian);
      setFieldValue("eventNameEnglish", info.eventNameEnglish);
      setFieldValue("address", info.address);
      setFieldValue("phoneNumber", info.phoneNumber);
      setFieldValue("email", info.email);
      setFieldValue("website", info.website);
      setFieldValue("ticketPrice", info.ticketPrice);
      setFieldValue("oraniserName", info.oraniserName);
      setFieldValue("flyer", info.flyer);
      setFieldValue("flyerPath", info.flyerPath);
      setFieldValue("eventDescription", info.eventDescription);
      setFieldValue("ticketWebsiteUrl", info.ticketWebsiteUrl);
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

  const handleImage = (event) => {
    console.log("UpcomingEvent", event);
    getBase64(event.currentTarget.files[0], (result) => {
      setFieldValue("flyer", result.split(",")[1]);
      setSelectedImage(result);
    });
  };

  console.log("listValueShow", values);

  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Grid align="center" sx={{ mt: 3 }}>
          <h2>{id ? "Update" : "Add New"}Upcoming Event</h2>
        </Grid>

        <form onSubmit={handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Date&Time picker"
              onChange={handleChangeDate}
              value={value}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          {/* <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="startTime"
            name="startTime"
            label="startTime"
            placeholder="Enter Time"
            value={values.startTime}
            onChange={handleChange("startTime")}
          /> */}
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
            {selectedImage && (
              <div style={{}}>
                <img src={selectedImage} style={{ height: 250, width: 250 }} />
              </div>
            )}
          </div>
          <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="eventTypePersian"
            name=" eventTypePersian"
            label=" eventTypePersian"
            placeholder="eventTypePersian"
            value={values.eventTypePersian}
            onChange={handleChange("eventTypePersian")}
            error={touched.eventTypePersian && Boolean(errors.eventTypePersian)}
            helperText={touched.eventTypePersian && errors.eventTypePersian}
          />
          <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="eventTypeEnglish"
            name=" eventTypeEnglish"
            label=" eventTypeEnglish"
            placeholder="eventTypeEnglish"
            value={values.eventTypeEnglish}
            onChange={handleChange("eventTypeEnglish")}
            error={touched.eventTypeEnglish && Boolean(errors.eventTypeEnglish)}
            helperText={touched.eventTypeEnglish && errors.eventTypeEnglish}
          />{" "}
          <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="eventNamePersian"
            name=" eventNamePersian"
            label=" eventNamePersian"
            placeholder="eventNamePersian"
            value={values.eventNamePersian}
            onChange={handleChange("eventNamePersian")}
            error={touched.eventNamePersian && Boolean(errors.eventNamePersian)}
            helperText={touched.eventNamePersian && errors.eventNamePersian}
          />{" "}
          <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="eventNameEnglish"
            name=" eventNameEnglish"
            label=" eventNameEnglish"
            placeholder="eventNameEnglish"
            value={values.eventNameEnglish}
            onChange={handleChange("eventNameEnglish")}
            error={touched.eventNameEnglish && Boolean(errors.eventNameEnglish)}
            helperText={touched.eventNameEnglish && errors.eventNameEnglish}
          />{" "}
          <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="address"
            name=" address"
            label=" address"
            placeholder="address"
            value={values.address}
            onChange={handleChange("address")}
            error={touched.address && Boolean(errors.address)}
            helperText={touched.address && errors.address}
          />{" "}
          <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="phoneNumber"
            name=" phoneNumber"
            label=" phoneNumber"
            placeholder="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange("phoneNumber")}
            error={touched.phoneNumber && Boolean(errors.phoneNumber)}
            helperText={touched.phoneNumber && errors.phoneNumber}
          />{" "}
          <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="email"
            name=" email"
            label=" email"
            placeholder="email"
            value={values.email}
            onChange={handleChange("email")}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />{" "}
          <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="website"
            name=" website"
            label=" website"
            placeholder="website"
            value={values.website}
            onChange={handleChange("website")}
            error={touched.website && Boolean(errors.website)}
            helperText={touched.website && errors.website}
          />{" "}
          <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="ticketPrice"
            name=" ticketPrice"
            label=" ticketPrice"
            placeholder="ticketPrice"
            value={values.ticketPrice}
            onChange={handleChange("ticketPrice")}
            error={touched.ticketPrice && Boolean(errors.ticketPrice)}
            helperText={touched.ticketPrice && errors.ticketPrice}
          />{" "}
          <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="oraniserName"
            name=" oraniserName"
            label=" oraniserName"
            placeholder="oraniserName"
            value={values.oraniserName}
            onChange={handleChange("oraniserName")}
            error={touched.oraniserName && Boolean(errors.oraniserName)}
            helperText={touched.oraniserName && errors.oraniserName}
          />{" "}
          <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="eventDescription"
            name=" eventDescription"
            label=" eventDescription"
            placeholder="eventDescription"
            value={values.eventDescription}
            onChange={handleChange("eventDescription")}
            error={touched.eventDescription && Boolean(errors.eventDescription)}
            helperText={touched.eventDescription && errors.eventDescription}
          />{" "}
          <TextField
            fullWidth
            sx={{ mt: 3 }}
            id="ticketWebsiteUrl"
            name=" ticketWebsiteUrl"
            label=" ticketWebsiteUrl"
            placeholder="ticketWebsiteUrl"
            value={values.ticketWebsiteUrl}
            onChange={handleChange("ticketWebsiteUrl")}
            error={touched.ticketWebsiteUrl && Boolean(errors.ticketWebsiteUrl)}
            helperText={touched.ticketWebsiteUrl && errors.ticketWebsiteUrl}
          />
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
            onClick={() => history.push("/upcomingevent")}
          >
            Go Back
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};
