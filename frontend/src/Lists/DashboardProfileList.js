import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";

export function PrimaryList() {
  return [
    {
      id: 1,
      title: "دوره های فعال",
      icon: <SearchIcon />,
    },
    {
      id: 2,
      title: "پیام ها",
      icon: <SearchIcon />,
    },
    {
      id: 3,
      title: "مدارک",
      icon: <SearchIcon />,
    },
  ];
}

export function SecondaryList() {
  return [
    {
      id: 1,
      title: "دوره های ذخیره شده",
    },
    {
      id: 2,
      title: "تراکنش ها",
    },
  ];
}

export function MasterList() {
  return [
    {
      id: 1,
      title: "ویدئو ها",
    },
    {
      id: 2,
      title: "پلی لیست ها",
    },
  ];
}
