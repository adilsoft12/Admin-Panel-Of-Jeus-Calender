import React, { useState, useEffect } from "react";
import { Grid, Paper, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { axiosInstance } from "../../../services/axiosInstance";
import {

  API_ENDPOINTS_Event,
} from "../../../services/api_url";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import * as Yup from "yup";

export const AddEvent = () => {
  const location = useLocation();
  const [id, setId] = useState(0);
  const [info, setInfo] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const tempArray = location.pathname?.split('/')
    console.log('tempArray')
    setId(tempArray?.[2])

    if (tempArray?.[2]) {
      console.log('api')
      fetchDetails(tempArray?.[2])
    }
  }, [])
  const fetchDetails = async (data) => {
    const result = await axios.get(
      `http://zewscalender-001-site1.btempurl.com/api/ReligiousEvent/GetBy-Id?Id=${data}`,
    )
    setInfo(result.data)
    console.log('userResponse for edit', result.data)
  }

 
console.log("id------>", id);
  const paperStyle = {
    padding: "40px 30px 50px 25px",
    width: 750,
    margin: "20px auto",
    align: "center",
  };

  // const headerStyle = { margin: 0 };
  

  async function makePostRequest(queryObj) {
  //  console.log("queryObjqueryObj",queryObj)

    setLoading(true);
    try {
      const data = {
        id: Number(id || 0),
        eventName: queryObj?.eventName,
        filePDF: queryObj?.filePDF || "",
        fileURL: queryObj?.fileURL,
      
      };
     
      console.log("DataShow>>>", data)
      if (id) {
        const response = await axiosInstance.post(
          `${API_ENDPOINTS_Event.update_file}`,
          data
        );
        console.log("response---->",response)
        if (response.data.message === "ReligiousEvent Updated") {
          setLoading(false);
          history.push("/event");
        }

      } else {
        const response = await axiosInstance.post(
          `${API_ENDPOINTS_Event.upload_file}`,
          data
        );
      // console.log("response.data.message",response.data.message)
        if (response.data.message === "ReligiousEvent Added") {
          setLoading(false);
          history.push("/event");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  const formik = useFormik({
    initialValues: {
        eventName: "",
        filePDF: "",
        fileURL: "",
    
    },
    // validationSchema: SignupSchema,
    onSubmit: (values) => {
      // console.log("VAlueData", values);
      const queryObj = {
        eventName: values.  eventName,
        filePDF: values. filePDF,
        fileURL: values. fileURL,
     
      };
      // console.log(">>>Data",queryObj)
      makePostRequest(queryObj);
    },
  });

  const { handleChange, handleSubmit, setFieldValue, values, errors, touched } =
    formik;

  useEffect(() => {
    if (info) {
      setFieldValue("eventName", info.eventName);
      setFieldValue("filePDF", info.filePDF);
      setFieldValue("fileURL", info.fileURL);

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
      setFieldValue("filePDF", result.split(",")[1]);
      // // setSelectedImage(result)
    });
  };

  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Grid align="center" sx={{mt:3}}>
          <h2 >{id ? "Update" : "Add New"}Event</h2>
        </Grid>
       
        <form onSubmit={handleSubmit}>
          <TextField
            
            fullWidth
            sx={{mt:3}}
            id="eventName"
            name=" eventName"
            label="Event Name"
            placeholder="Event Name"
            value={values.eventName}
            onChange={handleChange("eventName")}
            error={touched.eventName && Boolean(errors.eventName)}
            helperText={touched.eventName && errors.eventName}
          />
         
      
          <div style={{marginTop:"20px"}}>
            <input type="file" name="filePDF" onChange={onHandleUpload} />
            <div>
              <p>PDF Upload</p>
            </div>
          </div>
         
          {/* <TextField
            fullWidth
            sx={{mt:3}}
            id="fileURL"
            name=" fileURL"
            label=" FILE URL"
            placeholder="FILE URL"
            value={values.fileURL}
            onChange={handleChange("fileURL")}
            error={touched.fileURL && Boolean(errors.fileURL)}
            helperText={touched.fileURL && errors.fileURL}
          /> */}
        
        
          <Button
            type="submit"
            variant="contained"
            color="primary"
            align="center"
            sx={{mt:3}}
          >
            {isLoading ? (
              <CircularProgress style={{ color: "#fff" }} size={25} />
            ) : (
              "Save"
            )}
          </Button>
          <Button
            sx = {{ marginLeft: 3 , mt: 3}}
            type="submit"
            variant="contained"
            color="primary"
            align="center"
            onClick={() => history.push("/event")}
          >
            Go Back
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};
