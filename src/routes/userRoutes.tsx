import { Navigate, Route } from "react-router-dom";
import { ChangePassword } from "Pages/ChangePassword/ChangePassword";
import { DogProfile } from "Pages/DogProfile/DogProfile";
import { DogProfiles } from "Pages/DogProfiles/DogProfiles";
import { DogRecommendations } from "Pages/DogRecommendations/DogRecommendations";
import { EditDogRecommendations } from "Pages/DogRecommendations/EditDogRecommendations/EditDogRecommendations";
import { ManageDogProfile } from "Pages/ManageDogProfile/ManageDogProfile";
import { EditUserProfile } from "Pages/UserProfile/EditUserProfile/EditUserProfile";
import { UserProfile } from "Pages/UserProfile/UserProfile";
import { v4 as uuid } from "uuid";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserProfiles } from "Pages/UserProfiles/UserProfiles";
import { DogWalks } from "Pages/DogWalks/DogWalks";
import { TrainerInfo } from "Pages/TrainerInfo/TrainerInfo";

export const userRoutes = (userId: string | null) => [
  <Route key={uuid()} path="/user-profile/:id" element={<UserProfile />} />,
  <Route key={uuid()} path="/user-profiles" element={<UserProfiles />} />,
  <Route key={uuid()} path="/dog-profiles/:id" element={<DogProfiles />} />,
  <Route
    key={uuid()}
    path="/dog-profile/:id/:subId"
    element={<DogProfile />}
  />,
  <Route
    key={uuid()}
    path="/dog-recommendations/:id/:subId"
    element={<DogRecommendations />}
  />,
  <Route
    key={uuid()}
    path="/edit-dog-recommendations/:id/:subId"
    element={
      <ProtectedRoute>
        <EditDogRecommendations />
      </ProtectedRoute>
    }
  />,
  <Route
    key={uuid()}
    path="/edit-dog-contraindications/:id/:subId"
    element={<EditDogRecommendations />}
  />,
  <Route key={uuid()} path="/add-dog" element={<ManageDogProfile />} />,
  <Route
    key={uuid()}
    path="/edit-dog/:id/:subId"
    element={<ManageDogProfile />}
  />,
  <Route
    key={uuid()}
    path="/edit-user-profile/:id"
    element={
      <ProtectedRoute>
        <EditUserProfile />
      </ProtectedRoute>
    }
  />,
  <Route key={uuid()} path="/dog-walks/:id" element={<DogWalks />} />,
  <Route key={uuid()} path="/trainer-info/:id/*" element={<TrainerInfo />} />,
  <Route key={uuid()} path="/change-password" element={<ChangePassword />} />,
  <Route
    key={uuid()}
    path="*"
    element={<Navigate to={`/user-profile/${userId}`} replace />}
  />,
];
