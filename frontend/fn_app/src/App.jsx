import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import TrioView from "./components/TrioView";
import PlayerList from "./components/PlayerList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<TrioView />} />
          <Route path="trio" element={<TrioView />} />
          <Route path="players" element={<PlayerList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
