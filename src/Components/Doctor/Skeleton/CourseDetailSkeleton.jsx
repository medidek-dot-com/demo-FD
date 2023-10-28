import { Skeleton, Stack } from '@mui/material'
import React from 'react'

const CourseDetailSkeleton = () => {
  return (
    <>
    <Stack spacing={1} width={'100%'} mt={1} sx={{alignItems:{xs:'center', sm:'center', md:'start'}}}>
        <Skeleton variant='text' fontSize='1.375rem' sx={{width:{xs:'90%', sm:'90%', md:'50%'}}} />
        <Skeleton variant='text' fontSize='1.375rem' sx={{width:{xs:'80%', sm:'80%', md:'50%'}}}/>
        <Skeleton variant='text' sx={{fontSize:{xs:'1rem', sm:'1rem', md:'1.375rem'}, width:{xs:'100%', sm:'100%', md:'40%'}}}/>
        <Skeleton variant='text' sx={{fontSize:{xs:'1rem', sm:'1rem', md:'1.375rem'}, width:{xs:'100%', sm:'100%', md:'42%'}}}/>
        <Skeleton variant='text' sx={{fontSize:{xs:'1rem', sm:'1rem', md:'1.375rem'}, width:{xs:'100%', sm:'100%', md:'44%'}}}/>
        <Skeleton variant='text' sx={{fontSize:{xs:'1rem', sm:'1rem', md:'1.375rem'}, width:{xs:'100%', sm:'100%', md:'40%'}}}/>
    </Stack>
    </>
  )
}

export default CourseDetailSkeleton;