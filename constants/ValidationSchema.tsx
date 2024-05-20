import * as yup from "yup";
import { REQUIRED, VALIDATE } from "./validation";

export const loginFormSchema = yup.object({
  email: yup.string().email(VALIDATE.EMAIL).required(REQUIRED.EMAIL),
  password: yup.string().required(REQUIRED.PASSWORD),
});

export const signUpFormSchema = yup.object({
  email: yup.string().email(VALIDATE.EMAIL).required(REQUIRED.EMAIL),
  password: yup.string().required(REQUIRED.PASSWORD),
});

export const createProductFormSchema = yup.object({
  productname: yup.string().required(REQUIRED.PRODUCTNAME),
  count: yup
    .number()
    .typeError("Count must be a number")
    .required(REQUIRED.COUNT),
});
