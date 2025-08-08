import React, { JSX, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {Login} from "./components/Login";
import {Sign} from "./components/Sign";
import {Task} from "./components/Task"; 
import { isAuthenticated } from "./utils/auth";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Sign />} />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <Task />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
