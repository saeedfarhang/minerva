import {
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { Add, Edit, EditLocation, MonetizationOn } from "@material-ui/icons";
import { palette } from "@material-ui/system";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { axiosInstance } from "../../../Axios";
import {
  PrimaryList,
  SecondaryList,
  MasterList,
} from "../../../Lists/DashboardProfileList";

import Appbar from "../../CustomComponents/Appbar";
import Button from "../../CustomComponents/Button";
import IconButton from "../../CustomComponents/IconButton";
import MasterCoursesList from "./master/MasterContentList";

const useStyles = makeStyles((theme) => ({
  root: { padding: "20px 10%", justifyContent: "center" },
  paper: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: "none",
    padding: 10,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginBottom: "10px",
  },
  TopGrid: {
    width: "100%",

    justifyContent: "center",
  },
  RightSide: {
    height: "fit-content",
  },
  LeftSide: {
    height: "100%",
  },
  Link: {
    color: theme.palette.primary.contrastText,
    textDecoration: "none",
  },
  verticalDivider: {
    margin: "0px 5px",
  },
}));

export default function Dashboard(props) {
  const history = useHistory();
  const classes = useStyles();
  const [User, setUser] = useState({ is_master: false });

  const primaryList = PrimaryList();
  const secondaryList = SecondaryList();
  const masterList = MasterList();

  useEffect(() => {
    axiosInstance
      .get("accounts/user/")
      .then((res) => setUser(res.data))
      .catch((error) => {
        history.push("/logout");
      });
  }, []);

  return (
    <Grid container className={classes.root}>
      <Appbar
        menuItems={[{ key: 0, text: "دوره", url: "/profile/edituser" }]}
      />
      <Grid container spacing={2} className={classes.TopGrid}>
        <Grid
          container
          item
          lg={3}
          md={4}
          xs={10}
          className={classes.RightSide}
        >
          <Paper className={classes.paper}>
            <Grid item>
              <List aria-label="main mailbox folders">
                <Link className={classes.Link} to="/profile/edituser/">
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Avatar
                        src={User.avatar}
                        style={{ margin: 10, width: 60, height: 60 }}
                      ></Avatar>
                      <Typography variant="h6">{User.name}</Typography>
                    </div>
                  </div>
                </Link>
                <ListItem>
                  <Grid
                    container
                    item
                    alignItems="center"
                    justify="space-around"
                  >
                    <Button
                      endIcon={<MonetizationOn />}
                      text={User.coins}
                      color="secondary"
                      fontSize="20px"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </ListItem>

                {User.is_master
                  ? masterList.map((item) => (
                      <ListItem button key={item.id}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} />
                      </ListItem>
                    ))
                  : null}

                {primaryList.map((item) => (
                  <ListItem button key={item.id}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List aria-label="secondary mailbox folders">
                {secondaryList.map((item) => (
                  <ListItem button key={item.id}>
                    <ListItemText primary={item.title} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Paper>
        </Grid>
        <Grid
          item
          container
          lg={9}
          md={8}
          xs={10}
          className={classes.LeftSide}
          direction="column"
        >
          <Paper className={classes.paper}>
            <Grid item></Grid>
          </Paper>
          {User.is_master ? (
            <Paper className={classes.paper}>
              <Grid>
                <MasterCoursesList />
              </Grid>
            </Paper>
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  );
}
