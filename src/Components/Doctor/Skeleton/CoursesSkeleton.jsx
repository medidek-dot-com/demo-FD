import { Skeleton, Stack } from "@mui/material";
import React from "react";

const CoursesSkeleton = () => {
    return (
        <>
            <Stack
                direction="row"
                spacing={1}
                width={"100%"}
                mt={1}
                alignItems={"center"}
                sx={{
                    p: { xs: 0, sm: 0, md: 2 },
                }}
            >
                <Skeleton
                    variant="rectangular"
                    
                    
                    sx={{ borderRadius: "5px", width:{xs:"170px", sm:"170px", md:"240px"}, height:{xs:"100px", sm:"100px", md:"130px"}}}
                />
                <Stack width={"100%"}>
                    <Skeleton variant="text" fontSize="1.375rem" width="90%" />
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: "1.375rem", width: "70%" }}
                    />
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: "1.375rem", width: "60%" }}
                    />
                </Stack>
            </Stack>
        </>
    );
};

export default CoursesSkeleton;
