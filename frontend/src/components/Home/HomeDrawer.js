import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
// import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

import {
  ButtonGroup,
  InputBase,
  Button as MuiButton,
  Menu,
  MenuItem,
  Paper,
  MenuList,
  Avatar,
} from "@material-ui/core";
import Person from "@material-ui/icons/Person";
import SearchIcon from "@material-ui/icons/Search";
import { fade } from "@material-ui/core/styles";
import App from "./Home";
import Button from "../CustomComponents/Button";
import IconButton from "../CustomComponents/IconButton";
import { fontSize, width } from "@material-ui/system";
import { axiosInstance } from "../../Axios";
import { IsAuth } from "../../IsAuth";
import { Link, Redirect, useHistory } from "react-router-dom";

import { DrawerTopList, DrawerCategoryList } from "../../Lists/DrawerList";
import Notification from "../CustomComponents/Notification";
import { MonetizationOn } from "@material-ui/icons";

var drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    backgroundColor: theme.palette.primary.light,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    // boxShadow: 0,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
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
}));

export default function MiniDrawer(props) {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();

  const [userData, setUserData] = useState({});
  const [isAuth, setIsAuth] = useState(false);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    setIsAuth(IsAuth());
    isAuth
      ? axiosInstance.get("accounts/user/").then((res) => {
          setUserData(res.data);
        })
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

  const drawerTopList = DrawerTopList();
  const drawerCategoryList = DrawerCategoryList();

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const redirectHome = () => {
    history.push("/");
    location.reload();
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        color="primary"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{ boxShadow: "none" }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
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
              <MenuItem
                className={classes.profileMenuItem}
                style={{
                  justifyContent: "center",
                }}
                onClick={() => {
                  handleClose();
                  history.push("/profile");
                }}
              >
                Profile
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
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton
            onClick={handleDrawerClose}
            icon={
              theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )
            }
          />
        </div>
        <Divider />
        <List>
          {drawerTopList.map((item) => (
            <ListItem button key={item.id}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {drawerCategoryList.map((item) => (
            <ListItem button key={item.id}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <App open={open} />
      <Notification duration={1000} notify={notify} setNotify={setNotify} />
    </div>
  );
}
