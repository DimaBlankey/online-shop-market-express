import { useEffect, useState } from "react";
import "./Reports.css";
import reportsService from "../../../Services/ReportsService";
import notifyService from "../../../Services/NotifyService";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Chart,
} from "chart.js";
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import ReportDates from "../ReportDates/ReportDates";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { CSVLink } from "react-csv"; 

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Reports(): JSX.Element {

  const [beginDate, setBeginDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [productsSold, setProductsSold] = useState<any[]>([]);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 0,
      },
    ],
  });

  useEffect(() => {
    if(beginDate && endDate){
    reportsService
      .getProductsSold(beginDate, endDate)
      .then((responseProductsSold) => {
        const parsedResponse =
          typeof responseProductsSold === "string"
            ? JSON.parse(responseProductsSold)
            : responseProductsSold;
        setProductsSold(parsedResponse);
        const productData: { [key: string]: number } = {};
        parsedResponse.forEach((item: { productsAndQuantity: string }) => {
          const products = JSON.parse(item.productsAndQuantity);
          products.forEach((product: any) => {
            if (productData[product.name]) {
              productData[product.name] += product.quantity;
            } else {
              productData[product.name] = product.quantity;
            }
          });
        });
        const labels = Object.keys(productData);
        const data = Object.values(productData);
        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Quantity Sold",
              data: data,
              backgroundColor: "rgba(75,192,192,0.6)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((err) => {
        notifyService.error(err);
      });
    }
  }, [beginDate, endDate, productsSold]);


   // Prepare data for CSV export
   const csvData = productsSold.flatMap(product => {
    const productsAndQuantity = JSON.parse(product.productsAndQuantity);
    return productsAndQuantity.map((item: { name: any; quantity: any; }) => ({
      name: item.name,
      quantity: item.quantity
    }));
  });
  

  return (
    <div className="Reports">
       <Container>
        <Typography variant="h3">Sales Report</Typography>   
        <ReportDates setBeginDate={setBeginDate} setEndDate={setEndDate}/>   
        <Bar data={chartData} />
        <CSVLink data={csvData} filename={"sales_report.csv"}>
          <FileDownloadIcon/>
        </CSVLink>
      </Container>
    </div>
  );
}

export default Reports;

