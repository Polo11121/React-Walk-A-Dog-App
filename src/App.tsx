import CircularProgress from "@mui/material/CircularProgress";
import useAuthContext from "hooks/context/AuthContext";
import { Routes } from "react-router-dom";
import { authRoutes } from "routes/authRoutes";
import { userRoutes } from "routes/userRoutes";
import { Footer } from "Components";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

function App() {
  const { userId, logoutUser, isAppLoading } = useAuthContext();

  if (isAppLoading) {
    return (
      <div className="App App--spinner">
        <CircularProgress color="success" />
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>{!userId ? authRoutes() : userRoutes(userId)}</Routes>
      {userId && <Footer logoutUser={logoutUser} />}
      <ToastContainer
        toastStyle={{ backgroundColor: "#8fe388", color: "black" }}
      />
    </div>
  );
}

export default App;
