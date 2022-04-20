import { Route, Routes } from "react-router-dom";
import { Main } from "./Pages/Main/Main";
import { Login } from "./Pages/Login/Login";
import { Register } from "./Pages/Register/Register";
import { Header } from "./Components/Header/Header";
import { DogProfiles } from "./Pages/DogProfiles/DogProfiles";
import { ChangePassword } from "./Pages/ChangePassword/ChangePassword";
import { DogProfile } from "./Pages/DogProfile/DogProfile";
import { ManageDogProfile } from "./Pages/ManageDogProfile/ManageDogProfile";
import { ForgotPassword } from "./Pages/ForgotPassword/ForgotPassword";
import { NewPassword } from "./Pages/ForgotPassword/NewPassword/NewPassword";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/dog-profiles" element={<DogProfiles />} />
        <Route path="/dog-profile" element={<DogProfile />} />
        <Route path="/manage-dog-profile" element={<ManageDogProfile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route
          path="/login"
          element={
            <>
              <Header hideButton />
              <Login />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Header hideButton />
              <Register />
            </>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <>
              <Header />
              <ForgotPassword />
            </>
          }
        />
        <Route
          path="/new-password"
          element={
            <>
              <Header />
              <NewPassword />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
