import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Content from "./Content";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/user-info", { withCredentials: true })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("ERROR ", error);
      });
  }, []);

  return (
    <div>
      {user ? (
        <div className="">
          <Navbar
            name={user.name}
            email={user.email}
            picture={user.picture || user.avatar_url}
          />
          <Content userId={user.sub || user.id} />
        </div>
      ) : (
        <div className="flex justify-between p-10">
          <a href="/">
            <div className="flex items-center">
              <img src="/FNCSBlack.png" alt="" className="h-14" />
            </div>
          </a>
          <p>Loading user data...</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
