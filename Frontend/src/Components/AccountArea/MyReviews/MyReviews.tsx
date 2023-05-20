import { useEffect, useState } from "react";
import ReviewModel from "../../../Models/ReviewModel";
import "./MyReviews.css";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import reviewService from "../../../Services/ReviewService";
import notifyService from "../../../Services/NotifyService";
import {
  Card,
  CardContent,
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

function MyReviews(): JSX.Element {
  const [reviews, setReviews] = useState<ReviewModel[]>([]);

  const [user, setUser] = useState<UserModel>();

  useEffect(() => {
    setUser(authStore.getState().user);
    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      reviewService
        .getReviewsByUser(user.id)
        .then((responseReviews) => {
          setReviews(responseReviews);
        })
        .catch((err) => notifyService.error(err));
    }
  }, [user]);

  return (
    <div className="MyReviews scrollbar">
      <Typography variant="h4">My Reviews</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rating</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Product Code</TableCell>
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
                  <TableCell>{review.name}</TableCell>
                  <TableCell>{review.productCode}</TableCell>
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

export default MyReviews;
