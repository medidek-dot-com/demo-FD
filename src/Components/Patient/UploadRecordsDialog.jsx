import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Typography,
} from "@mui/material";
import { FiUpload } from "react-icons/fi";

const handleDrop = (event) => {
    event.preventDefault();

    // Handle the dropped files here
    const files = event.dataTransfer.files;
    console.log(files);
};

const UploadRecordsDialog = ({
    uploadPrescriptionDialog,
    setUploadPrescriptionDialog,
}) => {
    const handleDrop = (event) => {
        event.preventDefault();

        // Handle the dropped files here
        const files = event.dataTransfer.files;
        console.log(files);
    };

    const onDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <Dialog
                open={uploadPrescriptionDialog}
                onClose={() => {
                    return setUploadPrescriptionDialog(false);
                }}
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
                    Upload Records
                    {uploadPrescriptionDialog ? (
                        <IconButton
                            aria-label="close"
                            onClick={() => setUploadPrescriptionDialog(false)}
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
                <DialogContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                >
                    <Box
                        component="label"
                        htmlFor="input"
                        sx={{
                            width: { xs: "100%", sm: "100%", md: "440px" },
                            height: "143px",
                            border: "2px dashed #1F51C6",
                            borderSpacing: "20px",
                            borderRadius: "5px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "10px",
                            fontFamily: "Raleway",
                            fontWeight: "600",
                            fontSize: { xs: "1rem", sm: "1rem", md: "18px" },
                            color: "#383838",
                        }}
                        onDrop={handleDrop}
                        onDragOver={onDragOver}
                    >
                        <input
                            type="file"
                            id="input"
                            style={{ display: "none" }}
                            onChange={(e) => console.log(e.target.files[0])}
                        />
                        <FiUpload
                            fontSize="32.27px"
                            style={{ color: "#1F51C6" }}
                        />{" "}
                        Drop or Upload
                    </Box>
                    <Typography
                        sx={{
                            fontFamily: "Lato",
                            fontWeight: "600",
                            fontSize: "0.938rem",
                            color: "#383838",
                            lineHeight: "18px",
                        }}
                    >
                        Accepted Files: Jpeg, Png, Pdf.
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "Lato",
                            fontWeight: "600",
                            fontSize: "0.938rem",
                            color: "#383838",
                            lineHeight: "18px",
                        }}
                    >
                        Maximum Size: 5MB
                    </Typography>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default UploadRecordsDialog;
