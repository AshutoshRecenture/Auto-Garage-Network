import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LogoProvider } from "./utils/LogoContext.jsx";
import LogIn from "./pages/LogIn.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

function App() {
  return (
    <LogoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </Router>
    </LogoProvider>
  );
}

export default App;
