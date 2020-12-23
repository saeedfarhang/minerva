import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";

export function DrawerTopList() {
  return [
    {
      id: 1,
      title: "مینروا بلاگ",
      icon: <SearchIcon />,
    },
    {
      id: 2,
      title: "ترند ها",
      icon: <SearchIcon />,
    },
  ];
}

export function DrawerCategoryList() {
  return [
    {
      id: 1,
      title: "ادبیات",
      icon: <SearchIcon />,
    },
    {
      id: 2,
      title: "موسیقی",
      icon: <SearchIcon />,
    },
  ];
}
