import React from "react";

import { Outlet } from "react-router";

const AppLayout: React.FC = () => {
  return (
    <>
      <Outlet></Outlet>
    </>
  );
};

export default AppLayout;
