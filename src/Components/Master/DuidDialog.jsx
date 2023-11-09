import React from "react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    InputLabel,
    TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import styled from "@emotion/styled";
import { toast } from "react-toastify";
import { axiosClient } from "../../Utils/axiosClient";
import { useSelector } from "react-redux";

// const TextFieldStyle = styled(TextField)({
//     // marginBottom: "20px",
//     "& .MuiOutlinedInput-input": {
//         padding: "5px 10px",
//     },
//     ["& input"]: {
//         // color: "white",
//         fontFamily: "Lato",
//         fontWeight: "600",
//         color: "#383838",
//         fontSize: "0.938rem",
//         borderColor: "red",
//     },
//     ["& fieldset"]: {
//         // color: "white",
//         borderColor: "#D9D9D9",
//     },
//     [`& p`]: {
//         fontFamily: "Lato",
//         fontWeight: "500",
//         fontSize: "1rem",
//     },
//     "& .MuiOutlinedInput-input": {
//         padding: "5px 10px",
//     },
// });

export let duiddata = {};

const DuidDialog = ({
    duidDialog,
    setInputValue,
    setDuidDialog,
    setAddDoctorsDialog,
}) => {
    const [disableButton, setDisableButton] = useState(false);
    const [doctorAlreadyExist, setDoctorAlreadyExists] = useState(false);
    const [invalidDuid, setInvalidDuid] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const [err, setError] = useState(false);

    const [duid, setDuid] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!duid) {
            return setError(true);
        }
        setDisableButton(true);
        try {
            const response = await axiosClient.post("/v2/getdoctorinfo", {
                doctorid: duid,
                hospitalId: user?._id,
            });
            console.log(response);
            if (response.status === "ok") {
                // navigate(`/master/user/home/${uuid.id}`);
                setDisableButton(false);
                setAddDoctorsDialog(true);
                setDuidDialog(false);
                setInputValue(response.result);
                return;
            }
             
        } catch (e) {
            if(e.status === "error" && e.statusCode === 403){
                setError(true);
                setDisableButton(false);
               return setDoctorAlreadyExists(true);
             }
             if(e.status === "error" && e.statusCode === 404){
                setError(true);
                setDisableButton(false);
               return setInvalidDuid(true);
             }
            setDisableButton(false);
            setDisableButton(false);
            return toast.error(e.message);
        }
    };
    console.log(duiddata);
    return (
        <>
            <Dialog
                open={duidDialog}
                onClose={() => setDuidDialog(false)}
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
                    Add Doctor
                    {duidDialog ? (
                        <IconButton
                            aria-label="close"
                            onClick={() => setDuidDialog(false)}
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
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <InputLabel
                            sx={{
                                fontFamily: "Lato",
                                fontWeight: "600",
                                color: "#383838",
                                fontSize: "0.938rem",
                            }}
                            htmlFor="duid"
                        >
                            Enter DUID
                        </InputLabel>
                        <TextField
                            id="duid"
                            placeholder="Enter DUID"
                            onChange={(e) => setDuid(e.target.value) & setError(false)}
                            error={err && !duid ? true : false || err && doctorAlreadyExist ? true : false || err && invalidDuid ? true : false}
                            helperText={err && !duid ? "Please enter DUID" : "" || err && doctorAlreadyExist ? "This doctor is already exists in this hospital" : "" || err && invalidDuid ? "Invalid DUID" : ""}
                            sx={{
                                input: {
                                    height: "10px",
                                    fontFamily: "Lato",
                                    fontWeight: "600",
                                    color: "#383838",
                                    fontSize: "0.938rem",
                                },
                                ["& p"]: {
                                    fontFamily: "Lato",
                                    fontWeight: "500",
                                    fontSize: "1rem",
                                },
                                width: {
                                    xs: "100%",
                                    sm: "100%",
                                    md: "516.43px",
                                },

                                "input::placeholder": {
                                    fontFamily: "Lato",
                                    fontWeight: "600",
                                    fontSize: "15px",
                                    color: "#706D6D",
                                    opacity: 0.7,
                                },
                                mt: "10px",
                            }}
                        />
                        <LoadingButton
                            size="small"
                            fullWidth
                            type="submit"
                            // onClick={handleCLick}
                            loading={disableButton}
                            // loadingPosition="end"
                            variant="contained"
                            sx={{
                                mt: 3,
                                display: "flex",
                                borderRadius: 40,
                                textTransform: "none",
                                boxShadow: "none",
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "Lato",
                                    fontWeight: "700",
                                    fontSize: "1rem",
                                }}
                            >
                                Add Doctor
                            </span>
                        </LoadingButton>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default DuidDialog;
