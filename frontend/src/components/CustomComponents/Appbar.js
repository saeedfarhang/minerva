import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Avatar,
  Container,
  Grid,
  InputBase,
  Menu,
  MenuItem,
} from "@material-ui/core";
import Person from "@material-ui/icons/Person";
import SearchIcon from "@material-ui/icons/Search";
import { fade } from "@material-ui/core/styles";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import Button from "../CustomComponents/Button";
import IconButton from "../CustomComponents/IconButton";
import { axiosInstance } from "../../Axios";
import { IsAuth } from "../../IsAuth";
import { Link, useHistory } from "react-router-dom";
import Drawer from "./Drawer";
import { MonetizationOn } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  appBarShift: {
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },

  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
  },

  search: {
    borderRadius: 125,

    position: "relative",
    // borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "26ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
  line: {
    height: "20px",
    width: 2,
    backgroundColor: theme.palette.secondary.dark,
    margin: "0 10px",
  },
  profilebtn: {
    minWidth: 100,
    width: 150,
    padding: 3,
  },
  profileMenuItem: {
    maxWidth: 200,
    minWidth: 150,
  },
  usertool: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
}));

export default function Appbar(props) {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();

  const [userData, setUserData] = useState({});
  const [isAuth, setIsAuth] = useState(false);

  const [menuItem, setMenuItem] = useState([]);

  useEffect(() => {
    setMenuItem(props.menuItems);
  }, []);

  useEffect(() => {
    setIsAuth(IsAuth());
    isAuth
      ? axiosInstance.get("accounts/user/").then((res) => setUserData(res.data))
      : null;
  }, [isAuth]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    if (isAuth) {
      setAnchorEl(e.currentTarget);
    } else {
      history.push("/login");
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const redirectHome = () => {
    history.push("/");
  };

  return (
    <div>
      <CssBaseline />
      <AppBar
        color="primary"
        position="fixed"
        style={{
          boxShadow: "none",
          backgroundColor: theme.palette.primary.light,
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton)}
            icon={<MenuIcon />}
          />
          <Typography
            onClick={redirectHome}
            className={classes.title}
            variant="h6"
          >
            مینروا
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="میان دوره ها، جستوجو کنید ..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.line}></div>

          {userData.name ? (
            <Link to="/courses/0/basket/see">
              <IconButton icon={<ShoppingBasketIcon />} color="secondary" />
            </Link>
          ) : null}

          <Button
            className={classes.profilebtn}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            color={"secondary"}
            startIcon={
              <Avatar
                alt={userData.name}
                src={userData.avatar}
                style={{ width: 30, height: 30 }}
              />
            }
            text={
              userData.name ? (
                <Typography noWrap>{userData.name}</Typography>
              ) : (
                "ورود/ ثبت نام"
              )
            }
          />
          {userData.name ? (
            <Menu
              style={{
                marginTop: 50,
              }}
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                className={classes.profileMenuItem}
                style={{
                  justifyContent: "center",
                  color: "#1fc4bc",
                }}
                onClick={() => {
                  handleClose();
                  redirectHome();
                }}
              >
                <Button
                  text={userData.coins}
                  startIcon={<MonetizationOn fontSize="small" />}
                  color="secondary"
                  fullWidth
                />
              </MenuItem>
              {props.menuItems
                ? menuItem.map((item) => (
                    <MenuItem
                      key={item.key}
                      className={classes.profileMenuItem}
                      style={{
                        justifyContent: "center",
                      }}
                      onClick={() => {
                        handleClose();
                        history.push(item.url);
                      }}
                    >
                      {item.text}
                    </MenuItem>
                  ))
                : null}
              <MenuItem
                className={classes.profileMenuItem}
                style={{
                  justifyContent: "center",
                }}
                onClick={() => {
                  handleClose();
                  redirectHome();
                }}
              >
                خانه
              </MenuItem>
              <MenuItem
                className={classes.profileMenuItem}
                style={{
                  justifyContent: "center",
                  color: "red",
                }}
                onClick={() => {
                  handleClose();
                  history.push("/logout");
                }}
              >
                خروج
              </MenuItem>
            </Menu>
          ) : null}
          {/* </Container> */}
        </Toolbar>
      </AppBar>
      <div style={{ marginBottom: 73 }} />
      <Drawer
        {...props}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </div>
  );
}
