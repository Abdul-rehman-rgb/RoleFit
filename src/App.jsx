import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router";
import { appRoutes } from "./app.routes";
import { fetchCurrentUser } from "./store/slices/authSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return <RouterProvider router={appRoutes} />;
};

export default App;
