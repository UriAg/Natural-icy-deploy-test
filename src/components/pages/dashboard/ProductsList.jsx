import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";
import Box from "@mui/material/Box";
import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";
import Modal from "@mui/material/Modal";
import ModifyForm from "./ModifyForm";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ProductsList = ({ products, setIsChange }) => {
  const [open, setOpen] = useState(false);
  const [productSelected, setProductSelected] = useState(null);
  const [productsArray, setProductsArray] = useState(products);
  const navigate = useNavigate()

  useState(()=>{
    setProductsArray(products)
  }, [])

  const deleteProduct = (id, title) => {
    confirmAlert({
      title: 'Eliminación de producto',
      message: `¿Estás seguro que desea eliminar "${title}"?`,
      buttons: [
        {
          label: 'Eliminar',
          onClick: () => {
            let userTokenAccess = localStorage.getItem('userTokenAccess');


            let fetchOptions = {
              headers: {
                  'Content-Type': 'application/json',
              },
            };
    
            if (userTokenAccess) {
              fetchOptions.headers['Authorization'] = `Bearer ${userTokenAccess}`;
            }

            axios.delete(`https://naturalicy-back-production.up.railway.app/api/products/${id}`, fetchOptions)
            .then(res=>{
              setTimeout(() => {
                const updatedProducts = productsArray.filter(product => product._id !== id);
                setProductsArray(updatedProducts);
              }, 2500);
              toast.success("Se eliminó el producto exitosamente", {
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
            .catch(error=>{
              console.log(error);
            })
          },
        },
        {
          label: 'No',
          onClick: () => {
            console.log('No se eliminó el producto');
          },
        },
      ],
    });

    setIsChange(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (product) => {
    setProductSelected(product);
    setOpen(true);
  };

  const handleSearch = (value) =>{
    let searchResult = products.filter(el=>el.title.toLowerCase().includes(value.target.value.toLowerCase())
    || el.code.toLowerCase().includes(value.target.value.toLowerCase())
    || el._id.toLowerCase().includes(value.target.value.toLowerCase())
    || el.category.toLowerCase().includes(value.target.value.toLowerCase()))

    setProductsArray(searchResult)
  }

  return (
    <div className="product_list-global-container">
      <ThemeProvider theme={theme}>
        <ToastContainer/>
      <div className="add-search-container">
        <Button variant="contained" onClick={() => handleOpen(null)}>
          Agregar nuevo
        </Button>
        <TextField
          variant="outlined"
          label="Buscar: Id, titulo, código o categoría"
          name="search"
          style={{width:'30%'}}
          onChange={(e)=>handleSearch(e)}
        />
        <button type="button" className="back-button" onClick={() => navigate('/')}></button>
      </div>
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, maxWidth:'100%' }} aria-label="simple table" >
            <TableHead>
              <TableRow sx={{ ...theme.typography.h2Custom }} >
                <TableCell align="left" sx={{  ...theme.typography.h2Custom }}>Id</TableCell>
                <TableCell align="left" sx={{  ...theme.typography.h2Custom }}>Código</TableCell>
                <TableCell align="left" sx={{ ...theme.typography.h2Custom }}>Titulo</TableCell>
                <TableCell align="left" sx={{ ...theme.typography.h2Custom }}>Descripción</TableCell>
                <TableCell align="left" sx={{ ...theme.typography.h2Custom, width: "100px" }}>Precio</TableCell>
                <TableCell align="left" sx={{ ...theme.typography.h2Custom }}>Stock</TableCell>
                <TableCell align="left" sx={{ ...theme.typography.h2Custom }}>Imagen principal</TableCell>
                {/* <TableCell align="left" sx={{ ...theme.typography.h2Custom }}>Imagen 1</TableCell>
                <TableCell align="left" sx={{ ...theme.typography.h2Custom }}>Imagen 2</TableCell>
                <TableCell align="left" sx={{ ...theme.typography.h2Custom }}>Imagen 3</TableCell> */}
                <TableCell align="left" sx={{ ...theme.typography.h2Custom }}>Categoria</TableCell>
                <TableCell align="left" sx={{ ...theme.typography.h2Custom }}>Etiquetas</TableCell>
                <TableCell align="left" sx={{ ...theme.typography.h2Custom }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsArray?.map((product) => (
              <TableRow key={product._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }} >
                <TableCell component="th" scope="row" align="left"> {product._id} </TableCell>
                <TableCell component="th" scope="row" align="left"> {product.code} </TableCell>
                <TableCell component="th" scope="row" align="left" style={{whiteSpace:'nowrap'}}> {product.title} </TableCell>
                <TableCell component="th" scope="row" align="left" style={{maxWidth:'20em', whiteSpace:'nowrap', textOverflow:'ellipsis', overflowX:'hidden'}}> {product.description} </TableCell>
                <TableCell component="th" scope="row" align="left"> {product.price.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })} </TableCell>
                <TableCell component="th" scope="row" align="left"> {product.stock} u. </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <img src={`https://naturalicy-back-production.up.railway.app/${product.thumbnail[0]}`} onClick={()=>navigate(`/itemDetail/${product._id}`)} alt="Product image" style={{ width: "7em", height:"5em", cursor:'pointer' }}/>
                </TableCell>
                {/* <TableCell component="th" scope="row" align="left">
                  <img
                    src={`https://naturalicy-back-production.up.railway.app/${product.thumbnail[1]}`}
                    alt=""
                    style={{ width: "80px", height: "80px" }}
                  />
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <img
                    src={`https://naturalicy-back-production.up.railway.app/${product.thumbnail[2]}`}
                    alt=""
                    style={{ width: "80px", height: "80px" }}
                  />
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <img
                    src={`https://naturalicy-back-production.up.railway.app/${product.thumbnail[3]}`}
                    alt=""
                    style={{ width: "80px", height: "80px" }}
                  />
                </TableCell> */}
                <TableCell component="th" scope="row" align="left"> {product.category} </TableCell>
                <TableCell component="th" scope="row" align="left"> {product.labels.join(', ')} </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <IconButton onClick={() => handleOpen(product)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => deleteProduct(product._id, product.title)}>
                    <DeleteForeverIcon color="primary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style} style={{overflowY:'auto', height:'100%', width:'100%'}}>
          <ModifyForm handleClose={handleClose} setIsChange={setIsChange} productSelected={productSelected} setProductSelected={setProductSelected}/>
        </Box>
      </Modal>

      </ThemeProvider>
    </div>
  );
};

export default ProductsList;

