import { useState } from "react";
import { FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";
import { Icon } from '@iconify/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from "react-toastify";


const ContactDetail = () => {

    const [isHomeDelivery, setIsHomeDelivery] = useState(true);
    const navigate = useNavigate();

    const { handleSubmit,handleBlur, handleChange, values, errors, touched, setErrors } = useFormik({
        initialValues: {
            name: "",
            last_name: "",
            email: "",
            area_code: "",
            phone: "",
            street_name: "",
            street_number: "",
            apartment: "",
            zip_code: "",
            aditional_info: "",
        },
        onSubmit: async (values) => {
            const isHomeDeliverySelected = isHomeDelivery;
        
            try{
                if(isHomeDeliverySelected){
                    const validationSchema = Yup.object({
                        name: Yup.string()
                            .required('*Campo requerido')
                            .matches(/^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s']+$/, 'No debe contener números, símbolos'),
                        last_name: Yup.string()
                            .required('*Campo requerido')
                            .matches(/^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s']+$/, 'No debe contener números, símbolos'),
                        email: Yup.string()
                            .email('Email no válido')
                            .required('*Campo requerido'),
                        area_code: Yup.string()
                            .required('*Campo requerido')
                            .matches(/^[0-9]+$/, 'Solo se permiten números')
                            .max(4, 'Debe contener máximo 4 números'),
                        phone: Yup.string()
                            .required('*Campo requerido')
                            .matches(/^[0-9]+$/, 'Solo se permiten números')
                            .max(10, 'Debe contener máximo 10 números'),
                        street_name: Yup.string()
                            .required('*Campo requerido')
                            .matches(/^[a-zA-Z0-9\s]+$/, 'Solo se permiten letras y números'),
                        street_number: Yup.string()
                            .required('*Campo requerido')
                            .matches(/^[0-9]+$/, 'Solo se permiten números'),
                        zip_code: Yup.string()
                            .required('*Campo requerido')
                            .matches(/^[0-9]+$/, 'Solo se permiten números')
                            .length(4, 'Debe contener 4 números'),
                    })

                    const result = await validationSchema.validate(values, { abortEarly: false });
     
                    let order = {
                        ...result,
                    };
                    localStorage.setItem("order", JSON.stringify(order));
                    navigate("/checkout");
                }else{
                    const validationSchema = Yup.object({
                        name: Yup.string()
                            .required('*Campo requerido')
                            .matches(/^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s']+$/, 'No debe contener números, símbolos'),
                        last_name: Yup.string()
                            .required('*Campo requerido')
                            .matches(/^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s']+$/, 'No debe contener números, símbolos'),
                        email: Yup.string()
                            .email('Email no válido')
                            .required('*Campo requerido'),
                        area_code: Yup.string()
                            .required('*Campo requerido')
                            .matches(/^[0-9]+$/, 'Solo se permiten números')
                            .max(4, 'Debe contener máximo 4 números'),
                        phone: Yup.string()
                            .required('*Campo requerido')
                            .matches(/^[0-9]+$/, 'Solo se permiten números')
                            .max(10, 'Debe contener máximo 10 números'),
                    })

                    const result = await validationSchema.validate(values, { abortEarly: false });
                   
                    let order = {
                        ...result,
                    };
                    localStorage.setItem("order", JSON.stringify(order));
                    navigate("/checkout");
                }
            } catch (error) {
                toast.warn(`Todos los campos deben ser rellenados correctamente`, {
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    autoClose: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                return;
            }
        },
    });

    return (
        <div className="contactDetail">
            <ThemeProvider theme={theme}>
                <ToastContainer/>
                <div className="contactContainer">
                    <img src={`${import.meta.env.VITE_BASE_URL}/assets/natural.png`} alt="Nombre del emprendimiento: Natural" className="contactImg" style={{marginBottom:'.5em'}}/>
                    <Typography className="subtitulo" variant="h2">Compra más rápido y lleva el control de tus pedidos, ¡en un solo lugar!</Typography>
                    <div className="contactStatus">
                        <Typography variant="h4" style={{ color: "#164439" }} className="titleContactStatus">Productos</Typography>
                        <img src={`${import.meta.env.VITE_BASE_URL}/assets/lineCart.png`} className="contactLine" alt="Linea recta" />
                        <Typography variant="titulo" sx={{ fontSize: "0.875rem" }} className="titleContactStatus" >Detalle de entrega</Typography>
                        <img src={`${import.meta.env.VITE_BASE_URL}/assets/lineCart.png`} className="contactLine" alt="Linea recta" />
                        <Typography variant="h4" style={{ color: "#164439" }} className="titleContactStatus">Medios de pago</Typography>
                    </div>
                    <div className="contactBox">
                        <div className="infoBox">
                            <Typography variant="titulo" sx={{ fontSize: "0.875rem" }}>Información de contacto</Typography>
                            <div style={{ marginBottom: "1.25rem" }} className="textContainer">
                                <Typography variant="h4Custom">Nombre:</Typography>
                                <TextField
                                    name="name"
                                    className="textField"

                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    helperText={touched.name && errors.name ? errors.name : ''} />

                            </div>
                            <div style={{ marginBottom: "1.25rem" }} className="textContainer">
                                <Typography variant="h4Custom">Apellido:</Typography>
                                <TextField
                                    name="last_name"
                                    className="textField"

                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.last_name}
                                    helperText={touched.last_name && errors.last_name ? errors.last_name : ''} />
                            </div>
                            <div style={{ marginBottom: "0.625rem" }} className="textContainer" >
                                <Typography variant="h4Custom">Email:</Typography>
                                <TextField
                                    name="email"
                                    placeholder="Ejem:Tunombre@gmail.com"
                                    className="textField"

                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    helperText={touched.email && errors.email ? errors.email : ''} />
                            </div>
                            <div style={{ marginBottom: "1.25rem", display:'flex', flexDirection:'row' }} className="textContainer" >
                                <div className="area_code-container">
                                    <Typography variant="h4Custom">Código de área:</Typography>
                                    <TextField
                                    name="area_code"
                                    className="textField"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.area_code}
                                    helperText={touched.area_code && errors.area_code ? errors.area_code : ''} />
                                </div>

                                <div className="phone_number-container">
                                    <Typography variant="h4Custom">Teléfono:</Typography>
                                    <TextField
                                        name="phone"
                                        className="textField"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.phone}
                                        helperText={touched.phone && errors.phone ? errors.phone : ''} />
                                </div>
                            </div>
                        </div>

                        <div className="controlersBox">
                            <Typography variant="titulo" sx={{ fontSize: "0.875rem" }}>Método de envío</Typography>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={isHomeDelivery ? "homeDelivery" : "pickup"}
                                onChange={() => setIsHomeDelivery(!isHomeDelivery)} >
                                <FormControlLabel value="pickup" control={<Radio />} label="Retiro en local" />
                                <FormControlLabel value="homeDelivery" control={<Radio />} label="Envío a domicilio" />

                                <Typography style={{marginBottom:'1em', color:'#388b73', fontWeight:'bolder'}}>
                                    {isHomeDelivery
                                        ? "Nos contactaremos para informarle el precio del envío"
                                        : "Presentate en el local para retirar tu pedido"
                                    }
                                </Typography>
                            </RadioGroup>

                        </div>

                        <div className="shippingInformation infoBox" style={{ display: isHomeDelivery ? 'block' : 'none' }}>
                            <Typography variant="titulo" sx={{ fontSize: "0.875rem" }}>Datos de envío</Typography>
                            <div style={{ marginBottom: "1.25rem" }} className="textContainer" >
                                <Typography variant="h4Custom">Calle:</Typography>
                                <TextField
                                    name="street_name"
                                    className="textField"

                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.street_name}
                                    helperText={touched.street_name && errors.street_name ? errors.street_name : ''} />
                            </div>
                            <div style={{ marginBottom: "1.25rem" }} className="textContainer" >
                                <Typography variant="h4Custom">Número de casa:</Typography>
                                <TextField
                                    name="street_number"
                                    className="textField"

                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.street_number}
                                    helperText={touched.street_number && errors.street_number ? errors.street_number : ''} />
                            </div>
                            <div style={{ marginBottom: "1.25rem" }} className="textContainer" >
                                <Typography variant="h4Custom">Departamento (opcional):</Typography>
                                <TextField
                                    name="apartment"
                                    className="textField"

                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.apartment}
                                    helperText={touched.apartment && errors.apartment ? errors.apartment : ''} />
                            </div>
                            <div style={{ marginBottom: "1.25rem" }} className="textContainer" >
                                <Typography variant="h4Custom">Código postal:</Typography>
                                <TextField
                                    name="zip_code"
                                    className="textField"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.zip_code}
                                    helperText={touched.zip_code && errors.zip_code ? errors.zip_code : ''} />
                            </div>
                            <div style={{ marginBottom: "1.25rem" }} className="textContainer" >
                                <Typography variant="h4Custom">Observaciones (opcional):</Typography>
                                <TextField
                                    name="aditional_info"
                                    className="textField"

                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.aditional_info}
                                    helperText={touched.aditional_info && errors.aditional_info ? errors.aditional_info : ''} />
                            </div>
                        </div>

                        

                    </div>

                    <div className="optionsContainer">
                        <Link to="/cart" className="linksOptions">
                            <Typography variant="stock" style={{ color: '#164439'}}><Icon icon="grommet-icons:next" transform="rotate(180)"/>Seguir comprando</Typography> 
                        </Link>
                        <Typography variant="stock" onClick={handleSubmit} className="linksOptions-btn" style={{ color: '#164439' }}>Siguiente paso <Icon icon="grommet-icons:next"/></Typography>

                    </div>
                </div>
            </ThemeProvider>
        </div>
    );
};

export default ContactDetail;