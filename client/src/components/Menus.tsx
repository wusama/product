import React from "react";
import { Box, Paper } from "@mui/material";
import { Link } from "react-router-dom";

export default function Menus() {
  return (
    <Paper square sx={{ display: "flex", "&>div": { px: 2, py: 1 } }}>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/about">About</Link>
      </div>
      <div>
        <Link to="/contact">Contact</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
        {/* <Link to="/login">Login</Link> */}
      </div>
    </Paper>
  );
}
