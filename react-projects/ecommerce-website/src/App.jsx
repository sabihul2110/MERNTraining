import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./component/Home";
import AddToCart from "./component/AddToCart";

/**
 * Application Root & Router Configuration
 * Maps the product catalog ("/") and shopping cart ("/addToCart") routes.
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/addToCart",
    element: <AddToCart />,
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
