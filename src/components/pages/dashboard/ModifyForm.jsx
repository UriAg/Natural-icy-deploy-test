import 'react-confirm-alert/src/react-confirm-alert.css';
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const ModifyForm = ({
  handleClose,
  setIsChange,
  productSelected,
  setProductSelected,
}) => {
  const [newProduct, setNewProduct] = useState({
    title: productSelected?.title,
    description: productSelected?.description,
    price: parseFloat(productSelected?.price),
    stock: parseInt(productSelected?.stock, 10),
    category: productSelected?.category,
    labels: productSelected?.labels,
    image: productSelected?.thumbnail[0],
    // image1: "",
    // image2: "",
    // image3: "",
  });
  
  const navigate = useNavigate()
  const [file, setFile] = useState(null);
  // const [file1, setFile1] = useState(null);
  // const [file2, setFile2] = useState(null);
  // const [file3, setFile3] = useState(null);
  const [selectedImage, setSelectedImage] = useState(productSelected?.thumbnail[0] || "");
  // const [selectedImage1, setSelectedImage1] = useState(productSelected?.image1 || "");
  // const [selectedImage2, setSelectedImage2] = useState(productSelected?.image2 || "");
  // const [selectedImage3, setSelectedImage3] = useState(productSelected?.image3 || "");
  // const [isUploadButtonVisible, setIsUploadButtonVisible] = useState(true);
  // const [isUploadButtonVisible1, setIsUploadButtonVisible1] = useState(true);
  // const [isUploadButtonVisible2, setIsUploadButtonVisible2] = useState(true);
  // const [isUploadButtonVisible3, setIsUploadButtonVisible3] = useState(true);


  const { handleSubmit, handleChange, values, errors, touched, setErrors } = useFormik({
    initialValues: {
      title: productSelected?.title,
      description: productSelected?.description,
      stock: productSelected?.stock,
      price: productSelected?.price,
      code: productSelected?.code,
      category: productSelected?.category,
      labels: productSelected?.labels.join(', '),
      thumbnail: undefined
    },    

    onSubmit: async (values) => {
      try {
        const validationSchema = Yup.object({
          title: Yup.string()
            .required("Titulo es obligatorio"),
          description: Yup.string()
            .required("Descripción es obligatorio"),
          stock: Yup.number()
            .required("Stock es obligatorio"),
          price: Yup.number()
            .required("Precio es obligatorio"),
          code: Yup.string()
            .min(6, "El codigo debe tener al menos 6 caracteres")
            .required("Código es obligatorio"),
          category: Yup.string()
            .required("Categoría es obligatorio"),
          labels: Yup.string()
            .required("Etiquetas es obligatorio"),
        })
        const result = await validationSchema.validate(values, { abortEarly: false });
        
        let thumbnail = document.querySelector('#thumbnail-input').files;
        const formData = new FormData();
        formData.append('title', result.title);
        formData.append('description', result.description);
        formData.append('stock', parseInt(result.stock, 10));
        formData.append('price', parseFloat(result.price));
        formData.append('code', result.code);
        formData.append('category', result.category);
        formData.append('labels', result.labels.split(',').map(item => item.trim()));

        for (const image of thumbnail) {
          formData.append('thumbnail', image);
        }
        
        console.log(productSelected)
        let url;
        productSelected
        ? url = `https://naturalicy-back-production.up.railway.app/api/products/${productSelected._id}`
        : url = `https://naturalicy-back-production.up.railway.app/api/products`;

        console.log(url)
        let fetchOptions = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };

        let userTokenAccess = localStorage.getItem('userTokenAccess');
        if (userTokenAccess) {
          fetchOptions.headers['Authorization'] = `Bearer ${userTokenAccess}`;
        }

        if(productSelected){

          axios.put(url, formData, fetchOptions)
          .then(res => {
            setTimeout(() => {
              window.location.reload()  
            }, 2000);
            toast.success("Producto modificado, redireccionando", {
              position: "bottom-center",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })
          .catch((error) => console.log("Error:", error))

        }else{

          axios.post(url, formData, fetchOptions)
          .then(res => {
            if(res.data.error){
              toast.error(`Ya hay otro producto con el código "${values.code}" proporcionado`, {
                position: "bottom-center",
                hideProgressBar: false,
                autoClose: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              return
            }else{
              setTimeout(() => {
                window.location.reload()  
              }, 2000);
              toast.success("Producto creado, redireccionando", {
                position: "bottom-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
            console.log(res)
          })
          .catch((error) => console.log("Error:", error))

        }
      } catch (validationError) {
        const newErrors = {};
        validationError.inner.forEach((error) => {
          newErrors[error.params.path] = error.message;
        });
        setErrors(newErrors);
      }
    },
  });

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
        >
        <TextField
          variant="outlined"
          label="Titulo"
          name="title"
          required={true}
          onChange={handleChange}
          value={values.title}
          error={touched.title && errors.title?true:false}
          helperText={errors.title?errors.title:''}
        />
        <TextField
          variant="outlined"
          label="Descripción"
          name="description"
          required={true}
          onChange={handleChange}
          value={values.description}
          error={touched.description && errors.description?true:false}
          helperText={errors.description?errors.description:''}
        />
        <TextField
          variant="outlined"
          label="Precio"
          name="price"
          required={true}
          onChange={handleChange}
          value={values.price}
          error={touched.price && errors.price?true:false}
          helperText={errors.price?errors.price:''}
        />
        <TextField
          variant="outlined"
          label="Stock"
          name="stock"
          required={true}
          onChange={handleChange}
          value={values.stock}
          error={touched.stock && errors.stock?true:false}
          helperText={errors.stock?errors.stock:''}
        />
        <TextField
          variant="outlined"
          label="Categoria"
          name="category"
          required={true}
          onChange={handleChange}
          value={values.category}
          error={touched.category && errors.category?true:false}
          helperText={errors.category?errors.category:''}
        />
        <TextField
          variant="outlined"
          label="Código"
          name="code"
          required={true}
          onChange={handleChange}
          value={values.code}
          error={touched.code && errors.code?true:false}
          helperText={errors.code?errors.code:''}
        />
        <TextField
          variant="outlined"
          label="Etiquetas"
          name="labels"
          required={true}
          onChange={handleChange}
          value={values.labels}
          error={touched.labels && errors.labels?true:false}
          helperText={errors.labels?errors.labels:''}
        />
        {selectedImage && (
          <div style={{display:'flex', alignItems:'center'}}>
            <span style={{paddingRight:'.5em', fontSize:'1.2em', fontFamily:'Lato'}}>Imagen actual del producto: </span>
            <img src={`https://naturalicy-back-production.up.railway.app/${selectedImage}`} alt="Imagen Seleccionada" onClick={()=>window.open(`https://naturalicy-back-production.up.railway.app/${selectedImage}`)} style={{ maxWidth: "6.25rem", cursor:'pointer' }} />
          </div>
        )}
        {productSelected ? (
          <TextField
            type="file"
            name="thumbnail"
            id="thumbnail-input"
          />
        )
        : (
          <TextField
            type="file"
            required={true}
            name="thumbnail"
            id="thumbnail-input"
          />
        )}
        {/* {selectedImage && (
          <div style={{display:'flex', alignItems:'center'}}>
            <img src={`https://naturalicy-back-production.up.railway.app/${selectedImage}`} alt="Imagen Seleccionada" onClick={()=>window.open(`https://naturalicy-back-production.up.railway.app/${selectedImage}`)} style={{ maxWidth: "6.25rem", cursor:'pointer' }} />
            <Button onClick={() => setSelectedImage("")}>Eliminar Imagen</Button>
          </div>
        )} */}
        {productSelected
        ?<Button variant="contained" type="submit">Guardar</Button>
        :<Button variant="contained" type="submit">Publicar</Button>
        }
        <Button onClick={() => handleClose()}>Cancelar operación</Button>
        
        {/* {isUploadButtonVisible && file && (
          <Button onClick={handleImage} type="button">
            Cargar imagen
          </Button>
        )}
        {!selectedImage1 && (
          <TextField type="file" onChange={(e) => setFile1(e.target.files[0])} />
        )}
        {selectedImage1 && (
          <div>
            <img src={selectedImage1} alt="Imagen Seleccionada" style={{ maxWidth: "6.25rem" }} />
            <Button onClick={() => setSelectedImage1("")}>Eliminar Imagen</Button>
            <Button variant="contained" type="submit">
              {productSelected ? "modificar" : "crear"}
            </Button>
          </div>
        )}
        {isUploadButtonVisible1 && file1 && (
          <Button onClick={handleImage1} type="button">
            Cargar imagen
          </Button>
        )}
        {!selectedImage2 && (
          <TextField type="file" onChange={(e) => setFile2(e.target.files[0])} />
        )}
        {selectedImage2 && (
          <div>
            <img src={selectedImage2} alt="Imagen Seleccionada" style={{ maxWidth: "6.25rem" }} />
            <Button onClick={() => setSelectedImage2("")}>Eliminar Imagen</Button>
            <Button variant="contained" type="submit">
              {productSelected ? "modificar" : "crear"}
            </Button>
          </div>
        )}
        {isUploadButtonVisible2 && file2 && (
          <Button onClick={handleImage2} type="button">
            Cargar imagen
          </Button>
        )}
        {!selectedImage3 && (
          <TextField type="file" onChange={(e) => setFile3(e.target.files[0])} />
        )}
        {selectedImage3 && (
          <div>
            <img src={selectedImage3} alt="Imagen Seleccionada" style={{ maxWidth: "6.25rem" }} />
            <Button onClick={() => setSelectedImage3("")}>Eliminar Imagen</Button>
            <Button variant="contained" type="submit">
              {productSelected ? "modificar" : "crear"}
            </Button>
          </div>
        )}
        {isUploadButtonVisible3 && file3 && (
          <Button onClick={handleImage3} type="button">
            Cargar imagen
          </Button>
        )} */}
      </form>
    </div>
  )
};

export default ModifyForm;