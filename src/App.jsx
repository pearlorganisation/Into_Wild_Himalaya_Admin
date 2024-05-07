

import './App.css'

import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Layout from './Layout.jsx';
import {RouterProvider, createBrowserRouter } from 'react-router-dom';
import Treks from './pages/Trek/ViewTreks.jsx';
import { Toaster } from 'react-hot-toast';
import CreateTrek from './pages/Trek/CreateTrek.jsx';
import ViewActivities from './pages/Activity/ViewActivity.jsx';
import CreateActivity from './pages/Activity/CreateActivity.jsx';

function App() {


  const getRoutes = () => {
  
    return [
      {
        path: "/",
        element: <Layout />  ,

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
          
       ],
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
    // </div>
  );
}

export default App