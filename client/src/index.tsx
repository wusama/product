// src/index.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import Router from "./router";

const app = document.getElementById("app");
// Render your React component instead
const root = createRoot(app || document.body);
root.render(<Router />);
