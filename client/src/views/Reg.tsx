import React, { useCallback, useState } from "react";
import Menus from "../components/Menus";
import http from "../lib/http";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { isAnEmail, isAnPassword } from "../lib/functions";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import checkName from "./Login";
let sto = 0;
export default function Register() {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [usernameAlreadlyExist, setusernameAlreadlyExist] = useState(false);
  const [usernamefree, setusernameFree] = useState<boolean>();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const go = useNavigate();

  function checkUsername(username: string) {
    if (usernameAlreadlyExist === true) {
      setusernameAlreadlyExist(false);
    }
    if (usernamefree === true) {
      setusernameFree(undefined);
    }
    http.post("/api/testname", { username }).then((res) => {
      if (res.error) {
        setusernameAlreadlyExist(true);
      } else if (res.message) {
        setusernameFree(true);
      }
    });
  }

  return (
    <>
      <Menus />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "2px solid pink",
        }}
      >
        <Box>
          <Paper elevation={3}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h3">Sign Up</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "500px",
              }}
            >
              {/* 用户名 */}
              <TextField
                sx={{ mb: 2, width: "40ch" }}
                label="Username"
                onChange={(e) => {
                  if (sto !== 0) {
                    console.log(sto);
                    clearTimeout(sto);
                  }
                  const inputName = e.target.value;
                  setusername(inputName);
                  const newSto = window.setTimeout(() => {
                    checkUsername(inputName);
                  }, 500);
                  sto = newSto;
                }}
                error={usernameAlreadlyExist}
                helperText={
                  usernameAlreadlyExist ? "Username already exists" : undefined
                }
              />
              {/* 邮箱 */}
              <TextField
                sx={{ mb: 2, width: "40ch" }}
                label="Email"
                onBlur={() => {
                  const inputEmailError = !isAnEmail(email);
                  setEmailError(inputEmailError);
                }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {/* 密码 */}
              <TextField
                sx={{ mb: 2, width: "40ch" }}
                label="Password"
                id="standard-adornment-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type={showPassword ? "text" : "password"}
                onBlur={() => {
                  const inputPasswordError = !isAnPassword(password);
                  setPasswordError(inputPasswordError);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                sx={{ width: "50ch", mb: 2 }}
                variant="contained"
                onClick={() => {
                  http
                    .post("/api/register", { username, email, password })
                    .then((res) => {
                      if (res.message == "OK") {
                        alert("succeed");
                        go("/login");
                      } else {
                        alert(res.error);
                      }
                    });
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
}
