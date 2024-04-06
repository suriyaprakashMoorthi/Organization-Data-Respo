import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Authz/Signin/Login";
import SignupPage from "./Components/Authz/Signup/Signin";
import DashboardPage from "./Components/Dashboard/Dashboard";
import ProfilePage from "./Components/Profile/Profile";
import { CheckAuthLoader } from "./Utils/CheckAuth";
const BASEPATH = import.meta.env.VITE_REACT_APP_BASEPATH;

function App() {
  const Router = createBrowserRouter([
    {
      path: `${BASEPATH}/`,
      loader: CheckAuthLoader,
      element: <DashboardPage />,
      children: [
        {
          path: `${BASEPATH}/dashboard`,
          element: <DashboardPage />,
        },
      ],
    },
    {
      path: BASEPATH,
      children: [
        {
          path: `${BASEPATH}/login`,
          element: <Login />,
        },
        {
          path: `${BASEPATH}/signup`,
          element: <SignupPage />,
        },
        // {
        //   path:`${BASEPATH}/profile`,
        //   element:
        // }
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={Router} />
    </>
  );
}

export default App;
