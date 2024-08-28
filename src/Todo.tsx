import React from "react";
import TodoMain from "./components/Todo";
import { useGlobalContext } from "./components/Context";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "./components/firebaseConfig";
import Navbar from "./components/Navbar";

export default function Todo() {
  const { theme } = useGlobalContext();
  const authFromSessionStorage = sessionStorage.getItem("auth");
  const navigate = useNavigate();

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        sessionStorage.removeItem("auth");
        sessionStorage.removeItem("uid");
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  if (!authFromSessionStorage) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className={`theme-${theme}`}>
      <Navbar />
      <br />
      <br />
      <TodoMain />
    </div>
  );
}
