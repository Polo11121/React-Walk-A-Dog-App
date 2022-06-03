import PetsIcon from "@mui/icons-material/Pets";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { Breadcrumbs } from "@mui/material";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import { Card, EmptyList, WithLoader } from "Components";
import { useGetUsers } from "api/useGetUsers";

import "./UserProfiles.scss";

export const UserProfiles = () => {
  const params = useParams();
  const { users, isLoading } = useGetUsers();
  const location = useLocation();

  const isTrainers = location.pathname.endsWith("trainers");
  return (
    <div className="user-profiles">
      <div className="user-profiles__title">Profile</div>
      <Breadcrumbs style={{ fontSize: "25px", margin: "0 auto" }}>
        <Link
          style={isTrainers ? { color: "#8fe388" } : {}}
          to="/user-profiles/trainers"
          className="user-profiles__link"
        >
          <FitnessCenterIcon sx={{ mr: 0.5 }} fontSize="medium" />
          TRENERÓW
        </Link>
        <Link
          style={!isTrainers ? { color: "#8fe388" } : {}}
          to="/user-profiles/owners"
          className="user-profiles__link"
        >
          <PetsIcon sx={{ mr: 0.5 }} fontSize="medium" />
          WŁAŚCICIELI
        </Link>
      </Breadcrumbs>
      <div className="user-profiles__list">
        <WithLoader isLoading={isLoading}>
          <EmptyList>
            {users?.map(
              ({ username, is_trainer, avatar, id }) =>
                (isTrainers ? is_trainer : !is_trainer) && (
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
          </EmptyList>
        </WithLoader>
      </div>
    </div>
  );
};
