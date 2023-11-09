import React from 'react'
import { Dialog, DialogContent, Typography } from '@mui/material'
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ThankYouDialog = ({thankYouDialog, setThankYouDialog }) => {
  return (
    <>
    <Dialog open={thankYouDialog}
    onClose={()=>setThankYouDialog(false)}
    >
        <DialogContent sx={{display:'flex', flexDirection:'column', gap:'16px', justifyContent:'center', alignItems:'center'}}>
        <CheckCircleIcon color="success" sx={{width:'72px', height:'72px'}}/>
            <Typography sx={{fontFamily:'Raleway', fontWeight:'700', fontSize:'1.563rem', color:'#383838'}}>
            Thank You!
            </Typography>
            <Typography sx={{fontFamily:'Lato', fontWeight:'600', fontSize:'1.125rem', color:'#706D6D'}}>
            Your Review Means a Lot to Us!
            </Typography>
        </DialogContent>
    </Dialog>
    </>
  )
}

export default ThankYouDialog