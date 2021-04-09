import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import '../App.css'

const Header = () =>  {
    const [hovered, setHovered] = useState(false);
    const toggleHover = () => setHovered(!hovered);

    return (
        <Box ml={8} className="header">
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Box className="headerLogo" >
                        <Typography variant="h3">
                            <Box className={hovered ? 'magictime foolishIn' : ''} style={{display: "flex"}} onMouseLeave={toggleHover}> { /* This box is needed with display flex, otherwise the Typography makes the next 2 boxes be in different lines */ } 
                                <Box>o</Box>
                                <Box className="headerLogoMinds" border={0} borderLeft={0}>m.</Box>
                            </Box>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Header;
