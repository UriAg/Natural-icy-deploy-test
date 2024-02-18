import { Box, Button, FormControl, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../context/AuthContext";
import natural from "../../../assets/natural.png";
import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Login = () => {
  const { handleLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const { handleSubmit, handleChange, values, errors, touched, setErrors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },    

    onSubmit: async (values) => {
      try {
        const validationSchema = Yup.object({
          email: Yup.string()
            .email("Email no válido")
            .required("Email es obligatorio"),
          password: Yup.string()
            .min(6, "La contraseña debe tener al menos 6 caracteres")
            .required("Contraseña es obligatoria"),
        })

        let userTokenAccess = localStorage.getItem('userTokenAccess');
        const result = await validationSchema.validate(values, { abortEarly: false });


        const url = 'https://naturalicy-back-production.up.railway.app/api/sessions/login';
        const data = { email: result.email, password:result.password };

        let fetchOptions = {
          headers: {
              'Content-Type': 'application/json',
          },
        };

        if (userTokenAccess) {
            fetchOptions.headers['Authorization'] = `Bearer ${userTokenAccess}`;
        }

        axios.post(url, data, fetchOptions)
        .then(res => {
          if(res.data.error){
            toast.error("Email o contraseña son incorrectos", {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            return
          }
            localStorage.setItem('userTokenAccess', res.data.generateUserTokenAccess);
            handleLogin({email:res.data.generateUserTokenAccess, rol:res.data.userRole})
            setTimeout(() => {
              navigate('/')
            }, 2500);
            toast.success("El usuario se logueó correctamente, redireccionando al inicio", {
              position: "bottom-center",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
        })
        .catch((error) => console.log("Error:", error))
      } catch (validationError) {
        console.log(JSON.stringify(validationError, null, 5))
        const newErrors = {};
        validationError.inner.forEach((error) => {
          newErrors[error.params.path] = error.message;
        });
        setErrors(newErrors);
      }
    },
  });

  return (
    <div className="boxContainer">
      <div className="box">
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <img src={natural} alt="Nombre del emprendimiento: Natural" />
          <Typography variant="h2" className="subtitulo">
            Compra más rápido y lleva el control de tus pedidos, ¡en un solo
            lugar!
          </Typography>
          <form onSubmit={handleSubmit}>
            <div>
              <div
                style={{ marginBottom: "1.25rem" }}
                className="textContainer"
              >
                <Typography variant="h4Custom">Email:</Typography>
                <TextField
                  name="email"
                  placeholder="Ejem:Tunombre@gmail.com"
                  className="textField"
                  onChange={handleChange}
                  value={values.email}
                  error={touched.email && errors.email?true:false}
                  helperText={errors.email?errors.email:''}
                />
              </div>
              <div className="textContainer" style={{marginBottom:'1.3em'}}>
                <FormControl variant="outlined" className="textField">
                  <Typography variant="h4Custom">Contraseña:</Typography>
                  <TextField
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    error={touched.password && errors.password?true:false}
                  helperText={errors.password?errors.password:''}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOff style={{ color: "#164439" }} />
                            ) : (
                              <Visibility style={{ color: "#164439" }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </div>
              
              <div className="textContainer">
                <div>
                  <Button variant="contained" type="submit" className="button">
                    <Typography variant="h4">Iniciar sesión</Typography>
                  </Button>
                </div>
                <div>
                  <div className="textContainerRow">
                    <Typography
                      variant="h5"
                      align="center"
                      sx={{ color: "#164439" }}
                    >
                      ¿No tenés una cuenta?
                    </Typography>
                    <Box m={0.1} />
                    <Typography
                      variant="h5"
                      onClick={() => navigate("/register")}
                      sx={{
                        textTransform: "none",
                        cursor: "pointer",
                        color: "#164439",
                        fontWeight: "500",
                      }}
                    >
                      Crear cuenta
                    </Typography>
                  </div>
                    <Link to="/forgot-password" style={{ textAlign:'center'}}>
                      <Typography variant="h5" onClick={() => navigate("/register")} sx={{
                        textTransform: "none",
                        cursor: "pointer",
                        color: "#164439",
                        marginTop:'.7em',
                        fontWeight: "500",
                      }}
                    >
                      ¿Olvidaste tu contraseña?
                    </Typography>
                    </Link>
                    <Link to="/shop" style={{ textAlign:'center'}}>
                      <Typography variant="h5" sx={{
                        textTransform: "none",
                        cursor: "pointer",
                        color: "#164439",
                        marginTop:'.7em',
                        fontWeight: "500",
                      }}
                    >
                      Volver al inicio
                    </Typography>
                    </Link>
                </div>
              </div>
            </div>
          </form>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Login;
