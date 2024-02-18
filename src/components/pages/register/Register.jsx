import { Box, Button, FormControl, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import natural from "../../../assets/natural.png"
import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'


const Register = () => {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { handleSubmit, handleChange, values, errors, touched, setErrors } = useFormik({
    initialValues: {
      name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  
    onSubmit: async (values) => {
      // Esquema de validación directamente en onSubmit
      const validationSchema = Yup.object({
        name: Yup.string()
          .required('Nombre es obligatorio')
          .matches(/^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s']+$/, 'No debe contener números, símbolos o esatr vacío el campo'),
        last_name: Yup.string()
          .required('Apellido es obligatorio')
          .matches(/^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s']+$/, 'No debe contener números, símbolos o esatr vacío el campo'),
        email: Yup.string()
          .email('Email no válido')
          .required('Email es obligatorio'),
        password: Yup.string()
          .min(6, 'La contraseña debe tener al menos 6 caracteres')
          .required('Contraseña es obligatoria'),
        confirmPassword: Yup.string()
          .required('Confirmar contraseña es obligatorio')
          .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir"),
      });
  
      try {
        let userTokenAccess = localStorage.getItem('userTokenAccess');
        const result = await validationSchema.validate(values, { abortEarly: false });
        
        const userData = {
          name: result.name,
          last_name: result.last_name,
          email: result.email,
          role: 'USER',
          password: result.password,
          repeatedPassword: result.password
        };

        let fetchOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (userTokenAccess) {
            fetchOptions.headers['Authorization'] = `Bearer ${userTokenAccess}`;
        }

        axios.post('https://naturalicy-back-production.up.railway.app/api/sessions/register', userData, fetchOptions)
        .then(res=>{
          toast.success("¡Se envío un mail de validación al correo especificado!", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch(error=>console.log(error))
      
      } catch (validationError) {
        const newErrors = {};
        validationError.inner.forEach((error) => {
          newErrors[error.params.path] = error.message;
        });
        setErrors(newErrors);
      }
    },
  });
  

  const handleClickShowPassword = () => setShowPassword(!showPassword);


  return (
    <div className="boxContainer">
      <div className="box">
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <img src={natural} alt="Nombre del emprendimiento: Natural" />
          <Typography variant="h2" className="subtitulo">Compra más rápido y lleva el control de tus pedidos, ¡en un solo lugar!</Typography>
          <form onSubmit={handleSubmit}>
            <div>
              <div style={{ marginBottom: "1.25rem" }} className="textContainer" >
                <Typography variant="h4Custom">Nombre:</Typography>
                <TextField 
                name="name"
                className="textField"
                onChange={handleChange}
              
                value={values.name}
                error={touched.email && errors.email?true:false}
                helperText={errors.name?errors.name:''} />
              </div>
              <div style={{ marginBottom: "1.25rem" }} className="textContainer" >
                <Typography variant="h4Custom">Apellido:</Typography>
                <TextField
                name="last_name"
                className="textField"
                onChange={handleChange}
                
                value={values.last_name}
                error={touched.last_name && errors.last_name?true:false}
                helperText={errors.last_name?errors.last_name:''} />
              </div>
              <div style={{ marginBottom: "0.625rem" }} className="textContainer" >
                <Typography variant="h4Custom">Email:</Typography>
                <TextField
                name="email"
                placeholder="Ejem:Tunombre@gmail.com"
                className="textField"
                onChange={handleChange}
                
                value={values.email}
                error={touched.email && errors.email?true:false}
                helperText={errors.email?errors.email:''} />
              </div>
              <div className="textContainer">
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
                <FormControl variant="outlined" className="textField">
                  <Typography variant="h4Custom">Confirmar contraseña</Typography>
                  <TextField sx={{ marginBottom: "1.25rem" }}
                    id="outlined-adornment-repeated-password"
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    onChange={handleChange}
                    
                    value={values.confirmPassword}
                    error={touched.confirmPassword && errors.confirmPassword?true:false}
                    helperText={errors.confirmPassword?errors.confirmPassword:''}
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
              <div>
                <div>
                  <Button variant="contained" type="submit" className="button">
                    <Typography variant="h4">Crear cuenta</Typography>
                  </Button>
                </div>
                <div className="textContainerRow">
                  <Typography variant="h5" align="center" sx={{ color: "#164439" }}>¿Ya tenés una cuenta?</Typography>
                  <Box m={0.1} />
                  <Typography variant="h5" onClick={() => navigate("/login")} sx={{ textTransform: "none", cursor: "pointer", color: "#164439", fontWeight: "500" }}>Iniciá sesión</Typography>
                </div>
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
          </form>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Register;