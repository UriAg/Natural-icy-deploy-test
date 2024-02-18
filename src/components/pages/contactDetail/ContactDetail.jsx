import { useState } from "react";
import { FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";
import natural from "../../../assets/natural.png"
import lineCart from "../../../assets/lineCart.png"
import { Icon } from '@iconify/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from "react-toastify";


const ContactDetail = () => {


    const [isHomeDelivery, setIsHomeDelivery] = useState(true);


    const formik = useFormik({
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
        validationSchema: Yup.object({
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
            apartment: Yup.string()
                .matches(/^[a-zA-Z0-9\s]+$/, 'Solo se permiten letras y números'),
            zip_code: Yup.string()
                .required('*Campo requerido')
                .matches(/^[0-9]+$/, 'Solo se permiten números')
                .length(4, 'Debe contener 4 números'),
        }),
        onSubmit: values => {
            handleBuy(values);
        },
    });

    const navigate = useNavigate();

    const handleBuy = () => {
        const isHomeDeliverySelected = isHomeDelivery;
        if (
            (isHomeDeliverySelected && formik.isValid) ||
            (!isHomeDeliverySelected && (formik.values.name && formik.values.last_name && formik.values.email && formik.values.phone))
        ) {
            let order = {
                ...formik.values,
            };
            localStorage.setItem("order", JSON.stringify(order));
            navigate("/checkout");
        } else {
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
    };





    return (
        <div className="contactDetail">
            <ThemeProvider theme={theme}>
                <ToastContainer/>
                <div className="contactContainer">
                    <img src={natural} alt="Nombre del emprendimiento: Natural" className="contactImg" style={{marginBottom:'.5em'}}/>
                    <Typography className="subtitulo" variant="h2">Compra más rápido y lleva el control de tus pedidos, ¡en un solo lugar!</Typography>
                    <div className="contactStatus">
                        <Typography variant="h4" style={{ color: "#164439" }} className="titleContactStatus">Productos</Typography>
                        <img src={lineCart} className="contactLine" alt="Linea recta" />
                        <Typography variant="titulo" sx={{ fontSize: "0.875rem" }} className="titleContactStatus" >Detalle de entrega</Typography>
                        <img src={lineCart} className="contactLine" alt="Linea recta" />
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

                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    helperText={formik.touched.name && formik.errors.name ? formik.errors.name : ''} />

                            </div>
                            <div style={{ marginBottom: "1.25rem" }} className="textContainer">
                                <Typography variant="h4Custom">Apellido:</Typography>
                                <TextField
                                    name="last_name"
                                    className="textField"

                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.last_name}
                                    helperText={formik.touched.last_name && formik.errors.last_name ? formik.errors.last_name : ''} />
                            </div>
                            <div style={{ marginBottom: "0.625rem" }} className="textContainer" >
                                <Typography variant="h4Custom">Email:</Typography>
                                <TextField
                                    name="email"
                                    placeholder="Ejem:Tunombre@gmail.com"
                                    className="textField"

                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ''} />
                            </div>
                            <div style={{ marginBottom: "1.25rem", display:'flex', flexDirection:'row' }} className="textContainer" >
                                <div className="area_code-container">
                                    <Typography variant="h4Custom">Código de área:</Typography>
                                    <TextField
                                    name="area_code"
                                    className="textField"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.area_code}
                                    helperText={formik.touched.area_code && formik.errors.area_code ? formik.errors.area_code : ''} />
                                </div>

                                <div className="phone_number-container">
                                    <Typography variant="h4Custom">Teléfono:</Typography>
                                    <TextField
                                        name="phone"
                                        className="textField"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.phone}
                                        helperText={formik.touched.phone && formik.errors.phone ? formik.errors.phone : ''} />
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

                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.street_name}
                                    helperText={formik.touched.street_name && formik.errors.street_name ? formik.errors.street_name : ''} />
                            </div>
                            <div style={{ marginBottom: "1.25rem" }} className="textContainer" >
                                <Typography variant="h4Custom">Número de casa:</Typography>
                                <TextField
                                    name="street_number"
                                    className="textField"

                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.street_number}
                                    helperText={formik.touched.street_number && formik.errors.street_number ? formik.errors.street_number : ''} />
                            </div>
                            <div style={{ marginBottom: "1.25rem" }} className="textContainer" >
                                <Typography variant="h4Custom">Departamento (opcional):</Typography>
                                <TextField
                                    name="apartment"
                                    className="textField"

                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.apartment}
                                    helperText={formik.touched.apartment && formik.errors.apartment ? formik.errors.apartment : ''} />
                            </div>
                            <div style={{ marginBottom: "1.25rem" }} className="textContainer" >
                                <Typography variant="h4Custom">Código postal:</Typography>
                                <TextField
                                    name="zip_code"
                                    className="textField"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.zip_code}
                                    helperText={formik.touched.zip_code && formik.errors.zip_code ? formik.errors.zip_code : ''} />
                            </div>
                            <div style={{ marginBottom: "1.25rem" }} className="textContainer" >
                                <Typography variant="h4Custom">Observaciones (opcional):</Typography>
                                <TextField
                                    name="aditional_info"
                                    className="textField"

                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.aditional_info}
                                    helperText={formik.touched.aditional_info && formik.errors.aditional_info ? formik.errors.aditional_info : ''} />
                            </div>
                        </div>

                        

                    </div>

                    <div className="optionsContainer">
                        <Link to="/cart" className="linksOptions">
                            <Typography variant="stock" style={{ color: '#164439'}}><Icon icon="grommet-icons:next" transform="rotate(180)"/>Seguir comprando</Typography> 
                        </Link>
                        <Typography variant="stock" onClick={handleBuy} className="linksOptions-btn" style={{ color: '#164439' }}>Siguiente paso <Icon icon="grommet-icons:next"/></Typography>

                    </div>
                </div>
            </ThemeProvider>
        </div>
    );
};

export default ContactDetail;