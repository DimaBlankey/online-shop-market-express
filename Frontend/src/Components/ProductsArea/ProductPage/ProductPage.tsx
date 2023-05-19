import { Carousel } from "react-responsive-carousel";
import ProductModel from "../../../Models/ProductModel";
import "./ProductPage.css";
import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import CartItemModel from "../../../Models/CartItemModel";
import { CartActionType, cartStore } from "../../../Redux/CartState";
import cartService from "../../../Services/CartService";
import { Box, Button, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import productsService from "../../../Services/ProductsService";
import notifyService from "../../../Services/NotifyService";
import CheckIcon from "@mui/icons-material/Check";
import { ProductsActionType, productsStore } from "../../../Redux/ProductState";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

interface ProductCardProps {
  product: ProductModel;
}

function ProductPage(): JSX.Element {
  const { productCode } = useParams<{ productCode: string }>();
  const [product, setProduct] = useState<ProductModel | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProduct = localStorage.getItem(productCode);

    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
    } else {
      productsService
        .getOneProduct(productCode)
        .then((responseProduct) => {
          setProduct(responseProduct);
          localStorage.setItem(productCode, JSON.stringify(responseProduct));
        })
        .catch((err) => {
          notifyService.error(err);
          navigate("/home");
        });
    }
  }, [productCode, navigate]);

  const [user, setUser] = useState<UserModel>();
  useEffect(() => {
    setUser(authStore.getState().user);
    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });
    return () => unsubscribe();
  }, []);

  const addToCart = () => {
    const cartItem: CartItemModel = {
      productId: product.id,
      productCode: product.productCode,
      productName: product.name,
      salePrice: product.salePrice,
      price: product.price,
      image1Url: product.image1Url,
      cartId: user ? user.cartId : Math.floor(Math.random() * 1000000),
      quantity: 1,
      totalPrice: product.salePrice || product.price,
    };

    if (!user) {
      const storedCartItems = localStorage.getItem("cart");
      let cartItems: CartItemModel[] = storedCartItems
        ? JSON.parse(storedCartItems)
        : [];

      const existingItemIndex = cartItems.findIndex(
        (item) => item.productId === cartItem.productId
      );

      if (existingItemIndex > -1) {
        cartItems[existingItemIndex].quantity++;
        cartItems[existingItemIndex].totalPrice = parseFloat(
          (
            cartItems[existingItemIndex].quantity *
            (cartItems[existingItemIndex].salePrice ||
              cartItems[existingItemIndex].price)
          ).toFixed(2)
        );
      } else {
        cartItems.push(cartItem);
      }

      localStorage.setItem("cart", JSON.stringify(cartItems));
      cartStore.dispatch({
        type: CartActionType.FetchItems,
        payload: cartItems,
      });
    } else {
      cartService.addCartDetails(cartItem);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const images = [product.image1Url, product.image2Url].filter(Boolean);

  return (
    <div className="ProductPage">
       <Link to={"/home"}>
      <KeyboardBackspaceIcon></KeyboardBackspaceIcon><span>Back</span></Link>
        <div className="product-gallery">
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
                <img
                  src={image}
                  alt={`${product.name} - ${index + 1}`}
                  style={{ height: "400px", objectFit: "contain" }}
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="product-details">
          <Typography gutterBottom variant="h4" component="div">
            {product.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Product Code: {product.productCode}
          </Typography>
          <Box>
            {product.salePrice ? (
              <>
                <Typography variant="h5" color="error">
                  ${product.salePrice}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ textDecoration: "line-through", ml: 1 }}
                >
                  ${product.price}
                </Typography>
              </>
            ) : (
              <Typography variant="h5">${product.price}</Typography>
            )}
          </Box>
          <Box>
            <Typography variant="subtitle2">Quantity:</Typography>
          </Box>
          <Button variant="contained" onClick={addToCart}>
            Add to cart
          </Button>
          <ul className="product-features">
            <li>
              <CheckIcon></CheckIcon> Delivery within 48h
            </li>
            <li>
              <CheckIcon></CheckIcon> Free shipping over $50
            </li>
            <li>
              <CheckIcon></CheckIcon> Free returns
            </li>
          </ul>
        </div>
        <div className="product-description">
          <Typography variant="body1">{product.description}</Typography>
        </div>
      </div>
  );
}

export default ProductPage;
