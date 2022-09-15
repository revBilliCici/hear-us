import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Badge, Typography } from "@mui/material";
import logo from "../assets/logo.png";

import { MdShoppingCart } from "react-icons/md";

const Navbar = ({ cartItems }) => {
  const location = useLocation();
  return (
    <>
      <AppBar position="fixed" className="nvAppBar" color="inherit">
        <Toolbar>
          <Link
            to={"/products"}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
            className={"nvTitle"}
          >
            <Typography variant="h5" className="nvTitle" color={"inherit"}>
              <img
                src={logo}
                alt="hear us"
                height={"25px"}
                className="nvImage"
              />
              Hear-us
            </Typography>
          </Link>
          <div className="nvGrow" />
          {location.pathname === "/products" && (
            <div className="nvButton">
              <IconButton
                LinkComponent={Link}
                to={"/cart"}
                aria-label="show cart items"
                color="inherit"
              >
                <Badge badgeContent={cartItems} color="error">
                  <MdShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
