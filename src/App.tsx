import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import useAuthContext from "hooks/context/AuthContext";
import { Routes } from "react-router-dom";
import { authRoutes } from "routes/authRoutes";
import { userRoutes } from "routes/userRoutes";
import { Footer } from "Components";
import { ToastContainer } from "react-toastify";
import { UseEditWalkLocation } from "api/useEditWalkLocation";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

function App() {
  const { userId, logoutUser, isAppLoading, activeWalk } = useAuthContext();
  const { mutate: editWalkLocation } = UseEditWalkLocation();

  useEffect(() => {
    activeWalk &&
      navigator.geolocation.getCurrentPosition(({ coords }) =>
        editWalkLocation({
          lat: coords.latitude,
          lng: coords.longitude,
          slot: +activeWalk,
        })
      );

    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(({ coords }) =>
        editWalkLocation({
          lat: coords.latitude,
          lng: coords.longitude,
          slot: +activeWalk,
        })
      );
    }, 10);

    if (!activeWalk) {
      clearInterval(interval as NodeJS.Timer);
    }
    return () => clearInterval(interval as NodeJS.Timer);
  }, [activeWalk]);

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
      <ToastContainer />
    </div>
  );
}

export default App;
