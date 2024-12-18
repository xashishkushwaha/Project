// import React from 'react';
import { Appbar } from "../components/Appbar";
import ShowLocation from "./ShowLocation";
import ShowMap from "./ShowMap";
import BarGraph from "./BarGraph";

export const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="fixed top-0 left-0 right-0 z-10">
        <Appbar />
      </div>
      <div className="flex flex-1 pt-16"> {/* pt-16 to account for the fixed Appbar */}
        <div className="w-3/4 h-full">
          <ShowMap />
        </div>
        <div className="w-1/4 h-full flex flex-col">
          <div className="h-1/5 mx-3">
            <BarGraph />
          </div>
          <div className="h-4/5 overflow-auto">
            <ShowLocation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;