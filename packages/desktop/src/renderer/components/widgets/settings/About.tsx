import React from 'react'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const PREFIX = 'About'

const classes = {
  title: `${PREFIX}title`,
  titleDiv: `${PREFIX}titleDiv`
}

const StyledGrid = styled(Grid)(() => ({
  [`& .${classes.title}`]: {},

  [`& .${classes.titleDiv}`]: {
    marginBottom: 24
  }
}))

const version = process.env.npm_package_version

export const About = () => {
  return (
    <StyledGrid container direction='column'>
      <Grid
        container
        item
        justifyContent='space-between'
        alignItems='center'
        className={classes.titleDiv}>
        <Grid item className={classes.title}>
          <Typography variant='h3'>About</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Grid item>
          <Typography variant='h5'>Quiet</Typography>
        </Grid>
        <Grid item>
          <Typography variant='body2'>
            Version: {version}
            <br />
            Copyright © {new Date().getFullYear()} Zbay LLC
          </Typography>
        </Grid>
      </Grid>
    </StyledGrid>
  )
}
