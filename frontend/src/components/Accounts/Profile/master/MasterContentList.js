import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { axiosInstance } from "../../../../Axios";
import { Box, Grid, Tab, Tabs, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import Button from "../../../CustomComponents/Button";
import { Add, CheckCircle } from "@material-ui/icons";
import { get } from "react-hook-form";

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  title_cell: {
    width: 200,
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function MasterCoursesList(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [MasterCourses, setMasterCourses] = useState([]);

  useEffect(() => {
    axiosInstance.get(`courses/mastercourses/${props.user_id}/`).then((res) => {
      setMasterCourses(res.data);
    });
  }, []);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function createData(
    id,
    title,
    description,
    thumbnail,
    state,
    time,
    date,
    students,
    comments,
    likes
  ) {
    return {
      id,
      title,
      description,
      thumbnail,
      state,
      time,
      date,
      students,
      comments,
      likes,
    };
  }
  const rows = [];
  var dateadded = "";
  var gettime = "";
  var time = 0;
  var getdate = 0;
  var date = 0;

  MasterCourses.map((course) => {
    dateadded = course.date_added;
    gettime = dateadded.split("T")[1].split(":");
    time = `${gettime[0]}:${gettime[1]}`;
    getdate = dateadded.split("T")[0].split("-");
    date = `${getdate[0]}/${getdate[1]}/${getdate[2]}`;

    rows.push(
      createData(
        course.id,
        course.title,
        course.description,
        course.thumbnail,
        course.state,
        time,
        date,
        course.students,
        course.comments,
        course.likes
      )
    );
  });

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="پلی لیست" {...a11yProps(0)} />
        <Tab label="ویدئو ها" {...a11yProps(1)} />
        <Tab label="مقاله ها" {...a11yProps(2)} />
      </Tabs>

      <TabPanel value={value} index={0} dir={theme.direction}>
        <Grid container direction="column">
          <Button
            startIcon={<Add />}
            text="افزودن پلی لیست"
            color="primary"
            url="/profile/master/addcourse"
            style={{ margin: "10px", width: "fit-content" }}
          />
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography noWrap>ویدئو</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>وضعیت</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>تاریخ</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>دانشجو</Typography>
                  </TableCell>
                  <TableCell align="center" width="fit-content">
                    <Typography>کامنت ها</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>محبوبیت</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              {/* {console.log(rows)} */}
              <TableBody>
                {rows.length > 0
                  ? rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>
                          <Grid
                            container
                            // direction="row"
                            className={classes.title_cell}
                            alignItems="center"
                          >
                            <Grid item style={{ paddingLeft: 4 }} xs={5}>
                              <img width="100%" src={row.thumbnail} alt="" />
                            </Grid>
                            <Grid item container direction="column" xs={7}>
                              <Typography noWrap>{row.title}</Typography>
                              <Typography
                                style={{ width: "100%" }}
                                variant="subtitle2"
                                noWrap
                              >
                                {row.description}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell>
                          <CheckCircle
                            style={{ color: "green", fontSize: 18 }}
                          />
                        </TableCell>
                        <TableCell>
                          {row.time}
                          <br />
                          {row.date}
                        </TableCell>
                        <TableCell>{row.students}</TableCell>
                        <TableCell width="200px">{row.comments}</TableCell>
                        <TableCell>{row.likes}</TableCell>
                      </TableRow>
                    ))
                  : console.log("ss")}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </TabPanel>
    </Paper>
  );
}
