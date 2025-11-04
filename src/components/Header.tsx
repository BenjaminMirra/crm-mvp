import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import React from "react";
import NavigationTabs from "./NavigationTabs";
import { useLocation } from "react-router-dom";

interface HeaderProps {
  children?: React.ReactNode;
}

const routeTitles: Record<string, string> = {
  "/ventas": "Ventas",
  "/gastos": "Gastos",
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  const location = useLocation();
  const title = routeTitles[location.pathname] || "";
  return (
    <AppBar position="static">
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dashboard{title ? ` - ${title.toUpperCase()}` : ""}
        </Typography>
        <NavigationTabs />
        {children && <Box>{children}</Box>}
      </Toolbar>
    </AppBar>
  );
};

export default Header;