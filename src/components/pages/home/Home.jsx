import { useNavigate } from "react-router";
import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";


const Home = () => {
  return (
    <div style={{ marginTop: "5rem", marginBottom: "5rem" }}>
      <ThemeProvider theme={theme}>
        <h1>Este es el home</h1>
      </ThemeProvider>
    </div>
  );
};

export default Home;
