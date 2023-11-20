import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Typography,
} from "@mui/material";
import { FiUpload } from "react-icons/fi";
import { axiosClient } from "../../Utils/axiosClient";
import { useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import CancelIcon from "@mui/icons-material/Cancel";

const handleDrop = (event) => {
    event.preventDefault();

    // Handle the dropped files here
    const files = event.dataTransfer.files;
    console.log(files);
};

const UploadRecordsDialog = ({
    uploadPrescriptionDialog,
    setUploadPrescriptionDialog,
    getMedicalRecord,
}) => {
    const { user } = useSelector((state) => state.auth);
    const [prescription, setPrescription] = useState("");
    const [err, setError] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [sizeError, setSizeError] = useState(false);
    const [fileTypeError, setFileTypeError] = useState(false);

    const handleDrop = (event) => {
        event.preventDefault();

        // Handle the dropped files here
        setError(false);
        setSizeError(false);
        setFileTypeError(false);
        console.log(event.dataTransfer.files[0]);
        console.log(event.dataTransfer.files[0].type);
        setPrescription(event.dataTransfer.files[0]);
    };

    const onDragOver = (event) => {
        event.preventDefault();
    };

    const handleChange = (e) => {
        setPrescription(e.target.files[0]);
        console.log(e.target.files[0]);
        setError(false);
        setSizeError(false);
        setFileTypeError(false);
    };

    const uploadPrescription = async () => {
        if (!prescription) {
            setError(true);
            return;
        }
        if (prescription.size > 5242880) {
            setSizeError(true);
            return;
        }
        console.log(prescription.type !== "image/jpeg");

        if (
            prescription.type === "image/jpeg" ||
            prescription.type === "application/pdf" ||
            prescription.type === "image/png"
        ) {
            // setFileTypeError(false);
            setDisableButton(true);
            const data = new FormData();
            data.append("image", prescription);
            try {
                const response = await axiosClient.post(
                    `/v2/uploadRecord/${user._id}`,
                    data
                );
                if (response.status === "ok") {
                    getMedicalRecord();
                    setPrescription("");
                    setUploadPrescriptionDialog(false);
                    console.log(response);
                    return setDisableButton(false);
                }
            } catch (error) {
                toast.error("Something went wrong");
            }

            // return;
        }
        if (prescription.type == "image/jpeg") {
            return console.log("htt bccc");
        }
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
                        {prescription ? (
                            <Typography
                                sx={{
                                    fontFamily: "Lato",
                                    fontWeight: "600",
                                    fontSize: "0.938rem",
                                    color: "#1F51C6",
                                    lineHeight: "18px",
                                    textAlign: "center",
                                }}
                            >
                                {prescription.name}
                                <IconButton
                                    onClick={() => setPrescription("")}
                                    sx={{
                                        ":hover": {
                                            background: "none",
                                        },
                                    }}
                                >
                                    <CancelIcon
                                        sx={{
                                            color: "#B92612",
                                        }}
                                    />
                                </IconButton>
                            </Typography>
                        ) : (
                            <>
                                <input
                                    type="file"
                                    id="input"
                                    accept=".pdf, .doc, .docx, .jpg, .png"
                                    style={{ display: "none" }}
                                    onChange={handleChange}
                                />
                                <FiUpload
                                    fontSize="32.27px"
                                    style={{ color: "#1F51C6" }}
                                />{" "}
                                Drop or Upload
                            </>
                        )}
                    </Box>
                    {err && (
                        <Typography
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: "600",
                                fontSize: "0.938rem",
                                color: "#B92612",
                                lineHeight: "18px",
                                textAlign: "center",
                            }}
                        >
                            Please choose file!
                        </Typography>
                    )}
                    {sizeError && (
                        <Typography
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: "600",
                                fontSize: "0.938rem",
                                color: "#B92612",
                                lineHeight: "18px",
                                textAlign: "center",
                            }}
                        >
                            File size should be less then 5 MB
                        </Typography>
                    )}
                    {fileTypeError && (
                        <Typography
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: "600",
                                fontSize: "0.938rem",
                                color: "#B92612",
                                lineHeight: "18px",
                                textAlign: "center",
                            }}
                        >
                            Only PDF, JPG, PNG files are accepted
                        </Typography>
                    )}
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
                    <LoadingButton
                        size="small"
                        fullWidth
                        onClick={uploadPrescription}
                        loading={disableButton}
                        // loadingPosition="end"
                        variant="contained"
                        sx={{
                            textTransform: "none",
                            borderRadius: "25px",
                            boxShadow: "none",
                        }}
                    >
                        <span
                            style={{
                                fontFamily: "Lato",
                                fontWeight: "600",
                                fontSize: "1rem",
                            }}
                        >
                            Upload
                        </span>
                    </LoadingButton>
                    {/* <Button
                        variant="contained"
                        onClick={uploadPrescription}
                        sx={{
                            fontFamily: "Lato",
                            fontWeight: "600",
                            fontSize: "1rem",
                            textTransform: "none",
                            borderRadius: "25px",
                            boxShadow: "none",
                        }}
                    >
                        Upload
                    </Button> */}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default UploadRecordsDialog;
