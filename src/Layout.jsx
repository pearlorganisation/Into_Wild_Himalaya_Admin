import React, { useState } from "react";
import logo from "./assets/WildLogo.png"
import { Link, Outlet } from "react-router-dom";
import TerrainIcon from '@mui/icons-material/Terrain';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';

import HikingIcon from '@mui/icons-material/Hiking';
export default function Layout() {

  const [isSideNavOpen, setIsSideNavOpen] = useState(false);



  const sideBarItems = [
    {
      label: "Dashboard",
      path: "/",
      icon: <SpaceDashboardIcon/>,
    },
    {
      label: "Treks",
      path: "/trek",
      icon: <TerrainIcon/>,
    },
    
    {
      label: "Activities",
      path: "/activity",
      icon: <HikingIcon/>,
    },
    
  ];

  return <>
      {/*  <!-- Component: Side navigation menu with user profile and alert message --> */}
      {/*  <!-- Mobile trigger --> */}
      <button
        title="Side navigation"
        type="button"
        className={`visible fixed right-6 top-2 z-40 order-10 block h-10 w-10 self-center rounded bg-white opacity-100 lg:hidden ${
          isSideNavOpen
            ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
            : ""
        }`}
        aria-haspopup="menu"
        aria-label="Side navigation"
        aria-expanded={isSideNavOpen ? " true" : "false"}
        aria-controls="nav-menu-4"
        onClick={() => setIsSideNavOpen(!isSideNavOpen)}
      >
        <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-700 transition-all duration-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
          ></span>
        </div>
      </button>

      {/*  <!-- Side Navigation --> */}

      <div className="flex h-screen">
     
          <aside
            id="nav-menu-4"
            aria-label="Side navigation"
            className={`fixed top-0 bottom-0 left-0 lg:static  z-40 flex w-72 flex-col border-r border-r-slate-200 bg-white transition-transform lg:translate-x-0 ${
              isSideNavOpen ? "translate-x-0" : " -translate-x-full"
            }`}
          >
            <div className=" items-center border-b border-slate-200 ps-4">
             
              <div className="min-h-[2rem] w-full min-w-0 flex-col items-start justify-center gap-0 text-center">
              <Link to={`/`}><img className="h-32" src={logo}/>
               </Link> 
              </div>
            </div>
            <nav
              aria-label="side navigation"
              className="flex-1 divide-y divide-slate-100 overflow-hidden"
            >
              <div>
                <ul className="flex flex-1 flex-col gap-1 py-3">
                  {sideBarItems?.map((itm) => {
                    return (
                      <li className="px-3">
                        <Link
                          to={itm?.path}
                          className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                        >
                          <div className="flex items-center self-center">
                           {itm?.icon}
                          </div>
                          <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                            {itm?.label}
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <ul className="flex flex-1 flex-col gap-1 py-3">
                  <li className="px-3">
                    <a
                      href="#"
                      className="flex items-center gap-3 rounded p-3 text-slate-900 transition-colors hover:text-emerald-500 "
                    >
                      <div className="flex items-center self-center ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-6 w-6"
                          aria-label="Dashboard icon"
                          role="graphics-symbol"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <button type="button"  className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm font-medium">
                        Logout
                      </button>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>

            <footer className="border-t border-slate-200 p-3"></footer>
          </aside>
    

        <div className="w-screen overflow-x-hidden mt-5 ">
          <Outlet />
        </div>
      </div>

      {/*  <!-- Backdrop --> */}
      <div
        className={`fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-900/20 transition-colors sm:hidden ${
          isSideNavOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsSideNavOpen(false)}
      ></div>
      {/*  <!-- End Side navigation menu with user profile and alert message --> */}
    </>

}
