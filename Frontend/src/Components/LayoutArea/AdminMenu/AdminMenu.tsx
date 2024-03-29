import "./AdminMenu.css";
import AddIcon from "@mui/icons-material/Add";
import BarChartIcon from "@mui/icons-material/BarChart";
import SellIcon from '@mui/icons-material/Sell';
import { Box, Fab, Tooltip } from "@mui/material";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Link } from "react-router-dom";

function AdminMenu(): JSX.Element {
  return (
    <div className="AdminMenu">
      <Box sx={{ "& > :not(style)": { m: 1} }}>
        <Tooltip title="Add Products" placement="top">
        <Link to={"/product/create-product"}>
          <Fab color="success">
            <AddIcon />
          </Fab>
          </Link>
        </Tooltip>
        <Tooltip title="See Reports" placement="top">
          <Link to={"/reports"}>
          <Fab color="success">
            <BarChartIcon />
          </Fab>
          </Link>
        </Tooltip>
        <Tooltip title="Promotions" placement="top">
        <Link to={"/promotions"}>
          <Fab color="success">
          <SellIcon></SellIcon>
          </Fab>
          </Link>
        </Tooltip>
        
      </Box>
    </div>
  );
}

export default AdminMenu;
