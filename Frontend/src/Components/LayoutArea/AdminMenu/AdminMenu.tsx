import "./AdminMenu.css";
import AddIcon from "@mui/icons-material/Add";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Box, Fab, Tooltip } from "@mui/material";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

function AdminMenu(): JSX.Element {
  return (
    <div className="AdminMenu">
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Tooltip title="Add Products" placement="top">
          <Fab color="success">
            <AddIcon />
          </Fab>
        </Tooltip>
        <Tooltip title="See Reports" placement="top">
          <Fab color="success">
            <BarChartIcon />
          </Fab>
        </Tooltip>
        <Tooltip title="Promotions" placement="top">
          <Fab color="success">
            <MonetizationOnIcon />
          </Fab>
        </Tooltip>
        
      </Box>
    </div>
  );
}

export default AdminMenu;