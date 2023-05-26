import { useEffect, useState } from "react";
import "./ReviewProduct.css";
import ReviewModel from "../../../Models/ReviewModel";
import reviewService from "../../../Services/ReviewService";
import notifyService from "../../../Services/NotifyService";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate, useParams } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import productsService from "../../../Services/ProductsService";
import { reviewStore } from "../../../Redux/ReviewState";

function ReviewProduct(): JSX.Element {
 
  const [reviews, setReviews] = useState<ReviewModel[]>([]);

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


  // useEffect(() => {
  //   if (product) {
  //     reviewService
  //       .getReviewsByProduct(product.id)
  //       .then((responseReviews) => {
  //         setReviews(responseReviews);
  //       })
  //       .catch((err) => notifyService.error(err));
  //   }
  // }, [product]);


  useEffect(() => {
    if (product) {
      reviewService
        .getReviewsByProduct(product.id)
        .then((responseReviews) => {
          setReviews(responseReviews);
        })
        .catch((err) => notifyService.error(err));
    }
    const unsubscribe = reviewStore.subscribe(() => {
      const updatedReviews = reviewStore.getState().reviews
      setReviews(updatedReviews);
    });
    return () => unsubscribe();

  }, [product]);

  
  return (
    <div className="ReviewProduct scrollbar">
      <Typography variant="h5"> Reviews</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rating</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Review</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {[...Array(review.rating)].map((e, i) => (
                      <StarIcon key={i} />
                    ))}
                  </TableCell>
                  <TableCell>
                    {new Date(review.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{review.firstName}</TableCell>
                  <TableCell>{review.review}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography variant="body1" align="center">
                    No reviews yet...
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ReviewProduct;
