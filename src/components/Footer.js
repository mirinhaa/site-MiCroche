import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

export default function Footer() {
return (
<Box
component="footer"
sx={{
backgroundColor: 'grey.300', // Um cinza claro
p: 4, // padding (enchimento)
mt: 'auto', // 'margin-top: auto'
}}
>
<Container maxWidth="lg">
<Typography variant="body1" align="center" gutterBottom>
MiCroche
</Typography>
<Typography
variant="body2"
color="text.secondary"
align="center"
>
{'Copyright © '}
<Link color="inherit" href="#">
MiCroche
</Link>{' '}
{new Date().getFullYear()}
{'.'}
</Typography>
</Container>
</Box>
);
}