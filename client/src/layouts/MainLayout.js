import React from "react";
import Navbar from "../components/global/NavBar";

const MainLayout = ({ children }) => {
  return (
    <section className="w-full min-h-full h-auto flex flex-col">
      <Navbar />
      <div className="w-full h-auto flex flex-col">{children}</div>
    </section>
  );
};

export default MainLayout;
