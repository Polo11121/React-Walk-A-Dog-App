import { Routes } from "react-router-dom";
import { authRoutes } from "./routes/authRoutes";
import { userRoutes } from "./routes/userRoutes";
import { Footer } from "./Components/Footer/Footer";
import useAuthContext from "./hooks/AuthContext";
import "./App.scss";

function App() {
  const { userId, logoutUser } = useAuthContext();

  return (
    <div className="App">
      <Routes>{!userId ? authRoutes() : userRoutes(userId)}</Routes>
      {userId && <Footer logoutUser={logoutUser} />}
    </div>
  );
}

export default App;
