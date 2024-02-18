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
      password: "",
      confirmPassword: "",
    },
  
    onSubmit: async (values) => {
      // Esquema de validación directamente en onSubmit
      const validationSchema = Yup.object({
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

        function getParams() {
            const params = new URLSearchParams(window.location.search);
            return {
              token: params.get('token'),
              email: params.get('email'),
            };
        }
          
        const { token, email } = getParams();
        
        // Verificar si se proporcionaron ambos parámetros
        if (!token || !email) {
            toast.error("No se encontraron los parametros necesarios", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        return;
        }
        
        const userData = {
          password: result.password,
          repeatedPassword: result.confirmPassword,
          token,
          email
        };

        let fetchOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (userTokenAccess) {
            fetchOptions.headers['Authorization'] = `Bearer ${userTokenAccess}`;
        }

    
        axios.post('https://naturalicy-back-production.up.railway.app/api/sessions/changePassword', userData, fetchOptions)
        .then(res=>{
            setTimeout(() => {
                navigate('/login')
            }, 2500);  
            toast.success("¡Se modificó la contraseña de tu cuenta!", {
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
          <Typography variant="h2" className="subtitulo">¡Rellena los campos para obtener tu nueva contraseña!</Typography>
          <form onSubmit={handleSubmit}>
            <div>
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
                    <Typography variant="h4">Modificar contraseña</Typography>
                  </Button>
                </div>
                <div className="textContainerRow">
                  <Typography variant="h5" onClick={() => navigate("/shop")} sx={{ textTransform: "none", cursor: "pointer", color: "#164439", fontWeight: "500" }}>Regresar</Typography>
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