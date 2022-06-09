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
import { Walks } from "Pages/Walks/Walks";
import { WalkInfo } from "Pages/WalkInfo/WalkInfo";
import { WalkLive } from "Pages/WalkLive/WalkLive";
import AddOpinion from "Pages/TrainerInfo/AddOpinion/AddOpinion";
import { EditOpinion } from "Pages/TrainerInfo/EditOpinion/EditOpinion";
import { TrainerDetails } from "Pages/TrainerInfo/TrainerDetails/TrainerDetails";
import { DogOpinions } from "Pages/DogOpinions/DogOpinions";
import { AddDogOpinion } from "Pages/DogOpinions/AddDogOpinion/AddDogOpinion";
import DogOpinion from "Pages/DogOpinions/DogOpinion/DogOpinion";
import EditDogOpinion from "Pages/DogOpinions/EditDogOpinion/EditDogOpinion";

export const userRoutes = (userId: string | null) => [
  <Route key={uuid()} path="/user-profile/:id" element={<UserProfile />} />,
  <Route
    key={uuid()}
    path="/user-profiles/trainers"
    element={<UserProfiles />}
  />,
  <Route
    key={uuid()}
    path="/user-profiles/owners"
    element={<UserProfiles />}
  />,
  <Route
    key={uuid()}
    path="/dog-profiles/:id"
    element={
      <ProtectedRoute trainerBlock>
        <DogProfiles />
      </ProtectedRoute>
    }
  />,
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
    path="/add-dog"
    element={
      <ProtectedRoute trainerBlock>
        <ManageDogProfile />
      </ProtectedRoute>
    }
  />,
  <Route
    key={uuid()}
    path="/edit-dog/:id/:subId"
    element={
      <ProtectedRoute>
        <ManageDogProfile />
      </ProtectedRoute>
    }
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
  <Route
    key={uuid()}
    path="/walks"
    element={
      <ProtectedRoute trainerBlock>
        <Walks />
      </ProtectedRoute>
    }
  />,
  <Route key={uuid()} path="/walk-info/:id" element={<WalkInfo />} />,
  <Route key={uuid()} path="/walk-live/:id" element={<WalkLive />} />,
  <Route key={uuid()} path="/dog-walks/:id" element={<DogWalks />} />,
  <Route key={uuid()} path="/trainer-info/:id/*" element={<TrainerInfo />} />,
  <Route
    key={uuid()}
    path="/trainer-opinion-add/:id"
    element={
      <ProtectedRoute trainerBlock>
        <AddOpinion />
      </ProtectedRoute>
    }
  />,
  <Route
    key={uuid()}
    path="/trainer-opinion-edit/:id"
    element={
      <ProtectedRoute trainerBlock>
        <EditOpinion />
      </ProtectedRoute>
    }
  />,
  <Route
    key={uuid()}
    path="/trainer-opinion/:id"
    element={<TrainerDetails />}
  />,
  <Route key={uuid()} path="/change-password" element={<ChangePassword />} />,
  <Route
    key={uuid()}
    path="*"
    element={<Navigate to={`/user-profile/${userId}`} replace />}
  />,
  <Route key={uuid()} path="/dog-opinions/:id" element={<DogOpinions />} />,
  <Route
    key={uuid()}
    path="/dog-opinion-add/:id"
    element={<AddDogOpinion />}
  />,
  <Route key={uuid()} path="/dog-opinion/:id" element={<DogOpinion />} />,
  <Route
    key={uuid()}
    path="/dog-opinion-edit/:id"
    element={<EditDogOpinion />}
  />,
];
