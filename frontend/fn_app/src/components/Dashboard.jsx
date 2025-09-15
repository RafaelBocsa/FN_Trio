import React, { useEffect, useState, createContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { Outlet } from "react-router-dom";

export const UserContext = createContext();

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/user-info", { withCredentials: true })
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.error("ERROR ", error);
      });
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {userInfo ? (
        <div className="">
          <Navbar
            name={userInfo.name}
            email={userInfo.email}
            picture={userInfo.picture || userInfo.avatar_url}
            userId={userInfo.id || userInfo.sub}
          />
          <div className="p-4">
            <Outlet />
          </div>
        </div>
      ) : (
        <div className="flex justify-between p-10">
          <Link to="/">
            <div className="flex items-center">
              <img src="/FNCSWhite.png" alt="" className="h-14" />
            </div>
          </Link>
          <p>Loading user data...</p>
        </div>
      )}
    </UserContext.Provider>
  );
};

export default Dashboard;
