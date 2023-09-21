import React from "react";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import "./css/global.css";
import Home from "./views/Home";
import Login from "./views/Login";
import About from "./views/About";
import Contact from "./views/Contact";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}