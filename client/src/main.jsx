import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './router/router.jsx'
import {RouterProvider} from'react-router-dom'
import UserProvider from './context/UserContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
);
