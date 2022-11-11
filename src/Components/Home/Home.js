import React from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "../Side-NavBar/SideNavbar";
import { ChakraProvider } from "@chakra-ui/react";
const Home = () => {
  return (
    <ChakraProvider>
      <div style={{ display: "flex" }}>
        <div style={{ width: "20%" }}>
          <SideNavbar />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            marginLeft: "-10px",
          }}
        >
          <Outlet />
        </div>
      </div>
    </ChakraProvider>
  );
};

export default Home;
