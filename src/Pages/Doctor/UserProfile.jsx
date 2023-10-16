import { Avatar, Box, Card, Stack, Typography } from '@mui/material'
import React from 'react'

const UserProfile = () => {
  return (
    <>
    <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>

    
    <Card sx={{}}>
        <Typography variant='h6' sx={{fontWeight:'600'}}>
        Edit Profile
        </Typography>
        <Stack direction='row'>
        <Avatar alt="Remy Sharp" src="/default.png" sx={{ width: 50, height: 50 }}/>
        <Box component='span'>
        Pick a photo from your computer 
        </Box>
        </Stack>
    </Card>
    </Box>
    </>
  )
}

export default UserProfile