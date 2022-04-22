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
import { UserProfile } from "./Pages/UserProfile/UserProfile";
import { DogRecommendations } from "./Pages/DogRecommendations/DogRecommendations";
import { EditDogRecommendations } from "./Pages/DogRecommendations/EditDogRecommendations/EditDogRecommendations";
import { EditUserProfile } from "./Pages/UserProfile/EditUserProfile/EditUserProfile";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/dog-profiles" element={<DogProfiles />} />
        <Route path="/dog-profile" element={<DogProfile />} />
        <Route path="/dog-recommendations" element={<DogRecommendations />} />
        <Route
          path="/edit-dog-recommendations"
          element={<EditDogRecommendations />}
        />
        <Route
          path="/edit-dog-contraindications"
          element={<EditDogRecommendations />}
        />
        <Route path="/add-dog" element={<ManageDogProfile />} />
        <Route path="/edit-dog" element={<ManageDogProfile />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/edit-user-profile" element={<EditUserProfile />} />
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
