import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function Logout() {
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      localStorage.removeItem("access_token");
      if (localStorage.getItem("refresh_token")) {
        localStorage.removeItem("refresh_token");
      }
      location.replace("/");
    }
  });
  return <div></div>;
}
