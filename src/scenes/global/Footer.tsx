import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';

interface FooterProps {
    companyName?: string;
    companyUrl?: string;
}

export const Footer: React.FC<FooterProps> = ({
    companyName = "Khanh Nhan Nguyen",
    companyUrl = "https://github.com/IrinaLuminesk",
}) => {
    return (
        <Box
            component="footer"
            sx={{
                py: 1,
                px: 1,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            }}
        >
            <Container maxWidth="xl">
                <Typography variant="body2" color="text.secondary" align="center">
                    {'Copyright © '}
                    <Link color="inherit" href={companyUrl} underline="hover">
                        {companyName}
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'. All rights reserved.'}
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;