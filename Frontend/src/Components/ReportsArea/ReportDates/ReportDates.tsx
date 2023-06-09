import { useEffect, useState } from "react";
import "./ReportDates.css";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Grid } from "@mui/material";


interface IProps {
    setBeginDate: React.Dispatch<React.SetStateAction<string>>;
    setEndDate: React.Dispatch<React.SetStateAction<string>>;
  }
  

  function ReportDates({ setBeginDate, setEndDate }: IProps): JSX.Element {
    
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 12).toISOString().slice(0, 10);
    const today = new Date(currentDate.setHours(12)).toISOString().slice(0, 10);
    
    useEffect(() => {
      setBeginDate(firstDayOfMonth);
      setEndDate(today);
    }, [firstDayOfMonth, today]);
  
    return (
      <div className="ReportDates">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container justifyContent="space-around">
            <DateRangePicker
              defaultValue={[dayjs(firstDayOfMonth), dayjs(today)]}
              autoFocus={undefined}
              onAccept={(range) => {
                setBeginDate(range[0].format('YYYY-MM-DD'));
                setEndDate(range[1].format('YYYY-MM-DD'));
              }}
            />
          </Grid>
        </LocalizationProvider>
      </div>
    );
  }

  export default ReportDates
