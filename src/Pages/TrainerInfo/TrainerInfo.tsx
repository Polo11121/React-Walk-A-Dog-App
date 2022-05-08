import StarIcon from "@mui/icons-material/Star";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import { Breadcrumbs } from "@mui/material";
import { TrainerWalks } from "Pages/TrainerInfo/TrainerWalks/TrainerWalks";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useGetUser } from "api/useGetUser";
import { Button } from "Components";
import useWalksContext from "hooks/context/WalksContext";
import "./TrainerInfo.scss";

export const TrainerInfo = () => {
  const { resetWalkList } = useWalksContext();
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
          onClick={resetWalkList}
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
          <Route path="opinions" element={<div>opinions</div>} />
          <Route path="walks" element={<TrainerWalks />} />
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
