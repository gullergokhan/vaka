
import * as yup from "yup";

export const initialValues = { email: "", password: "" };

export const initialValuesReg = {
    email: "",
    password: "",
    password2: "",
  };

export const validationSchema = yup.object().shape({
    email: yup.string().email("Gecersiz E-Mail").required("E-Mail zorunludur"),
    password: yup
      .string()
      .min(8, "Sifre en az 8 karakter olmalidir")
      .max(12, "Sifre en fazla 12 karakter olmalidir")
      .matches(/\d/, "Sifre en az 1 sayi icermelidir")
      .matches(/[a-z]/, "Sifre en az bir kücük harf icermelidir")
      .matches(/[A-Z]/, "Sifre en az bir büyük harf icermelidir")
      .matches(
        /[!, ?, @, #, $, %, ^, &, *, (, ), -, _, +, =]/,
        "Sifre en az bir özel karakter icermelidir"
      )
      .required("Sifre zorunludur"),
  });

export const regiterSchema = yup.object().shape({
    email: yup.string().email("Gecersiz E-Mail").required("E-Mail zorunludur"),
    password: yup
      .string()
      .min(8, "Sifre en az 8 karakter olmalidir")
      .max(12, "Sifre en fazla 12 karakter olmalidir")
      .matches(/\d+/, "Sifre en az 1 sayi icermelidir")
      .matches(
        /[a-z]+/,
        "Sifre en az bir kücük harf icermelidir"
      )
      .matches(
        /[A-Z]+/,
        "Sifre en az bir büyük harf icermelidir"
      )
      .matches(
        /[!,?{}<>%#+-.]+/,
        "Sifre en az bir özel karakter icermelidir"
      )
      .required("Sifre zorunludur"),
    password2: yup
      .string()
      .min(8, "Sifre en az 8 karakter olmalidir")
      .max(12, "Sifre en fazla 12 karakter olmalidir")
      .matches(/\d+/, "Sifre en az 1 sayi icermelidir")
      .matches(
        /[a-z]+/,
        "Sifre en az bir kücük harf icermelidir"
      )
      .matches(
        /[A-Z]+/,
        "Sifre en az bir büyük harf icermelidir"
      )
      .matches(
        /[!,?{}<>%#+-.]+/,
        "Sifre en az bir özel karakter icermelidir"
      )
      .required("Sifre zorunludur"),
  });