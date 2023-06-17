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
import { promotionsStore } from "../../../Redux/PromotionState";

function PromotionList(): JSX.Element {
  const [promotions, setPromotions] = useState<PromotionModel[]>([]);

  useEffect(() => {
    setPromotions(promotionsStore.getState().promotions);
    const unsubscribe = promotionsStore.subscribe(() => {
      const newPromotions = promotionsStore.getState().promotions;
      setPromotions(newPromotions);
    });
    return () =>  unsubscribe();
  }, []);

  useEffect(() => {
    promotionService
      .getAllPromotions()
      .then((responsePromotions) => {
        setPromotions(responsePromotions);
      })
      .catch((err) => notifyService.error(err));
  }, []);

  async function promotionStatus(promotion: PromotionModel, index: number) {
    const newPromotion = { ...promotion, isActive: !promotion.isActive };
    try {
      await promotionService.promotionStatus(newPromotion);
      // update state
      setPromotions((prevPromotions) => {
        const newPromotions = [...prevPromotions]; // create a copy
        newPromotions[index] = newPromotion; // replace the promotion at this index
        return newPromotions;
      });
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  async function deletePromotion(promotionId: number) {
    try {
      const ok = window.confirm("Are you sure?");
      if (!ok) return;
      await promotionService.deletePromotion(promotionId);
      notifyService.success("Promotion has been deleted");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="PromotionList scrollbar">
      <Typography variant="h4">Promotions</Typography>
      {promotions.length > 0 ? (
        promotions.map((promotion, index) => {
          const products = JSON.parse(promotion.products);
          return (
            <Card key={index} sx={{ margin: "10px" }}>
              <FormControl component="fieldset">
                <Grid container alignItems="center" spacing={10}>
                  <Grid item>
                    <FormGroup aria-label="position" row>
                      <FormControlLabel
                        value="active"
                        control={
                          <Switch
                            checked={promotion.isActive === true}
                            onChange={() => promotionStatus(promotion, index)}
                            color="primary"
                          />
                        }
                        label="Activate"
                        labelPlacement="start"
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="text"
                      color="error"
                      onClick={() => deletePromotion(promotion.id)}
                    >
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
                <List className="scrollbar">
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
