import React, { useState, useEffect } from 'react'
import { Grid, Paper, TextField, Button } from '@mui/material'
import { useFormik } from 'formik'
import { axiosInstance } from '../../../services/axiosInstance'
import { API_ENDPOINTS_ADV, API_ENDPOINTS_Files } from '../../../services/api_url'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import * as Yup from 'yup'


export const AddPdf = () => {
  const location = useLocation()
  const [id, setId] = useState(0)
  const [info, setInfo] = useState([])
  const [isLoading, setLoading] = useState(false)
  const history = useHistory()
  const date = new Date();

  const SignupSchema = Yup.object().shape({
    noOfPages: Yup.number().required('Required'),
    fileName: Yup.string().required('Please  upload only pdf file'),
    fileDescription: Yup.string().required('file  Descriptions Required'),
    year: Yup.string().required('Please Enter Year')
  });

  const paperStyle = {
    padding: '40px 30px 50px 25px',
    width: 900,
    margin: '20px auto',
    align: 'center',
  }

  const headerStyle = { margin: 0 }

  async function makePostRequest(queryObj) {
    setLoading(true)
    try {
      const data = {
        id: Number(id || 0),
        noOfPages: parseInt(queryObj?.noOfPages),
        fileName: queryObj.fileName,
        filePath: queryObj?.fileupload || "",
        fileDescription: queryObj?.fileDescription,
        year: queryObj?.year,
      }

      if (id) {
        const response = await axiosInstance.put(
          `${API_ENDPOINTS_Files.update_file}`,
          data,
        )

        if (response.data.message === "File Updated") {
          setLoading(false)
          history.push('/AddPdf')
        }

      } else {
        const response = await axiosInstance.post(`${API_ENDPOINTS_Files.upload_file}`, data)
        if (response.data.message === "Files Uploaded Successfully") {
          setLoading(false)
          history.push('/')
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const formik = useFormik({

    initialValues: {
      noOfPages: '',
      fileName: '',
      fileupload: '',
      fileDescription: '',
      year: '',
    },
    validationSchema: SignupSchema ,
    onSubmit: (values) => {

      const queryObj = {
        noOfPages: values.noOfPages,
        fileName: values.fileName,
        fileupload: values.fileupload,
        fileDescription: values.fileDescription,
        year: values.year,
      }
      makePostRequest(queryObj)
    },
  })


  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    values,
    errors,
    touched,
  } = formik

  useEffect(() => {
    if (info) {
      setFieldValue('noOfPages', info.noOfPages)
      setFieldValue('fileName', info.fileName)
      setFieldValue('fileupload', info.fileupload)
      setFieldValue('fileDescription', info.fileDescription)
      setFieldValue(' year', info.year)
    }
  }, [info])

  const getBase64 = (file, cb) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      cb(reader.result)
    }
    reader.onerror = function (error) {
    }
  }


  const onHandleUpload = (event) => {
    getBase64(event.currentTarget.files[0], (result) => {
      setFieldValue('fileName', result.split(',')[1])
      // // setSelectedImage(result)
    })
  }
  
  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Grid align="center">
        <h2 style={headerStyle}>{id ? "Update" : "Add New"} PDF</h2>
        </Grid>
        <br />
        <br />
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="noOfPages"
            name=" noOfPages"
            label="Number of Pages"
            placeholder="Number of Pages"
            value={values.noOfPages}
            onChange={handleChange('noOfPages')}
            error={touched.businessName && Boolean(errors.noOfPages)}
            helperText={touched.businessName && errors.noOfPages}
          /><br /><br />
          {/* <TextField
            fullWidth
            id="fileName"
            name=" fileName"
            label=" FileName"
            placeholder="FileName"
            value={values.fileName}
            onChange={handleChange('fileName')}
            error={touched.fileName && Boolean(errors.fileName)}
            helperText={touched.fileName && errors.fileName}
          /><br /><br /> */}
          <div>
            <input
              type='file' name="fileupload"
              onChange={onHandleUpload}
            />
            <div>
              <p>PDF Upload</p>
            </div>
          </div>
          <br /><br />
          <TextField
            fullWidth
            id="fileDescription"
            name=" fileDescription"
            label=" FileDescription"
            placeholder="File Description"
            value={values.fileDescription}
            onChange={handleChange('fileDescription')}
            error={touched.fileDescription && Boolean(errors.fileDescription)}
            helperText={touched.fileDescription && errors.fileDescription}
          /><br /><br />
          <TextField
            fullWidth
            id="date"
            label="Year"
            type="date"
            defaultValue={date}
            onChange={handleChange('year')}
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* <TextField
            fullWidth
            id="year"
            name="year"
            label="year"
            placeholder="Enter year"
            value={values.year}
            onChange={handleChange('year')}
          /> */}

          <br />
          <br />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            align="center"
          >
            {isLoading ? <CircularProgress style={{ color: '#fff' }} size={25} /> : "Save"}
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            type="submit"
            variant="contained"
            color="primary"
            align="center"
            onClick={() => history.push('/')}
          >
            Go Back
          </Button>
        </form>
      </Paper>
    </Grid>
  )
}
