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
    navigator.geolocation.watchPosition(
      ({ coords }) => {
        activeWalk &&
          editWalkLocation({
            lat: coords.latitude,
            lng: coords.longitude,
            slot: +activeWalk,
          });
      },
      () => {},
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
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
