import {
  Outlet,
} from "react-router-dom";

import "../styles/CommandCenter.css"

const MainLayout = () => {
  return (
    <div className="app-layout">
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;