import { CircularProgress } from '@mui/material'
import React, { Fragment } from 'react'

const Loader = ({variant,value,sx,size,thickness,color}) => {
  return (
    <Fragment>
       <CircularProgress size={size} thickness={thickness} variant={variant} value={value} sx={sx} color={color}/>
    </Fragment>
  )
}

export default Loader