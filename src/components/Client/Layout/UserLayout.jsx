import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../Client/Common/Header";
import Footer from "../../Client/Common/Footer";

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-15">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default UserLayout;
