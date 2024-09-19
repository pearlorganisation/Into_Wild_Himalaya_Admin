

import './App.css'

import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Layout from './Layout.jsx';
import {RouterProvider, createBrowserRouter,Navigate } from 'react-router-dom';
import Treks from './pages/Trek/ViewTreks.jsx';
import { Toaster } from 'react-hot-toast';
import CreateTrek from './pages/Trek/CreateTrek.jsx';
import ViewActivities from './pages/Activity/ViewActivity.jsx';
import CreateActivity from './pages/Activity/CreateActivity.jsx';
import ViewTours from './pages/Tour/ViewTour.jsx';
import CreateTour from './pages/Tour/createTour.jsx';
import Login from "./pages/Auth/Login.jsx"
import { useSelector } from 'react-redux';
import ViewContactUs from './pages/ContactUs/ViewContactUs.jsx';

function App() {
  const { isUserLoggedIn } = useSelector((state) => state.auth);

  const getRoutes = () => {
  
    return [
      {
        path: "/",
        element: isUserLoggedIn ? <Layout /> : <Navigate to="/login"/>  ,

        children: [
         
          {
            path: "/",
            element: <Dashboard />   
          },
          {
            path: "/trek",
            element: <Treks />   
          },
          {
            path: "/createTrek",
            element: <CreateTrek />   
          },
          
          {
            path: "/activity",
            element: <ViewActivities />   
          },
          {
            path: "/createActivity",
            element: <CreateActivity />   
          },
          {
            path: "/tour",
            element: <ViewTours />   
          },
          {
            path: "/createTour",
            element: <CreateTour />   
          },
          {
            path: "/contactUs",
            element: <ViewContactUs />   
          },
       
          // {
          //   path: "/createActivity",
          //   element: <CreateActivity />   
          // },
          
       ],
      },
     { path: "/login",
        element: !isUserLoggedIn ? <Login /> : <Navigate to='/' />  ,
    }
  
    ];
  
  };
  const router = createBrowserRouter(getRoutes());

  return (
    <div className='font-poppins bg-gray-50'><Toaster
    position="top-right"
    reverseOrder={false}
    containerClassName="overflow-auto"
  />
      <RouterProvider router={router}>
        <Layout />
      </RouterProvider>
    </div>
  );
}

export default App
