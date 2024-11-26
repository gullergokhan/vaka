import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Stack,
  Button,
  InputAdornment,
  IconButton,
  MenuItem,
  Alert,
} from "@mui/material";
import corporateImg from "@/public/auth/corporate-new.png";
import personalImg from "@/public/auth/personal-new.png";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Selection from "@/component/auth/Selection";
import {
  initialValuesReg,
  regiterSchema,
} from "@/component/auth/yupAndInitialValues";
import { mainColor } from "@/constants/Colors";
import API from "@/helpers/ApiBuilder";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [selectedUserRole, setSelectedUserRole] = useState("");
  const [personal, setPersonal] = useState(true);
  const [registerError, setRegisterError] = useState("");

  const router = useRouter();
  const redirectToLogin = () => {
    router.push("/login");
  };

  const handleRegister = async (values, actions) => {
    try {
      delete values["password2"];
      values["user_type"] = personal ? "personnel" : "management";
      values["user_role"] = selectedUserRole;
      const registerResponseSource = await API.post("register", values);
      const registerResponse = registerResponseSource.data;

      const accessToken = registerResponse?.access;
      if (accessToken) {
        document.cookie = `accessToken=${accessToken};`;
        router.push("/").then(() => router.reload());
      } else {
        // If accessToken is undefined, set an error message
        setRegisterError("Register failed. Please check your credentials.");
      }
    } catch (error) {
      console.log(error);
      setRegisterError("Opps. Register failed.");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        marginTop: 20,
        backgroundImage: `url(${corporateImg})`,
        backgroundSize: "cover", // Cover the entire box
        backgroundPosition: "center", // Center the image
      }}
    >
      <Grid container p={5} alignItems="center" justifyContent="center">
        <Grid item md={6} xl={6} display={{ xs: "none", sm: "block" }}>
          {personal ? (
            <Image src={personalImg} height={550} alt="" priority />
          ) : (
            <Image src={corporateImg} height={550} alt="" priority />
          )}
        </Grid>
        <Grid item xl={4} xs={12} md={6}>
          <Card sx={{ maxWidth: "100%", paddingX: "2rem" }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  borderRadius: "0px",
                  paddingBottom: "0.3rem",
                }}
              >
                <MenuItem
                  onClick={() => setPersonal(true)}
                  sx={{
                    bgcolor: personal ? mainColor : "grey.100",
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography sx={{ color: !personal ? "black" : "white" }}>
                    Bireysel
                  </Typography>
                </MenuItem>
                <MenuItem
                  textAlign="center"
                  onClick={() => setPersonal(false)}
                  sx={{
                    bgcolor: !personal ? mainColor : "grey.100",
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography sx={{ color: personal ? "black" : "white" }}>
                    Kurumsal
                  </Typography>
                </MenuItem>
              </Box>
              <Formik
                initialValues={initialValuesReg}
                // onSubmit={handleSubmit}
                validationSchema={regiterSchema}
                onSubmit={handleRegister}
              >
                {({ errors, touched }) => (
                  <Form>
                    <Field
                      as={TextField}
                      type="email"
                      variant="outlined"
                      label="E-Mail"
                      fullWidth
                      name="email"
                      margin="dense"
                      error={Boolean(errors.email) && Boolean(touched.email)}
                      helperText={Boolean(touched.email) ? errors.email : ""}
                    />
                    <Field
                      as={TextField}
                      type="text"
                      variant="outlined"
                      label="Isim"
                      fullWidth
                      name="first_name"
                      margin="dense"
                    />
                    <Field
                      as={TextField}
                      type="text"
                      variant="outlined"
                      label="Soyisim"
                      fullWidth
                      name="last_name"
                      margin="dense"
                    />
                    <Field
                      as={TextField}
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      label="Sifre"
                      fullWidth
                      name="password"
                      margin="dense"
                      error={
                        Boolean(errors.password) && Boolean(touched.password)
                      }
                      helperText={
                        Boolean(touched.password) ? errors.password : ""
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" sx={{ pr: 2 }}>
                            <IconButton
                              edge="end"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {!showPassword ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Field
                      as={TextField}
                      type={showPassword2 ? "text" : "password"}
                      variant="outlined"
                      label="Sifre 2"
                      fullWidth
                      name="password2"
                      margin="dense"
                      error={
                        Boolean(errors.password2) && Boolean(touched.password2)
                      }
                      helperText={
                        Boolean(touched.password2) ? errors.password2 : ""
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" sx={{ pr: 2 }}>
                            <IconButton
                              edge="end"
                              onClick={() => setShowPassword2(!showPassword2)}
                            >
                              {!showPassword2 ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {/* This is the selection that we render conditionaly, if user want to register his personal account he will see the proper roles, otherwise it will be the corporate */}
                    <Selection
                      personal={personal}
                      setSelectedUserRole={setSelectedUserRole}
                      selectedUserRole={selectedUserRole}
                    />
                    {registerError && (
                      <Alert severity="error" sx={{ mb: 2 }}>
                        {registerError}
                      </Alert>
                    )}
                    <Stack justifyContent="center" alignItems="center" mt={2}>
                      <Button
                        sx={{
                          border: 1,
                          borderColor: "grey.500",
                          color: "#212121",
                          width: "50%",
                          ":hover": { bgcolor: mainColor, color: "white" },
                        }}
                        type="submit"
                        size="large"
                      >
                        {" "}
                        Kayit Ol
                      </Button>
                    </Stack>
                  </Form>
                )}
              </Formik>
              <Typography
                variant="subtitle2"
                align="center"
                component="div"
                sx={{ cursor: "pointer", mt: 1, color: mainColor }}
                onClick={redirectToLogin}
              >
                {" "}
                Hesabiniz var mi?
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
