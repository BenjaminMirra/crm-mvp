import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import React from "react";
import NavigationTabs from "./NavigationTabs";

interface HeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <NavigationTabs />
        {children && <Box>{children}</Box>}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
