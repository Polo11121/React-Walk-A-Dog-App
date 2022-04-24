import { Routes } from "react-router-dom";
import { useUserAuthentication } from "./hooks/useUserAuthentication";
import { authRoutes } from "./routes/authRoutes";
import { userRoutes } from "./routes/userRoutes";
import { Footer } from "./Components/Footer/Footer";
import "./App.scss";

function App() {
  const { userInfo, loginUser, logoutUser } = useUserAuthentication();

  return (
    <div className="App">
      <Routes>
        {!userInfo ? authRoutes(loginUser) : userRoutes(userInfo.userId)}
      </Routes>
      {userInfo && <Footer logoutUser={logoutUser} />}
    </div>
  );
}

export default App;
