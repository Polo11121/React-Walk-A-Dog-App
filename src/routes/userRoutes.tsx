import { Route } from "react-router-dom";
import { Header } from "../Components/Header/Header";
import { ChangePassword } from "../Pages/ChangePassword/ChangePassword";
import { DogProfile } from "../Pages/DogProfile/DogProfile";
import { DogProfiles } from "../Pages/DogProfiles/DogProfiles";
import { DogRecommendations } from "../Pages/DogRecommendations/DogRecommendations";
import { EditDogRecommendations } from "../Pages/DogRecommendations/EditDogRecommendations/EditDogRecommendations";
import { NewPassword } from "../Pages/ForgotPassword/NewPassword/NewPassword";
import { ManageDogProfile } from "../Pages/ManageDogProfile/ManageDogProfile";
import { EditUserProfile } from "../Pages/UserProfile/EditUserProfile/EditUserProfile";
import { UserProfile } from "../Pages/UserProfile/UserProfile";
import { v4 as uuid } from "uuid";

export const userRoutes = (userId: string) => [
  <Route key={uuid()} path="/user-profile/:id" element={<UserProfile />} />,
  <Route key={uuid()} path="/dog-profiles" element={<DogProfiles />} />,
  <Route key={uuid()} path="/dog-profile/:id" element={<DogProfile />} />,
  <Route
    key={uuid()}
    path="/dog-recommendations/:id"
    element={<DogRecommendations />}
  />,
  <Route
    key={uuid()}
    path="/edit-dog-recommendations/:id"
    element={<EditDogRecommendations />}
  />,
  <Route
    key={uuid()}
    path="/edit-dog-contraindications/:id"
    element={<EditDogRecommendations />}
  />,
  <Route key={uuid()} path="/add-dog" element={<ManageDogProfile />} />,
  <Route key={uuid()} path="/edit-dog/:id" element={<ManageDogProfile />} />,
  <Route
    key={uuid()}
    path="/edit-user-profile/:id"
    element={<EditUserProfile />}
  />,
  <Route key={uuid()} path="/change-password" element={<ChangePassword />} />,
  <Route
    key={uuid()}
    path="/new-password"
    element={
      <>
        <Header />
        <NewPassword />
      </>
    }
  />,
];
