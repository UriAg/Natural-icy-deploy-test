import { Box, List, ListItem, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { menuItemsAdmin } from "../../../router/navigationAdmin";

function NavListResponsive({setDrawerOpen}) {
    const { logoutContext, user } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {

        let userTokenAccess = localStorage.getItem('userTokenAccess');

        let fetchOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (userTokenAccess) {
            fetchOptions.headers['Authorization'] = `Bearer ${userTokenAccess}`;
        }

        axios.get('https://naturalicy-back-production.up.railway.app/api/sessions/logout', fetchOptions)
        .then(res => {
            logoutContext();
            // setListOpen(false);
            navigate("/");
        })
        .catch((error) => console.log("Error:", error))
    };

    const rolAdmin = import.meta.env.VITE_ROL_ADMIN;

    return (
        <Box sx={{}}>
            <nav>
                {menuItemsAdmin.map(({ id, path, title }) => (
                    <ListItem key={id}>
                        <Link to={path} onClick={() => setDrawerOpen(false)}>
                            <Typography variant="drawer" className="hoverVerdeClaro">{title}</Typography>
                        </Link>
                    </ListItem>
                ))}
                {user && user.email && user.rol !== rolAdmin ? (
                    <List >
                        <ListItem onClick={() => setDrawerOpen(false)}>
                            <Link component={Link} to={"/favorites"}>
                                <Typography variant="drawer" className="hoverVerdeClaro">Favoritos</Typography>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link onClick={handleLogout}>
                                <Typography variant="drawer" className="hoverVerdeClaro">Cerrar sesión</Typography>
                            </Link>
                        </ListItem>
                    </List>
                ) : user && user.rol === rolAdmin ? (
                    <List>
                            <ListItem onClick={() => setDrawerOpen(false)}>
                            <Link component={Link} to={"/dashboard"}>
                                    <Typography variant="drawer" className="hoverVerdeClaro">Dashboard</Typography>
                            </Link>
                        </ListItem>
                            <ListItem onClick={() => setDrawerOpen(false)}>
                            <Link component={Link} to={"/favorites"}>
                                    <Typography variant="drawer" className="hoverVerdeClaro">Favoritos</Typography>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link onClick={handleLogout}>
                                    <Typography variant="drawer" className="hoverVerdeClaro">Cerrar sesión</Typography>
                            </Link>
                        </ListItem>
                    </List>
                ) : (
                    <List >
                                <ListItem onClick={() => setDrawerOpen(false)}>
                            <Link component={Link} to={"/Login"} >
                                        <Typography variant="drawer" className="hoverVerdeClaro">Iniciar sesión</Typography>
                            </Link>
                        </ListItem>
                    </List>
                )}
            </nav>
        </Box>

    );

}

export default NavListResponsive;