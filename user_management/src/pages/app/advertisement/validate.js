import * as yup from "yup";

export const validationSchema = yup.object().shape({
  businessName: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),

  businessUrl: yup
    .string()
    .min(2, "must be more then 2 characters")
    .required("Required"),

  year: yup
    .number()
    .typeError("The value must be a number")
    .integer("The value must be a number")
    .required("Required"),

  imageDescription: yup.string().typeError("Image Description").required("Required"),
  imageFile: yup.string(),
  
});
