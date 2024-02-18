import { Button, TextField, Typography } from "@mui/material";
import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import natural from "../../../assets/natural.png"
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ForgotPassword = () => {
  const navigate = useNavigate();


  const { handleSubmit, handleChange, values, errors, touched, setErrors } = useFormik({
    initialValues: {
      email: "",
    },

    onSubmit: async (values) => {
      try {
        const validationSchema = Yup.object({
          email: Yup.string()
            .email('Email no válido')
            .required('Email es obligatorio'),
        })

        let userTokenAccess = localStorage.getItem('userTokenAccess');
        const result = await validationSchema.validate(values, { abortEarly: false });

        const url = 'https://naturalicy-back-production.up.railway.app/api/sessions/forgotPassword';
        const data = { email: result.email };

        let fetchOptions = {
          headers: {
              'Content-Type': 'application/json',
          },
        };

        if (userTokenAccess) {
            fetchOptions.headers['Authorization'] = `Bearer ${userTokenAccess}`;
        }

        axios.post(url, data, fetchOptions)
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
        console.log(validationError)
        const newErrors = {};
        validationError.inner.forEach((error) => {
          newErrors[error.params.path] = error.message;
        });
        setErrors(newErrors);
      }
    }

  });

  return (
    <div className="boxContainer">
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <div className="box">
          <img src={natural} alt="Nombre del emprendimiento: Natural" />
          <Typography variant="h2" className="subtitulo">¿Olvidaste tu contraseña?</Typography>
          <form onSubmit={handleSubmit}>
            <div>
              <div style={{ marginBottom: "1.25rem" }} className="textContainer" >
                <Typography variant="h4Custom">Email:</Typography>
                <TextField name="email" placeholder="Ejem:Tunombre@gmail.com" className="textField" onChange={handleChange} value={values.email} error={touched.email && errors.email?true:false} helperText={errors.email?errors.email:''} />
              </div>
              <div className="textContainer">
                <Button variant="contained" type="submit" className="button">
                  <Typography variant="h4">Recuperar</Typography>
                </Button>
              </div>
              <div className="textContainerRow">
                <Typography variant="h5" onClick={() => navigate("/login")} sx={{ textTransform: "none", cursor: "pointer", color: "#164439", fontWeight: "500" }}>Regresar</Typography>
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
          </form>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default ForgotPassword;