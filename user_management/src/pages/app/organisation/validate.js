import * as yup from "yup";
export const validationSchema = yup.object().shape({
    organizationName: yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    url: yup.string().min(2, "must be more then 2 characters").required("url cannot be blank"),
    organizationAddress: yup.string().required("This field is required"),
    contactPerson:yup.string().required("This field is required"),
    mobileNo: yup.string().required("This field is required"),
  });


