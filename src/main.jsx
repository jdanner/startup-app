import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './Home';
import AdminView from './AdminView';
import Companies from './Companies';
import NonProfits from './NonProfits';
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/apply",
    element: <App />,
  },
  {
    path: "/companies",
    element: <Companies />,
  },
  {
    path: "/nonprofit-portfolio",
    element: <NonProfits />,
  },
  {
    path: "/admin",
    element: <AdminView />,
  },
  {
    path: "/admin/applications",
    element: <AdminView />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
) 