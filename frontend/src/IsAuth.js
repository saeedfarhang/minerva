export const IsAuth = () => {
  if (localStorage.getItem("access_token")) {
    return true;
  } else {
    return false;
  }
};

// const [isAuth, setIsAuth] = useState(false);

// useEffect(() => {
//     setIsAuth(IsAuth());
//     isAuth ? history.push("/") : console.log("not");
//   }, [isAuth]);
