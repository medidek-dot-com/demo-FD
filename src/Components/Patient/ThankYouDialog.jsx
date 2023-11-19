import React from "react";
import { Box, Dialog, DialogContent, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ThankYouDialog = ({ thankYouDialog, setThankYouDialog }) => {
    return (
        <>
            <Dialog
                open={thankYouDialog}
                sx={{ boxShadow: "none" }}
                onClose={() => setThankYouDialog(false)}
            >
                <DialogContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        p: "40px",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Box component="img" src="/check tick.png" />
                    {/* <CheckCircleIcon
                        color="success"
                        sx={{ width: "72px", height: "72px" }}
                    /> */}
                    <Typography
                        sx={{
                            fontFamily: "Raleway",
                            fontWeight: "700",
                            fontSize: "1.563rem",
                            color: "#383838",
                            lineHeight: "29.35px",
                        }}
                    >
                        Thank You!
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "Lato",
                            fontWeight: "semibold",
                            fontSize: "1.125rem",
                            color: "#706D6D",
                            lineHeight: "21.6px",
                        }}
                    >
                        Your Review Means a Lot to Us!
                    </Typography>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ThankYouDialog;
