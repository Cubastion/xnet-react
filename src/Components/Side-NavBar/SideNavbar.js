import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, Box, Typography, IconButton } from "@mui/material";
import {useNavigate } from "react-router-dom";
import { tokenRequestOption } from "../Helpers/misellaneous";
const SideNavbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [nav, setNav] = useState([]);

  const fetchData = async () => {
    try {
      var url = `https://devxnet.cubastion.net/api/v1/menu/findMenuByEmployeeId?empId=k9g5f51fcl87tcq`;
      const response = await fetch(url, tokenRequestOption());
      const json = await response.json();
      setNav(json.data)
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchData()
  }, [])

  const navigate = useNavigate();
  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  let onClickSideNavBar = (x) => {
    console.log('onClickSideNavBar', x)
    navigate(x.page[0].route)
  }

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <>
    <div style={{float:'left'}}>

      {!isDrawerOpen && <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="logo"
        onClick={() => setIsDrawerOpen(true)}
        >
        <MenuIcon/>
      </IconButton>}
        </div>
      
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        variant={windowSize.innerWidth <= "750" ? "temporary" : "permanent"}
      >
        
        <Box p={2} width="185px" textAlign="left" role="presentation">
          {nav.map((x) => (
              <Typography
              onClick = {()=> onClickSideNavBar(x)}
              key={x.Id}
              style={{ cursor: "pointer" }}
              p={1}
              m={1}
              >
              {x.displayName}
            </Typography>
          ))}
        </Box>
        <Box>
          <img
            src="https://devxnet.cubastion.net/assets/dist/img/15-year-logo.png"
            alt=""
            />
        </Box>
      </Drawer>
        
    </>
  );
};

export default SideNavbar;
