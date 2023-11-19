import React, { useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Rating,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { axiosClient } from "../../Utils/axiosClient";
import ThankYouDialog from "./ThankYouDialog";

const TextFieldStyle = styled(TextField)({
    // marginBottom: "20px",
    padding: "15px",
    ["& div"]: {
        padding: "5px",
    },
    ["& textarea"]: {
        // color: "white",
        fontFamily: "Lato",
        fontWeight: "600",
        color: "#383838",
        fontSize: "0.938rem",
        borderColor: "red",
        width: "490px",
        lineHeight: "18px",
    },
    "& textarea::placeholder": {
        fontFamily: "Lato",
        fontWeight: "600",
        fontSize: "15px",
        color: "#706D6D",
    },
    ["& fieldset"]: {
        // color: "white",
        borderColor: "#D9D9D9",
    },
    [`& p`]: {
        fontFamily: "Lato",
        fontWeight: "500",
        fontSize: "1rem",
    },
    "& .MuiOutlinedInput-input": {
        padding: "5px 10px",
    },
});

const ReviewComponet = ({
    reviewDialog,
    setReviewDialog,
    completeAppointmentsData,
    doctorid,
}) => {
    const { user } = useSelector((state) => state.auth);
    const [rating, setRating] = useState();
    const [message, setMessage] = useState("");
    const [err, setError] = useState(false);
    const [thankYouDialog, setThankYouDialog] = useState(false);
    console.log(doctorid);
    const postReview = async () => {
        if (!rating || !message) {
            console.log("error hai");
            return setError(true);
        }
        try {
            const response = await axiosClient.post(
                `/v2/reviewCreation/${doctorid}/${user?._id}`,
                {
                    rating,
                    message,
                }
            );
            if (response.status === "ok") {
                console.log(response);
                setReviewDialog(false);
                setThankYouDialog(true);
            }
        } catch (error) {
            return toast.error(error.message);
        }
    };

    return (
        <>
            <Dialog
                open={reviewDialog}
                onClose={() => setReviewDialog(false)}
                maxWidth={"md"}
                sx={{ margin: " 0 auto" }}
            >
                <DialogTitle
                    sx={{
                        fontFamily: "Raleway",
                        fontWeight: "600",
                        fontSize: "1.375rem",
                        lineHeight: "14.4px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    Write A Review
                    {reviewDialog ? (
                        <IconButton
                            aria-label="close"
                            onClick={() => setReviewDialog(false)}
                            sx={{
                                // position: "absolute",
                                // right: 8,
                                // top: 8,
                                color: "#383838",
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Stack spacing="8px">
                        <Typography
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: "600",
                                fontSize: "0.938rem",
                                lineHeight: "14.4px",
                            }}
                        >
                            Rate Appointment{" "}
                            <span style={{ color: "#EA4335" }}>*</span>
                        </Typography>
                        <Rating onChange={(e, val) => setRating(val)} />
                    </Stack>
                    <Stack spacing="8px" sx={{ mt: "27.28px" }}>
                        <Typography
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: "600",
                                fontSize: "0.938rem",
                                lineHeight: "14.4px",
                            }}
                        >
                            Leave a Review
                        </Typography>
                        <TextFieldStyle
                            onChange={(e) => setMessage(e.target.value)}
                            rows={4}
                            multiline
                            placeholder="Type your review here."
                        />
                    </Stack>
                    <Button
                        fullWidth
                        onClick={postReview}
                        disabled={rating ? false : true}
                        sx={{
                            textTransform: "none",
                            borderRadius: "29px",
                            fontFamily: "Lato",
                            fontWeight: "600",
                            fontSize: "1rem",
                            mt: "16px",
                            boxShadow: "none",
                        }}
                        variant="contained"
                    >
                        Post Review
                    </Button>
                </DialogContent>
            </Dialog>
            <ThankYouDialog
                thankYouDialog={thankYouDialog}
                setThankYouDialog={setThankYouDialog}
            />
        </>
    );
};

export default ReviewComponet;
