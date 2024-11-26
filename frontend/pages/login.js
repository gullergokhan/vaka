import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Box, Card, CardContent, Grid, TextField, Typography, Stack, Button, InputAdornment, IconButton, Alert
} from "@mui/material";
import Image from 'next/image';
import { Field, Form, Formik } from "formik";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useRouter } from 'next/router';
import loginImg from "@/public/auth/login_image.png";
import { initialValues } from "@/component/auth/yupAndInitialValues";
import { mainColor } from "@/constants/Colors";
import AppContext from "@/AppContext";
import API from '@/helpers/ApiBuilder';

export const Login = () => {
  const { userInfo, setUserInfo } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const router = useRouter();

  const emailInputRef = useRef(null); // Create a ref for the email input

  useEffect(() => {
    // Focus on the email input field when the component is mounted
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const handleLogin = async (values, actions) => {
    try {
      const loginResponseSource = await API.post('login', values);
      const loginResponse = loginResponseSource.data;

      const accessToken = loginResponse?.access;
      if (accessToken) {
        document.cookie = `accessToken=${accessToken};`;
        router.push('/');
      } else {
        // If accessToken is undefined, set an error message
        setLoginError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setLoginError('Login failed. Please check your credentials.');
    }
    actions.setSubmitting(false);
  };

  const redirectToRegister = () => {
    router.push("/register");
  };

  return (
    <Box sx={{ width: "100%", height: "100.5vh", marginTop: 10 }}>
      <Grid container p={5} alignItems="center" justifyContent="center">
        <Grid item md={6} xl={6} display={{ xs: "none", sm: "block" }}>
          <Image src={loginImg} height={550} />
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
          <Card sx={{ maxWidth: "100%", padding: "2rem" }}>
            <CardContent>
              <Formik
                initialValues={initialValues}
                onSubmit={handleLogin}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form noValidate>
                    <Field
                      as={TextField}
                      type="email"
                      variant="outlined"
                      label="E-Mail"
                      name="email"
                      fullWidth
                      margin="dense"
                      error={Boolean(errors.email) && Boolean(touched.email)}
                      helperText={Boolean(touched.email) && errors.email}
                    />
                    <Field
                      as={TextField}
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      label="Sifre"
                      name="password"
                      fullWidth
                      margin="dense"
                      error={Boolean(errors.password) && Boolean(touched.password)}
                      helperText={Boolean(touched.password) && errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" sx={{ pr: 2 }}>
                            <IconButton
                              edge="end"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {errors.general && (
                      <Typography color="error" variant="body2">
                        {errors.general}
                      </Typography>
                    )}
                    {loginError && (
                      <Alert severity="error" sx={{ mb: 2 }}>
                      {loginError}
                      </Alert>
                    )}
                    <Stack justifyContent="center" alignItems="center" mt={2}>
                      <Button
                        sx={{ border: 1, borderColor: "grey.500", color: "#212121", width: "50%", ':hover': { bgcolor: mainColor } }}
                        type="submit"
                        size="large"
                        disabled={isSubmitting}
                      >
                        Giris Yap
                      </Button>
                    </Stack>
                  </Form>
                )}
              </Formik>
              <Typography
                variant="subtitle2"
                align="center"
                component="div"
                onClick={redirectToRegister}
                sx={{ cursor: "pointer", mt: 1, color: mainColor }}
              >
                Hesabiniz yok mu?
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
