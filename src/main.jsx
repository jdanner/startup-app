import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home.jsx'
import AdminView from './AdminView.jsx'
import { ApplicationForm } from './App.jsx'
import NonProfitForm from './NPApp.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/admin',
    element: <AdminView />,
  },
  {
    path: '/apply/for-profit',
    element: <ApplicationForm />,
  },
  {
    path: '/apply/non-profit',
    element: <NonProfitForm />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
) 