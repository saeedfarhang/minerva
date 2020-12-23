import {
  Grid,
  makeStyles,
  Slider,
  Typography,
  withStyles,
} from "@material-ui/core";
import { FastForward, PlayArrow, VolumeUp } from "@material-ui/icons";
import React from "react";
import ReactPlayer from "react-player";
import IconButton from "./IconButton";

const useStyles = makeStyles((theme) => ({
  player_wrapper: { width: "100%", position: "relative", direction: "rtl" },
  control_wrapper: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: 1,
  },
}));

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default function VideoPlayer(props) {
  const classes = useStyles();

  return (
    <div className={classes.player_wrapper}>
      <ReactPlayer
        width="100%"
        height="100%"
        // className={classes.intro_video}

        url={props.url}
      />
      <div className={classes.control_wrapper}>
        <Grid
          container
          alignItems="center"
          justify="space-between"
          style={{ padding: 16, direction: "rtl" }}
        >
          {/* top */}
          <Grid item>
            <Typography variant="h5" style={{ color: "#fff" }}>
              ویدئوی معرفی
            </Typography>
          </Grid>
        </Grid>
        {/* middle */}
        <Grid container alignItems="center" justify="center">
          <IconButton icon={<FastForward />} />
        </Grid>
        {/* bottom */}
        <Grid
          container
          alignItems="center"
          justify="space-between"
          style={{ padding: 16 }}
        >
          <Grid item xs={12}>
            <Slider
              style={{ direction: "ltr" }}
              min={0}
              max={100}
              defaultValue={20}
            />
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <IconButton icon={<PlayArrow />} />
              <IconButton icon={<VolumeUp />} />
              <Slider
                track="inverted"
                style={{ width: 100 }}
                min={0}
                max={100}
                defaultValue={100}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
