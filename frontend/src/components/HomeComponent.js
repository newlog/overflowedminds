import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import '../App.css';


 const HomePage = () => {
    const homeLogoMindsBox = React.useRef()
    const homeLogoBox = React.useRef()
    const [spaceInDownExecuted, setSpaceInDownExecuted] = useState(false);

    useEffect(() => {
        animateMindsLogo()
        if (spaceInDownExecuted) executeFoolishInAnimation();
    });

    const animateMindsLogo = () => {
        setTimeout(addPuffInAnimationToMinds, 200);
    }

    const addPuffInAnimationToMinds = () => {
        const homeLogoMindsBoxNode = homeLogoMindsBox.current;
        if ( !spaceInDownExecuted ) {
            homeLogoMindsBoxNode.classList.add('spaceInDown')
            homeLogoMindsBoxNode.style.display = 'block';
            setSpaceInDownExecuted(true);
        }
    }
    
    const executeFoolishInAnimation = () => {
        const homeLogoMindsBoxNode = homeLogoMindsBox.current;
        homeLogoMindsBoxNode.classList.add('foolishIn')
        setTimeout(function() {homeLogoMindsBoxNode.classList.remove('foolishIn')}, 1000);
    }

    const [hovered, setHovered] = useState(false);
    const toggleHover = () => setHovered(!hovered);


    return (
        <Box ml={8} className="home">
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Box className="homeLogo" ref={homeLogoBox}>
                        <Typography variant="h1">
                            <Box style={{display: "flex"}}> { /* This box is needed with display flex, otherwise the Typography makes the next 2 boxes be in different lines */ } 
                                <Box pr={3}>Overflowed</Box>
                                <Box    className={hovered ? 'homeLogoMinds magictime foolishIn' : 'homeLogoMinds magictime'} 
                                        onMouseOver={toggleHover}
                                        border={5} 
                                        borderLeft={0} 
                                        ref={homeLogoMindsBox}>Minds.</Box>
                            </Box>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default HomePage;
