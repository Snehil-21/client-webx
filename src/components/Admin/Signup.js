import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import ShopLogo from "../../assets/shop-logo.jpg";
import { useToasts } from "react-toast-notifications";

import * as authActions from "../../store/actions/Auth";

import Navbar from "../NavBar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "space-evenly",
    backgroundColor: "#ffffff",
  },
  title: {
    flexGrow: 1,
    color: "#000D4B",
    fontWeight: "bold",
    fontSize: "2rem",
  },
  button: {
    position: "relative",
    borderRadius: "12px",
  },
  body: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    margin: "2em 0",
    height: "80vh",
    width: "100vw",
  },
  social: {
    height: "100%",
    width: "40%",
  },
  inDiv: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textfield: {
    margin: "4% 0",
    display: "block",
    borderRadius: "12px",
  },
}));

export default function SignUp() {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");

  const signUpHandler = async () => {
    try {
      if (confPass !== password) {
        addToast("Passwords do not match", { appearance: "info" });
        return;
      }

      if (
        fullName.length > 0 &&
        email.length > 0 &&
        userName.length >= 4 &&
        password.length >= 6
      ) {
        await dispatch(
          authActions.signupAdmin(fullName, email, userName, password)
        );
        setFullName("");
        setEmail("");
        setUserName("");
        setPassword("");
        setConfPass("");
        addToast("Sign Up successful, Login to Continue!", {
          appearance: "success",
        });
      } else {
        addToast("An error occured.", { appearance: "error" });
        return;
      }
    } catch (error) {
      addToast(error, { appearance: "error" });
    }
  };

  return (
    <>
      <Navbar admin={true} />
      <div className={classes.body}>
        <div className={classes.inDiv}>
          <Typography
            style={{ color: "#000D4B", fontWeight: "bold", fontSize: "2rem" }}
          >
            Admin <span style={{ color: "#CCCFDB" }}>Sign Up</span>
          </Typography>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              className={classes.textfield}
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              className={classes.textfield}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              className={classes.textfield}
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              autoComplete="on"
              variant="outlined"
              type="password"
              className={classes.textfield}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Confirm Password"
              autoComplete="on"
              variant="outlined"
              type="password"
              className={classes.textfield}
              value={confPass}
              onChange={(event) => setConfPass(event.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={signUpHandler}
            >
              Sign-Up
            </Button>
          </form>
        </div>
        <img src={ShopLogo} alt="Social Media" className={classes.social} />
      </div>
    </>
  );
}
