import { Typography, Box } from "@mui/material";

export default function NotFoundView() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      flex={1}
      minHeight="60vh"
    >
      <Typography variant="h2" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" color="text.secondary" gutterBottom>
        Página no encontrada
      </Typography>
      <Typography color="text.secondary">
        La página que buscas no existe o fue movida.
      </Typography>
    </Box>
  );
}
