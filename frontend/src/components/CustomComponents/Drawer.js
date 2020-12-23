import React, { useEffect, useState } from "react";
import {
  Divider,
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  useTheme,
  Paper,
  Grid,
  Typography,
} from "@material-ui/core";
import { DrawerTopList, DrawerCategoryList } from "../../Lists/DrawerList";
import clsx from "clsx";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
var drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
}));

export default function Drawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const drawerTopList = DrawerTopList();
  const drawerCategoryList = DrawerCategoryList();

  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={props.onClose}
      onKeyDown={props.onClose}
    >
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
    </div>
  );

  return (
    <>
      <MuiDrawer {...props} anchor={"left"} open={open} onClose={props.onClose}>
        <Grid
          container
          alignItems="center"
          justify="center"
          style={{ height: 60, padding: "0 30px" }}
        >
          <Grid item style={{ flexGrow: 1 }}>
            <Typography variant="h6">مینروا</Typography>
          </Grid>
          <Grid item>
            <ArrowForwardIosIcon onClick={props.onClose} />
          </Grid>
        </Grid>
        <Divider />
        {list()}
      </MuiDrawer>
    </>
  );
}
