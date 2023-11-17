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

const ReviewComponet = ({ reviewDialog, setReviewDialog }) => {
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
                        <Rating />
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
                            rows={4}
                            multiline
                            placeholder="Type your review here."
                            sx={{}}
                        />
                    </Stack>
                    <Button
                        fullWidth
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
        </>
    );
};

export default ReviewComponet;
