import React, { useState } from "react";
import Menus from "../components/Menus";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <Menus />
      <Typography sx={{ textAlign: "center", mt: 5 }} variant="h3">
        Login
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", height: "100vh" }}>
        <Box sx={{ width: "400px", mt: 5 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Name"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            sx={{ my: 3 }}
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              axios.post("/api/login", { username, password }).then((res) => {
                if (res.data.error) {
                  alert(res.data.error);
                } else {
                  alert(res.data.token);
                }
              });
            }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </div>
  );
}
