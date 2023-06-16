import { useEffect, useState } from "react";
import "./PromotionList.css";
import PromotionModel from "../../../Models/PromotionModel";
import promotionService from "../../../Services/PromotionService";
import notifyService from "../../../Services/NotifyService";
import {
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Switch } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

function PromotionList(): JSX.Element {
  const [promotions, setPromotions] = useState<PromotionModel[]>([]);

  useEffect(() => {
    promotionService
      .getAllPromotions()
      .then((responsePromotions) => {
        setPromotions(responsePromotions);
      })
      .catch((err) => notifyService.error(err));
  }, []);

  return (
    <div className="PromotionList scrollbar">
      <Typography variant="h4">Promotions</Typography>
      {promotions.length > 0 ? (
        promotions.map((promotion, index) => {
          const products = JSON.parse(promotion.products);
          console.log(products);
          return (
            <Card key={index} sx={{ margin: "10px" }}>
              <FormControl component="fieldset">
                <Grid container alignItems="center" spacing={10}>
                  <Grid item>
                    <FormGroup aria-label="position" row>
                      <FormControlLabel
                        value="active"
                        control={<Switch color="primary" />}
                        label="Activate"
                        labelPlacement="start"
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item>
                    <Button variant="text" color="error">
                      DELETE
                    </Button>
                  </Grid>
                </Grid>
              </FormControl>

              <CardContent>
                <Typography variant="h5" component="div">
                  {promotion.name}
                </Typography>
                <Typography variant="inherit" component="div">
                  Start Date:{" "}
                  {new Date(promotion.startDate).toLocaleDateString()}
                </Typography>
                <Typography variant="inherit">
                  End Date: {new Date(promotion.endDate).toLocaleDateString()}
                </Typography>
                <Typography variant="h6">Discount Type</Typography>
                {promotion?.percentageDiscount > 0 && (
                  <Typography variant="subtitle1">
                    -{promotion.percentageDiscount}% off
                  </Typography>
                )}
                {promotion?.amountDiscount > 0 && (
                  <Typography variant="subtitle1">
                    -{promotion.amountDiscount}$ off
                  </Typography>
                )}
                {promotion?.finalPriceDiscount > 0 && (
                  <Typography variant="subtitle1">
                    Products for {promotion.finalPriceDiscount}$
                  </Typography>
                )}
                <Typography variant="h6" component="div">
                  Products
                </Typography>
                <List>
                  {products.map((product: any, productIndex: number) => (
                    <ListItem key={productIndex}>
                      <Typography variant="subtitle1">{product}</Typography>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <div>No promotions yet...</div>
      )}
    </div>
  );
}

export default PromotionList;
