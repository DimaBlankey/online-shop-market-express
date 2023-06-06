import { Carousel } from "react-responsive-carousel";
import ProductModel from "../../../Models/ProductModel";
import "./ProductPage.css";
import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import CartItemModel from "../../../Models/CartItemModel";
import { CartActionType, cartStore } from "../../../Redux/CartState";
import cartService from "../../../Services/CartService";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Rating,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Typography,
  colors,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate, useParams } from "react-router-dom";
import productsService from "../../../Services/ProductsService";
import notifyService from "../../../Services/NotifyService";
import CheckIcon from "@mui/icons-material/Check";
import { ProductsActionType, productsStore } from "../../../Redux/ProductState";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Cart from "../../CartArea/Cart/Cart";
import Spinner from "../../SharedArea/Spinner/Spinner";
import ReviewProduct from "../ReviewProduct/ReviewProduct";
import AddReviewProduct from "../AddReviewProduct/AddReviewProduct";
import ReviewSummeryModel from "../../../Models/ReviewSummeryModel";
import reviewService from "../../../Services/ReviewService";

interface ProductCardProps {
  product: ProductModel;
}

function ProductPage(): JSX.Element {
  const { productCode } = useParams<{ productCode: string }>();

  const [product, setProduct] = useState<ProductModel | null>(null);

  const role = authStore.getState().user?.roleId;

  const navigate = useNavigate();

  useEffect(() => {
    const storedProduct = localStorage.getItem(productCode);

    if (storedProduct) {
      try {
        setProduct(JSON.parse(storedProduct));
      } catch (err) {
        console.error("Could not parse stored product:", err);
      }
    } else {
      productsService
        .getOneProduct(productCode)
        .then((responseProduct) => {
          if (responseProduct) {
            setProduct(responseProduct);
            localStorage.setItem(productCode, JSON.stringify(responseProduct));
          } else {
            console.error("Product not found:", productCode);
          }
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

  const [reviewSummery, setReviewSummery] = useState<ReviewSummeryModel>({
    productId: 0,
    averageRating: 0,
    reviewCount: 0,
  });

  useEffect(() => {
    if (product) {
      reviewService
        .getReviewSummeryByProduct(product.id)
        .then((responseReview) => {
          setReviewSummery(responseReview);
        })
        .catch((err) => {
          notifyService.error(err);
        });
    }
  }, [product]);

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
    return <Spinner></Spinner>;
  }

  const images = [product.image1Url, product.image2Url].filter(Boolean);

  async function deleteMe() {
    try {
      const ok = window.confirm("Are you sure?");
      if (!ok) return;
      await productsService.deleteProduct(product.productCode);
      notifyService.success("Product has been deleted");
      navigate("/home");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

function editMe(){
  navigate(`/product/update-product/${product.productCode}`);
}


  const adminActions = [
    { icon: <EditIcon onClick={editMe}/>, name: "Edit" },
    { icon: <DeleteIcon onClick={deleteMe} />, name: "Delete" },
  ];

  return (
    <div className="ProductPage">
      {role === 1 && (
        <Box sx={{ flexGrow: 1 }}>
          <SpeedDial
            ariaLabel="SpeedDial"
            sx={{
              position: "absolute",
              bottom: 16,
              left: 16,
              "& .MuiFab-primary": {
                backgroundColor: "success.main",
                "&:hover": {
                  backgroundColor: "success.dark",
                },
              },
            }}
            icon={<SpeedDialIcon />}
          >
            {adminActions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
              />
            ))}
          </SpeedDial>
        </Box>
      )}
      {/* <Card className="ProductPageMobileCard"> */}
      <div className="bradCrumbBack">
        <Link to={"/home"}>
          <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
          <span>Back</span>
        </Link>
      </div>
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
        <span className="reviewSummery">
          {reviewSummery.reviewCount > 1 && (
            <>
              <Rating
                name="half-rating"
                value={reviewSummery.averageRating}
                precision={0.5}
                readOnly
              />
              <span> ({reviewSummery.reviewCount} reviews )</span>
            </>
          )}
        </span>
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
          <br />
        </Box>
        <Button
          className="buttonAddToCart"
          variant="contained"
          onClick={addToCart}
        >
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
      {user && <AddReviewProduct />}
      <ReviewProduct></ReviewProduct>
      {/* </Card> */}
      <div className="cart">
        <Cart></Cart>
      </div>
    </div>
  );
}

export default ProductPage;
