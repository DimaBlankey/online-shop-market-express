import { useEffect, useState } from "react";
import ProductModel from "../../../Models/ProductModel";
import "./ProductCard.css";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface ProductCardProps {
  product: ProductModel;
}

function ProductCard({ product }: ProductCardProps): JSX.Element {
  const images = [product.image1Url, product.image2Url].filter(Boolean);
  return (
    <Card className="ProductCard">
      <Carousel
       className="carousel"
        showThumbs={false}
        showStatus={false}
        showIndicators={images.length > 1}
        showArrows={images.length > 1}
        infiniteLoop
        swipeable
        emulateTouch
      >
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`${product.name} - ${index + 1}`} style={{ height: "200px", objectFit: "contain" }} />
          </div>
        ))}
      </Carousel>
      <CardContent>
        <span hidden >{product.categoryId}{product.categoryName}</span>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "baseline" }}>
          {product.salePrice ? (
            <>
              <Typography variant="h6" color="error">
                ${product.salePrice}
              </Typography>
              <Typography variant="body2" sx={{ textDecoration: "line-through", ml: 1 }}>
                ${product.price}
              </Typography>
            </>
          ) : (
            <Typography variant="h6">${product.price}</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
