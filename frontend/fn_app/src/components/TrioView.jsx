import React, { useEffect, useState } from "react";
import axios from "axios";

const TrioView = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/user?userId=" + userId, {
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("ERROR ", error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="">My Trio</div>

      {user ? (
        <div className="flex flex-row">
          {user.player1 ? (
            <div className="">{user.player1}</div>
          ) : (
            <div className="flex">Add a player</div>
          )}
          {user.player2 ? (
            <div className="">{user.player1}</div>
          ) : (
            <div className="flex">Add a player</div>
          )}
          {user.player3 ? (
            <div className="">{user.player1}</div>
          ) : (
            <div className="flex">Add a player</div>
          )}
        </div>
      ) : (
        <div className="flex">Loading user data...</div>
      )}
    </div>
  );
};

export default TrioView;
