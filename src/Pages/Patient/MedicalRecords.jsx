import React, { useState } from "react";
import { Box, Card, CardMedia, InputLabel, Typography } from "@mui/material";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { tab } from "../../Store/tabSlice";
import { useEffect } from "react";
import UploadRecordsDialog from "../../Components/Patient/UploadRecordsDialog";
import { axiosClient } from "../../Utils/axiosClient";

const MedicalRecords = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [uploadPrescriptionDialog, setUploadPrescriptionDialog] =
        useState(false);

    const [medicalRecords, setMedicalRecords] = useState([]);

    const getMedicalRecord = async () => {
        try {
            const response = await axiosClient.get(
                `/v2/getRecordOfPatient/${user?._id}`
            );
            if (response.status === "ok") {
                console.log(response.result);
                return setMedicalRecords(response.result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMedicalRecord();
    }, []);

    useEffect(() => {
        dispatch(tab(null));
    }, []);

    return (
        <>
            <Box
                sx={{
                    width: {
                        xs: "100%",
                        sm: "100%",
                        md: "calc(100% - 100px)",
                    },
                    m: "0px auto",
                    p: 1,
                }}
            >
                <Box>
                    <Typography
                        sx={{
                            fontFamily: "Raleway",
                            fontWeight: "700",
                            fontSize: "1.875rem",
                            color: "#383838",
                            mb: "25px",
                        }}
                    >
                        Medical Upload
                    </Typography>
                    <Box
                        sx={{ display: "flex", gap: "25px", flexWrap: "wrap" }}
                    >
                        <Box
                            component="button"
                            onClick={() => setUploadPrescriptionDialog(true)}
                            sx={{
                                width: {
                                    xs: "100px",
                                    sm: "100px",
                                    md: "219px",
                                },
                                height: {
                                    xs: "100px",
                                    sm: "100px",
                                    md: "219px",
                                },
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                boxShadow: "none",
                                background: "#ffffff",
                                border: "1px solid #D9D9D9",
                                borderRadius: "5px",
                            }}
                        >
                            <FiPlus
                                style={{
                                    width: "54.83px",
                                    height: "54.83px",
                                    color: "#1F51C6",
                                }}
                            />
                        </Box>
                        {medicalRecords ? (
                            medicalRecords.map((recipt, i) => (
                                <Card
                                    key={i}
                                    sx={{
                                        width: {
                                            xs: "100px",
                                            sm: "100px",
                                            md: "219px",
                                        },
                                        height: {
                                            xs: "100px",
                                            sm: "100px",
                                            md: "219px",
                                        },
                                        // display: "flex",
                                        // justifyContent: "center",
                                        // alignItems: "center",
                                        boxShadow: "none",
                                        background: "#ffffff",
                                        border: "1px solid #D9D9D9",
                                        borderRadius: "5px",
                                    }}
                                >
                                    {/* <CardMedia
                                        sx={{ height: 140 }}
                                        image={recipt.imgurl}
                                        title="green iguana"
                                    /> */}
                                    <Box
                                        component="img"
                                        src={recipt.imgurl}
                                        alt=""
                                        style={{
                                            width: "100%",
                                            height: "160px",
                                        }}
                                    />
                                </Card>
                            ))
                        ) : (
                            <Typography>No record found</Typography>
                        )}
                    </Box>
                </Box>
            </Box>
            <UploadRecordsDialog
                uploadPrescriptionDialog={uploadPrescriptionDialog}
                setUploadPrescriptionDialog={setUploadPrescriptionDialog}
                getMedicalRecord={getMedicalRecord}
            />
        </>
    );
};

export default MedicalRecords;
