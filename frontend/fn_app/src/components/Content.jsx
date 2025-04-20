import React, { useEffect, useState } from "react";
import PlayerList from "./PlayerList";
import TrioView from "./TrioView";

const Content = ({ userId }) => {
  return (
    <div className="flex flex-col p-10 items-center ">
      <TrioView userId={userId} />
      <PlayerList />
    </div>
  );
};

export default Content;
