import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const ResetBox = ({ title, handleClick }) => {
  
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "space-between", alignItems: "center", height: "100%"}}>
        <Button
        onClick={handleClick}
        sx={{ my: 2, color: '#9F9EA8', display: "flex", alignItems: "end"}}
        >
          <div id="">
            <Typography variant="p" component="div" sx={{ padding: "4px", color: "#FFFFFF" }}>
              {title}
            </Typography>
          </div>  
        </Button>
    </Box>
  )
};

export default ResetBox;