import { Navigate, Route } from "react-router-dom";
import { Header } from "../Components/Header/Header";
import { ForgotPassword } from "../Pages/ForgotPassword/ForgotPassword";
import { Main } from "../Pages/Main/Main";
import { Register } from "../Pages/Register/Register";
import { Login } from "../Pages/Login/Login";

import { v4 as uuid } from "uuid";

export const authRoutes = () => [
  <Route key={uuid()} path="/" element={<Main />} />,
  <Route
    key={uuid()}
    path="/login"
    element={
      <>
        <Header hideButton />
        <Login />
      </>
    }
  />,
  <Route
    key={uuid()}
    path="/register"
    element={
      <>
        <Header hideButton />
        <Register />
      </>
    }
  />,
  <Route
    key={uuid()}
    path="/forgot-password"
    element={
      <>
        <Header />
        <ForgotPassword />
      </>
    }
  />,
];
