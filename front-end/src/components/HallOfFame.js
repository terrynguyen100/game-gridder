import { Container, Typography } from "@mui/material";
import DataTable from "./DataTable";

const HallOfFame = () => {
  return (
    <Container maxWidth='md' sx={{marginTop: '10rem'}}>
      <Typography variant="h2" sx={{mb: '1rem'}}>Top 10 Players by Wins</Typography>
      <DataTable />
    </Container>
  );
}

export default HallOfFame;