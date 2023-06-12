import * as yup from "yup";
export const validationSchema = yup.object().shape({
  productName: yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    // website1: yup.string().min(2, "must be more then 2 characters").required("website1 cannot be blank"),
    // website2: yup.string().required("This field is required"),
    // website3:yup.string().required("This field is required"),
    address: yup.string().required("This field is required"),
    // mobileNo: yup.number().required("This field is required"),
    // phone: yup.number().required("This field is required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
 
  });


