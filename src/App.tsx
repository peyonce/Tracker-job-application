// App.tsx
// src/App.tsx

import React from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";

// Import your context and protected route component

// Import your page components
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  return (

    <BrowserRouter>
      <Routes>
        {/* Public / Non-authenticated routes */}
        <Route path="/" element={< Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes - only accessible when logged in */}
        <Route
          path="/home"
          element={
            <ProtectedRoute isAuthenticated>
              <Home />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>

  );
};

export default App;
