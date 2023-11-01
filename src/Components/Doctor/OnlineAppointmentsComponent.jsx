import {
    Box,
    Button,
    Card,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Typography,
} from "@mui/material";
import React from "react";

const OnlineAppointmentsComponent = ({ dates, setHolidayDialog }) => {
    return (
        <>
            <Card
                sx={{
                    px: {
                        xs: "16px",
                        sm: "16px",
                        md: "30px",
                    },
                    py: {
                        xs: "25px",
                        sm: "25px",
                        md: "30px",
                    },
                    boxShadow: "none",
                    border: "1px solid #D9D9D9",
                }}
            >
                <Stack direction="row" spacing="12.61px" sx={{}}>
                    {dates.map((date, i) => (
                        <Box
                            key={i + 1}
                            component="button"
                            onClick={() => getDate(date)}
                            sx={{
                                width: {
                                    xs: "43.18px",
                                    sm: "43.18px",
                                    md: "57.39px",
                                },
                                height: {
                                    xs: "43.18px",
                                    sm: "43.18px",
                                    md: "57.39px",
                                },
                                background:
                                    currentDay === date.day
                                        ? "#1F51C6"
                                        : "#FFFFFF",
                                border:
                                    currentDay === date.day
                                        ? "none"
                                        : "1px solid #706D6D8F",
                                borderRadius: "3px",
                                color:
                                    currentDay === date.day
                                        ? "#FFFFFF"
                                        : "#706D6D",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: "Lato",
                                    fontWeight: "semibold",
                                    fontSize: {
                                        xs: "0.938rem",
                                        sm: "0.938rem",
                                        md: "1.125rem",
                                    },
                                    lineHeight: "21.6px",
                                }}
                            >
                                {date.day}
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: "Lato",
                                    fontWeight: "semibold",
                                    fontSize: {
                                        xs: "0.938rem",
                                        sm: "0.938rem",
                                        md: "1.125rem",
                                    },
                                    lineHeight: "21.6px",
                                }}
                            >
                                {date.date}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
                <Stack spacing="20px" sx={{ mt: "16.61px" }}>
                    <Stack
                        direction={{
                            xs: "column",
                            sm: "column",
                            md: "row",
                        }}
                    >
                        <Stack spacing="10.48px">
                            <InputLabel
                                sx={{
                                    fontFamily: "Lato",
                                    fontWeight: "500",
                                    fontSize: "0.938rem",
                                    color: "#383838",
                                }}
                            >
                                Choose Slot Duration
                            </InputLabel>
                            <Stack
                                direction="row"
                                spacing="20.02px"
                                sx={{
                                    alignItems: "center",
                                }}
                            >
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    sx={{
                                        width: {
                                            xs: "100%",
                                            sm: "100%",
                                            md: "262.93px",
                                        },
                                        height: "40px",
                                        fontFamily: "Lato",
                                        fontWeight: "semibold",
                                        fontSize: "1rem",
                                        borderRadius: "5px",
                                    }}
                                    placeholder="Choose Slot Duration"
                                    value={view}
                                    onChange={(e) => setView(e.target.value)}
                                >
                                    <MenuItem
                                        value="Weekly view"
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "semibold",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Choose Slot Duration
                                    </MenuItem>
                                    <MenuItem
                                        value="Calandar View"
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "semibold",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Calandar View
                                    </MenuItem>
                                </Select>
                                <Button
                                    onClick={() => setHolidayDialog(true)}
                                    sx={{
                                        lineHeight: "21.13px",
                                        // color: "#ffffff",
                                        borderRadius: "0",
                                        textTransform: "none",
                                        padding: 0,
                                        fontFamily: "Lato",
                                        fontWeight: "500",
                                        fontSize: "1.125rem",
                                        display: {
                                            xs: "none",
                                            sm: "none",
                                            md: "block",
                                        },
                                    }}
                                >
                                    View Holiday List
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack
                        spacing="20.02px"
                        direction={{
                            xs: "column",
                            sm: "column",
                            md: "row",
                        }}
                    >
                        <Stack spacing="10.48px">
                            <InputLabel
                                sx={{
                                    fontFamily: "Lato",
                                    fontWeight: "500",
                                    fontSize: "0.938rem",
                                    color: "#383838",
                                }}
                            >
                                Start Time
                            </InputLabel>
                            <Stack
                                direction="row"
                                sx={{
                                    alignItems: "center",
                                }}
                            >
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    sx={{
                                        width: {
                                            xs: "100%",
                                            sm: "100%",
                                            md: "262.93px",
                                        },
                                        height: "40px",
                                        fontFamily: "Lato",
                                        fontWeight: "semibold",
                                        fontSize: "1rem",
                                        borderRadius: "5px",
                                    }}
                                    placeholder="Choose Slot Duration"
                                    value={view}
                                    onChange={(e) => setView(e.target.value)}
                                >
                                    <MenuItem
                                        value="Weekly view"
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "semibold",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Enter Start Time
                                    </MenuItem>
                                    <MenuItem
                                        value="Calandar View"
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "semibold",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Calandar View
                                    </MenuItem>
                                </Select>
                            </Stack>
                        </Stack>
                        <Stack spacing="10.48px">
                            <InputLabel
                                sx={{
                                    fontFamily: "Lato",
                                    fontWeight: "500",
                                    fontSize: "0.938rem",
                                    color: "#383838",
                                }}
                            >
                                End Time
                            </InputLabel>
                            <Stack
                                direction="row"
                                sx={{
                                    alignItems: "center",
                                }}
                            >
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    sx={{
                                        width: {
                                            xs: "100%",
                                            sm: "100%",
                                            md: "262.93px",
                                        },
                                        height: "40px",
                                        fontFamily: "Lato",
                                        fontWeight: "semibold",
                                        fontSize: "1rem",
                                        borderRadius: "5px",
                                    }}
                                    placeholder="Choose Slot Duration"
                                    value={view}
                                    onChange={(e) => setView(e.target.value)}
                                >
                                    <MenuItem
                                        value="Weekly view"
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "semibold",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Enter End Time
                                    </MenuItem>
                                    <MenuItem
                                        value="Calandar View"
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "semibold",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Calandar View
                                    </MenuItem>
                                </Select>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack
                        spacing="20.02px"
                        direction={{
                            xs: "column",
                            sm: "column",
                            md: "row",
                        }}
                    >
                        <Stack spacing="10.48px">
                            <InputLabel
                                sx={{
                                    fontFamily: "Lato",
                                    fontWeight: "500",
                                    fontSize: "0.938rem",
                                    color: "#383838",
                                }}
                            >
                                Start Break Time
                            </InputLabel>
                            <Stack
                                direction="row"
                                sx={{
                                    alignItems: "center",
                                }}
                            >
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    sx={{
                                        width: {
                                            xs: "100%",
                                            sm: "100%",
                                            md: "262.93px",
                                        },
                                        height: "40px",
                                        fontFamily: "Lato",
                                        fontWeight: "semibold",
                                        fontSize: "1rem",
                                        borderRadius: "5px",
                                    }}
                                    placeholder="Choose Slot Duration"
                                    value={view}
                                    onChange={(e) => setView(e.target.value)}
                                >
                                    <MenuItem
                                        value="Weekly view"
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "semibold",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Enter Start Time
                                    </MenuItem>
                                    <MenuItem
                                        value="Calandar View"
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "semibold",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Calandar View
                                    </MenuItem>
                                </Select>
                            </Stack>
                        </Stack>
                        <Stack spacing="10.48px">
                            <InputLabel
                                sx={{
                                    fontFamily: "Lato",
                                    fontWeight: "500",
                                    fontSize: "0.938rem",
                                    color: "#383838",
                                }}
                            >
                                End Break Time
                            </InputLabel>
                            <Stack
                                direction="row"
                                sx={{
                                    alignItems: "center",
                                }}
                            >
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    sx={{
                                        width: {
                                            xs: "100%",
                                            sm: "100%",
                                            md: "262.93px",
                                        },
                                        height: "40px",
                                        fontFamily: "Lato",
                                        fontWeight: "semibold",
                                        fontSize: "1rem",
                                        borderRadius: "5px",
                                    }}
                                    placeholder="Choose Slot Duration"
                                    value={view}
                                    onChange={(e) => setView(e.target.value)}
                                >
                                    <MenuItem
                                        value="Weekly view"
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "semibold",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Enter Start Time
                                    </MenuItem>
                                    <MenuItem
                                        value="Calandar View"
                                        sx={{
                                            fontFamily: "Lato",
                                            fontWeight: "semibold",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Calandar View
                                    </MenuItem>
                                </Select>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Stack direction="row" sx={{ alignItems: "center" }}>
                            <Radio
                                // checked={selectedValue === 'a'}
                                // onChange={handleChange}
                                value="a"
                                id="markAsHoliday"
                                name="radio-buttons"
                                inputProps={{
                                    "aria-label": "A",
                                }}
                            />
                            <InputLabel
                                htmlFor="markAsHoliday"
                                sx={{
                                    fontFamily: "Lato",
                                    fontWeight: "semibold",
                                    fontSize: "0.938rem",
                                    color: "#706D6D",
                                }}
                            >
                                Mark as Holiday
                            </InputLabel>
                        </Stack>
                        <Button
                            onClick={() => setHolidayDialog(true)}
                            sx={{
                                lineHeight: "21.13px",
                                // color: "#ffffff",
                                borderRadius: "0",
                                textTransform: "none",
                                padding: 0,
                                fontFamily: "Lato",
                                fontWeight: "500",
                                fontSize: "0.75rem",
                                display: {
                                    xs: "block",
                                    sm: "block",
                                    md: "none",
                                },
                            }}
                        >
                            View Holiday List
                        </Button>
                    </Stack>
                    <Button
                        variant="contained"
                        sx={{
                            boxShadow: "none",
                            borderRadius: "29px",
                            textTransform: "none",
                            fontFamily: "Lato",
                            fontWeight: "700",
                            fontSize: "1.063rem",
                        }}
                    >
                        Save
                    </Button>
                </Stack>
            </Card>
        </>
    );
};

export default OnlineAppointmentsComponent;
