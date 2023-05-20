import { CircularProgress } from "@mui/material";
import "./Spinner.css";

function Spinner(): JSX.Element {
    return (
        <div className="Spinner">
			<CircularProgress />
        </div>
    );
}

export default Spinner;
