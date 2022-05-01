import StarIcon from "@mui/icons-material/Star";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import { Breadcrumbs } from "@mui/material";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useGetUser } from "api/useGetUser";
import { Button } from "Components";
import "./TrainerInfo.scss";

export const TrainerInfo = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useGetUser(params.id);
  const goBack = () => navigate(`/user-profile/${params.id}`);

  return (
    <div className="trainer-info">
      <div className="trainer-info__title">Trener {user?.username}</div>
      <Breadcrumbs style={{ fontSize: "30px", margin: "0 auto" }}>
        <Link
          style={params["*"] === "opinions" ? { color: "#8fe388" } : {}}
          to={`/trainer-info/${params.id}/opinions`}
          className="trainer-info__link"
        >
          <StarIcon sx={{ mr: 0.5 }} fontSize="large" />
          OPINIE
        </Link>
        <Link
          style={params["*"] === "walks" ? { color: "#8fe388" } : {}}
          to={`/trainer-info/${params.id}/walks`}
          className="trainer-info__link trainer-info__link--active"
        >
          <DirectionsWalkIcon sx={{ mr: 0.5 }} fontSize="large" />
          SPACERY
        </Link>
      </Breadcrumbs>
      <div className="trainer-info__content">
        <Routes>
          <Route path="opinions" element={<div>options</div>} />
          <Route path="walks" element={<div>walks</div>} />
        </Routes>
      </div>
      <Button
        styles={{
          marginLeft: "auto",
          marginBottom: "40px",
        }}
        onClick={goBack}
        size="M"
        title="Powrót"
        type="default"
      />
    </div>
  );
};
