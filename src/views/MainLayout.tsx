import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { Box } from "@mui/material";

export default function MainLayout() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" height="100vh">
      <Header />
      <Box
        flex={1}
        minHeight={0}
        overflow="auto"
        display="flex"
        flexDirection="column"
        sx={{
          pb: 2,
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
