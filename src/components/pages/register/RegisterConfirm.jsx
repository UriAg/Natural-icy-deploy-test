import { ThemeProvider } from "@emotion/react";
import { Typography } from '@mui/material';
import theme from "../../../temaConfig";
import axios from 'axios'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const RegisterConfirm = () => {
    const [queryStateMessage, setQueryStateMessage] = useState('Aguarde un segundo, estamos validando su cuenta')
    const [messageColor, setMessageColor] = useState('#ff903678')
    const navigate = useNavigate();
    

    useEffect(()=>{
        function getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, '\\$&');
            const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
            const results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
            }
            const htParam = getParameterByName('ht');
            const utParam = getParameterByName('ut');
                            
            let tokenCookie = localStorage.getItem('tokenCookie');
            const url = 'https://naturalicy-back-production.up.railway.app/api/sessions/confirmAccount';
            const data = {
                token: htParam,
                userToken: utParam
            };
    
            let fetchOptions = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
    
            if (tokenCookie) {
                fetchOptions.headers['Authorization'] = `Bearer ${tokenCookie}`;
            }
    
            axios.post(url, data, fetchOptions)
            .then(res => {
                setMessageColor('#126d1366')
                setQueryStateMessage('¡Cuenta validada, en breve seras redirigido al login!')
                setTimeout(() => {
                    navigate('/login')
                }, 1500);  
            })
            .catch((error) => console.log("Error:", error))
    },[])

    return (
    <div className="boxContainer">
        <div className="box">
            <ThemeProvider theme={theme}>
                <Typography variant="h2" style={{padding:'.5em', backgroundColor: messageColor, borderRadius:'.2em'}} className="subtitulo">{queryStateMessage}</Typography>
            </ThemeProvider>
        </div>
    </div>
  );
};

export default RegisterConfirm;