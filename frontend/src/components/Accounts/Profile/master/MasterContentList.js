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
import { Add } from "@material-ui/icons";

const useStyles = makeStyles({
  table: {
    minWidth: 500,
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
          <Typography>{children}</Typography>
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
].sort((a, b) => (a.calories < b.calories ? 1 : -1));

export default function MasterCoursesList() {
  const classes = useStyles();
  const theme = useTheme();
  const [MasterCourses, setMasterCourses] = useState({});

  useEffect(() => {
    axiosInstance.get();
  }, []);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
            color="primery"
            url="/profile/master/addcourse"
            style={{ margin: "10px", width: "fit-content" }}
          />
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </TabPanel>
    </Paper>
  );
}

// <Button
//   startIcon={<Add />}
//   text="افزودن ویدئو"
//   color="secondary"
//   url="/profile/master/addcourse"
// />
// <Divider
//   orientation="vertical"
//   className={classes.verticalDivider}
// />
// <Button
//   startIcon={<Add />}
//   text="افزودن مقاله"
//   color="secondary"
//   url="/profile/master/addcourse"
// />
