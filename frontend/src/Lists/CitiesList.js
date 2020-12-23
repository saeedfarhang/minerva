import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";

export function CitiesList() {
  const Cities = { yazd: "یزد", tehran: "تهران", esfahan: "اصفهان" };
  const List = [];

  for (const key in Cities) {
    List.push({
      city: Cities[key],
      value: key,
    });
  }

  List.map((item, index) => {
    item.id = index;
  });

  return List;

  // return [
  //   {
  //     id: 1,
  //     city: "یزد",
  //     value: "yazd",
  //   },
  //   {
  //     id: 2,
  //     title: "پیام ها",
  //     icon: <SearchIcon />,
  //   },
  //   {
  //     id: 3,
  //     title: "مدارک",
  //     icon: <SearchIcon />,
  //   },
  // ];
}
