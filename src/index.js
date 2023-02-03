import React from 'react';
import ReactDOM from 'react-dom/client';
import { Home } from './routes/Home';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Main } from './routes/Main';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "Main/:username",
    element: <Main />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

