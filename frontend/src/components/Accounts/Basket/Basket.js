import { Grid, Typography } from "@material-ui/core";
import { List } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../../../Axios";
import CourseCard from "../../Courses/CourseCard";
import CourseList from "../../Courses/CourseList";

export default function AddToBasket({ match }) {
  const history = useHistory();
  const [userBasket, setUserBasket] = useState({ courses: [] });
  const [courseList, setCourseList] = useState([]);
  const list = [];
  const [basketItems, setBasketItems] = useState([]);

  const [item, setItem] = useState({
    course_id: match.params.id,
    method: match.params.method,
  });

  useEffect(() => {
    if (item.method === "add" || item.method === "delete") {
      axiosInstance.post("accounts/basket/", item).then((res) => {
        history.goBack();
      });
    } else {
      axiosInstance
        .get("accounts/basket/")
        .then((res) => setUserBasket(res.data));
    }
  }, []);

  useEffect(() => {
    userBasket.courses.map((item) => {
      axiosInstance.get(`courses/${item}/`).then((res) => {
        list.push(res.data);

        setBasketItems(...basketItems, { items: list });
      });
    });
  }, [userBasket]);

  useEffect(() => {
    setCourseList(basketItems.items);
  }, [basketItems.items]);

  return (
    <Grid container spacing={2} justify="center">
      {/* {basketItems.items ? (
        basketItems.items.map((item) => (
          <Grid item key={item.id}>
            <CourseCard
              course_id={item.id}
              title={item.title}
              description={item.description}
              master={item.master}
              price={item.price}
              thumbnail={item.thumbnail}
            />
          </Grid>
        ))
      ) : (
        <Typography variant="h3">هنوز چیزی به سبد اضافه نشده</Typography>
      )} */}

      <CourseList
        title="دوره های برتر"
        expandButton="همه دوره ها"
        courseList={courseList}
        setCourseList={setCourseList}
      />
    </Grid>
  );
}
