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
    path: "/MySpotify/",
    element: <Home />,
  },
  {
    path: "/MySpotify/Main/:username",
    element: <Main />,
  },
], window.location.pathname || '');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

