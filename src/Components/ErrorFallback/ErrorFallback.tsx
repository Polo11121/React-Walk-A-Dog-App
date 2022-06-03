import React from "react";
import errorDog from "assets/errordog.png";
import { Button } from "Components/Button/Button";
import { useNavigate } from "react-router-dom";
import "./ErrorFallback.scss";
import useAuthContext from "hooks/context/AuthContext";

const ErrorFallback = ({
  resetErrorBoundary,
}: {
  resetErrorBoundary: () => void;
}) => {
  const navigate = useNavigate();
  const { userId } = useAuthContext();

  const switchToMyProfile = () => {
    navigate(`/user-profile/${userId}`);
    resetErrorBoundary();
  };

  return (
    <div className="error-fallback">
      <img
        className="error-fallback__image"
        src={errorDog}
        alt="surprised-dog"
      />
      <span className="error-fallback__text">Hau, coś poszło nie tak !</span>
      <Button
        onClick={switchToMyProfile}
        styles={{ margin: "1.5rem auto 0", fontSize: "25px" }}
        type="primary"
        size="XL"
        title="Powrót do profilu"
      />
    </div>
  );
};

export default ErrorFallback;
