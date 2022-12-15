import * as yup from "yup";

export const validationSchema = yup.object().shape({
    businessName: yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required("This field is required"),
 
    businessUrl: yup.string()
    .min(2, "must be more then 2 characters")
    .required('This field is required'),

    year: yup.number()
    .typeError('The value must be a number')
    .integer('The value must be a number')
    .required('This field is required'),

    imageDescription: yup.string().required('This field is required'),

  });