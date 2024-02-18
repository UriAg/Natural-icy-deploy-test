import { useEffect } from "react";
import { useState } from "react";
import ProductsList from "./ProductsList";
import axios from "axios";
import { RotatingTriangles } from "react-loader-spinner";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsChange(false);
    
    let fetchOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    axios.get('https://naturalicy-back-production.up.railway.app/api/products/every', fetchOptions)
    .then(res=>{
        if(res.data.products?.length > 0) {
          setProducts(res.data.products);
        }
    })
    .catch(error=>console.log(error))
  }, [isChange]);
  

  const handleClose = () => {
    setOpen(false);
  };

  if (products.length === 0) {
    return (
      <div style={{
        width: "100%",
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        }}>
        <RotatingTriangles
          visible={true}
          ariaLabel="rotating-triangels-loading"
          wrapperClass="rotating-triangels-wrapper"
          colors={['#51E5FF', '#7DE2D1', '#FF7E6B']}
          
        />
      </div>
    
    );
  }

  return (
    <div className="dashboard-global-container">
      <ProductsList products={products} setIsChange={setIsChange} />
    </div>
  );
};

export default Dashboard;

