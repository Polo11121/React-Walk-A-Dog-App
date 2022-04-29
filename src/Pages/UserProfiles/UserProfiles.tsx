import PetsIcon from "@mui/icons-material/Pets";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { Breadcrumbs } from "@mui/material";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { Card } from "Components";
import { useGetUsers } from "api/useGetUsers";
import "./UserProfiles.scss";

export const UserProfiles = () => {
  const params = useParams();
  const { users } = useGetUsers();

  return (
    <div className="user-profiles">
      <div className="user-profiles__title">Profile</div>
      <Breadcrumbs style={{ fontSize: "25px", margin: "0 auto" }}>
        <Link
          style={params["*"] === "trainers" ? { color: "#8fe388" } : {}}
          to="/user-profiles/trainers"
          className="user-profiles__link"
        >
          <FitnessCenterIcon sx={{ mr: 0.5 }} fontSize="medium" />
          TRENERÓW
        </Link>
        <Link
          style={params["*"] === "owners" ? { color: "#8fe388" } : {}}
          to="/user-profiles/owners"
          className="user-profiles__link"
        >
          <PetsIcon sx={{ mr: 0.5 }} fontSize="medium" />
          WŁAŚCICELI
        </Link>
      </Breadcrumbs>
      <div className="user-profiles__list">
        <Routes>
          <Route
            path="trainers"
            element={
              <>
                {users?.map(
                  ({ username, is_trainer, avatar, id }) =>
                    is_trainer && (
                      <Card
                        isUser
                        id={id}
                        key={id}
                        name={username}
                        subTitle={is_trainer ? "Trener" : ""}
                        imageSrc={avatar}
                      />
                    )
                )}
              </>
            }
          />
          <Route
            path="owners"
            element={
              <>
                {users?.map(
                  ({ username, is_trainer, avatar, id }) =>
                    !is_trainer && (
                      <Card
                        isUser
                        id={id}
                        key={id}
                        name={username}
                        subTitle={is_trainer ? "Trener" : ""}
                        imageSrc={avatar}
                      />
                    )
                )}
              </>
            }
          />
        </Routes>
      </div>
    </div>
  );
};
