import React, { useState } from "react";
import Menus from "../components/Menus";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import http from "../lib/http";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";

type LoginResponse = {
  token: string;
  retry: number;
  isDisable: boolean;
  user: { name: string };
};
export default function checkName() {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const Root = styled("div")(({ theme }) => ({
    width: "100%",
    ...theme.typography.body2,
    "& > :not(style) ~ :not(style)": {
      marginTop: theme.spacing(2),
    },
  }));
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
              <Typography variant="h3">Sign In</Typography>
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
              <TextField
                sx={{ mb: 2, width: "40ch" }}
                label="Username"
                onChange={(e) => {
                  setusername(e.target.value);
                }}
              />

              <TextField
                sx={{ mb: 2, width: "40ch" }}
                label="Password"
                id="standard-adornment-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type={showPassword ? "text" : "password"}
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
                    .post<LoginResponse>("/api/login", {
                      username,
                      password,
                    })
                    .then((res) => {
                      const { error, token } = res;
                      if (error) {
                        alert(error);
                      } else if (token) {
                        http.setToken(token);
                        localStorage.setItem("token", token);
                        alert("Login succeed");
                      }
                    });
                }}
              >
                Login
              </Button>
              <Box
                sx={{ display: "flex", justifyContent: "center", gap: "50px" }}
              >
                <Link to="/reg">Register</Link>
                <Link to="/P3reg">Forget Password</Link>
              </Box>
              <Root style={{ margin: "5px 0", fontSize: "184", color: "gray" }}>
                <Divider> or continue with</Divider>
              </Root>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                  mb: "10px",
                }}
              >
                <Button sx={{ width: "120px" }} variant="outlined">
                  Google
                </Button>
                <Button sx={{ width: "120px" }} variant="outlined">
                  FaceBook
                </Button>
                <Button sx={{ width: "120px" }} variant="outlined">
                  X
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
}
