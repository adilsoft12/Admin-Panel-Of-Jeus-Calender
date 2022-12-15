import React, { useState, useEffect } from 'react'
import { Grid, Paper, TextField, Button } from '@mui/material'
import { useFormik } from 'formik'
import { axiosInstance } from '../../../services/axiosInstance'
import { API_ENDPOINTS_ADV } from '../../../services/api_url'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import './index.css';
import { validationSchema } from './validate'
import { ContactSupportOutlined } from '@material-ui/icons'


export const AddADV = () => {
  const location = useLocation()
  const [id, setId] = useState(0)
  const [info, setInfo] = useState([])
  const [selectedImage, setSelectedImage] = useState('')
  const [isLoading, setLoading] = useState(false)
  const history = useHistory()
  
// // const testYear =  info?.year.toString();
// console.log("testYear",testYear)


  const paperStyle = {
    padding: '40px 30px 50px 25px',
    width: 900,
    margin: '20px auto',
    align: 'center',
  }

  const headerStyle = { margin: 0 }

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
      `http://zewscalender-001-site1.btempurl.com/api/Advertisement/Get-Advertisement-By-Id?Id=${data}`,
    )
    setInfo(result.data)
    console.log('userResponse for edit', result.data)
  }

  async function makePostRequest(queryObj) {
    
    setLoading(true)
    console.log("ListofData",queryObj )

    try {
      const data = {
        id: Number(id || 0),
        businessName: queryObj?.businessName,
        imageFile: queryObj?.imageFile,
        imageDescription: queryObj?.imageDescription,
        businessUrl: queryObj?.businessUrl,
        imagePath: queryObj?.imagePath,
        year:Number(queryObj?.year),
      }

      if (id) {
        const response = await axiosInstance.put(
          `${API_ENDPOINTS_ADV.edit_adv}`,
          data,
        )

         if(response.data.message === "Advertisement Updated"){
          setLoading(false)
          history.push('/advertisement')
         }
     
      } else {
        const response = await axiosInstance.post(
          API_ENDPOINTS_ADV.add_adv,
          data,
        )
        if (response.data.message === "AdvertisementAddedSuccesfully") {
          setLoading(false)
          history.push('/advertisement')
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const formik = useFormik({
    initialValues: {
      businessName: '',
      imageFile: '',
      imageDescription: '',
      businessUrl: '',
      imagePath: '',
      year: '',
    },
    validationSchema : validationSchema,
    onSubmit: (values) => {
      
      console.log('first', formik.errors)
      const queryObj = {
        businessName: values.businessName,
        imageFile: values.imageFile,
        imageDescription: values.imageDescription,
        businessUrl: values.businessUrl,
        imagePath: "https://base64.guru/converter/encode/image",
        year: values.year,
      
      }
      makePostRequest(queryObj)
      console.log("value of the year----->",values.year)
    },
  })
  // console.log("value of the year----->",values.year)
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
      setFieldValue('businessName', info.businessName)
      setFieldValue('imageFile', info.imageFile)
      setFieldValue('imageDescription', info.imageDescription)
      setFieldValue('businessUrl', info.businessUrl)
      setFieldValue('imagePath', info.imagePath)
      setFieldValue('year', info.year)
      // console.log("info----->",info.year)
    }
  }, [info])

  console.log("values>>>",values)


  
  const getBase64 = (file, cb) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      cb(reader.result)
    }
    reader.onerror = function (error) {
      console.log('Error: ', error)
    }
  }

  const handleImage = (event) => {
    console.log("eventList", event)
    getBase64(event.currentTarget.files[0], (result) => {
      setFieldValue('imageFile', result.split(',')[1])
      console.log("checklist",result)
      setSelectedImage(result)
    })
  }
 
  // console.log("value of the year----->",values.year)
  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Grid align="center" sx={{ mt:3}}>
          <h2 style={headerStyle}>{id ? "Update" : "Add New"} Advertisement</h2>
        </Grid>
      
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            sx={{ mt:3}}
            id="businessName"
            name=" businessName"
            label=" business Name"
            placeholder="Enter your  business Name"
            value={values.businessName}
            onChange={handleChange('businessName')}
            error={touched.businessName && Boolean(errors.businessName)}
            helperText={touched.businessName && errors.businessName}
          />
          <TextField
            fullWidth
            sx={{mt:3}}
            id="businessUrl"
            name=" businessUrl"
            label=" businessUrl"
            placeholder="Enter your  businessUrl"
            value={values.businessUrl}
            onChange={handleChange('businessUrl')}
            error={touched.businessUrl && Boolean(errors.businessUrl)}
            helperText={touched.businessUrl && errors.businessUrl}
          />
          <div style={{ margin: '35px 0' }}>

            <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={handleImage}
            />    <div style={{ margin: '5px 0' }}>
              <label for="fileUpload" class="file-upload btn btn-primary btn-block rounded-pill shadow"><i class="fa fa-upload mr-2"></i>
              </label>
            </div>
            {
              selectedImage &&
              <div style={{}}>
                <img src={selectedImage} style={{ height: 250, width: 250 }} />
              </div>
            }
          </div>
         
          <TextField
            fullWidth
            sx={{mt:3}}
            id=" imageDescription"
            name="imageDescription"
            label="image Description"
            placeholder="Enter your image Description"
            value={values.imageDescription}
            onChange={handleChange('imageDescription')}
          />
    
          <TextField
            fullWidth
            sx={{mt:3}}
            id="year"
            name="year"
            label="year"
            placeholder="Enter year"
            value={values.year}
            onChange={handleChange('year')}
          />
    
          <Button
           sx={{mt:3}}
            type="submit"
            variant="contained"
            color="primary"
            align="center"
          >
            {isLoading ? <CircularProgress style={{ color: '#fff' }} size={25} /> : "Save"}
          </Button>
          <Button
            sx={{ml:1,mt:3}}
            type="submit"
            variant="contained"
            color="primary"
            align="center"
            onClick={() => history.push('/advertisement')}
          >
            Go Back
          </Button>
        </form>
      </Paper>
    </Grid>
  )
}