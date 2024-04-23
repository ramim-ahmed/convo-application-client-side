import PrivateRoute from "@/PrivateRoute/PrivateRoute";
import MyPosts from "@/components/MyPosts";
import ProfileLayout from "@/layouts/ProfileLayout";
import RootLayout from "@/layouts/RootLayout";
import Home from "@/pages/Home";
import SignIn from "@/pages/SignIn";
import { createBrowserRouter } from "react-router-dom";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/my-profile",
        element: (
          <PrivateRoute>
            <ProfileLayout />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <PrivateRoute>
                <MyPosts />
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "sign-in",
    element: <SignIn />,
  },
]);

export default routes;
