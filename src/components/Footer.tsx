import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

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
      <Link to="https://mirrabenjamin.netlify.app/" target="_blank" style={{ textDecoration: "none" }}>
        <Typography
          sx={{
            fontSize: 12,
            py: 0.5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
          color="text.secondary"
        >
          Desarrollado web realizado por Mirra Benjamín
        </Typography>
      </Link>
    </Stack>
  );
};

export default Footer;
