import { Stack, Toolbar, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Stack
      sx={{
        bottom: 0,
        boxShadow: "none",
        background: "#f4f4f7",
        borderTop: "1px solid #e0e0e0",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Toolbar>
        <Typography variant="body2" color="text.secondary" align="center">
          Desarrollado web realizado por Mirra Benjamín
        </Typography>
      </Toolbar>
    </Stack>
  );
};

export default Footer;
